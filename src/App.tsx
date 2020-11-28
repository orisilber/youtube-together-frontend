import { makeStyles } from "@material-ui/core";
import React from "react";
import Playlist from "./components/playlist/Playlist.component";
import VideoPlayer from "./components/videoPlayer/VideoPlayer.component";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  playlistContainer: {
    height: "60%",
    width: 360,
    margin: 36,
  },
  playerContainer: {
    flex: 1,
    height: "100%",
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="root">
      <aside className={classes.playlistContainer}>
        <Playlist />
      </aside>
      <div className={classes.playerContainer}>
        <VideoPlayer />
      </div>
    </div>
  );
};

export default App;
