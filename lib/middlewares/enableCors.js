"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var enableCors = function enableCors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  next();
};

exports.default = enableCors;