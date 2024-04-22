/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

auth_token =
  "eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1dPUktBUkVBX1VTRVIiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiIyNDM5NzUyIiwicGluIjoiMDAwMCIsIm1lZGlhIjoxLCJkZWZhdWx0X2xhbmRpbmdwYWdlIjoibGljZW5zZWUiLCJlbWFpbCI6ImNocnJlbm91eEB5YWhvby5mciIsInBob25lIjoiMDc0OTE5NDAxOCIsInRva2VuX3NlY3VyaXplciI6bnVsbCwic2lnbl9pbl9zZWNvbmRfZmFjdG9yIjpmYWxzZSwiaXNfYWRtaW5fdXNlciI6ZmFsc2UsImlzX3ZhbGlkX2xpY2Vuc2UiOnRydWUsImlhdCI6MTY3NjgxOTQxNiwiZXhwIjozMTU1Mjc2ODE5NDE2LCJpc19mcm9tX2V4dGVybmFsX2FwaSI6ZmFsc2UsImd0bWNsaWVudGlkIjoiMCJ9.APMJKiStZDgkLTESRvJpS6cz67ZLLZXaHLMZoyqbEDTG7hs2NnI8HZZ6Kl8eZxjMt-TOZgYfiHnaX93zXUXFQ0b3BikSlbTJOl9bSZ56cnlGrKVeW39faW-JoUiXYHsg2UIwaiZfCCbDzKJhM4Bs2L3r0tlOV3ONxgNmbeRXEkafY7-VSTiq7NDU4HEPUNMjCNLU16a8H4N92WGykTntfgS81IJGswmtH3FkfKjvoncV_4Ph32Ik8JezqhO_SDKXFu4jnFHOr98W61KKrvgZsUb7ZjSnCS8WPHv60yor8xMJmV-Bl9YbydG0BRnn-NNvZvNPQkP047CGaLCqLQHNl0qmh3Hf6n4E5BGZ3yivtXtVqhGM3uITOiajoy8hBcku0s4fFnYf1pIExrA8NF9T5NVcaJMutNBPMop82IUThgiVFS1wAGhnubQCT3Qz9kvpB1hCRRtJHRBVxDU9wBodKX6QdjfbKA8InW-AiM2hlhNG-fuMU5nQGj-CGzPrriTST4UVKEST6sSFEBIdOiygYPgVwIXS1BCZz3NzBm36H7spu4TUf1nQj9F4QS7P8AoglakIuTcpxx2RzrJgEY5CVlwdTwuHfPw1x5Xqdd11-cABpV7X3aMKYaf4WM84WNUVuvyl4LtiNMO3zUaSk-mSqSTn2HsGbr9IR3S4WKF89EE";

headers = new Headers({
  "Content-Type": "application/json",
  Authorization: `Bearer ${this.auth_token}`,
});

requestapi = { headers: this.headers };

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const https = require("https");

function getAPI(api) {
  return new Promise((resolve, reject) => {
    const req = https.get(api, (res) => {
      let rawData = "";

      res.on("data", (chunk) => {
        rawData += chunk;
      });

      res.on("end", () => {
        if (res.statusCode !== 200) {
          console.log("rawData from ffb: 👉️", rawData);
          reject(new Error(rawData));
        }
        try {
          resolve(JSON.parse(rawData));
        } catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on("error", (err) => {
      reject(new Error(err));
    });
  });
}

function getPersonsSuchAs(username) {
  const api = {
    hostname: "api.ffbridge.fr",
    port: 443,
    path: "/api/v1/search-members?alive=1&search=" + username,
    // method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.auth_token}`,
    },
  };
  return getAPI(api);
}

function getPersonInfos(id) {
  const api = {
    hostname: "api.ffbridge.fr",
    port: 443,
    path: "/api/v1/members/" + id,
    // method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.auth_token}`,
    },
  };
  return getAPI(api);
}

function getMembers() {
  const api = {
    hostname: "api.ffbridge.fr",
    port: 443,
    path: "/api/v1/organizations/1438/members",
    // method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.auth_token}`,
    },
  };
  return getAPI(api);
}

function findNextTournaments() {
  const api = {
    hostname: "api.ffbridge.fr",
    port: 443,
    path: "/api/v1/organizations/1438/tournament",
    // method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.auth_token}`,
    },
  };
  return getAPI(api);
}

function findOneTournament(id) {
  const api = {
    hostname: "api.ffbridge.fr",
    port: 443,
    path: "/api/v1/organizations/1438/tournament/" + id,
    // method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.auth_token}`,
    },
  };
  return getAPI(api);
}

// @Get('persons/:search)
app.get("/ffb/persons", async function (req, res) {
  const search = req.query.search;
  try {
    const result = await getPersonsSuchAs(search);
    res.send(result);
  } catch (error) {
    err = JSON.parse(error.message);
    // console.log("Error code is: 👉️👉️", err);
    res.status(err.code).send(err.message);
  }
});

//@Get('persons/infos/:id')
app.get("/ffb/persons/infos", async function (req, res) {
  const id = req.query.id;
  try {
    const result = await getPersonInfos(id);
    res.send(result);
  } catch (error) {
    err = JSON.parse(error.message);
    res.status(err.code).send(err.message);
  }
});

//@Get('members')
app.get("/ffb/members", async function (req, res) {
  try {
    const result = await getMembers();
    res.send(result);
  } catch (error) {
    err = JSON.parse(error.message);
    res.status(err.code).send(err.message);
  }
});

//@Get('tournaments')
app.get("/ffb/tournaments", async function (req, res) {
  try {
    const result = await findNextTournaments();
    res.send(result);
  } catch (error) {
    err = JSON.parse(error.message);
    res.status(err.code).send(err.message);
  }
});

//  @Get('tournaments/:id')
app.get("/ffb/tournaments/id", async function (req, res) {
  const id = req.query.id;
  try {
    const result = await findOneTournament(id);
    res.send(result);
  } catch (error) {
    err = JSON.parse(error.message);
    res.status(err.code).send(err.message);
  }
});

// pong
app.get("/ffb/ping", function (req, res) {
  // Add your code here
  res.json({ success: "pong !", url: req.url });
});

app.get("*", function (req, res) {
  // Add your code here
  const url = req.url;
  res.status(400).send(url + " this get request is not supported ...");
});

app.post("*", function (req, res) {
  // Add your code here
  res.status(400).send("request not supported");
});

app.put("*", function (req, res) {
  res.status(400).send("request not supported");
});

app.delete("*", function (req, res) {
  res.status(400).send("request not supported");
});

app.listen(3000, function () {
  console.log("App started !");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file

module.exports = app;
