import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IContent, defaultValue } from 'app/shared/model/content.model';

export const ACTION_TYPES = {
  SEARCH_CONTENTS: 'content/SEARCH_CONTENTS',
  FETCH_CONTENT_LIST: 'content/FETCH_CONTENT_LIST',
  FETCH_CONTENT: 'content/FETCH_CONTENT',
  CREATE_CONTENT: 'content/CREATE_CONTENT',
  UPDATE_CONTENT: 'content/UPDATE_CONTENT',
  DELETE_CONTENT: 'content/DELETE_CONTENT',
  SET_BLOB: 'content/SET_BLOB',
  RESET: 'content/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IContent>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ContentState = Readonly<typeof initialState>;

// Reducer

export default (state: ContentState = initialState, action): ContentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CONTENTS):
    case REQUEST(ACTION_TYPES.FETCH_CONTENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONTENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONTENT):
    case REQUEST(ACTION_TYPES.UPDATE_CONTENT):
    case REQUEST(ACTION_TYPES.DELETE_CONTENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CONTENTS):
    case FAILURE(ACTION_TYPES.FETCH_CONTENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONTENT):
    case FAILURE(ACTION_TYPES.CREATE_CONTENT):
    case FAILURE(ACTION_TYPES.UPDATE_CONTENT):
    case FAILURE(ACTION_TYPES.DELETE_CONTENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CONTENTS):
    case SUCCESS(ACTION_TYPES.FETCH_CONTENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONTENT):
    case SUCCESS(ACTION_TYPES.UPDATE_CONTENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONTENT):
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

const apiUrl = 'api/contents';
const apiSearchUrl = 'api/_search/contents';

// Actions

export const getSearchEntities: ICrudSearchAction<IContent> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_CONTENTS,
  payload: axios.get<IContent>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IContent> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONTENT_LIST,
  payload: axios.get<IContent>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IContent> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONTENT,
    payload: axios.get<IContent>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IContent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONTENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IContent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONTENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IContent> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONTENT,
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
