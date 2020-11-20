import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPays, defaultValue } from 'app/shared/model/pays.model';

export const ACTION_TYPES = {
  FETCH_PAYS_LIST: 'pays/FETCH_PAYS_LIST'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPays>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PaysState = Readonly<typeof initialState>;

export default (state: PaysState = initialState, action): PaysState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAYS_LIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };

    case FAILURE(ACTION_TYPES.FETCH_PAYS_LIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    default:
      return state;
  }
};

const apiUrl = 'api/pays';

// Actions

export const getEntities: ICrudGetAllAction<IPays> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PAYS_LIST,
  payload: axios.get<IPays>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});
