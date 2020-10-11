import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEspaceEtudiant, defaultValue } from 'app/shared/model/espace-etudiant.model';

export const ACTION_TYPES = {
  SEARCH_ESPACEETUDIANTS: 'espaceEtudiant/SEARCH_ESPACEETUDIANTS',
  FETCH_ESPACEETUDIANT_LIST: 'espaceEtudiant/FETCH_ESPACEETUDIANT_LIST',
  FETCH_ESPACEETUDIANT: 'espaceEtudiant/FETCH_ESPACEETUDIANT',
  CREATE_ESPACEETUDIANT: 'espaceEtudiant/CREATE_ESPACEETUDIANT',
  UPDATE_ESPACEETUDIANT: 'espaceEtudiant/UPDATE_ESPACEETUDIANT',
  DELETE_ESPACEETUDIANT: 'espaceEtudiant/DELETE_ESPACEETUDIANT',
  SET_BLOB: 'espaceEtudiant/SET_BLOB',
  RESET: 'espaceEtudiant/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEspaceEtudiant>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EspaceEtudiantState = Readonly<typeof initialState>;

// Reducer

export default (state: EspaceEtudiantState = initialState, action): EspaceEtudiantState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ESPACEETUDIANTS):
    case REQUEST(ACTION_TYPES.FETCH_ESPACEETUDIANT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ESPACEETUDIANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ESPACEETUDIANT):
    case REQUEST(ACTION_TYPES.UPDATE_ESPACEETUDIANT):
    case REQUEST(ACTION_TYPES.DELETE_ESPACEETUDIANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_ESPACEETUDIANTS):
    case FAILURE(ACTION_TYPES.FETCH_ESPACEETUDIANT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ESPACEETUDIANT):
    case FAILURE(ACTION_TYPES.CREATE_ESPACEETUDIANT):
    case FAILURE(ACTION_TYPES.UPDATE_ESPACEETUDIANT):
    case FAILURE(ACTION_TYPES.DELETE_ESPACEETUDIANT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ESPACEETUDIANTS):
    case SUCCESS(ACTION_TYPES.FETCH_ESPACEETUDIANT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESPACEETUDIANT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ESPACEETUDIANT):
    case SUCCESS(ACTION_TYPES.UPDATE_ESPACEETUDIANT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ESPACEETUDIANT):
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

const apiUrl = 'api/espace-etudiants';
const apiSearchUrl = 'api/_search/espace-etudiants';

// Actions

export const getSearchEntities: ICrudSearchAction<IEspaceEtudiant> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_ESPACEETUDIANTS,
  payload: axios.get<IEspaceEtudiant>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IEspaceEtudiant> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ESPACEETUDIANT_LIST,
  payload: axios.get<IEspaceEtudiant>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEspaceEtudiant> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ESPACEETUDIANT,
    payload: axios.get<IEspaceEtudiant>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEspaceEtudiant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ESPACEETUDIANT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEspaceEtudiant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ESPACEETUDIANT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEspaceEtudiant> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ESPACEETUDIANT,
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
