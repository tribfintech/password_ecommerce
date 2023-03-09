import { Link as ScrollLink } from "react-scroll";
import { Outlet } from "react-router-dom";
// material
import { Stack } from "@material-ui/core";
// components
import Logo from "../../components/Logo";
//
import MainFooter from "./MainFooter";
import MainNavbar from "./MainNavbar";

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <Stack
      direction="column"
      // justifyContent="space-between"
      sx={{ boxSizing: "border-box", height: '100vh' }}
    >

      <MainNavbar />

      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>

      <div id="footer">
        <MainFooter />
      </div>

    </Stack>
    // <>

    /* {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: "center",
            position: "relative",
            bgcolor: "background.default",
          }}
        >
          <Container maxWidth="lg">
            <ScrollLink to="move_top" spy smooth>
              <Logo sx={{ mb: 1, mx: 'auto', cursor: 'pointer' }} />
            </ScrollLink>

            <Typography variant="caption" component="p">
              © All rights reserved
              <br /> made by &nbsp;
              <Link href="https://minimals.cc/">minimals.cc</Link>
            </Typography>
          </Container>
        </Box>
      )} */
    /* </> */
  );
}
