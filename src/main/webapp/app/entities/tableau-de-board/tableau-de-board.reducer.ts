import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITableauDeBoard, defaultValue } from 'app/shared/model/tableau-de-board.model';

export const ACTION_TYPES = {
  SEARCH_TABLEAUDEBOARDS: 'tableauDeBoard/SEARCH_TABLEAUDEBOARDS',
  FETCH_TABLEAUDEBOARD_LIST: 'tableauDeBoard/FETCH_TABLEAUDEBOARD_LIST',
  FETCH_TABLEAUDEBOARD: 'tableauDeBoard/FETCH_TABLEAUDEBOARD',
  CREATE_TABLEAUDEBOARD: 'tableauDeBoard/CREATE_TABLEAUDEBOARD',
  UPDATE_TABLEAUDEBOARD: 'tableauDeBoard/UPDATE_TABLEAUDEBOARD',
  DELETE_TABLEAUDEBOARD: 'tableauDeBoard/DELETE_TABLEAUDEBOARD',
  RESET: 'tableauDeBoard/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITableauDeBoard>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TableauDeBoardState = Readonly<typeof initialState>;

// Reducer

export default (state: TableauDeBoardState = initialState, action): TableauDeBoardState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_TABLEAUDEBOARDS):
    case REQUEST(ACTION_TYPES.FETCH_TABLEAUDEBOARD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TABLEAUDEBOARD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TABLEAUDEBOARD):
    case REQUEST(ACTION_TYPES.UPDATE_TABLEAUDEBOARD):
    case REQUEST(ACTION_TYPES.DELETE_TABLEAUDEBOARD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_TABLEAUDEBOARDS):
    case FAILURE(ACTION_TYPES.FETCH_TABLEAUDEBOARD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TABLEAUDEBOARD):
    case FAILURE(ACTION_TYPES.CREATE_TABLEAUDEBOARD):
    case FAILURE(ACTION_TYPES.UPDATE_TABLEAUDEBOARD):
    case FAILURE(ACTION_TYPES.DELETE_TABLEAUDEBOARD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_TABLEAUDEBOARDS):
    case SUCCESS(ACTION_TYPES.FETCH_TABLEAUDEBOARD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TABLEAUDEBOARD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TABLEAUDEBOARD):
    case SUCCESS(ACTION_TYPES.UPDATE_TABLEAUDEBOARD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TABLEAUDEBOARD):
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

const apiUrl = 'api/tableau-de-boards';
const apiSearchUrl = 'api/_search/tableau-de-boards';

// Actions

export const getSearchEntities: ICrudSearchAction<ITableauDeBoard> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_TABLEAUDEBOARDS,
  payload: axios.get<ITableauDeBoard>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<ITableauDeBoard> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TABLEAUDEBOARD_LIST,
  payload: axios.get<ITableauDeBoard>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITableauDeBoard> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TABLEAUDEBOARD,
    payload: axios.get<ITableauDeBoard>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITableauDeBoard> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TABLEAUDEBOARD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITableauDeBoard> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TABLEAUDEBOARD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITableauDeBoard> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TABLEAUDEBOARD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
