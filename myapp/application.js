const express = require("express");
const { indexRoute } = require("./index-route");
const { candidatesRoute } = require("./get-candidates");
const passport = require('passport');
const xsenv = require('@sap/xsenv');
const JWTStrategy = require('@sap/xssec').JWTStrategy;
// const xssec = require('@sap/xssec')


class App {
  constructor() {
    this.app = express();
    this.auth();
    this.config();
    this.routes();
  }

  auth() {
    const services = xsenv.getServices({ uaa: 'sfsdkuaa' });

    passport.use(new JWTStrategy(services.uaa));
    this.app.use(passport.initialize());
    this.app.use(passport.authenticate('JWT', { session: false }));
  }

  config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    const router = express.Router();
    router.get("/", indexRoute);
    router.get("/candidates", candidatesRoute);
    this.app.use("/", router);
  }
}

module.exports = new App().app;
