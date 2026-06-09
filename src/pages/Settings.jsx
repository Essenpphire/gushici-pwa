import * as React from "react";
import List from "@mui/material/List";
//import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";

import TranslateTwoToneIcon from "@mui/icons-material/TranslateTwoTone";
import FormatPaintTwoToneIcon from "@mui/icons-material/FormatPaintTwoTone";
import AdbIconTwoTone from "@mui/icons-material/AdbTwoTone";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import SettingsDialog from "@/components/SettingsDialog";
import { useSelector, useDispatch } from "react-redux";
import { applyGenSettings, SelectSettings } from "@/store/slice/GenSettingSlice";

export default function Settings() {
  useSelector((state) => console.log(state));
  const settings = useSelector(SelectSettings);
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState([...settings.switches]);
  const [expand, setExpand] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setExpand(!expand);
  };

  const handleSetting = (e) => {
    console.log(`页面打开状态为：${e}`);
    setOpen(e);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    // 没有被勾选
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      // 勾选对应 Switch
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    if (newChecked.indexOf("font") !== -1) {
      document.querySelector("html").style.setProperty("--font", "LXGW Wenkai");
      dispatch(applyGenSettings({ switches: ["font"] }));
    } else {
      document.querySelector("html").style.setProperty("--font", "微软雅黑");
      dispatch(applyGenSettings({ switches: [] }));
    }
  };

  return (
    <List
      sx={{ width: "calc(100vw - 48px)", bgcolor: "background.paper" }}
      subheader={<ListSubheader>设置</ListSubheader>}
    >
      <ListItemButton>
        <ListItemIcon>
          <TranslateTwoToneIcon />
        </ListItemIcon>
        <ListItemText
          primary="使用默认字体"
          secondary="使用应用内置的「霞鹜文楷」字体"
        />
        <Switch
          edge="end"
          onChange={handleToggle("font")}
          checked={checked.indexOf("font") !== -1}
          inputProps={{
            "aria-labelledby": "switch-list-label-fonts",
          }}
        />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <FormatPaintTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="样式" secondary="开发中....." />
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AdbIconTwoTone />
        </ListItemIcon>
        <ListItemText primary="开发者" />
        {expand ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={expand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={(e) => setOpen(true)}>
            <ListItemText
              primary="请求服务器URL"
              secondary="配置SPA请求服务器的URL"
            />
          </ListItemButton>

          <ListItemButton onClick={(e) => localStorage.clear()}>
            <ListItemText primary="清空 localStorage" secondary="顾名思义" />
          </ListItemButton>

          <SettingsDialog open={open} setParentState={handleSetting} />
        </List>
      </Collapse>
    </List>
  );
}
