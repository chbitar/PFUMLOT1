import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFicheAbsence, defaultValue } from 'app/shared/model/fiche-absence.model';

export const ACTION_TYPES = {
  SEARCH_FICHEABSENCES: 'ficheAbsence/SEARCH_FICHEABSENCES',
  FETCH_FICHEABSENCE_LIST: 'ficheAbsence/FETCH_FICHEABSENCE_LIST',
  FETCH_FICHEABSENCE: 'ficheAbsence/FETCH_FICHEABSENCE',
  CREATE_FICHEABSENCE: 'ficheAbsence/CREATE_FICHEABSENCE',
  UPDATE_FICHEABSENCE: 'ficheAbsence/UPDATE_FICHEABSENCE',
  DELETE_FICHEABSENCE: 'ficheAbsence/DELETE_FICHEABSENCE',
  RESET: 'ficheAbsence/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFicheAbsence>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FicheAbsenceState = Readonly<typeof initialState>;

// Reducer

export default (state: FicheAbsenceState = initialState, action): FicheAbsenceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_FICHEABSENCES):
    case REQUEST(ACTION_TYPES.FETCH_FICHEABSENCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FICHEABSENCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FICHEABSENCE):
    case REQUEST(ACTION_TYPES.UPDATE_FICHEABSENCE):
    case REQUEST(ACTION_TYPES.DELETE_FICHEABSENCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_FICHEABSENCES):
    case FAILURE(ACTION_TYPES.FETCH_FICHEABSENCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FICHEABSENCE):
    case FAILURE(ACTION_TYPES.CREATE_FICHEABSENCE):
    case FAILURE(ACTION_TYPES.UPDATE_FICHEABSENCE):
    case FAILURE(ACTION_TYPES.DELETE_FICHEABSENCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_FICHEABSENCES):
    case SUCCESS(ACTION_TYPES.FETCH_FICHEABSENCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FICHEABSENCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FICHEABSENCE):
    case SUCCESS(ACTION_TYPES.UPDATE_FICHEABSENCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FICHEABSENCE):
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

const apiUrl = 'api/fiche-absences';
const apiSearchUrl = 'api/_search/fiche-absences';

// Actions

export const getSearchEntities: ICrudSearchAction<IFicheAbsence> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_FICHEABSENCES,
  payload: axios.get<IFicheAbsence>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IFicheAbsence> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FICHEABSENCE_LIST,
  payload: axios.get<IFicheAbsence>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntitiesByModule: ICrudGetAction<IFicheAbsence> = module => {
  const requestUrl = `${apiUrl}/module/${module}`;
  return {
    type: ACTION_TYPES.FETCH_FICHEABSENCE_LIST,
    payload: axios.get<IFicheAbsence>(requestUrl)
  };
};

export const getEntitiesByProgramme: ICrudGetAction<IFicheAbsence> = programme => {
  const requestUrl = `${apiUrl}/programme/${programme}`;
  return {
    type: ACTION_TYPES.FETCH_FICHEABSENCE_LIST,
    payload: axios.get<IFicheAbsence>(requestUrl)
  };
};

export const getEntity: ICrudGetAction<IFicheAbsence> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FICHEABSENCE,
    payload: axios.get<IFicheAbsence>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFicheAbsence> = entity => async dispatch => {
  console.log(entity.dateSeance);
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FICHEABSENCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFicheAbsence> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FICHEABSENCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFicheAbsence> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FICHEABSENCE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
