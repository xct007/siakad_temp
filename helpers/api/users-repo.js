const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");
// users in JSON file for simplicity, store in a db for production applications
let users = require("data/users.json");
let khs = {
  semester: 1
}
export const usersRepo = {
  getAll: () => users,
  getById: (id) => users.find((x) => x.id.toString() === id.toString()),
  find: (x) => users.find(x),
  create,
  update,
  delete: _delete,
  login,
  temp_log
};

function temp_log(username, password) {
  user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
  user.username = username
  user.password = password
  // set date created and updated
  user.dateCreated = new Date().toISOString();
  user.dateUpdated = new Date().toISOString();
  users.push({
    username: username,
    password: password
  })
  saveData()
}
function create(user) {
  // generate new user id
  user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;

  // set date created and updated
  user.dateCreated = new Date().toISOString();
  user.dateUpdated = new Date().toISOString();

  // add and save user
  users.push(user);
  saveData();
}

function update(id, params) {
  const user = users.find((x) => x.id.toString() === id.toString());

  // set date updated
  user.dateUpdated = new Date().toISOString();

  // update and save
  Object.assign(user, params);
  saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
  // filter out deleted user and save
  users = users.filter((x) => x.id.toString() !== id.toString());
  saveData();
}

// private helper functions

function saveData() {
  fs.writeFileSync("data/users.json", JSON.stringify(users, null, 4));
}

function login(username, password) {
  return new Promise(async (resolve, reject) => {
    let cookies;
    axios
      .request({
        method: "POST",
        url: "http://siakad.itpa.ac.id/index.php?m=login&p=proses",
        data: qs.stringify({
          username: username,
          password: password
        }),
        headers: {
          Connection: "keep-alive",
          Referer: "http://siakad.itpa.ac.id/index.php",
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      })
      .then(({ data, headers }) => {
        let _$ = cheerio.load(data);
        cookies = headers["set-cookie"];
        axios
          .request({
            method: "GET",
            url: "http://siakad.itpa.ac.id/index.php?m=32",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
              Cookie: cookies,
            },
          })
          .then((data) => {
            let $ = cheerio.load(data.data);
            resolve({
                status: true,
                table: $('table.table > thead').html()
            })
          })
          .catch((er) => {
            resolve({
              status: false,
              message: "server error 1",
            });
          });
      })
      .catch((er) => {
        resolve({
          status: false,
          message: "server error 2",
        });
      });
  });
}
