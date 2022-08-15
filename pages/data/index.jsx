import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { userService } from "services";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import NextLink from "next/link";
export default Index;

const sm1 = [
  { smst: 1 }
];
const sm2 = [
  { smst: 1 },
  { smst: 2 }
];
const sm3 = [
  { smst: 1 },
  { smst: 2 },
  { smst: 3 }
];
const sm4 = [
  { smst: 1 },
  { smst: 2 },
  { smst: 3 },
  { smst: 4 }
];
const sm5 = [
  { smst: 1 },
  { smst: 2 },
  { smst: 3 },
  { smst: 4 },
  { smst: 5 }
];
const sm6 = [
  { smst: 1 },
  { smst: 2 },
  { smst: 3 },
  { smst: 4 },
  { smst: 5 },
  { smst: 6 }
];
const sm7 = [
  { smst: 1 },
  { smst: 2 },
  { smst: 3 },
  { smst: 4 },
  { smst: 5 },
  { smst: 6 },
  { smst: 7 }
];
const sm8 = [
  { smst: 1 },
  { smst: 2 },
  { smst: 3 },
  { smst: 4 },
  { smst: 5 },
  { smst: 6 },
  { smst: 7 },
  { smst: 8 }
];
function Index() {
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
      .then((datas) => {
        setLoading(false);
        if (datas.result.semester === "SATU") setData(sm1);
        if (datas.result.semester === "DUA") setData(sm2);
        if (datas.result.semester === "TIGA") setData(sm3);
        if (datas.result.semester === "EMPAT") setData(sm4);
        if (datas.result.semester === "LIMA") setData(sm5);
        if (datas.result.semester === "ENAM") setData(sm6);
        if (datas.result.semester === "TUJUH") setData(sm7);
        if (datas.result.semester === "DELAPAN") setData(sm8);
        else setData(sm8)
      })
      .catch((er) => {
        setData(null);
        setLoading(false);
      });
  }, []);
  if (isLoading) return null
  if (!data) return null;
  return (
    <Layout>
      <h1>Data</h1>
      <Link
        href={`https://api.itsrose.my.id/itpa/krs?username=${userService.userValue?.username}&password=${userService.userValue?.password}&apikey=stefen`}
        className="btn btn-sm btn-success mb-2"
        passHref
      >
        Cetak KRS
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Semester</th>
            <th style={{ width: "10%" }}>Cetak</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((user) => (
              <tr key={user.smst}>
                <td style={{ whiteSpace: "nowrap" }}>{user.smst}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <NextLink
                    href={`https://api.itsrose.my.id/itpa/krs?username=${userService.userValue?.username}&password=${userService.userValue?.password}&semester=${user.smst}&apikey=stefen`}
                    passHref
                  >
                    <Button
                      component="a"
                      startIcon={<ArrowForwardIcon fontSize="small" />}
                      sx={{ mt: 0 }}
                      variant="contained"
                    >
                      Cetak
                    </Button>
                  </NextLink>
                </td>
              </tr>
            ))}
          {!data && (
            <tr>
              <td colSpan="4">
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
              </td>
            </tr>
          )}
          {!data && !data.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">Tidak dapat menampilkan KHS</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}
