import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfesseur, defaultValue } from 'app/shared/model/professeur.model';

export const ACTION_TYPES = {
  SEARCH_PROFESSEURS: 'professeur/SEARCH_PROFESSEURS',
  FETCH_PROFESSEUR_LIST: 'professeur/FETCH_PROFESSEUR_LIST',
  FETCH_PROFESSEUR: 'professeur/FETCH_PROFESSEUR',
  CREATE_PROFESSEUR: 'professeur/CREATE_PROFESSEUR',
  UPDATE_PROFESSEUR: 'professeur/UPDATE_PROFESSEUR',
  DELETE_PROFESSEUR: 'professeur/DELETE_PROFESSEUR',
  RESET: 'professeur/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfesseur>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ProfesseurState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfesseurState = initialState, action): ProfesseurState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PROFESSEURS):
    case REQUEST(ACTION_TYPES.FETCH_PROFESSEUR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFESSEUR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFESSEUR):
    case REQUEST(ACTION_TYPES.UPDATE_PROFESSEUR):
    case REQUEST(ACTION_TYPES.DELETE_PROFESSEUR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_PROFESSEURS):
    case FAILURE(ACTION_TYPES.FETCH_PROFESSEUR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFESSEUR):
    case FAILURE(ACTION_TYPES.CREATE_PROFESSEUR):
    case FAILURE(ACTION_TYPES.UPDATE_PROFESSEUR):
    case FAILURE(ACTION_TYPES.DELETE_PROFESSEUR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PROFESSEURS):
    case SUCCESS(ACTION_TYPES.FETCH_PROFESSEUR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFESSEUR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFESSEUR):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFESSEUR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFESSEUR):
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

const apiUrl = 'api/professeurs';
const apiSearchUrl = 'api/_search/professeurs';

// Actions

export const getSearchEntities: ICrudSearchAction<IProfesseur> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_PROFESSEURS,
  payload: axios.get<IProfesseur>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IProfesseur> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROFESSEUR_LIST,
  payload: axios.get<IProfesseur>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IProfesseur> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFESSEUR,
    payload: axios.get<IProfesseur>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProfesseur> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFESSEUR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfesseur> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFESSEUR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfesseur> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFESSEUR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
