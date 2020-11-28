import { SERVER_URL } from "../configs/config";

interface ApiMapRequest {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

type ApiMapOptions = "getPlaylist" | "addVideo" | "removeVideo";

const apiMap: Record<ApiMapOptions, ApiMapRequest> = {
  getPlaylist: {
    url: SERVER_URL + "/playlist",
    method: "GET",
  },
  addVideo: {
    url: SERVER_URL + "/playlist/video",
    method: "POST",
  },
  removeVideo: {
    url: SERVER_URL + "/playlist/video",
    method: "DELETE",
  },
};

export default apiMap;
