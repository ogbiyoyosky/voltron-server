"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from "dotenv";
var bodyParser = require("body-parser");
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
var compression = require("compression");
var passport = require("passport");
var helmet = require("helmet");
var routes_1 = require("./routes");
var Express = /** @class */ (function () {
    function Express() {
        this.envFile = 'src/.env';
        this.app = express();
        this.setupEnv();
        this.initializePassport();
        this.setupMongo();
        this.setupMiddleware();
        this.setupRoutes();
    }
    Express.prototype.setupEnv = function () {
        // 
        // Add NODE_ENV to path if is not production
        // if (process.env.NODE_ENV !== 'production') this.envFile += '.' + process.env.NODE_ENV;
        // 
        // Set env from file
        require('dotenv').config();
    };
    Express.prototype.initializePassport = function () {
        this.app.use(passport.initialize());
    };
    Express.prototype.setupMongo = function () {
        var options = {
            autoIndex: false,
            reconnectInterval: 500,
            bufferMaxEntries: 0
        };
        // 
        // Connect to mongo using mongoose
        // @todo: fix "open()" DeprecationWarning warning
        mongoose.connect(process.env.MONGO_URI, options, function (err) {
            if (err) {
                console.log(err);
            }
        });
    };
    Express.prototype.setupRoutes = function () {
        new routes_1.default(this.app);
    };
    Express.prototype.setupMiddleware = function () {
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(compression());
    };
    return Express;
}());
exports.default = new Express().app;
//# sourceMappingURL=express.js.map