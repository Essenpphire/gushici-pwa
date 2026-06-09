/**
 * @desc: 古诗文应用-主界面
 * @author: Essenpphire
 * @todo: 重构主题、调色板、配置路径别名'@'
 */
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import Typography from '@mui/material/Typography';

import BottomTabs from "@/components/BottomTabs";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import * as developers from "@/components/developers.js";

/** 
 * @todo 记得到时候把配置页面样式的文件重写一遍，别在这里初始化
 */
import { SelectSettings } from "@/store/slice/GenSettingSlice";
import { useSelector } from "react-redux";

export default function App() {
  const settings = useSelector(SelectSettings);
  if(settings.switches.indexOf('font') === -1) document.querySelector("html").style.setProperty("--font", "微软雅黑");
  developers.credit();
  return (
    <Box className="app-main">
      <ResponsiveAppBar id="scroll-top"/>
      <Grid className="app-container">
        <BottomTabs className="app-tabs" />
      </Grid>
    </Box>
  );
}
