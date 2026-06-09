import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

import { useDispatch } from "react-redux";
import { clearCollection } from "@/store/slice/pagesSlice";

export default function PagesFab(props) {
  const dispatch = useDispatch();
  
  const handleScrollTop = (e) => {
    console.log(props.target);
    document.querySelector(".app-view").scrollTop = 0;
  };

  const handleClearCollection = (e) => {
    let ans = window.confirm( '你确定要清空所有收藏吗？\n此操作不可逆！！！');
    if(ans == true) dispatch(clearCollection());
  }

  let SubFab = null;
  switch (props.pageIndex) {
    case 0:
    case 1:
      let req_path = props.pageIndex == 0 ? 'api/poet' : 'api/article';
      SubFab = (
        <Fab onClick={(e) => {window.handleRefresh(req_path); console.log('请求路径:'+req_path)}} size="small" aria-label="刷新">
          <RefreshTwoToneIcon />
        </Fab>
      );
      break;
    case 2:
      SubFab = (
        <Fab onClick={handleClearCollection} size="small" aria-label="清空收藏">
          <DeleteForeverTwoToneIcon />
        </Fab>
      );
      break;
    default: 
      SubFab = null;
  }

  return (
    <Fade in={props.scrollH >= 200 ? true : false}>
      <Box
        role="presentation"
        sx={{ display: 'flex', flexDirection: 'column-reverse', position: "fixed", zIndex: "100", bottom: "6rem", right: "2rem" }}
      >
        <Fab sx={{marginTop: '0.5rem'}} onClick={handleScrollTop} size="small" aria-label="回到页面顶端">
          <KeyboardArrowUpIcon />
        </Fab>
        {SubFab}
      </Box>
    </Fade>
  );
}

PagesFab.defaultProps = {
  scrollH: 0,
  pageIndex: 1,
};
