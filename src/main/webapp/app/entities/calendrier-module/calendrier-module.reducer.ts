import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICalendrierModule, defaultValue } from 'app/shared/model/calendrier-module.model';

export const ACTION_TYPES = {
  SEARCH_CALENDRIERMODULES: 'calendrierModule/SEARCH_CALENDRIERMODULES',
  FETCH_CALENDRIERMODULE_LIST: 'calendrierModule/FETCH_CALENDRIERMODULE_LIST',
  FETCH_CALENDRIERMODULE: 'calendrierModule/FETCH_CALENDRIERMODULE',
  CREATE_CALENDRIERMODULE: 'calendrierModule/CREATE_CALENDRIERMODULE',
  UPDATE_CALENDRIERMODULE: 'calendrierModule/UPDATE_CALENDRIERMODULE',
  DELETE_CALENDRIERMODULE: 'calendrierModule/DELETE_CALENDRIERMODULE',
  RESET: 'calendrierModule/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICalendrierModule>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CalendrierModuleState = Readonly<typeof initialState>;

// Reducer

export default (state: CalendrierModuleState = initialState, action): CalendrierModuleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CALENDRIERMODULES):
    case REQUEST(ACTION_TYPES.FETCH_CALENDRIERMODULE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CALENDRIERMODULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CALENDRIERMODULE):
    case REQUEST(ACTION_TYPES.UPDATE_CALENDRIERMODULE):
    case REQUEST(ACTION_TYPES.DELETE_CALENDRIERMODULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CALENDRIERMODULES):
    case FAILURE(ACTION_TYPES.FETCH_CALENDRIERMODULE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CALENDRIERMODULE):
    case FAILURE(ACTION_TYPES.CREATE_CALENDRIERMODULE):
    case FAILURE(ACTION_TYPES.UPDATE_CALENDRIERMODULE):
    case FAILURE(ACTION_TYPES.DELETE_CALENDRIERMODULE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CALENDRIERMODULES):
    case SUCCESS(ACTION_TYPES.FETCH_CALENDRIERMODULE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CALENDRIERMODULE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CALENDRIERMODULE):
    case SUCCESS(ACTION_TYPES.UPDATE_CALENDRIERMODULE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CALENDRIERMODULE):
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

const apiUrl = 'api/calendrier-modules';
const apiSearchUrl = 'api/_search/calendrier-modules';

// Actions

export const getSearchEntities: ICrudSearchAction<ICalendrierModule> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_CALENDRIERMODULES,
  payload: axios.get<ICalendrierModule>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<ICalendrierModule> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CALENDRIERMODULE_LIST,
  payload: axios.get<ICalendrierModule>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICalendrierModule> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CALENDRIERMODULE,
    payload: axios.get<ICalendrierModule>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICalendrierModule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CALENDRIERMODULE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICalendrierModule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CALENDRIERMODULE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICalendrierModule> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CALENDRIERMODULE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
