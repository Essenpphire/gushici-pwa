import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { useSelector, useDispatch } from "react-redux";
import { SelectInfo, addCollection, removeCollection } from '@/store/slice/pagesSlice';

export default function FullScreenDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const info = useSelector(SelectInfo);
  const dispatch = useDispatch();

  const handleClose = (e) => {
    if(props.setParentState) props.setParentState(false);
    else e.preventDefault();
  };

  return (
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-name"
      >
        <AppBar className="app-bar" sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="返回"
            >
              <ArrowBackIosTwoToneIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              详情
            </Typography>
            {props.type=='collection' 
              ?  <Button autoFocus color="inherit" onClick={(e) => dispatch(addCollection(info))}>
                  收藏
                </Button> 
              : <Button autoFocus color="inherit" onClick={(e) => dispatch(removeCollection(info.id.toString()))}>
                  取消收藏
                </Button>
            }
          </Toolbar>
        </AppBar>
        <DialogTitle>
          {info.name}
          <br />
          {`【${info.dynasty}】${info.author}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          {info.passage.map ? info.passage.map((each)=>(<>{each}<br /></>)) : info.passage}
          </DialogContentText>
        </DialogContent>
      </Dialog>
  );
}

FullScreenDialog.defaultProps = {
  open: false,
  type: 'collection'
}