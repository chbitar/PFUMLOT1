import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAutreDoc, defaultValue } from 'app/shared/model/autre-doc.model';

export const ACTION_TYPES = {
  SEARCH_AUTREDOCS: 'autreDoc/SEARCH_AUTREDOCS',
  FETCH_AUTREDOC_LIST: 'autreDoc/FETCH_AUTREDOC_LIST',
  FETCH_AUTREDOC: 'autreDoc/FETCH_AUTREDOC',
  CREATE_AUTREDOC: 'autreDoc/CREATE_AUTREDOC',
  UPDATE_AUTREDOC: 'autreDoc/UPDATE_AUTREDOC',
  DELETE_AUTREDOC: 'autreDoc/DELETE_AUTREDOC',
  SET_BLOB: 'autreDoc/SET_BLOB',
  RESET: 'autreDoc/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAutreDoc>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AutreDocState = Readonly<typeof initialState>;

// Reducer

export default (state: AutreDocState = initialState, action): AutreDocState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_AUTREDOCS):
    case REQUEST(ACTION_TYPES.FETCH_AUTREDOC_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AUTREDOC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AUTREDOC):
    case REQUEST(ACTION_TYPES.UPDATE_AUTREDOC):
    case REQUEST(ACTION_TYPES.DELETE_AUTREDOC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_AUTREDOCS):
    case FAILURE(ACTION_TYPES.FETCH_AUTREDOC_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AUTREDOC):
    case FAILURE(ACTION_TYPES.CREATE_AUTREDOC):
    case FAILURE(ACTION_TYPES.UPDATE_AUTREDOC):
    case FAILURE(ACTION_TYPES.DELETE_AUTREDOC):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_AUTREDOCS):
    case SUCCESS(ACTION_TYPES.FETCH_AUTREDOC_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AUTREDOC):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AUTREDOC):
    case SUCCESS(ACTION_TYPES.UPDATE_AUTREDOC):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AUTREDOC):
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

const apiUrl = 'api/autre-docs';
const apiSearchUrl = 'api/_search/autre-docs';

// Actions

export const getSearchEntities: ICrudSearchAction<IAutreDoc> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_AUTREDOCS,
  payload: axios.get<IAutreDoc>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IAutreDoc> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AUTREDOC_LIST,
  payload: axios.get<IAutreDoc>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAutreDoc> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AUTREDOC,
    payload: axios.get<IAutreDoc>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAutreDoc> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AUTREDOC,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAutreDoc> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AUTREDOC,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAutreDoc> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AUTREDOC,
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
