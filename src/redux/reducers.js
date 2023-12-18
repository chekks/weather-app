import { FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE } from './actions';

const initialState = {
  weather: {},
  error: null,
};

const weatherReducer = (state = initialState, action) => {
  console.log(state)
  switch (action.type) {
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        weather: action.payload,
        error: null,
      };

    case FETCH_WEATHER_FAILURE:
      
      return {
        ...state,
        weather: {},
        error: action.payload,
      };

    default:
      return state;
  }
};

export default weatherReducer;
