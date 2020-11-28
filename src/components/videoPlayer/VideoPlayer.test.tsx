import React from "react";
import { cleanup, render, waitFor } from "@testing-library/react";
import {} from "@material-ui/styles/";
import { mockAxios, setupStore } from "../../App.test";
import playlistReducer from "../../stores/reducres/playlist.reducer";
import { Provider } from "react-redux";
import VideoPlayer from "./VideoPlayer.component";
import { fetchPlaylist } from "../../stores/actions/playlist.actions";

afterEach(cleanup);
jest.mock("axios");

test("when there are no videos in playlist, show empty state", () => {
  const store = setupStore("playlist", playlistReducer);
  const { getByTestId } = render(
    <Provider store={store}>
      <VideoPlayer />
    </Provider>
  );
  expect(getByTestId("player-empty-state")).toBeInTheDocument();
});

test("when there are videos in playlist, hide empty state", async () => {
  const store = setupStore("playlist", playlistReducer);
  mockAxios([
    {
      isValid: true,
      uid: "FfJCmU6N3sQ6LJjYH8Yhi/ras1EUtYzHU",
      videoId: "ras1EUtYzHU",
    },
  ]);
  const { queryByTestId } = render(
    <Provider store={store}>
      <VideoPlayer />
    </Provider>
  );

  // @ts-ignore
  store.dispatch(fetchPlaylist());
  await waitFor(() =>
    expect(queryByTestId("player-empty-state")).not.toBeInTheDocument()
  );
});

// test("when video is playing, playlist item should be greyed out", () => {
//   const store = setupStore("playlist", playlistReducer);
//   const mockTheme = createMuiTheme({
//     palette: { grey: { 500: "#123456" } },
//   });
//   const { getByTestId } = render(
//     <Provider store={store}>
//       <ThemeProvider theme={mockTheme}>
//         <VideoPlayer />
//       </ThemeProvider>
//     </Provider>
//   );
//   expect(getByTestId("playlist-item")).toHaveStyle(`color: #123456`);
// });

// test("when clicking delete button, remove request should be sent to sever", async () => {
//   const store = setupStore("playlist", playlistReducer);
//   mockAxios("");

//   const { getByTestId } = render(
//     <Provider store={store}>
//       <VideoPlayer />
//     </Provider>
//   );

//   fireEvent.click(getByTestId("delete-button"));
//   await waitFor(() => expect(Axios).toHaveBeenCalled());
// });
