import Axios from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import apiMap from "../../models/apiMap.model";
import { Video } from "../../interfaces/video.interface";
import * as PlaylistActions from "../constants/playlistActions";
import { rootReducer } from "../index";

type ThunkedAction = ThunkAction<
  void,
  typeof rootReducer,
  unknown,
  Action<string>
>;

export const setLoading = (isLoading: boolean) => ({
  type: PlaylistActions.SET_LOADING,
  isLoading,
});

export const setError = (error: any) => ({
  type: PlaylistActions.SET_ERROR,
  error,
});

export const fetchPlaylistSuccess = (playlist: Video[]) => ({
  type: PlaylistActions.FETCH_PLAYLIST_SUCCESS,
  playlist,
});

export const addVideoSuccess = (video: Video) => ({
  type: PlaylistActions.ADD_VIDEO_SUCCESS,
  video,
});

export const setNextVideo = () => ({
  type: PlaylistActions.SET_NEXT_VIDEO,
});

export const fetchPlaylist = (): ThunkedAction => (dispatch) => {
  dispatch(setLoading(true));
  return Axios(apiMap.getPlaylist)
    .then((body) => dispatch(fetchPlaylistSuccess(body.data)))
    .catch((error) => dispatch(setError(error)));
};

export const addVideo = (url: string): ThunkedAction => (dispatch) => {
  dispatch(setLoading(true));
  return Axios({ ...apiMap.addVideo, data: { url } })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(error)));
};

export const removeVideo = (uid: string): ThunkedAction => (dispatch) => {
  dispatch(setLoading(true));
  return Axios({ ...apiMap.removeVideo, data: { uid } })
    .then(() => dispatch(removeVideoSucess(uid)))
    .catch((error) => dispatch(setError(error)))
    .finally(() => dispatch(setLoading(false)));
};

export const removeVideoSucess = (uid: string): ThunkedAction => (
  dispatch,
  getState
) => {
  // @ts-ignore
  const { playlist } = getState();
  // Check if removed video is current video
  const shouldRemoveCurrentVideo = playlist.currentVideo?.uid === uid;
  // If it is than call next before removing it
  if (shouldRemoveCurrentVideo) dispatch(setNextVideo());
  // Remove video from list
  return dispatch({
    type: PlaylistActions.REMOVE_VIDEO_SUCCESS,
    uid,
  });
};
