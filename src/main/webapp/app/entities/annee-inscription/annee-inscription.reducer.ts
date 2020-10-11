import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAnneeInscription, defaultValue } from 'app/shared/model/annee-inscription.model';

export const ACTION_TYPES = {
  SEARCH_ANNEEINSCRIPTIONS: 'anneeInscription/SEARCH_ANNEEINSCRIPTIONS',
  FETCH_ANNEEINSCRIPTION_LIST: 'anneeInscription/FETCH_ANNEEINSCRIPTION_LIST',
  FETCH_ANNEEINSCRIPTION: 'anneeInscription/FETCH_ANNEEINSCRIPTION',
  CREATE_ANNEEINSCRIPTION: 'anneeInscription/CREATE_ANNEEINSCRIPTION',
  UPDATE_ANNEEINSCRIPTION: 'anneeInscription/UPDATE_ANNEEINSCRIPTION',
  DELETE_ANNEEINSCRIPTION: 'anneeInscription/DELETE_ANNEEINSCRIPTION',
  RESET: 'anneeInscription/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAnneeInscription>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AnneeInscriptionState = Readonly<typeof initialState>;

// Reducer

export default (state: AnneeInscriptionState = initialState, action): AnneeInscriptionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ANNEEINSCRIPTIONS):
    case REQUEST(ACTION_TYPES.FETCH_ANNEEINSCRIPTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ANNEEINSCRIPTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ANNEEINSCRIPTION):
    case REQUEST(ACTION_TYPES.UPDATE_ANNEEINSCRIPTION):
    case REQUEST(ACTION_TYPES.DELETE_ANNEEINSCRIPTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_ANNEEINSCRIPTIONS):
    case FAILURE(ACTION_TYPES.FETCH_ANNEEINSCRIPTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ANNEEINSCRIPTION):
    case FAILURE(ACTION_TYPES.CREATE_ANNEEINSCRIPTION):
    case FAILURE(ACTION_TYPES.UPDATE_ANNEEINSCRIPTION):
    case FAILURE(ACTION_TYPES.DELETE_ANNEEINSCRIPTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ANNEEINSCRIPTIONS):
    case SUCCESS(ACTION_TYPES.FETCH_ANNEEINSCRIPTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ANNEEINSCRIPTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ANNEEINSCRIPTION):
    case SUCCESS(ACTION_TYPES.UPDATE_ANNEEINSCRIPTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ANNEEINSCRIPTION):
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

const apiUrl = 'api/annee-inscriptions';
const apiSearchUrl = 'api/_search/annee-inscriptions';

// Actions

export const getSearchEntities: ICrudSearchAction<IAnneeInscription> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_ANNEEINSCRIPTIONS,
  payload: axios.get<IAnneeInscription>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IAnneeInscription> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ANNEEINSCRIPTION_LIST,
  payload: axios.get<IAnneeInscription>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAnneeInscription> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ANNEEINSCRIPTION,
    payload: axios.get<IAnneeInscription>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAnneeInscription> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ANNEEINSCRIPTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAnneeInscription> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ANNEEINSCRIPTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAnneeInscription> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ANNEEINSCRIPTION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
