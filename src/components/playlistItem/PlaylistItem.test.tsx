import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import PlaylistItem from "./PlaylistItem.component";
import {} from "@material-ui/styles/";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { mockAxios, setupStore } from "../../App.test";
import playlistReducer from "../../stores/reducres/playlist.reducer";
import { Provider } from "react-redux";
import Axios from "axios";

afterEach(cleanup);
jest.mock("axios");

test("playlist item should show full youtube url", () => {
  const store = setupStore("playlist", playlistReducer);
  const { getByTestId } = render(
    <Provider store={store}>
      <PlaylistItem video={{ isValid: true, uid: "123", videoId: "456" }} />
    </Provider>
  );
  expect(getByTestId("playlist-item")).toHaveTextContent("youtube.com/watch?v=456");
});

test("when video is playing, playlist item should be greyed out", () => {
  const store = setupStore("playlist", playlistReducer);
  const mockTheme = createMuiTheme({
    palette: { grey: { 500: "#123456" } },
  });
  const { getByTestId } = render(
    <Provider store={store}>
      <ThemeProvider theme={mockTheme}>
        <PlaylistItem
          isActive
          video={{ isValid: true, uid: "123", videoId: "456" }}
        />
      </ThemeProvider>
    </Provider>
  );
  expect(getByTestId("playlist-item")).toHaveStyle(`color: #123456`);
});

test("when clicking delete button, remove request should be sent to sever", async () => {
  const store = setupStore("playlist", playlistReducer);
  mockAxios("");

  const { getByTestId } = render(
    <Provider store={store}>
      <PlaylistItem video={{ isValid: true, uid: "123", videoId: "456" }} />
    </Provider>
  );

  fireEvent.click(getByTestId("delete-button"));
  await waitFor(() => expect(Axios).toHaveBeenCalled());
});
