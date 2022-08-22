/* eslint-disable no-console */
import { InfinitySpin } from "react-loader-spinner";
import { userService } from "services";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

export default Profile;

function Profile() {

  return (
    <div className="p-4">
      <div className="container">
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <InfinitySpin width="200" color="green" />
            </Box>
          </CardContent>
          <Divider />
        </Card>
      </div>
    </div>
  );
}
