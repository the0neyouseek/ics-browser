"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatDate;

var _dateFns = require("date-fns");

function formatDate() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();
  return (0, _dateFns.format)(date, "yyyyMMdd'T'HHmm'00'") + 'Z';
}