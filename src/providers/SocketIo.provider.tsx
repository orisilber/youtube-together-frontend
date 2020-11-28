import { createContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../configs/config";
import { Video } from "../interfaces/video.interface";
import { socketEvents } from "../models/scoketIo.model";
import { addVideoSuccess, removeVideoSucess } from "../stores/actions/playlist.actions";

const SocketIoContext = createContext(null);

export { SocketIoContext };

const SocketIoProvider = ({ children }: { children: any }) => {
  const socket = useRef<Socket>();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io(SERVER_URL);
    socket.current.on(socketEvents.VIDEO_ADDED, (data: string) => {
      dispatch(addVideoSuccess(JSON.parse(data) as Video));
    });
    socket.current.on(socketEvents.VIDEO_REMOVED, (videoUid: string) => {
      dispatch(removeVideoSucess(videoUid));
    });
  }, []);

  return (
    <SocketIoContext.Provider value={null}>{children}</SocketIoContext.Provider>
  );
};

export default SocketIoProvider;
