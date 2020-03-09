"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uuid = require("uuid");

var _utils = require("./utils");

var defaults = {
  title: 'Untitled event',
  productId: 'the0neyouseek/ics',
  method: 'PUBLISH',
  uid: (0, _uuid.v1)(),
  timestamp: (0, _utils.formatDate)(),
  start: Date.now()
};
var _default = defaults;
exports["default"] = _default;