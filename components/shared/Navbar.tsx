"use client";
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
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import logo from "@/images/Untitled_design__8_-removebg-preview.png";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useRouter } from "next/navigation";
import SearchSuggestion from "./SearchSuggestion";
import Sidebar from "./Sidebar";
const pages = [
  { label: "Seo", route: "/category/seo" },
  { label: "Web Development", route: "/category/dev" },
  { label: "Internet", route: "/category/internet" },
  { label: "News", route: "/category/news" },
];
const settings = [{ label: "Profile", route: "/user/profile" }];
interface UserProps {
  id: string;
  email: string;
  name: string | null;
  role: string;
  emailVerified: Date | null;
  image: string | null;
}

interface NavProps {
  session: Session | null;
  userInfo: UserProps | null;
}

function ResponsiveAppBar({ session, userInfo }: NavProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const user = session?.user;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" className="z-[9999]">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image
            src={logo}
            alt="Logo"
            width={30}
            height={30}
            className="hidden sm:block sm:mr-2"
          />
          <Link href={"/"}>
            <Typography
              variant="h6"
              noWrap
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
              SEOMrush
            </Typography>
          </Link>

          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              {pages.map((page) => (
                <MenuItem
                  className=""
                  key={page.route}
                  onClick={handleCloseNavMenu}
                >
                  <Link href={page.route}>{page.label}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          <Sidebar />

          <Typography
            className="hidden sm:block"
            variant="h5"
            noWrap
            component="a"
            href="/"
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
            SEOMrush
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <MenuItem
                key={page.route}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href={page.route}>{page.label}</Link>
              </MenuItem>
            ))}
          </Box>

          <MenuItem>
            <SearchSuggestion />
          </MenuItem>

          <Box sx={{ flexGrow: 0, marginLeft: 3 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="?"
                  src={user?.image || `/static/images/avatar/2.jpg`}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
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
              {/* {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                  <Link href={setting.route}>{setting.label}</Link>
                </MenuItem>
              ))} */}

              {userInfo && userInfo.role === "admin" && (
                <>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <DashboardIcon fontSize="small" className="mr-3" />
                    <Link href={"/admin/dashboard"}>Dashboard</Link>
                  </MenuItem>
                </>
              )}
              {session ? (
                <MenuItem>
                  <LogoutIcon fontSize="small" className="mr-3" />
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    Logout
                  </button>
                </MenuItem>
              ) : (
                <div>
                  <MenuItem>
                    <LoginIcon fontSize="small" className="mr-3" />
                    <Link href={"/auth/signin"}>Login</Link>
                  </MenuItem>

                  <MenuItem>
                    <ExitToAppIcon fontSize="small" className="mr-3" />
                    <Link href={"/register"}>Register</Link>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
