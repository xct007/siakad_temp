// http://siakad.itpa.ac.id/index.php?m=34

const axios = require('axios')
const qs = require('qs')
const cheerio = require('cheerio')

async function changePassword(cokie, pw0, pw1, pw2) {
    if (!cokie || !pw0 || !pw1 || !pw2) {
        return res.status(200).json({
            status: false
        })
    } else {
    axios
          .request({
            method: "POST",
            url: "http://siakad.itpa.ac.id/index.php?m=32",
            headers: {
                Connection: "keep-alive",
                Referer: "http://siakad.itpa.ac.id/index.php",
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "User-Agent": "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
                Cookie: cokie,
            },
            data: qs.stringify({
                password0: pw0,
                password1: pw1,
                password2: pw2,
                submit: ""
            }),
          })
          .then((data) => {
            let $ = cheerio.load(data.data);
            let datas = $('.sukses').html()
            try {
              res.statusCode = 200;
              res.setHeader('Access-Control-Allow-Origin', "*")
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Cache-Control', 'max-age=180000');
              res.end(JSON.stringify({
                status: true,
                result: datas
              }));
            } catch (errr) {
              res.json({
                status: false,
                message: 'server error 0'
              })
              res.status(405).end()
            }
          })
          .catch((er) => {
            return res.status(200).json({
              status: false,
              message: "server error 1",
            });
          });
    }
}

export default function getData(req, res) {
  const username = req.query.username
  const password = req.query.password
  const pw1 = req.query.pw1
  const pw2 = req.query.pw2
  if (!username || !password || !pw1 || !pw2) {
    return res.status(200).json({
      status: false
    })
  } else {
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
        changePassword(cookies ,password ,pw1 , pw2)
      })
      .catch((er) => {
        return res.status(200).json({
          status: false,
          message: "server error 1",
        });
      });
  }
}
