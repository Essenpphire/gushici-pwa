/**
 * @desc: 古诗文应用-应用栏
 * @author: Essenpphire
 */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import DisplayIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';

const dynasties = [["唐朝", "tang"], ["宋朝", "song"], ["元朝", "yuan"]];
const settings = [
  <span><ManageAccountsTwoToneIcon sx={{ mr: 1, height: '100%', verticalAlign: 'middle' }} />个人信息</span>,
  <span><LogoutTwoToneIcon sx={{ mr: 1, height: '100%', verticalAlign: 'middle' }} />退出登录</span>,
];

export default function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    //<HideOnScroll {...props}>
      <AppBar className="app-bar" position="static" sx={{ position: "fixed" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <DisplayIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              拾萃
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {dynasties.map((page) => (
                  <MenuItem key={page[0]} onClick={(e)=>{handleCloseNavMenu(); window.handleRefresh('poet/'+page[1])}}>
                    <Typography textAlign="center">{page[0]}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <DisplayIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              拾萃
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {dynasties.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="打开设置">
                <IconButton onClick={handleOpenUserMenu} sx={{ padding: 0 }}>
                  <Avatar alt="未登录" src="/static/images/avatar/1.png" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ marginTop: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    //</HideOnScroll>
  );
}
ResponsiveAppBar.defaultProps = {

};