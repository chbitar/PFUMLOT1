import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INoteExecutif, defaultValue } from 'app/shared/model/note-executif.model';

export const ACTION_TYPES = {
  SEARCH_NOTEEXECUTIFS: 'noteExecutif/SEARCH_NOTEEXECUTIFS',
  FETCH_NOTEEXECUTIF_LIST: 'noteExecutif/FETCH_NOTEEXECUTIF_LIST',
  FETCH_NOTEEXECUTIF: 'noteExecutif/FETCH_NOTEEXECUTIF',
  CREATE_NOTEEXECUTIF: 'noteExecutif/CREATE_NOTEEXECUTIF',
  UPDATE_NOTEEXECUTIF: 'noteExecutif/UPDATE_NOTEEXECUTIF',
  DELETE_NOTEEXECUTIF: 'noteExecutif/DELETE_NOTEEXECUTIF',
  RESET: 'noteExecutif/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INoteExecutif>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type NoteExecutifState = Readonly<typeof initialState>;

// Reducer

export default (state: NoteExecutifState = initialState, action): NoteExecutifState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_NOTEEXECUTIFS):
    case REQUEST(ACTION_TYPES.FETCH_NOTEEXECUTIF_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NOTEEXECUTIF):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NOTEEXECUTIF):
    case REQUEST(ACTION_TYPES.UPDATE_NOTEEXECUTIF):
    case REQUEST(ACTION_TYPES.DELETE_NOTEEXECUTIF):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_NOTEEXECUTIFS):
    case FAILURE(ACTION_TYPES.FETCH_NOTEEXECUTIF_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NOTEEXECUTIF):
    case FAILURE(ACTION_TYPES.CREATE_NOTEEXECUTIF):
    case FAILURE(ACTION_TYPES.UPDATE_NOTEEXECUTIF):
    case FAILURE(ACTION_TYPES.DELETE_NOTEEXECUTIF):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_NOTEEXECUTIFS):
    case SUCCESS(ACTION_TYPES.FETCH_NOTEEXECUTIF_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTEEXECUTIF):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NOTEEXECUTIF):
    case SUCCESS(ACTION_TYPES.UPDATE_NOTEEXECUTIF):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NOTEEXECUTIF):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/note-executifs';
const apiSearchUrl = 'api/_search/note-executifs';

// Actions

export const getSearchEntities: ICrudSearchAction<INoteExecutif> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_NOTEEXECUTIFS,
  payload: axios.get<INoteExecutif>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<INoteExecutif> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NOTEEXECUTIF_LIST,
  payload: axios.get<INoteExecutif>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<INoteExecutif> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NOTEEXECUTIF,
    payload: axios.get<INoteExecutif>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INoteExecutif> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NOTEEXECUTIF,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INoteExecutif> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NOTEEXECUTIF,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INoteExecutif> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NOTEEXECUTIF,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
