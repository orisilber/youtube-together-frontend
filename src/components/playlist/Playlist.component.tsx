import {
  CircularProgress,
  List,
  ListItem,
  ListSubheader,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylist } from "../../stores/actions/playlist.actions";
import {
  getCurrentVideo,
  playlistLoadCompleteSelector,
  videoListSelector,
} from "../../stores/selectors/playlist.selector";
import AddToPlaylist from "../addToPlaylist/AddToPlaylist.component";
import PlaylistItem from "../playlistItem/PlaylistItem.component";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
    width: "100%",
    padding: 24,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  header: {
    marginBottom: 16,
    background: "#666",
    padding: 12,
    borderRadius: 8,
  },
  spinnerContainer: {
    width: "40px",
    height: "40px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  emptyStateText: {
    color: theme.palette.common.white,
    textAlign: "center",
  },
  videosContainer: {
    overflowY: "auto",
    height: "calc(100% - 80px)",
  },
}));

const Playlist = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const videos = useSelector(videoListSelector);
  const isLoadingComplete = useSelector(playlistLoadCompleteSelector);
  const currentVideo = useSelector(getCurrentVideo);

  useEffect(() => {
    dispatch(fetchPlaylist());
  }, []);

  return (
    <List
      className={classes.root}
      data-testid="playlist-container"
      subheader={
        <ListSubheader className={classes.header}>
          <AddToPlaylist />
        </ListSubheader>
      }
    >
      {!isLoadingComplete && (
        <div className={classes.spinnerContainer}>
          <CircularProgress data-testid="playlist-spinner" />
        </div>
      )}

      <Paper className={classes.videosContainer} elevation={0}>
        {videos?.length
          ? videos.map((video) => (
              <PlaylistItem
                isActive={currentVideo?.uid === video.uid}
                data-testid="playlist-item"
                key={video.uid}
                video={video}
              />
            ))
          : null}
      </Paper>

      {isLoadingComplete && !videos?.length && (
        <Typography
          className={classes.emptyStateText}
          variant="subtitle1"
          data-testid="playlist-empty-state"
        >
          There are currently no videos in playlist
        </Typography>
      )}
    </List>
  );
};

export default Playlist;
