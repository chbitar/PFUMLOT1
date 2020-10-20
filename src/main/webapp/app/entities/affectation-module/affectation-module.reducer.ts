import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAffectationModule, defaultValue } from 'app/shared/model/affectation-module.model';

export const ACTION_TYPES = {
  SEARCH_AFFECTATIONMODULES: 'affectationModule/SEARCH_AFFECTATIONMODULES',
  FETCH_AFFECTATIONMODULE_LIST: 'affectationModule/FETCH_AFFECTATIONMODULE_LIST',
  FETCH_AFFECTATIONMODULE: 'affectationModule/FETCH_AFFECTATIONMODULE',
  CREATE_AFFECTATIONMODULE: 'affectationModule/CREATE_AFFECTATIONMODULE',
  UPDATE_AFFECTATIONMODULE: 'affectationModule/UPDATE_AFFECTATIONMODULE',
  DELETE_AFFECTATIONMODULE: 'affectationModule/DELETE_AFFECTATIONMODULE',
  RESET: 'affectationModule/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAffectationModule>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AffectationModuleState = Readonly<typeof initialState>;

// Reducer

export default (state: AffectationModuleState = initialState, action): AffectationModuleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_AFFECTATIONMODULES):
    case REQUEST(ACTION_TYPES.FETCH_AFFECTATIONMODULE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AFFECTATIONMODULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AFFECTATIONMODULE):
    case REQUEST(ACTION_TYPES.UPDATE_AFFECTATIONMODULE):
    case REQUEST(ACTION_TYPES.DELETE_AFFECTATIONMODULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_AFFECTATIONMODULES):
    case FAILURE(ACTION_TYPES.FETCH_AFFECTATIONMODULE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AFFECTATIONMODULE):
    case FAILURE(ACTION_TYPES.CREATE_AFFECTATIONMODULE):
    case FAILURE(ACTION_TYPES.UPDATE_AFFECTATIONMODULE):
    case FAILURE(ACTION_TYPES.DELETE_AFFECTATIONMODULE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_AFFECTATIONMODULES):
    case SUCCESS(ACTION_TYPES.FETCH_AFFECTATIONMODULE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AFFECTATIONMODULE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AFFECTATIONMODULE):
    case SUCCESS(ACTION_TYPES.UPDATE_AFFECTATIONMODULE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AFFECTATIONMODULE):
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

const apiUrl = 'api/affectation-modules';
const apiSearchUrl = 'api/_search/affectation-modules';

// Actions

export const getSearchEntities: ICrudSearchAction<IAffectationModule> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_AFFECTATIONMODULES,
  payload: axios.get<IAffectationModule>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IAffectationModule> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AFFECTATIONMODULE_LIST,
  payload: axios.get<IAffectationModule>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAffectationModule> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AFFECTATIONMODULE,
    payload: axios.get<IAffectationModule>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAffectationModule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AFFECTATIONMODULE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAffectationModule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AFFECTATIONMODULE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAffectationModule> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AFFECTATIONMODULE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
