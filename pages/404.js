import Head from "next/head";
import NextLink from "next/link";
import { Box, Container, Typography } from "@mui/material";

const onichan = `Kyaahhh >//<`
const NotFound = () => (
  <>
    <Head>
      <title>404</title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <img
              alt="Under development"
              src="/static/images/undraw_page_not_found_su7k.svg"
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: 560,
              }}
            />
          </Box>
          <Typography
              color="textPrimary"
              variant="h4"
              align="center"
            >
              {onichan}
              <Typography align="center" color="textSecondary" gutterBottom variant="body2">
                yamete kudasai oni-chan
              </Typography>
            </Typography>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
