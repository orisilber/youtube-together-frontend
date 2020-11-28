import React from "react";
import { cleanup, render, waitFor } from "@testing-library/react";
import SocketIoProvider from "./SocketIo.provider";
import { mockAxios, setupStore } from "../App.test";
import playlistReducer from "../stores/reducres/playlist.reducer";
import Playlist from "../components/playlist/Playlist.component";
import { Provider } from "react-redux";
import { io, Socket } from "socket.io-client";
// @ts-ignore
import MockedSocket from "socket.io-mock";
import { addVideoSuccess } from "../stores/actions/playlist.actions";

const videoData = {
  isValid: true,
  uid: "FfJCmU6N3sQ6LJjYH8Yhi/ras1EUtYzHU",
  videoId: "ras1EUtYzHU",
};

jest.mock("socket.io-client");
jest.mock("axios");

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

let socket: any;
beforeEach(() => {
  socket = new MockedSocket();
  (io as any).mockReturnValue(socket);
});

test("connect socket", async () => {
  const store = setupStore("playlist", playlistReducer);
  mockAxios([]);
  render(
    <Provider store={store}>
      <SocketIoProvider>
        <Playlist />
      </SocketIoProvider>
    </Provider>
  );

  expect(io).toHaveBeenCalled();
});

test("after getting an VIDEO_ADDED event, new video should be rendered in list", async () => {
  const store = setupStore("playlist", playlistReducer);
  mockAxios([]);
  const { queryByTestId } = render(
    <Provider store={store}>
      <SocketIoProvider>
        <Playlist />
      </SocketIoProvider>
    </Provider>
  );

  socket.socketClient.emit("VIDEO_ADDED", JSON.stringify(videoData));

  await waitFor(() =>
    expect(queryByTestId("playlist-item")).toBeInTheDocument()
  );
});

test("after getting an VIDEO_REMOVED event, video should be removed from playlist", async () => {
  const store = setupStore("playlist", playlistReducer);
  mockAxios([]);
  const { queryByTestId } = render(
    <Provider store={store}>
      <SocketIoProvider>
        <Playlist />
      </SocketIoProvider>
    </Provider>
  );

  store.dispatch(addVideoSuccess(videoData));
  await waitFor(() =>
    expect(queryByTestId("playlist-item")).toBeInTheDocument()
  );

  socket.socketClient.emit("VIDEO_REMOVED", videoData.uid);
  await waitFor(() =>
    expect(queryByTestId("playlist-item")).not.toBeInTheDocument()
  );
});
