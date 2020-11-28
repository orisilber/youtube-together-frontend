import React from "react";
import { cleanup, render, waitFor } from "@testing-library/react";
import Playlist from "./Playlist.component";
import { Provider } from "react-redux";
import playlistReducer from "../../stores/reducres/playlist.reducer";
import Axios from "axios";
import { mockAxios, setupStore } from "../../App.test";
import {
  fetchPlaylist,
  setNextVideo,
} from "../../stores/actions/playlist.actions";

jest.mock("axios");
afterEach(cleanup);

const videoData = {
  isValid: true,
  uid: "FfJCmU6N3sQ6LJjYH8Yhi/ras1EUtYzHU",
  videoId: "ras1EUtYzHU",
};

test("when playlist is empty display empty state", async () => {
  const store = setupStore("playlist", playlistReducer);
  mockAxios([]);
  const { getByTestId } = render(
    <Provider store={store}>
      <Playlist />
    </Provider>
  );

  await waitFor(() => expect(Axios).toHaveBeenCalled());
  await waitFor(() =>
    expect(getByTestId("playlist-empty-state")).toBeInTheDocument()
  );
});

test("show spinner when loading and remove when finished", async () => {
  const store = setupStore("playlist", playlistReducer);
  mockAxios([]);
  const { getByTestId, queryByTestId } = render(
    <Provider store={store}>
      <Playlist />
    </Provider>
  );

  await waitFor(() =>
    expect(getByTestId("playlist-spinner")).toBeInTheDocument()
  );
  await waitFor(() =>
    expect(queryByTestId("playlist-spinner")).not.toBeInTheDocument()
  );
});

test("if playlist has videos display videos", async () => {
  const store = setupStore("playlist", playlistReducer);
  mockAxios([videoData]);
  const { getByTestId, queryByTestId } = render(
    <Provider store={store}>
      <Playlist />
    </Provider>
  );

  await waitFor(() => expect(Axios).toHaveBeenCalled());
  expect(getByTestId("playlist-item")).toBeInTheDocument();
  expect(queryByTestId("playlist-empty-state")).not.toBeInTheDocument();
});

test("after video finishes playing it should be removed from list", async () => {
  const store = setupStore("playlist", playlistReducer);
  mockAxios([videoData]);

  const { queryByTestId } = render(
    <Provider store={store}>
      <Playlist />
    </Provider>
  );

  // @ts-ignore
  await waitFor(() =>
    expect(queryByTestId("playlist-item")).toBeInTheDocument()
  );
  store.dispatch(setNextVideo());
  await waitFor(() =>
    expect(queryByTestId("playlist-item")).not.toBeInTheDocument()
  );
});
