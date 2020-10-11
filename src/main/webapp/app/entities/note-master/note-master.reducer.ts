import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INoteMaster, defaultValue } from 'app/shared/model/note-master.model';

export const ACTION_TYPES = {
  SEARCH_NOTEMASTERS: 'noteMaster/SEARCH_NOTEMASTERS',
  FETCH_NOTEMASTER_LIST: 'noteMaster/FETCH_NOTEMASTER_LIST',
  FETCH_NOTEMASTER: 'noteMaster/FETCH_NOTEMASTER',
  CREATE_NOTEMASTER: 'noteMaster/CREATE_NOTEMASTER',
  UPDATE_NOTEMASTER: 'noteMaster/UPDATE_NOTEMASTER',
  DELETE_NOTEMASTER: 'noteMaster/DELETE_NOTEMASTER',
  RESET: 'noteMaster/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INoteMaster>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type NoteMasterState = Readonly<typeof initialState>;

// Reducer

export default (state: NoteMasterState = initialState, action): NoteMasterState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_NOTEMASTERS):
    case REQUEST(ACTION_TYPES.FETCH_NOTEMASTER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NOTEMASTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NOTEMASTER):
    case REQUEST(ACTION_TYPES.UPDATE_NOTEMASTER):
    case REQUEST(ACTION_TYPES.DELETE_NOTEMASTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_NOTEMASTERS):
    case FAILURE(ACTION_TYPES.FETCH_NOTEMASTER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NOTEMASTER):
    case FAILURE(ACTION_TYPES.CREATE_NOTEMASTER):
    case FAILURE(ACTION_TYPES.UPDATE_NOTEMASTER):
    case FAILURE(ACTION_TYPES.DELETE_NOTEMASTER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_NOTEMASTERS):
    case SUCCESS(ACTION_TYPES.FETCH_NOTEMASTER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTEMASTER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NOTEMASTER):
    case SUCCESS(ACTION_TYPES.UPDATE_NOTEMASTER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NOTEMASTER):
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

const apiUrl = 'api/note-masters';
const apiSearchUrl = 'api/_search/note-masters';

// Actions

export const getSearchEntities: ICrudSearchAction<INoteMaster> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_NOTEMASTERS,
  payload: axios.get<INoteMaster>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<INoteMaster> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NOTEMASTER_LIST,
  payload: axios.get<INoteMaster>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<INoteMaster> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NOTEMASTER,
    payload: axios.get<INoteMaster>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INoteMaster> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NOTEMASTER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INoteMaster> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NOTEMASTER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INoteMaster> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NOTEMASTER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
