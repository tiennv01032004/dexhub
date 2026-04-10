import { configureStore } from "@reduxjs/toolkit";
import { pokeApi } from "./services/pokeApi";
import { gropApi } from "./services/gropApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [pokeApi.reducerPath]: pokeApi.reducer,
      [gropApi.reducerPath]: gropApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokeApi.middleware, gropApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
