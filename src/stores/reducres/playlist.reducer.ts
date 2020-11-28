import { Video } from "../../interfaces/video.interface";
import {
  FETCH_PLAYLIST_SUCCESS,
  ADD_VIDEO_SUCCESS,
  SET_LOADING,
  SET_ERROR,
  SET_NEXT_VIDEO,
  REMOVE_VIDEO_SUCCESS,
} from "../constants/playlistActions";

interface PlaylistReducerState {
  videos: Video[];
  completed: boolean;
  didFail: boolean;
  currentVideo: Video | undefined;
}

const initialState: PlaylistReducerState = {
  videos: [],
  completed: true,
  didFail: false,
  currentVideo: undefined,
};

const playlistReducer = (
  state: PlaylistReducerState = initialState,
  action: any
): typeof initialState => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        completed: !action.isLoading,
        didFail: false,
      };
    case SET_ERROR:
      return {
        ...state,
        completed: true,
        didFail: true,
      };
    case FETCH_PLAYLIST_SUCCESS:
      return {
        ...state,
        videos: action.playlist,
        currentVideo: action.playlist[0],
        completed: true,
        didFail: false,
      };
    case ADD_VIDEO_SUCCESS:
      return {
        ...state,
        videos: [...state.videos, action.video],
        completed: true,
        didFail: false,
        currentVideo: state.currentVideo || action.video,
      };
    case REMOVE_VIDEO_SUCCESS:
      return {
        ...state,
        videos: state.videos.filter(({ uid }) => uid !== action.uid),
      };
    case SET_NEXT_VIDEO:
      const currentVideoIndex = state.videos.findIndex(
        (vid) => vid.uid === state.currentVideo?.uid
      );
      return {
        ...state,
        videos: state.videos.slice(1),
        currentVideo: state.videos[currentVideoIndex + 1],
      };
    default:
      return state;
  }
};

export default playlistReducer;
