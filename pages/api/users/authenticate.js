const bcrypt = require("bcryptjs");
import getConfig from "next/config";

import { apiHandler, usersRepo } from "helpers/api";

const { serverRuntimeConfig } = getConfig();

export default apiHandler({
  post: authenticate,
});

async function authenticate(req, res) {
  const { username, password } = req.body;
  const user = await usersRepo.login(username, password);
  /* eslint-disable no-console */

  // validate
  if (user.status == false) {
    throw "Username or password is incorrect";
  }
  return res.status(200).json({
    username: username,
    password: password,
  });
}
