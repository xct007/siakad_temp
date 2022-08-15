import { useState, useEffect } from "react";

import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { userService } from "services";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import NextLink from "next/link";
export default Index;

const cetak_khs = [
  { smst: 1 },
  { smst: 2 },
  { smst: 3 },
  { smst: 4 },
  { smst: 5 },
  { smst: 6 },
  { smst: 7 },
  { smst: 8 },
];
function Index() {
  return (
    <Layout>
      <h1>Users</h1>
      <Link
        href={`https://api.itsrose.my.id/itpa/krs?username=${userService.userValue?.username}&password=${userService.userValue?.password}&apikey=stefen`}
        className="btn btn-sm btn-success mb-2"
        passHref
      >
        Cetak KRS
      </Link>
      <p>test</p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Semester</th>
            <th style={{ width: "10%" }}>Cetak</th>
          </tr>
        </thead>
        <tbody>
          {cetak_khs &&
            cetak_khs.map((user) => (
              <tr key={user.smst}>
                <td>{user.smst}</td>
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
          {!cetak_khs && (
            <tr>
              <td colSpan="4">
                <Spinner />
              </td>
            </tr>
          )}
          {cetak_khs && !cetak_khs.length && (
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
