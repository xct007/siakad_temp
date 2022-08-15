/* eslint-disable no-console */
import { useState, useEffect } from "react";
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
import { ThreeDots } from "react-loader-spinner";

export default Home;

function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const username = userService.userValue?.username;
  const password = userService.userValue?.password;
  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/users/get-profile-data?username=${username}&password=${password}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((er) => {
        setLoading(false);
        setData(null);
      });
  }, []);

  if (isLoading)
    return (
      <div className="p-4">
        <div className="container">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ThreeDots
              height="100"
              width="100"
              radius="10"
              color="red"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName="loding"
              visible={true}
            />
          </Box>
        </div>
      </div>
    );
  if (!data) return null;
  const user = {
    avatar: "/static/siakad.png",
    jurusan: data.result.jurusan,
    nama: data.result.nama || null,
    jurusan: data.result.jurusan || null,
    nim: data.result.nim || null,
    program_studi: data.result.program_studi || null,
    angkatan: data.result.angkatan || null,
    semester: data.result.semester || null,
    batas_studi: data.result.batas_studi || null,
    tahun_ajaran: data.result.tahun_ajaran || null,
  };
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
              <Avatar
                src={user.avatar}
                sx={{
                  height: 64,
                  mb: 2,
                  width: 64,
                }}
              />
              <Typography color="textPrimary" gutterBottom variant="h5">
                {user.nama}
              </Typography>
              <Typography color="textSecondary" variant="button">
                {user.nim}
              </Typography>
              <Typography color="textSecondary" variant="button">
                {user.program_studi}
              </Typography>
              <Typography color="textSecondary" variant="button">
                Angkatan {user.angkatan}
              </Typography>
              <Typography color="textSecondary" variant="button">
                Semester {user.semester}
              </Typography>
              <Typography color="textSecondary" variant="button">
                Tahun Ajaran {user.tahun_ajaran}
              </Typography>
              <Typography color="textSecondary" variant="button">
                Batas Studi {user.batas_studi}
              </Typography>
            </Box>
          </CardContent>
          <Divider />
        </Card>
      </div>
    </div>
  );
}
