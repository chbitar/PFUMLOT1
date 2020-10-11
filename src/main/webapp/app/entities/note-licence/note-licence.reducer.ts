import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INoteLicence, defaultValue } from 'app/shared/model/note-licence.model';

export const ACTION_TYPES = {
  SEARCH_NOTELICENCES: 'noteLicence/SEARCH_NOTELICENCES',
  FETCH_NOTELICENCE_LIST: 'noteLicence/FETCH_NOTELICENCE_LIST',
  FETCH_NOTELICENCE: 'noteLicence/FETCH_NOTELICENCE',
  CREATE_NOTELICENCE: 'noteLicence/CREATE_NOTELICENCE',
  UPDATE_NOTELICENCE: 'noteLicence/UPDATE_NOTELICENCE',
  DELETE_NOTELICENCE: 'noteLicence/DELETE_NOTELICENCE',
  RESET: 'noteLicence/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INoteLicence>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type NoteLicenceState = Readonly<typeof initialState>;

// Reducer

export default (state: NoteLicenceState = initialState, action): NoteLicenceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_NOTELICENCES):
    case REQUEST(ACTION_TYPES.FETCH_NOTELICENCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NOTELICENCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NOTELICENCE):
    case REQUEST(ACTION_TYPES.UPDATE_NOTELICENCE):
    case REQUEST(ACTION_TYPES.DELETE_NOTELICENCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_NOTELICENCES):
    case FAILURE(ACTION_TYPES.FETCH_NOTELICENCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NOTELICENCE):
    case FAILURE(ACTION_TYPES.CREATE_NOTELICENCE):
    case FAILURE(ACTION_TYPES.UPDATE_NOTELICENCE):
    case FAILURE(ACTION_TYPES.DELETE_NOTELICENCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_NOTELICENCES):
    case SUCCESS(ACTION_TYPES.FETCH_NOTELICENCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTELICENCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NOTELICENCE):
    case SUCCESS(ACTION_TYPES.UPDATE_NOTELICENCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NOTELICENCE):
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

const apiUrl = 'api/note-licences';
const apiSearchUrl = 'api/_search/note-licences';

// Actions

export const getSearchEntities: ICrudSearchAction<INoteLicence> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_NOTELICENCES,
  payload: axios.get<INoteLicence>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<INoteLicence> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NOTELICENCE_LIST,
  payload: axios.get<INoteLicence>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<INoteLicence> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NOTELICENCE,
    payload: axios.get<INoteLicence>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INoteLicence> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NOTELICENCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INoteLicence> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NOTELICENCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INoteLicence> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NOTELICENCE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
