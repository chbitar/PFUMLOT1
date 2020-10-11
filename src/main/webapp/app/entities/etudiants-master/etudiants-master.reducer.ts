import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEtudiantsMaster, defaultValue } from 'app/shared/model/etudiants-master.model';
import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';

export const ACTION_TYPES = {
  SEARCH_ETUDIANTSMASTERS: 'etudiantsMaster/SEARCH_ETUDIANTSMASTERS',
  FETCH_ETUDIANTSMASTER_LIST: 'etudiantsMaster/FETCH_ETUDIANTSMASTER_LIST',
  FETCH_ETUDIANTSMASTER: 'etudiantsMaster/FETCH_ETUDIANTSMASTER',
  CREATE_ETUDIANTSMASTER: 'etudiantsMaster/CREATE_ETUDIANTSMASTER',
  UPDATE_ETUDIANTSMASTER: 'etudiantsMaster/UPDATE_ETUDIANTSMASTER',
  DELETE_ETUDIANTSMASTER: 'etudiantsMaster/DELETE_ETUDIANTSMASTER',
  SET_BLOB: 'etudiantsMaster/SET_BLOB',
  RESET: 'etudiantsMaster/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEtudiantsMaster>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EtudiantsMasterState = Readonly<typeof initialState>;

// Reducer

export default (state: EtudiantsMasterState = initialState, action): EtudiantsMasterState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ETUDIANTSMASTERS):
    case REQUEST(ACTION_TYPES.FETCH_ETUDIANTSMASTER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ETUDIANTSMASTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ETUDIANTSMASTER):
    case REQUEST(ACTION_TYPES.UPDATE_ETUDIANTSMASTER):
    case REQUEST(ACTION_TYPES.DELETE_ETUDIANTSMASTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_ETUDIANTSMASTERS):
    case FAILURE(ACTION_TYPES.FETCH_ETUDIANTSMASTER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ETUDIANTSMASTER):
    case FAILURE(ACTION_TYPES.CREATE_ETUDIANTSMASTER):
    case FAILURE(ACTION_TYPES.UPDATE_ETUDIANTSMASTER):
    case FAILURE(ACTION_TYPES.DELETE_ETUDIANTSMASTER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ETUDIANTSMASTERS):
    case SUCCESS(ACTION_TYPES.FETCH_ETUDIANTSMASTER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ETUDIANTSMASTER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ETUDIANTSMASTER):
    case SUCCESS(ACTION_TYPES.UPDATE_ETUDIANTSMASTER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ETUDIANTSMASTER):
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

const apiUrl = 'api/etudiants-masters';
const apiSearchUrl = 'api/_search/etudiants-masters';

// Actions

export const getSearchEntities: ICrudSearchAction<IEtudiantsMaster> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_ETUDIANTSMASTERS,
  payload: axios.get<IEtudiantsMaster>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IEtudiantsMaster> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ETUDIANTSMASTER_LIST,
  payload: axios.get<IEtudiantsMaster>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEtudiantsMaster> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ETUDIANTSMASTER,
    payload: axios.get<IEtudiantsMaster>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEtudiantsMaster> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ETUDIANTSMASTER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEtudiantsMaster> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ETUDIANTSMASTER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEtudiantsMaster> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ETUDIANTSMASTER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

//CHT

export const getEntitiesByFiliere: ICrudGetAction<IEtudiantsMaster> = fil => {
  const requestUrl = `${apiUrl}/filiere/${fil}`;
  return {
    type: ACTION_TYPES.FETCH_ETUDIANTSMASTER_LIST,
    payload: axios.get<IEtudiantsMaster>(requestUrl)
  };
};

//CHT

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
