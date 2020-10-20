import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISuiviModule, defaultValue } from 'app/shared/model/suivi-module.model';

export const ACTION_TYPES = {
  SEARCH_SUIVIMODULES: 'suiviModule/SEARCH_SUIVIMODULES',
  FETCH_SUIVIMODULE_LIST: 'suiviModule/FETCH_SUIVIMODULE_LIST',
  FETCH_SUIVIMODULE: 'suiviModule/FETCH_SUIVIMODULE',
  CREATE_SUIVIMODULE: 'suiviModule/CREATE_SUIVIMODULE',
  UPDATE_SUIVIMODULE: 'suiviModule/UPDATE_SUIVIMODULE',
  DELETE_SUIVIMODULE: 'suiviModule/DELETE_SUIVIMODULE',
  SET_BLOB: 'suiviModule/SET_BLOB',
  RESET: 'suiviModule/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISuiviModule>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SuiviModuleState = Readonly<typeof initialState>;

// Reducer

export default (state: SuiviModuleState = initialState, action): SuiviModuleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_SUIVIMODULES):
    case REQUEST(ACTION_TYPES.FETCH_SUIVIMODULE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SUIVIMODULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SUIVIMODULE):
    case REQUEST(ACTION_TYPES.UPDATE_SUIVIMODULE):
    case REQUEST(ACTION_TYPES.DELETE_SUIVIMODULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_SUIVIMODULES):
    case FAILURE(ACTION_TYPES.FETCH_SUIVIMODULE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SUIVIMODULE):
    case FAILURE(ACTION_TYPES.CREATE_SUIVIMODULE):
    case FAILURE(ACTION_TYPES.UPDATE_SUIVIMODULE):
    case FAILURE(ACTION_TYPES.DELETE_SUIVIMODULE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_SUIVIMODULES):
    case SUCCESS(ACTION_TYPES.FETCH_SUIVIMODULE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUIVIMODULE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SUIVIMODULE):
    case SUCCESS(ACTION_TYPES.UPDATE_SUIVIMODULE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SUIVIMODULE):
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

const apiUrl = 'api/suivi-modules';
const apiSearchUrl = 'api/_search/suivi-modules';

// Actions

export const getSearchEntities: ICrudSearchAction<ISuiviModule> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_SUIVIMODULES,
  payload: axios.get<ISuiviModule>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<ISuiviModule> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SUIVIMODULE_LIST,
  payload: axios.get<ISuiviModule>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISuiviModule> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SUIVIMODULE,
    payload: axios.get<ISuiviModule>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISuiviModule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SUIVIMODULE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISuiviModule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SUIVIMODULE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISuiviModule> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SUIVIMODULE,
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
