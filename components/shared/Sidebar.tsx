import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

  const pages = [
    { label: "Home", route: "/" },
    { label: "Seo", route: "/category/seo" },
    { label: "Web Development", route: "/category/dev" },
    { label: "Internet", route: "/category/internet" },
    { label: "News", route: "/category/news" },
  ];

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        className="z-[999999]"
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: "white",
            color: "black",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <h3 className="text-lg font-bold ">SeomRush</h3>
          <IconButton onClick={toggleDrawer(false)} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {pages.map((page) => {
            const isActive = pathname === page.route;
            return (
              <ListItem
                button
                key={page.route}
                onClick={toggleDrawer(false)}
                className={`${isActive && "bg-gradient-to-r from-sky-600 to-cyan-400 text-white"} border-b border-b-gray-300 mb-1 mr-1"`}
              >
                <Link href={page.route} passHref>
                  <ListItemText primary={page.label} />
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
