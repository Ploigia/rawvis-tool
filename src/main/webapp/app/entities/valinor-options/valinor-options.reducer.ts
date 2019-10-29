import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IValinorOptions, defaultValue } from 'app/shared/model/valinor-options.model';

export const ACTION_TYPES = {
  FETCH_VALINOROPTIONS_LIST: 'valinorOptions/FETCH_VALINOROPTIONS_LIST',
  FETCH_VALINOROPTIONS: 'valinorOptions/FETCH_VALINOROPTIONS',
  CREATE_VALINOROPTIONS: 'valinorOptions/CREATE_VALINOROPTIONS',
  UPDATE_VALINOROPTIONS: 'valinorOptions/UPDATE_VALINOROPTIONS',
  DELETE_VALINOROPTIONS: 'valinorOptions/DELETE_VALINOROPTIONS',
  RESET: 'valinorOptions/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IValinorOptions>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ValinorOptionsState = Readonly<typeof initialState>;

// Reducer

export default (state: ValinorOptionsState = initialState, action): ValinorOptionsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VALINOROPTIONS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VALINOROPTIONS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VALINOROPTIONS):
    case REQUEST(ACTION_TYPES.UPDATE_VALINOROPTIONS):
    case REQUEST(ACTION_TYPES.DELETE_VALINOROPTIONS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VALINOROPTIONS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VALINOROPTIONS):
    case FAILURE(ACTION_TYPES.CREATE_VALINOROPTIONS):
    case FAILURE(ACTION_TYPES.UPDATE_VALINOROPTIONS):
    case FAILURE(ACTION_TYPES.DELETE_VALINOROPTIONS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VALINOROPTIONS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VALINOROPTIONS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VALINOROPTIONS):
    case SUCCESS(ACTION_TYPES.UPDATE_VALINOROPTIONS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VALINOROPTIONS):
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

const apiUrl = 'api/valinor-options';

// Actions

export const getEntities: ICrudGetAllAction<IValinorOptions> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VALINOROPTIONS_LIST,
  payload: axios.get<IValinorOptions>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IValinorOptions> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VALINOROPTIONS,
    payload: axios.get<IValinorOptions>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IValinorOptions> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VALINOROPTIONS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IValinorOptions> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VALINOROPTIONS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IValinorOptions> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VALINOROPTIONS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
