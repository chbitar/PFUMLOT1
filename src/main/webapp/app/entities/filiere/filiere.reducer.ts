import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFiliere, defaultValue } from 'app/shared/model/filiere.model';

export const ACTION_TYPES = {
  SEARCH_FILIERES: 'filiere/SEARCH_FILIERES',
  FETCH_FILIERE_LIST: 'filiere/FETCH_FILIERE_LIST',
  FETCH_FILIERE: 'filiere/FETCH_FILIERE',
  CREATE_FILIERE: 'filiere/CREATE_FILIERE',
  UPDATE_FILIERE: 'filiere/UPDATE_FILIERE',
  DELETE_FILIERE: 'filiere/DELETE_FILIERE',
  RESET: 'filiere/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFiliere>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FiliereState = Readonly<typeof initialState>;

// Reducer

export default (state: FiliereState = initialState, action): FiliereState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_FILIERES):
    case REQUEST(ACTION_TYPES.FETCH_FILIERE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FILIERE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FILIERE):
    case REQUEST(ACTION_TYPES.UPDATE_FILIERE):
    case REQUEST(ACTION_TYPES.DELETE_FILIERE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_FILIERES):
    case FAILURE(ACTION_TYPES.FETCH_FILIERE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FILIERE):
    case FAILURE(ACTION_TYPES.CREATE_FILIERE):
    case FAILURE(ACTION_TYPES.UPDATE_FILIERE):
    case FAILURE(ACTION_TYPES.DELETE_FILIERE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_FILIERES):
    case SUCCESS(ACTION_TYPES.FETCH_FILIERE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILIERE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FILIERE):
    case SUCCESS(ACTION_TYPES.UPDATE_FILIERE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FILIERE):
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

const apiUrl = 'api/filieres';
const apiSearchUrl = 'api/_search/filieres';

// Actions

export const getSearchEntities: ICrudSearchAction<IFiliere> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_FILIERES,
  payload: axios.get<IFiliere>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IFiliere> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FILIERE_LIST,
  payload: axios.get<IFiliere>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFiliere> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FILIERE,
    payload: axios.get<IFiliere>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFiliere> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FILIERE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFiliere> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FILIERE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFiliere> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FILIERE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
