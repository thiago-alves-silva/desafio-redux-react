import { combineReducers } from "@reduxjs/toolkit";
import createAsyncSlice from "./helper/createAsyncSlice";
import getLocalStorage from "./helper/getLocalStorage";

const token = createAsyncSlice({
  name: "token",
  initialState: {
    data: getLocalStorage("token"),
  },
  reducers: {
    fetchSuccess: {
      reducer: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      prepare: (payload) => ({
        payload,
        meta: { localStorage: { key: "token", value: payload.token } },
      }),
    },
  },
  fetchConfig: (user) => ({
    url: "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  }),
});

const user = createAsyncSlice({
  name: "user",
  fetchConfig: (token) => ({
    url: "https://dogsapi.origamid.dev/json/api/user",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  }),
});

export const login = (userData) => async (dispatch, getState) => {
  const { payload } = await dispatch(token.asyncAction(userData));
  const { login } = getState();
  if (login.token.data) {
    dispatch(user.asyncAction(payload.token));
  }
};

export const autoLogin = () => async (dispatch, getState) => {
  const tokenData = token.getInitialState().data;
  const { login } = getState();
  if (tokenData && !login.user.data) {
    await dispatch(user.asyncAction(tokenData));
    const { login } = getState();
    if (login.user.error) {
      dispatch(logout());
    }
  }
};

export const logout = () => (dispatch) => {
  window.localStorage.removeItem("token");
  dispatch(user.reset());
  dispatch(token.reset());
};

const reducer = combineReducers({ token: token.reducer, user: user.reducer });

export default reducer;
