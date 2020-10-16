import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmploieDuTemps, defaultValue } from 'app/shared/model/emploie-du-temps.model';

export const ACTION_TYPES = {
  SEARCH_EMPLOIEDUTEMPS: 'emploieDuTemps/SEARCH_EMPLOIEDUTEMPS',
  FETCH_EMPLOIEDUTEMPS_LIST: 'emploieDuTemps/FETCH_EMPLOIEDUTEMPS_LIST',
  FETCH_EMPLOIEDUTEMPS: 'emploieDuTemps/FETCH_EMPLOIEDUTEMPS',
  CREATE_EMPLOIEDUTEMPS: 'emploieDuTemps/CREATE_EMPLOIEDUTEMPS',
  UPDATE_EMPLOIEDUTEMPS: 'emploieDuTemps/UPDATE_EMPLOIEDUTEMPS',
  DELETE_EMPLOIEDUTEMPS: 'emploieDuTemps/DELETE_EMPLOIEDUTEMPS',
  SET_BLOB: 'emploieDuTemps/SET_BLOB',
  RESET: 'emploieDuTemps/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmploieDuTemps>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EmploieDuTempsState = Readonly<typeof initialState>;

// Reducer

export default (state: EmploieDuTempsState = initialState, action): EmploieDuTempsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_EMPLOIEDUTEMPS):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOIEDUTEMPS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOIEDUTEMPS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOIEDUTEMPS):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOIEDUTEMPS):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOIEDUTEMPS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_EMPLOIEDUTEMPS):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOIEDUTEMPS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOIEDUTEMPS):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOIEDUTEMPS):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOIEDUTEMPS):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOIEDUTEMPS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_EMPLOIEDUTEMPS):
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOIEDUTEMPS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOIEDUTEMPS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOIEDUTEMPS):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOIEDUTEMPS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOIEDUTEMPS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/emploie-du-temps';
const apiSearchUrl = 'api/_search/emploie-du-temps';

// Actions

export const getSearchEntities: ICrudSearchAction<IEmploieDuTemps> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_EMPLOIEDUTEMPS,
  payload: axios.get<IEmploieDuTemps>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IEmploieDuTemps> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOIEDUTEMPS_LIST,
  payload: axios.get<IEmploieDuTemps>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEmploieDuTemps> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOIEDUTEMPS,
    payload: axios.get<IEmploieDuTemps>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEmploieDuTemps> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOIEDUTEMPS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmploieDuTemps> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOIEDUTEMPS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmploieDuTemps> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOIEDUTEMPS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
