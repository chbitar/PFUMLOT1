import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAnnonce, defaultValue } from 'app/shared/model/annonce.model';

export const ACTION_TYPES = {
  SEARCH_ANNONCES: 'annonce/SEARCH_ANNONCES',
  FETCH_ANNONCE_LIST: 'annonce/FETCH_ANNONCE_LIST',
  FETCH_ANNONCE: 'annonce/FETCH_ANNONCE',
  CREATE_ANNONCE: 'annonce/CREATE_ANNONCE',
  UPDATE_ANNONCE: 'annonce/UPDATE_ANNONCE',
  DELETE_ANNONCE: 'annonce/DELETE_ANNONCE',
  SET_BLOB: 'annonce/SET_BLOB',
  RESET: 'annonce/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAnnonce>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AnnonceState = Readonly<typeof initialState>;

// Reducer

export default (state: AnnonceState = initialState, action): AnnonceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ANNONCES):
    case REQUEST(ACTION_TYPES.FETCH_ANNONCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ANNONCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ANNONCE):
    case REQUEST(ACTION_TYPES.UPDATE_ANNONCE):
    case REQUEST(ACTION_TYPES.DELETE_ANNONCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_ANNONCES):
    case FAILURE(ACTION_TYPES.FETCH_ANNONCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ANNONCE):
    case FAILURE(ACTION_TYPES.CREATE_ANNONCE):
    case FAILURE(ACTION_TYPES.UPDATE_ANNONCE):
    case FAILURE(ACTION_TYPES.DELETE_ANNONCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ANNONCES):
    case SUCCESS(ACTION_TYPES.FETCH_ANNONCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ANNONCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ANNONCE):
    case SUCCESS(ACTION_TYPES.UPDATE_ANNONCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ANNONCE):
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

const apiUrl = 'api/annonces';
const apiSearchUrl = 'api/_search/annonces';

// Actions

export const getSearchEntities: ICrudSearchAction<IAnnonce> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_ANNONCES,
  payload: axios.get<IAnnonce>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IAnnonce> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ANNONCE_LIST,
  payload: axios.get<IAnnonce>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAnnonce> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ANNONCE,
    payload: axios.get<IAnnonce>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAnnonce> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ANNONCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAnnonce> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ANNONCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAnnonce> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ANNONCE,
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
