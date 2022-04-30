import { createSlice } from "@reduxjs/toolkit";

/**
 *
 * @param {Object} config
 * @param {String} config.name
 * @param {Object} config.initialState
 * @param {Function} config.reducers
 * @param {Function} config.fetchConfig
 * @returns Retorna um objeto contendo os métodos do createSlice junto com a função assíncrona
 */
const createAsyncSlice = (config) => {
  const slice = createSlice({
    name: config.name,
    initialState: {
      loading: false,
      data: null,
      error: null,
      ...config.initialState,
    },
    reducers: {
      fetchStart(state) {
        state.loading = true;
        state.error = null;
      },
      fetchSuccess(state, action) {
        state.loading = false;
        state.data = action.payload;
      },
      fetchError(state, action) {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      },
      reset(state) {
        state.data = null;
      },
      ...config.reducers,
    },
  });

  const { fetchStart, fetchSuccess, fetchError, reset } = slice.actions;
  const asyncAction = (payload) => async (dispatch) => {
    try {
      dispatch(fetchStart());
      const { url, options } = config.fetchConfig(payload);
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        return dispatch(fetchSuccess(json));
      } else throw new Error(json.message);
    } catch (error) {
      return dispatch(fetchError(error.message));
    }
  };

  return { ...slice, asyncAction, reset };
};

export default createAsyncSlice;
