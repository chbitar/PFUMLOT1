import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IModule, defaultValue } from 'app/shared/model/module.model';

export const ACTION_TYPES = {
  SEARCH_MODULES: 'module/SEARCH_MODULES',
  FETCH_MODULE_LIST: 'module/FETCH_MODULE_LIST',
  FETCH_MODULE: 'module/FETCH_MODULE',
  CREATE_MODULE: 'module/CREATE_MODULE',
  UPDATE_MODULE: 'module/UPDATE_MODULE',
  DELETE_MODULE: 'module/DELETE_MODULE',
  RESET: 'module/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IModule>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ModuleState = Readonly<typeof initialState>;

// Reducer

export default (state: ModuleState = initialState, action): ModuleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_MODULES):
    case REQUEST(ACTION_TYPES.FETCH_MODULE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MODULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MODULE):
    case REQUEST(ACTION_TYPES.UPDATE_MODULE):
    case REQUEST(ACTION_TYPES.DELETE_MODULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_MODULES):
    case FAILURE(ACTION_TYPES.FETCH_MODULE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MODULE):
    case FAILURE(ACTION_TYPES.CREATE_MODULE):
    case FAILURE(ACTION_TYPES.UPDATE_MODULE):
    case FAILURE(ACTION_TYPES.DELETE_MODULE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_MODULES):
    case SUCCESS(ACTION_TYPES.FETCH_MODULE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MODULE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MODULE):
    case SUCCESS(ACTION_TYPES.UPDATE_MODULE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MODULE):
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

const apiUrl = 'api/modules';
const apiSearchUrl = 'api/_search/modules';

// Actions

export const getSearchEntities: ICrudSearchAction<IModule> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_MODULES,
  payload: axios.get<IModule>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IModule> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MODULE_LIST,
  payload: axios.get<IModule>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IModule> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MODULE,
    payload: axios.get<IModule>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IModule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MODULE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IModule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MODULE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IModule> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MODULE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
