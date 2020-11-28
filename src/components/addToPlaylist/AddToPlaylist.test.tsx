import React from "react";
import { cleanup, render, fireEvent, waitFor } from "@testing-library/react";
import AddToPlaylist from "./AddToPlaylist.component";
import userEvent from "@testing-library/user-event";
import { mockAxios, setupStore } from "../../App.test";
import playlistReducer from "../../stores/reducres/playlist.reducer";
import { Provider } from "react-redux";
import Axios from "axios";

jest.mock("axios");
afterEach(cleanup);

test("when entering an invalid and clicking add url component should show error", () => {
  const store = setupStore("playlist", playlistReducer);
  mockAxios([]);
  const { getByTestId } = render(
    <Provider store={store}>
      <AddToPlaylist />
    </Provider>
  );

  const textField = getByTestId("text-field");
  userEvent.type(textField.lastChild as any, "456"); // invalid data
  fireEvent.click(getByTestId("add-button"));
  expect((textField.lastChild as any).classList.contains("Mui-error")).toBe(
    true
  );
});

test("when entering valid url and clicking add redux should send data to server and clear input", async () => {
  const store = setupStore("playlist", playlistReducer);
  mockAxios([]);
  const { getByTestId } = render(
    <Provider store={store}>
      <AddToPlaylist />
    </Provider>
  );

  const textField = getByTestId("text-field");
  userEvent.type(
    textField.lastChild as any,
    "https://www.youtube.com/watch?v=UB1O30fR-EE" // valid youtube url
  );
  fireEvent.click(getByTestId("add-button"));
  expect((textField.lastChild as any).classList.contains("Mui-error")).toBe(
    false
  );

  expect(textField.lastChild?.lastChild).toHaveValue("");
  await waitFor(() => expect(Axios).toHaveBeenCalled());
});

test("when entering an invalid and pressing enter url component should show error", () => {
  const store = setupStore("playlist", playlistReducer);
  mockAxios([]);
  const { getByTestId } = render(
    <Provider store={store}>
      <AddToPlaylist />
    </Provider>
  );

  const textField = getByTestId("text-field");
  userEvent.type(textField.lastChild as any, "456{enter}"); // invalid data
  expect((textField.lastChild as any).classList.contains("Mui-error")).toBe(
    true
  );
});


test("when entering valid url and pressing enter redux should send data to server and clear input", async () => {
  const store = setupStore("playlist", playlistReducer);
  mockAxios([]);
  const { getByTestId } = render(
    <Provider store={store}>
      <AddToPlaylist />
    </Provider>
  );

  const textField = getByTestId("text-field");
  userEvent.type(
    textField.lastChild as any,
    "https://www.youtube.com/watch?v=UB1O30fR-EE{enter}" // valid youtube url
  );
  expect((textField.lastChild as any).classList.contains("Mui-error")).toBe(
    false
  );

  expect(textField.lastChild?.lastChild).toHaveValue("");
  await waitFor(() => expect(Axios).toHaveBeenCalled());
});
