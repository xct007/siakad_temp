import { InfinitySpin } from "react-loader-spinner";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NextLink from "next/link";

export default Register;

function Register() {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <InfinitySpin width="200" color="green" />

      <Typography color="textSecondary" variant="h1">
        Opss...
      </Typography>
      <Typography color="textSecondary" variant="h5">
        Silakan daftar melalui pihak terkait
      </Typography>
      <NextLink href="/account/login" passHref>
        <Button
          component="a"
          startIcon={<ArrowBackIcon fontSize="small" />}
          sx={{ mt: 0 }}
          variant="contained"
        >
          Login
        </Button>
      </NextLink>
    </Box>
  );
}
