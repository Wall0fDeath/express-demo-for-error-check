const express = require('express');
const userManager = require('express-user-manager');
const app = express();
const http = require("http");

userManager.config({

  password: { // {object} for password configuration
    minLength: 5, // minimum length of user passwords, default: 6,
    maxLength: 22, // maximum length of user passwords, default: 20
    disallowed: "", // comma-separated string or array of strings considered weak/non-secure passwords
  },
 
  routes: { // {object} for configuring custom routes, with members
    list: "/list", // specifies the path for getting users listing
  },

  db: { // {object} for configuring the database connection
    adapter: process.env.DB_ADAPTER, // the adapter to use. valid values include 'mongoose', 'sequelize'
    host: process.env.DB_HOST, // optional, default: 'localhost'
    port: process.env.DB_PORT, // optional
    user: process.env.DB_USERNAME, // optional
    pass: process.env.DB_PASSWORD, // optional
    engine: process.env.DB_ENGINE, // optional if the adapter is "mongoose" or if the value is "memory" and the adapter is "sequelize"; required otherwise
    dbName: process.env.DB_DBNAME, // optional, default: 'users'
    //storagePath: "users.db", // optional, required if "engine" is set to "sqlite"
    debug: process.env.DB_DEBUG, // optional, default: false
    // exitOnFail: EXIT_ON_DB_CONNECT_FAIL // optional, default: true

  },

  security: { // {object} for configuring security
    sessionSecret:   "eeb5Ooj6kahl0Choi1aiweyee7keCohGhae6seeyiePoht9b4", // a key for encrypting the session
    authTokenSecret: "eeb5Ooj6kahl0Choi1ahohQuai6Aghie5vaen5ciongieseGh", // a key for signing the authorization token
    authTokenExpiry: 5*60, // the expiry time of the authorization token (in seconds), example: 60 * 60 * 24
  }
});

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

// Bind the routes under [apiMountPoint] (default: ***/api/users***):
userManager.listen(app, apiMountPoint = '/api/users');

let hostname = "0.0.0.0";
let port = "8080";

process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});


(async function() {

  await userManager.getDbAdapter().connect();
  // Proceed with normal server initialization tasks
  

//   server.on('error', onError);
//   server.on('listening', onListening);
 })();


//  const server = http.createServer(app);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


// Optionally listen for and handle events
// (See the Emitted events section for more)
userManager.on("loginSuccess", function(data) {
  console.log(data)
});
module.exports = app;
