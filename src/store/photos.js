import createAsyncSlice from "./helper/createAsyncSlice";

const slice = createAsyncSlice({
  name: "photos",
  initialState: {
    data: [],
  },
  reducers: {
    fetchSuccess(state, action) {
      state.loading = false;
      state.data.push(...action.payload);
      state.error = null;
    },
  },
  fetchConfig: (page) => ({
    url: `https://dogsapi.origamid.dev/json/api/photo/?_page=${page}&_total=3&_user=0`,
    options: {
      method: "GET",
      cache: "no-store",
    },
  }),
});

export const fetchPhotos = (page) => (dispatch) => {
  return dispatch(slice.asyncAction(page));
};

export default slice.reducer;
