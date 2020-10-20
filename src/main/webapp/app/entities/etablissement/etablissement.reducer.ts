import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEtablissement, defaultValue } from 'app/shared/model/etablissement.model';

export const ACTION_TYPES = {
  SEARCH_ETABLISSEMENTS: 'etablissement/SEARCH_ETABLISSEMENTS',
  FETCH_ETABLISSEMENT_LIST: 'etablissement/FETCH_ETABLISSEMENT_LIST',
  FETCH_ETABLISSEMENT: 'etablissement/FETCH_ETABLISSEMENT',
  CREATE_ETABLISSEMENT: 'etablissement/CREATE_ETABLISSEMENT',
  UPDATE_ETABLISSEMENT: 'etablissement/UPDATE_ETABLISSEMENT',
  DELETE_ETABLISSEMENT: 'etablissement/DELETE_ETABLISSEMENT',
  SET_BLOB: 'etablissement/SET_BLOB',
  RESET: 'etablissement/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEtablissement>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EtablissementState = Readonly<typeof initialState>;

// Reducer

export default (state: EtablissementState = initialState, action): EtablissementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ETABLISSEMENTS):
    case REQUEST(ACTION_TYPES.FETCH_ETABLISSEMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ETABLISSEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ETABLISSEMENT):
    case REQUEST(ACTION_TYPES.UPDATE_ETABLISSEMENT):
    case REQUEST(ACTION_TYPES.DELETE_ETABLISSEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_ETABLISSEMENTS):
    case FAILURE(ACTION_TYPES.FETCH_ETABLISSEMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ETABLISSEMENT):
    case FAILURE(ACTION_TYPES.CREATE_ETABLISSEMENT):
    case FAILURE(ACTION_TYPES.UPDATE_ETABLISSEMENT):
    case FAILURE(ACTION_TYPES.DELETE_ETABLISSEMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ETABLISSEMENTS):
    case SUCCESS(ACTION_TYPES.FETCH_ETABLISSEMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ETABLISSEMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ETABLISSEMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_ETABLISSEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ETABLISSEMENT):
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

const apiUrl = 'api/etablissements';
const apiSearchUrl = 'api/_search/etablissements';

// Actions

export const getSearchEntities: ICrudSearchAction<IEtablissement> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_ETABLISSEMENTS,
  payload: axios.get<IEtablissement>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IEtablissement> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ETABLISSEMENT_LIST,
  payload: axios.get<IEtablissement>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntitie: ICrudGetAllAction<IEtablissement> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ETABLISSEMENT_LIST,
  payload: axios.get<IEtablissement>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEtablissement> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ETABLISSEMENT,
    payload: axios.get<IEtablissement>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEtablissement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ETABLISSEMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEtablissement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ETABLISSEMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEtablissement> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ETABLISSEMENT,
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
