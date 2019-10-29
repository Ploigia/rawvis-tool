import axios from 'axios';

import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { ICrudGetAction } from 'react-jhipster';
import { defaultValue, IValinorOptions } from 'app/shared/model/valinor-options.model';
import { IRectangle } from 'app/shared/model/rectangle.model';
import { ValinorOptions } from 'app/entities/valinor-options/valinor-options';
import { IDatapoint } from 'app/shared/model/datapoint.model';

export const ACTION_TYPES = {
  FETCH_VALINOROPTIONS: 'visualization/FETCH_VALINOROPTIONS',
  FETCH_DATAPOINTS: 'visualization/FETCH_DATAPOINTS',
  SET_QUERY: 'visualization/SET_QUERY'
};

const initialState = {
  loading: true,
  loadingDatapoints: false,
  errorMessage: null,
  valinorOptions: defaultValue,
  datapoints: [] as IDatapoint[],
  fetchDataSuccess: false,
  fetchDataFailure: false,
  query: null as IRectangle
};

export type VisualizationState = Readonly<typeof initialState>;

const getFirstQuery = (valinorOptions: IValinorOptions) => {
  const { xMin, xMax, yMin, yMax } = valinorOptions;
  const centerX = (xMax + xMin) / 2;
  const centerY = (yMax + yMin) / 2;
  const width = (xMax - xMin) * 0.1;
  const height = (yMax - yMin) * 0.1;
  return { x: [centerX - width, centerX + width], y: [centerY - height, centerY + height] };
};

// Reducer
export default (state: VisualizationState = initialState, action): VisualizationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VALINOROPTIONS):
      return {
        ...state,
        errorMessage: null,
        loading: true,
        valinorOptions: {}
      };
    case REQUEST(ACTION_TYPES.FETCH_DATAPOINTS):
      return {
        ...state,
        errorMessage: null,
        fetchDataSuccess: false,
        loadingDatapoints: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DATAPOINTS):
    case FAILURE(ACTION_TYPES.FETCH_VALINOROPTIONS):
      return {
        ...state,
        loading: false,
        loadingDatapoints: false,
        fetchDataSuccess: false,
        fetchDataFailure: true
      };
    case ACTION_TYPES.SET_QUERY:
      return {
        ...state,
        query: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VALINOROPTIONS):
      return {
        ...state,
        loading: false,
        loadingDatapoints: false,
        valinorOptions: action.payload.data,
        query: getFirstQuery(action.payload.data)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DATAPOINTS):
      return {
        ...state,
        loading: false,
        fetchDataSuccess: true,
        fetchDataFailure: false,
        datapoints: action.payload.data
      };
    default:
      return state;
  }
};

// Actions
const valinorApiUrl = 'api/valinor';

export const fetchValinorOptions: ICrudGetAction<IValinorOptions> = id => {
  const requestUrl = `api/valinor-options/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VALINOROPTIONS,
    payload: axios.get<IValinorOptions>(requestUrl)
  };
};

export const setQuery = query => ({
  type: ACTION_TYPES.SET_QUERY,
  payload: query
});

export const fetchDatapoints = (id, query) => dispatch => {
  dispatch({
    type: ACTION_TYPES.SET_QUERY,
    payload: query
  });
  dispatch({
    type: ACTION_TYPES.FETCH_DATAPOINTS,
    payload: axios.post(`${valinorApiUrl}/${id}/query`, query)
  });
};
