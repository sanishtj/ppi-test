var express = require("express");
const https = require("https");
var app = express();
const searchByOffice = require("./searchbyoffice");
const searchByPerson = require("./searchbycontactperson");

//Allow all requests from all domains & localhost
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.get("/api/contactsearch", function (req, resp) {
  let url = "https://ppipubsiteservices.azurewebsites.net/api/contacts/en";

  https
    .get(url, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        try {
          let json = JSON.parse(body);

          let officeSearchResult = searchByOffice(json, req.query.query);

          let personSearchReult = searchByPerson(json, req.query.query);

          let response = {offices:officeSearchResult,contacts: personSearchReult  };
          resp.send(response);
        } catch (error) {
          console.error(error.message);
        }
      });
    })
    .on("error", (error) => {
      console.error(error.message);
    });
});

app.get("/", (req, res) => {
  res.send("Welcome to contactsearch API. Please use proper url for results");
});

app.get("/api", (req, res) => {
  res.send("Welcome to contactsearch API. Please use proper url for results");
});

app.listen(55123);
