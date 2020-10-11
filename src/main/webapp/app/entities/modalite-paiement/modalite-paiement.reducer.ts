import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IModalitePaiement, defaultValue } from 'app/shared/model/modalite-paiement.model';

export const ACTION_TYPES = {
  SEARCH_MODALITEPAIEMENTS: 'modalitePaiement/SEARCH_MODALITEPAIEMENTS',
  FETCH_MODALITEPAIEMENT_LIST: 'modalitePaiement/FETCH_MODALITEPAIEMENT_LIST',
  FETCH_MODALITEPAIEMENT: 'modalitePaiement/FETCH_MODALITEPAIEMENT',
  CREATE_MODALITEPAIEMENT: 'modalitePaiement/CREATE_MODALITEPAIEMENT',
  UPDATE_MODALITEPAIEMENT: 'modalitePaiement/UPDATE_MODALITEPAIEMENT',
  DELETE_MODALITEPAIEMENT: 'modalitePaiement/DELETE_MODALITEPAIEMENT',
  RESET: 'modalitePaiement/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IModalitePaiement>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ModalitePaiementState = Readonly<typeof initialState>;

// Reducer

export default (state: ModalitePaiementState = initialState, action): ModalitePaiementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_MODALITEPAIEMENTS):
    case REQUEST(ACTION_TYPES.FETCH_MODALITEPAIEMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MODALITEPAIEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MODALITEPAIEMENT):
    case REQUEST(ACTION_TYPES.UPDATE_MODALITEPAIEMENT):
    case REQUEST(ACTION_TYPES.DELETE_MODALITEPAIEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_MODALITEPAIEMENTS):
    case FAILURE(ACTION_TYPES.FETCH_MODALITEPAIEMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MODALITEPAIEMENT):
    case FAILURE(ACTION_TYPES.CREATE_MODALITEPAIEMENT):
    case FAILURE(ACTION_TYPES.UPDATE_MODALITEPAIEMENT):
    case FAILURE(ACTION_TYPES.DELETE_MODALITEPAIEMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_MODALITEPAIEMENTS):
    case SUCCESS(ACTION_TYPES.FETCH_MODALITEPAIEMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MODALITEPAIEMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MODALITEPAIEMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_MODALITEPAIEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MODALITEPAIEMENT):
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

const apiUrl = 'api/modalite-paiements';
const apiSearchUrl = 'api/_search/modalite-paiements';

// Actions

export const getSearchEntities: ICrudSearchAction<IModalitePaiement> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_MODALITEPAIEMENTS,
  payload: axios.get<IModalitePaiement>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IModalitePaiement> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MODALITEPAIEMENT_LIST,
  payload: axios.get<IModalitePaiement>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IModalitePaiement> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MODALITEPAIEMENT,
    payload: axios.get<IModalitePaiement>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IModalitePaiement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MODALITEPAIEMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IModalitePaiement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MODALITEPAIEMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IModalitePaiement> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MODALITEPAIEMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
