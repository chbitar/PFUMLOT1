import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEtudiantsLicence, defaultValue } from 'app/shared/model/etudiants-licence.model';

export const ACTION_TYPES = {
  SEARCH_ETUDIANTSLICENCES: 'etudiantsLicence/SEARCH_ETUDIANTSLICENCES',
  FETCH_ETUDIANTSLICENCE_LIST: 'etudiantsLicence/FETCH_ETUDIANTSLICENCE_LIST',
  FETCH_ETUDIANTSLICENCE: 'etudiantsLicence/FETCH_ETUDIANTSLICENCE',
  CREATE_ETUDIANTSLICENCE: 'etudiantsLicence/CREATE_ETUDIANTSLICENCE',
  UPDATE_ETUDIANTSLICENCE: 'etudiantsLicence/UPDATE_ETUDIANTSLICENCE',
  DELETE_ETUDIANTSLICENCE: 'etudiantsLicence/DELETE_ETUDIANTSLICENCE',
  SET_BLOB: 'etudiantsLicence/SET_BLOB',
  RESET: 'etudiantsLicence/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEtudiantsLicence>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EtudiantsLicenceState = Readonly<typeof initialState>;

// Reducer

export default (state: EtudiantsLicenceState = initialState, action): EtudiantsLicenceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ETUDIANTSLICENCES):
    case REQUEST(ACTION_TYPES.FETCH_ETUDIANTSLICENCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ETUDIANTSLICENCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ETUDIANTSLICENCE):
    case REQUEST(ACTION_TYPES.UPDATE_ETUDIANTSLICENCE):
    case REQUEST(ACTION_TYPES.DELETE_ETUDIANTSLICENCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_ETUDIANTSLICENCES):
    case FAILURE(ACTION_TYPES.FETCH_ETUDIANTSLICENCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ETUDIANTSLICENCE):
    case FAILURE(ACTION_TYPES.CREATE_ETUDIANTSLICENCE):
    case FAILURE(ACTION_TYPES.UPDATE_ETUDIANTSLICENCE):
    case FAILURE(ACTION_TYPES.DELETE_ETUDIANTSLICENCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ETUDIANTSLICENCES):
    case SUCCESS(ACTION_TYPES.FETCH_ETUDIANTSLICENCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ETUDIANTSLICENCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ETUDIANTSLICENCE):
    case SUCCESS(ACTION_TYPES.UPDATE_ETUDIANTSLICENCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ETUDIANTSLICENCE):
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

const apiUrl = 'api/etudiants-licences';
const apiSearchUrl = 'api/_search/etudiants-licences';

// Actions

export const getSearchEntities: ICrudSearchAction<IEtudiantsLicence> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_ETUDIANTSLICENCES,
  payload: axios.get<IEtudiantsLicence>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IEtudiantsLicence> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ETUDIANTSLICENCE_LIST,
  payload: axios.get<IEtudiantsLicence>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEtudiantsLicence> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ETUDIANTSLICENCE,
    payload: axios.get<IEtudiantsLicence>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEtudiantsLicence> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ETUDIANTSLICENCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEtudiantsLicence> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ETUDIANTSLICENCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEtudiantsLicence> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ETUDIANTSLICENCE,
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
