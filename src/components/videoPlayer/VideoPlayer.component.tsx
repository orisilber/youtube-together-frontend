import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNextVideo } from "../../stores/actions/playlist.actions";
import { getCurrentVideo } from "../../stores/selectors/playlist.selector";
import YouTube, { Options } from "react-youtube";
import { makeStyles, Typography } from "@material-ui/core";
import MoodBad from "@material-ui/icons/MoodBad";

const useStyles = makeStyles((theme) => ({
  playerContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    "&>div": {
      height: "100%",
    },
  },
  emptyStateContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  emptyStateIcon: {
    width: 56,
    height: 56,
    marginBottom: 24,
  },
}));

const playerOptions: Options = {
  width: "100%",
  height: "100%",
  playerVars: {
    color: "white",
    playlist: "",
    autoplay: 1,
    mute: 1,
  },
};

const VideoPlayer = () => {
  const classes = useStyles();
  const [player, setPlayer] = useState<any>();
  const dispatch = useDispatch();
  const currentVideo = useSelector(getCurrentVideo);

  useEffect(() => {
    if (currentVideo?.videoId && player)
      player?.cueVideoById(currentVideo.videoId);
    else if (!currentVideo?.videoId && player) player?.cueVideoById("");
  }, [currentVideo, player]);

  const onPlayerStateChange = (e: any) => {
    // if video finished playing play next one in list
    if (e.data === YouTube.PlayerState.ENDED) dispatch(setNextVideo());
    else if (e.data === YouTube.PlayerState.CUED && player) player.playVideo();
  };

  return (
    <div className={classes.playerContainer}>
      <YouTube
        opts={playerOptions}
        onReady={(e) => setPlayer(e?.target)}
        onStateChange={onPlayerStateChange}
      />
      {!currentVideo?.videoId ? (
        <div
          className={classes.emptyStateContainer}
          data-testid="player-empty-state"
        >
          <MoodBad className={classes.emptyStateIcon} />
          <Typography variant="h4">Nothing to watch...</Typography>
          <Typography variant="subtitle1"> Add videos to list or wait for someone else to do so</Typography>
        </div>
      ) : null}
    </div>
  );
};

export default VideoPlayer;
