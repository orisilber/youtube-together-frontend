import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Video } from "../../interfaces/video.interface";
import { removeVideo } from "../../stores/actions/playlist.actions";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme: Theme) => ({
  itemContainer: {
    color: theme.palette.common.white,
  },
  activeItem: {
    color: theme.palette.grey[500],
  },
}));

type PlaylistItemProps = { video: Video; isActive?: boolean };

const PlaylistItem = ({ video, isActive = false }: PlaylistItemProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const removeVideoFromPlaylist = () => {
    dispatch(removeVideo(video.uid));
  };

  return (
    <ListItem
      className={`${classes.itemContainer} ${isActive && classes.activeItem}`}
      data-testid="playlist-item"
    >
      <ListItemText primary={`youtube.com/watch?v=${video.videoId}`} />
      <ListItemSecondaryAction>
        <IconButton
          onClick={removeVideoFromPlaylist}
          edge="end"
          data-testid="delete-button"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default PlaylistItem;
