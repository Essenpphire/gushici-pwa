/**
 * @desc: 古诗文应用-底部切换栏
 * @author: Essenpphire
 */
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import ClassTwoToneIcon from "@mui/icons-material/ClassTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";

import SwipeableViews from "react-swipeable-views";
import Poets from "@/pages/Poets";
import Articles from "@/pages/Articles";
import CollectionsMe from "@/pages/CollectionsMe";
import Settings from '@/pages/Settings';
import PagesFab from "@/components/PagesFab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function eachContent(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BottomTabs() {
  const theme = useTheme();
  const rollRef = React.useRef();
  const [value, setValue] = React.useState(0);
  const [scrollH, setScrollH] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleScroll = () => {
    const { scrollHeight, clientHeight, scrollTop } = rollRef.current;
    setScrollH(scrollTop);
    //console.log(`页面滚动！当前滚动值：${scrollTop}`);
    if (scrollHeight - clientHeight <= scrollTop + 1 + 50) {
      console.log('离底部还有:50px,加载');
    }
  };

  return (
    <Box className="app-view" ref={rollRef} onScroll={handleScroll}>
      {/* 要渲染的主体页面 */}
      <SwipeableViews
        //containerStyle={{
        //  height: "100%"
        //}}
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          {/*古诗*/}
          <Poets />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/*古文*/}
          <Articles />
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/*收藏*/}
          <CollectionsMe />
        </TabPanel>
        <TabPanel value={value} index={3}>
          {/*设置*/}
          <Settings />
        </TabPanel>
      </SwipeableViews>

      <Tabs
        sx={{
          width: "100%",
          position: "fixed",
          bottom: "0",
        }}
        className="app-tabs"
        value={value}
        onChange={handleChange}
        centered
        aria-label="选项卡"
      >
        <Tab
          className="app-tabs-icon"
          icon={<MenuBookTwoToneIcon />}
          label={<span>诗词</span>}
          aria-label="shici"
          {...eachContent(0)}
        />
        <Tab
          className="app-tabs-icon"
          icon={<ClassTwoToneIcon />}
          label={<span>古文</span>}
          aria-label="guwen"
          {...eachContent(1)}
        />
        <Tab
          className="app-tabs-icon"
          icon={<FavoriteTwoToneIcon />}
          label={<span>收藏</span>}
          aria-label="favorites"
          {...eachContent(2)}
        />
        <Tab
          className="app-tabs-icon"
          icon={<SettingsTwoToneIcon />}
          label={<span>设置</span>}
          aria-label="settings"
          {...eachContent(3)}
        />
      </Tabs>
      <PagesFab scrollH={scrollH} pageIndex={value} />
    </Box>
  );
}
