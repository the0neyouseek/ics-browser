"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatDate;

var _dateFnsTz = require("date-fns-tz");

function formatDate() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();
  return (0, _dateFnsTz.format)(date, "yyyyMMdd'T'HHmmssX", {
    timeZone: 'UTC'
  });
}