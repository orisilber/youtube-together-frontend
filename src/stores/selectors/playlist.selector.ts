import { Video } from "../../interfaces/video.interface";

export const videoListSelector = (state: any) => state.playlist.videos as Video[];
export const playlistLoadCompleteSelector = (state: any) => state.playlist.completed as boolean; 
export const getCurrentVideo = (state: any) => state.playlist.currentVideo as Video;