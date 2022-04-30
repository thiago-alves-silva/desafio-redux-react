import createAsyncSlice from "./helper/createAsyncSlice";

const slice = createAsyncSlice({
  name: "photos",
  initialState: {
    data: [],
    page: 0,
    hasContent: true,
  },
  reducers: {
    fetchSuccess(state, { payload }) {
      state.loading = false;
      if (payload.length) {
        // verifica se o payload é uma repetição do anterior
        // causado pelo React.StrictMode
        const repeat = payload.every((item) =>
          state.data.find(({ id }) => item.id === id)
        );
        if (!repeat) {
          state.data.push(...payload);
          state.page++;
        }
      } else state.hasContent = false;
    },
    clearPhotos(state) {
      state.data = [];
      state.page = 0;
      state.hasContent = true;
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

export const fetchPhotos = slice.asyncAction;
export const { clearPhotos } = slice.actions;

export default slice.reducer;
