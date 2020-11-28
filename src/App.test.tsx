import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./stores";
import Axios from "axios";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import playlistReducer from "./stores/reducres/playlist.reducer";

jest.mock("axios");
afterEach(cleanup);

test("renders page elements", () => {
  const store = setupStore("playlist", playlistReducer);
  mockAxios([]);
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(getByTestId("root").children.length).toBe(2);
});

export const setupStore = (reducerName: string, reducer: any) => {
  return createStore(
    combineReducers({ [reducerName]: reducer }),
    applyMiddleware(thunk)
  );
};

export const mockAxios = (data: any) => {
  (Axios as any).mockResolvedValueOnce({
    data,
  });
};
