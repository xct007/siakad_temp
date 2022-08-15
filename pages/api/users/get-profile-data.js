const axios = require('axios')
const qs = require('qs')
const cheerio = require('cheerio')
const tabletojson = require('tabletojson').Tabletojson

export default function getData(req, res) {
  const username = req.query.username
  const password = req.query.password
  if (!username || !password) {
    res.status(200).json({
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
            let datas;
            let cv = tabletojson.convert(`<table>${$('table.table').html()}</table>`)
            datas = {
                nama: cv[0].[0].[2] || null,
                jurusan: cv[0].[0].[6] || null,
                nim: cv[0].[1].[2] || null,
                program_studi: cv[0].[1].[6] || null,
                angkatan: cv[0].[2].[2] || null,
                semester: cv[0].[2].[6] || null,
                batas_studi: cv[0].[3].[2] || null,
                tahun_ajaran: cv[0].[3].[6] || null
            }
            try {
              res.statusCode = 200;
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
      })
      .catch((er) => {
        return res.status(200).json({
          status: false,
          message: "server error 2",
        });
      });
  }
}
