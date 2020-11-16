import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, translate } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEtudiantsExecutif, defaultValue } from 'app/shared/model/etudiants-executif.model';
import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';

export const ACTION_TYPES = {
  SEARCH_ETUDIANTSEXECUTIFS: 'etudiantsExecutif/SEARCH_ETUDIANTSEXECUTIFS',
  FETCH_ETUDIANTSEXECUTIF_LIST: 'etudiantsExecutif/FETCH_ETUDIANTSEXECUTIF_LIST',
  FETCH_ETUDIANTSEXECUTIF: 'etudiantsExecutif/FETCH_ETUDIANTSEXECUTIF',
  CREATE_ETUDIANTSEXECUTIF: 'etudiantsExecutif/CREATE_ETUDIANTSEXECUTIF',
  UPDATE_ETUDIANTSEXECUTIF: 'etudiantsExecutif/UPDATE_ETUDIANTSEXECUTIF',
  DELETE_ETUDIANTSEXECUTIF: 'etudiantsExecutif/DELETE_ETUDIANTSEXECUTIF',
  SET_BLOB: 'etudiantsExecutif/SET_BLOB',
  RESET: 'etudiantsExecutif/RESET',
  ENVOYER_EMAIL: 'etudiantsExecutif/ENVOYER_EMAIL'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEtudiantsExecutif>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EtudiantsExecutifState = Readonly<typeof initialState>;

// Reducer

export default (state: EtudiantsExecutifState = initialState, action): EtudiantsExecutifState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ETUDIANTSEXECUTIFS):
    case REQUEST(ACTION_TYPES.FETCH_ETUDIANTSEXECUTIF_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ETUDIANTSEXECUTIF):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ETUDIANTSEXECUTIF):
    case REQUEST(ACTION_TYPES.UPDATE_ETUDIANTSEXECUTIF):
    case REQUEST(ACTION_TYPES.DELETE_ETUDIANTSEXECUTIF):
    case REQUEST(ACTION_TYPES.ENVOYER_EMAIL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_ETUDIANTSEXECUTIFS):
    case FAILURE(ACTION_TYPES.FETCH_ETUDIANTSEXECUTIF_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ETUDIANTSEXECUTIF):
    case FAILURE(ACTION_TYPES.CREATE_ETUDIANTSEXECUTIF):
    case FAILURE(ACTION_TYPES.UPDATE_ETUDIANTSEXECUTIF):
    case FAILURE(ACTION_TYPES.DELETE_ETUDIANTSEXECUTIF):
    case FAILURE(ACTION_TYPES.ENVOYER_EMAIL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ETUDIANTSEXECUTIFS):
    case SUCCESS(ACTION_TYPES.FETCH_ETUDIANTSEXECUTIF_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ETUDIANTSEXECUTIF):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ETUDIANTSEXECUTIF):
    case SUCCESS(ACTION_TYPES.UPDATE_ETUDIANTSEXECUTIF):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ETUDIANTSEXECUTIF):
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
    case SUCCESS(ACTION_TYPES.ENVOYER_EMAIL):
      return {
        ...state,
        updating: false,
        updateSuccess: true
      };
    default:
      return state;
  }
};

const apiUrl = 'api/etudiants-executifs';
const apiSearchUrl = 'api/_search/etudiants-executifs';
const apiExtendedUrl = 'api/extended/etudiants-executifs';

export const getSearchEntities: ICrudSearchAction<IEtudiantsExecutif> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_ETUDIANTSEXECUTIFS,
  payload: axios.get<IEtudiantsExecutif>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IEtudiantsExecutif> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ETUDIANTSEXECUTIF_LIST,
  payload: axios.get<IEtudiantsExecutif>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEtudiantsExecutif> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ETUDIANTSEXECUTIF,
    payload: axios.get<IEtudiantsExecutif>(requestUrl)
  };
};
export const getEntityDetail: ICrudGetAction<IEtudiantsExecutif> = () => {
  const requestUrl = `${apiExtendedUrl}/espace`;
  return {
    type: ACTION_TYPES.FETCH_ETUDIANTSEXECUTIF,
    payload: axios.get<IEtudiantsExecutif>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEtudiantsExecutif> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ETUDIANTSEXECUTIF,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEtudiantsExecutif> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ETUDIANTSEXECUTIF,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEtudiantsExecutif> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ETUDIANTSEXECUTIF,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const createExtendedEntity: ICrudPutAction<IEtudiantsExecutif> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ETUDIANTSEXECUTIF,
    payload: axios.post(apiExtendedUrl, cleanEntity(entity))
  });
  dispatch(getEntitiesByUserId());
  return result;
};
export const getEntitiesByUserId: ICrudGetAllAction<IEtudiantsExecutif> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ETUDIANTSEXECUTIF_LIST,
  payload: axios.get<IEtudiantsExecutif>(`${apiExtendedUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntitiesByFiliere: ICrudGetAction<IEtudiantsExecutif> = fil => {
  const requestUrl = `${apiExtendedUrl}/filiere/${fil}`;
  return {
    type: ACTION_TYPES.FETCH_ETUDIANTSEXECUTIF_LIST,
    payload: axios.get<IEtudiantsExecutif>(requestUrl)
  };
};

export const getEntitiesByEtudiantNameOrPrenom: ICrudGetAction<IEtudiantsExecutif> = mot => {
  const requestUrl = `${apiExtendedUrl}/etudiant/${mot}`;
  return {
    type: ACTION_TYPES.FETCH_ETUDIANTSEXECUTIF_LIST,
    payload: axios.get<IEtudiantsExecutif>(requestUrl)
  };
};

export const getEntitiesByEtudiantNiveau: ICrudGetAction<IEtudiantsExecutif> = niveau => {
  const requestUrl = `${apiExtendedUrl}/niveau/${niveau}`;
  return {
    type: ACTION_TYPES.FETCH_ETUDIANTSEXECUTIF_LIST,
    payload: axios.get<IEtudiantsExecutif>(requestUrl)
  };
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

export const envoyerMail = (sujet, corps) => ({
  type: ACTION_TYPES.ENVOYER_EMAIL,
  payload: axios.post(`api/etudiants/envoyer-email`, { sujet, corps }),
  meta: {
    successMessage: 'Le mail a été envoyé avec succès',
    errorMessage: translate('global.email.error')
  }
});
