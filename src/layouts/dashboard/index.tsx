import { useState } from "react";
import { Outlet } from "react-router-dom";
// material
import { styled, useTheme } from "@material-ui/core/styles";
// hooks
import useCollapseDrawer from "../../hooks/useCollapseDrawer";
//
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import NavSection from "components/NavSection";
import MainNavbar from "layouts/main/MainNavbar";
import MainLayout from "layouts/main";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

const navConfig = [
  {
    subheader: "Teste",
    items: [
      {
        title: "Title",
        path: "/",
      },
      {
        title: "Title",
        path: "/",
      },
      {
        title: "Title",
        path: "/",
      },
      {
        title: "Title",
        path: "/",
      },
      {
        title: "Title",
        path: "/",
      },
    ],
  },
  {
    subheader: "Teste",
    items: [
      {
        title: "Title",
        path: "/",
      },
      {
        title: "Title",
        path: "/",
      },
      {
        title: "Title",
        path: "/",
      },
      {
        title: "Title",
        path: "/",
      },
      {
        title: "Title",
        path: "/",
      },
    ],
  },
  {
    subheader: "Teste",
    items: [
      {
        title: "Title",
        path: "/",
      },
      {
        title: "Title",
        path: "/",
      },
      {
        title: "Title",
        path: "/",
      },
      {
        title: "Title",
        path: "/",
      },
      {
        title: "Title",
        path: "/",
      },
    ],
  },
];

export default function DashboardLayout() {
  const theme = useTheme();
  const { collapseClick } = useCollapseDrawer();
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle
        sx={{
          transition: theme.transitions.create("margin", {
            duration: theme.transitions.duration.complex,
          }),
          ...(collapseClick && {
            ml: "102px",
          }),
        }}
      >
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
