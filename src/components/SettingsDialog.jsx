import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useDispatch, useSelector } from "react-redux";
import { applyGenSettings, SelectSettings } from "@/store/slice/GenSettingSlice";

export default function SettingsDialog(props) {
  const [value, setValue] = React.useState("");
  const settings = useSelector(SelectSettings);
  const dispatch = useDispatch();

  const handleClose = (e) => {
    if(props.setParentState) props.setParentState(false);
    else e.preventDefault();
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>请求服务器URL</DialogTitle>
      <DialogContent>
        <DialogContentText>配置SPA请求服务器的URL</DialogContentText>
        <TextField
          placeholder={settings.req_url}
          autoFocus
          margin="dense"
          id="name"
          label="Request Url"
          type="req_url"
          fullWidth
          variant="standard"
          onChange={(e) => setValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button
          onClick={(e) => {
            handleClose();
            dispatch(applyGenSettings({ req_url: value }));
          }}
        >
          确认
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SettingsDialog.defaultProps = {
  open: false
};