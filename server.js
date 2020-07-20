var express = require("express");
const https = require("https");
var Promise = require("bluebird");
var join = Promise.join;
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
  // To-Do: Move to ENV file
  let url = "https://ppipubsiteservices.azurewebsites.net/api/contacts/en";

  // Get current contacts data
  https
    .get(url, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        try {
          let json = JSON.parse(body);

          // Calling both search in parallel

          join(
            searchByOffice(json, req.query.query),
            searchByPerson(json, req.query.query),
            function (officeSearchResult, personSearchReult) {
              let response = {
                offices: officeSearchResult,
                contacts: personSearchReult,
              };
              resp.send(response);
            }
          );
        } catch (error) {
          console.error(error.message);
          resp.send(error);
        }
      });
    })
    .on("error", (error) => {
      console.error(error.message);
      resp.send(error);
    });
});

app.get("/", (req, res) => {
  res.send(
    "Welcome to contactsearch API. Please use proper url for results; eg: /api/contactsearch?query=ca or /api/contactsearch?query=sean"
  );
});

app.get("/api", (req, res) => {
  res.send("Welcome to contactsearch API. Please use proper url for results");
});

app.listen(55123);
