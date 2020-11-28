import { Button, IconButton, makeStyles, TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addVideo } from "../../stores/actions/playlist.actions";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  input: {
    flex: 1,
    marginRight: 12,
  },
});

const AddToPlaylist = () => {
  const classes = useStyles();
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [textFieldValue, setTextFieldValue] = useState("");
  const dispatch = useDispatch();

  const addVideoToPlaylist = () => {
    const isValid = isValidYoutubeUrl(textFieldValue);
    setIsUrlValid(isValid);
    if (isValid) {
      setTextFieldValue("");
      dispatch(addVideo(textFieldValue));
    }
  };

  return (
    <div className={classes.container}>
      <TextField
        className={classes.input}
        error={!isUrlValid}
        data-testid="text-field"
        label="youtube url"
        value={textFieldValue}
        variant="filled"
        onKeyDown={(e) => e.key === "Enter" && addVideoToPlaylist()}
        onChange={(e) => setTextFieldValue(e.target.value)}
      />
      <IconButton data-testid="add-button" onClick={addVideoToPlaylist}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default AddToPlaylist;

const isValidYoutubeUrl = (url: string) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length === 11 ? true : false;
};
