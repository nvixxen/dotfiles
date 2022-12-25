"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const obsidian = require("obsidian");
require("querystring");
var commonjsGlobal$1 = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var lib = {};
Object.defineProperty(lib, "__esModule", { value: true });
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof commonjsGlobal$1 !== "undefined" ? commonjsGlobal$1 : typeof self !== "undefined" ? self : {};
var luxon = {};
Object.defineProperty(luxon, "__esModule", { value: true });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance2 = new Constructor();
      if (Class2)
        _setPrototypeOf(instance2, Class2.prototype);
      return instance2;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n2 = Object.prototype.toString.call(o).slice(8, -1);
  if (n2 === "Object" && o.constructor)
    n2 = o.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it)
    return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it)
      o = it;
    var i = 0;
    return function() {
      if (i >= o.length)
        return {
          done: true
        };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var LuxonError = /* @__PURE__ */ function(_Error) {
  _inheritsLoose(LuxonError2, _Error);
  function LuxonError2() {
    return _Error.apply(this, arguments) || this;
  }
  return LuxonError2;
}(/* @__PURE__ */ _wrapNativeSuper(Error));
var InvalidDateTimeError = /* @__PURE__ */ function(_LuxonError) {
  _inheritsLoose(InvalidDateTimeError2, _LuxonError);
  function InvalidDateTimeError2(reason) {
    return _LuxonError.call(this, "Invalid DateTime: " + reason.toMessage()) || this;
  }
  return InvalidDateTimeError2;
}(LuxonError);
var InvalidIntervalError = /* @__PURE__ */ function(_LuxonError2) {
  _inheritsLoose(InvalidIntervalError2, _LuxonError2);
  function InvalidIntervalError2(reason) {
    return _LuxonError2.call(this, "Invalid Interval: " + reason.toMessage()) || this;
  }
  return InvalidIntervalError2;
}(LuxonError);
var InvalidDurationError = /* @__PURE__ */ function(_LuxonError3) {
  _inheritsLoose(InvalidDurationError2, _LuxonError3);
  function InvalidDurationError2(reason) {
    return _LuxonError3.call(this, "Invalid Duration: " + reason.toMessage()) || this;
  }
  return InvalidDurationError2;
}(LuxonError);
var ConflictingSpecificationError = /* @__PURE__ */ function(_LuxonError4) {
  _inheritsLoose(ConflictingSpecificationError2, _LuxonError4);
  function ConflictingSpecificationError2() {
    return _LuxonError4.apply(this, arguments) || this;
  }
  return ConflictingSpecificationError2;
}(LuxonError);
var InvalidUnitError = /* @__PURE__ */ function(_LuxonError5) {
  _inheritsLoose(InvalidUnitError2, _LuxonError5);
  function InvalidUnitError2(unit) {
    return _LuxonError5.call(this, "Invalid unit " + unit) || this;
  }
  return InvalidUnitError2;
}(LuxonError);
var InvalidArgumentError = /* @__PURE__ */ function(_LuxonError6) {
  _inheritsLoose(InvalidArgumentError2, _LuxonError6);
  function InvalidArgumentError2() {
    return _LuxonError6.apply(this, arguments) || this;
  }
  return InvalidArgumentError2;
}(LuxonError);
var ZoneIsAbstractError = /* @__PURE__ */ function(_LuxonError7) {
  _inheritsLoose(ZoneIsAbstractError2, _LuxonError7);
  function ZoneIsAbstractError2() {
    return _LuxonError7.call(this, "Zone is an abstract class") || this;
  }
  return ZoneIsAbstractError2;
}(LuxonError);
var n = "numeric", s = "short", l = "long";
var DATE_SHORT = {
  year: n,
  month: n,
  day: n
};
var DATE_MED = {
  year: n,
  month: s,
  day: n
};
var DATE_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s
};
var DATE_FULL = {
  year: n,
  month: l,
  day: n
};
var DATE_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l
};
var TIME_SIMPLE = {
  hour: n,
  minute: n
};
var TIME_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n
};
var TIME_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
var TIME_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};
var TIME_24_SIMPLE = {
  hour: n,
  minute: n,
  hourCycle: "h23"
};
var TIME_24_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23"
};
var TIME_24_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: s
};
var TIME_24_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: l
};
var DATETIME_SHORT = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n
};
var DATETIME_SHORT_WITH_SECONDS = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n,
  second: n
};
var DATETIME_MED = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n
};
var DATETIME_MED_WITH_SECONDS = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n,
  second: n
};
var DATETIME_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s,
  hour: n,
  minute: n
};
var DATETIME_FULL = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  timeZoneName: s
};
var DATETIME_FULL_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
var DATETIME_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  timeZoneName: l
};
var DATETIME_HUGE_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};
function isUndefined(o) {
  return typeof o === "undefined";
}
function isNumber(o) {
  return typeof o === "number";
}
function isInteger(o) {
  return typeof o === "number" && o % 1 === 0;
}
function isString(o) {
  return typeof o === "string";
}
function isDate(o) {
  return Object.prototype.toString.call(o) === "[object Date]";
}
function hasRelative() {
  try {
    return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
  } catch (e) {
    return false;
  }
}
function maybeArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
}
function bestBy(arr, by, compare) {
  if (arr.length === 0) {
    return void 0;
  }
  return arr.reduce(function(best, next) {
    var pair = [by(next), next];
    if (!best) {
      return pair;
    } else if (compare(best[0], pair[0]) === best[0]) {
      return best;
    } else {
      return pair;
    }
  }, null)[1];
}
function pick(obj, keys) {
  return keys.reduce(function(a, k) {
    a[k] = obj[k];
    return a;
  }, {});
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function integerBetween(thing, bottom, top) {
  return isInteger(thing) && thing >= bottom && thing <= top;
}
function floorMod(x, n2) {
  return x - n2 * Math.floor(x / n2);
}
function padStart(input, n2) {
  if (n2 === void 0) {
    n2 = 2;
  }
  var isNeg = input < 0;
  var padded;
  if (isNeg) {
    padded = "-" + ("" + -input).padStart(n2, "0");
  } else {
    padded = ("" + input).padStart(n2, "0");
  }
  return padded;
}
function parseInteger(string) {
  if (isUndefined(string) || string === null || string === "") {
    return void 0;
  } else {
    return parseInt(string, 10);
  }
}
function parseFloating(string) {
  if (isUndefined(string) || string === null || string === "") {
    return void 0;
  } else {
    return parseFloat(string);
  }
}
function parseMillis(fraction) {
  if (isUndefined(fraction) || fraction === null || fraction === "") {
    return void 0;
  } else {
    var f = parseFloat("0." + fraction) * 1e3;
    return Math.floor(f);
  }
}
function roundTo(number, digits, towardZero) {
  if (towardZero === void 0) {
    towardZero = false;
  }
  var factor = Math.pow(10, digits), rounder = towardZero ? Math.trunc : Math.round;
  return rounder(number * factor) / factor;
}
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
function daysInMonth(year, month) {
  var modMonth = floorMod(month - 1, 12) + 1, modYear = year + (month - modMonth) / 12;
  if (modMonth === 2) {
    return isLeapYear(modYear) ? 29 : 28;
  } else {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
  }
}
function objToLocalTS(obj) {
  var d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond);
  if (obj.year < 100 && obj.year >= 0) {
    d = new Date(d);
    d.setUTCFullYear(d.getUTCFullYear() - 1900);
  }
  return +d;
}
function weeksInWeekYear(weekYear) {
  var p1 = (weekYear + Math.floor(weekYear / 4) - Math.floor(weekYear / 100) + Math.floor(weekYear / 400)) % 7, last = weekYear - 1, p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
  return p1 === 4 || p2 === 3 ? 53 : 52;
}
function untruncateYear(year) {
  if (year > 99) {
    return year;
  } else
    return year > 60 ? 1900 + year : 2e3 + year;
}
function parseZoneInfo(ts, offsetFormat, locale, timeZone) {
  if (timeZone === void 0) {
    timeZone = null;
  }
  var date = new Date(ts), intlOpts = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  if (timeZone) {
    intlOpts.timeZone = timeZone;
  }
  var modified = _extends({
    timeZoneName: offsetFormat
  }, intlOpts);
  var parsed = new Intl.DateTimeFormat(locale, modified).formatToParts(date).find(function(m) {
    return m.type.toLowerCase() === "timezonename";
  });
  return parsed ? parsed.value : null;
}
function signedOffset(offHourStr, offMinuteStr) {
  var offHour = parseInt(offHourStr, 10);
  if (Number.isNaN(offHour)) {
    offHour = 0;
  }
  var offMin = parseInt(offMinuteStr, 10) || 0, offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
  return offHour * 60 + offMinSigned;
}
function asNumber(value) {
  var numericValue = Number(value);
  if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue))
    throw new InvalidArgumentError("Invalid unit value " + value);
  return numericValue;
}
function normalizeObject(obj, normalizer) {
  var normalized = {};
  for (var u in obj) {
    if (hasOwnProperty(obj, u)) {
      var v = obj[u];
      if (v === void 0 || v === null)
        continue;
      normalized[normalizer(u)] = asNumber(v);
    }
  }
  return normalized;
}
function formatOffset(offset2, format) {
  var hours = Math.trunc(Math.abs(offset2 / 60)), minutes = Math.trunc(Math.abs(offset2 % 60)), sign = offset2 >= 0 ? "+" : "-";
  switch (format) {
    case "short":
      return "" + sign + padStart(hours, 2) + ":" + padStart(minutes, 2);
    case "narrow":
      return "" + sign + hours + (minutes > 0 ? ":" + minutes : "");
    case "techie":
      return "" + sign + padStart(hours, 2) + padStart(minutes, 2);
    default:
      throw new RangeError("Value format " + format + " is out of range for property format");
  }
}
function timeObject(obj) {
  return pick(obj, ["hour", "minute", "second", "millisecond"]);
}
var ianaRegex = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
var monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function months(length) {
  switch (length) {
    case "narrow":
      return [].concat(monthsNarrow);
    case "short":
      return [].concat(monthsShort);
    case "long":
      return [].concat(monthsLong);
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
var weekdaysLong = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
function weekdays(length) {
  switch (length) {
    case "narrow":
      return [].concat(weekdaysNarrow);
    case "short":
      return [].concat(weekdaysShort);
    case "long":
      return [].concat(weekdaysLong);
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
var meridiems = ["AM", "PM"];
var erasLong = ["Before Christ", "Anno Domini"];
var erasShort = ["BC", "AD"];
var erasNarrow = ["B", "A"];
function eras(length) {
  switch (length) {
    case "narrow":
      return [].concat(erasNarrow);
    case "short":
      return [].concat(erasShort);
    case "long":
      return [].concat(erasLong);
    default:
      return null;
  }
}
function meridiemForDateTime(dt) {
  return meridiems[dt.hour < 12 ? 0 : 1];
}
function weekdayForDateTime(dt, length) {
  return weekdays(length)[dt.weekday - 1];
}
function monthForDateTime(dt, length) {
  return months(length)[dt.month - 1];
}
function eraForDateTime(dt, length) {
  return eras(length)[dt.year < 0 ? 0 : 1];
}
function formatRelativeTime(unit, count, numeric, narrow) {
  if (numeric === void 0) {
    numeric = "always";
  }
  if (narrow === void 0) {
    narrow = false;
  }
  var units = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  };
  var lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;
  if (numeric === "auto" && lastable) {
    var isDay = unit === "days";
    switch (count) {
      case 1:
        return isDay ? "tomorrow" : "next " + units[unit][0];
      case -1:
        return isDay ? "yesterday" : "last " + units[unit][0];
      case 0:
        return isDay ? "today" : "this " + units[unit][0];
    }
  }
  var isInPast = Object.is(count, -0) || count < 0, fmtValue = Math.abs(count), singular = fmtValue === 1, lilUnits = units[unit], fmtUnit = narrow ? singular ? lilUnits[1] : lilUnits[2] || lilUnits[1] : singular ? units[unit][0] : unit;
  return isInPast ? fmtValue + " " + fmtUnit + " ago" : "in " + fmtValue + " " + fmtUnit;
}
function stringifyTokens(splits, tokenToString) {
  var s2 = "";
  for (var _iterator = _createForOfIteratorHelperLoose(splits), _step; !(_step = _iterator()).done; ) {
    var token = _step.value;
    if (token.literal) {
      s2 += token.val;
    } else {
      s2 += tokenToString(token.val);
    }
  }
  return s2;
}
var _macroTokenToFormatOpts = {
  D: DATE_SHORT,
  DD: DATE_MED,
  DDD: DATE_FULL,
  DDDD: DATE_HUGE,
  t: TIME_SIMPLE,
  tt: TIME_WITH_SECONDS,
  ttt: TIME_WITH_SHORT_OFFSET,
  tttt: TIME_WITH_LONG_OFFSET,
  T: TIME_24_SIMPLE,
  TT: TIME_24_WITH_SECONDS,
  TTT: TIME_24_WITH_SHORT_OFFSET,
  TTTT: TIME_24_WITH_LONG_OFFSET,
  f: DATETIME_SHORT,
  ff: DATETIME_MED,
  fff: DATETIME_FULL,
  ffff: DATETIME_HUGE,
  F: DATETIME_SHORT_WITH_SECONDS,
  FF: DATETIME_MED_WITH_SECONDS,
  FFF: DATETIME_FULL_WITH_SECONDS,
  FFFF: DATETIME_HUGE_WITH_SECONDS
};
var Formatter = /* @__PURE__ */ function() {
  Formatter2.create = function create(locale, opts) {
    if (opts === void 0) {
      opts = {};
    }
    return new Formatter2(locale, opts);
  };
  Formatter2.parseFormat = function parseFormat(fmt) {
    var current = null, currentFull = "", bracketed = false;
    var splits = [];
    for (var i = 0; i < fmt.length; i++) {
      var c = fmt.charAt(i);
      if (c === "'") {
        if (currentFull.length > 0) {
          splits.push({
            literal: bracketed,
            val: currentFull
          });
        }
        current = null;
        currentFull = "";
        bracketed = !bracketed;
      } else if (bracketed) {
        currentFull += c;
      } else if (c === current) {
        currentFull += c;
      } else {
        if (currentFull.length > 0) {
          splits.push({
            literal: false,
            val: currentFull
          });
        }
        currentFull = c;
        current = c;
      }
    }
    if (currentFull.length > 0) {
      splits.push({
        literal: bracketed,
        val: currentFull
      });
    }
    return splits;
  };
  Formatter2.macroTokenToFormatOpts = function macroTokenToFormatOpts(token) {
    return _macroTokenToFormatOpts[token];
  };
  function Formatter2(locale, formatOpts) {
    this.opts = formatOpts;
    this.loc = locale;
    this.systemLoc = null;
  }
  var _proto = Formatter2.prototype;
  _proto.formatWithSystemDefault = function formatWithSystemDefault(dt, opts) {
    if (this.systemLoc === null) {
      this.systemLoc = this.loc.redefaultToSystem();
    }
    var df = this.systemLoc.dtFormatter(dt, _extends({}, this.opts, opts));
    return df.format();
  };
  _proto.formatDateTime = function formatDateTime(dt, opts) {
    if (opts === void 0) {
      opts = {};
    }
    var df = this.loc.dtFormatter(dt, _extends({}, this.opts, opts));
    return df.format();
  };
  _proto.formatDateTimeParts = function formatDateTimeParts(dt, opts) {
    if (opts === void 0) {
      opts = {};
    }
    var df = this.loc.dtFormatter(dt, _extends({}, this.opts, opts));
    return df.formatToParts();
  };
  _proto.resolvedOptions = function resolvedOptions(dt, opts) {
    if (opts === void 0) {
      opts = {};
    }
    var df = this.loc.dtFormatter(dt, _extends({}, this.opts, opts));
    return df.resolvedOptions();
  };
  _proto.num = function num(n2, p) {
    if (p === void 0) {
      p = 0;
    }
    if (this.opts.forceSimple) {
      return padStart(n2, p);
    }
    var opts = _extends({}, this.opts);
    if (p > 0) {
      opts.padTo = p;
    }
    return this.loc.numberFormatter(opts).format(n2);
  };
  _proto.formatDateTimeFromString = function formatDateTimeFromString(dt, fmt) {
    var _this = this;
    var knownEnglish = this.loc.listingMode() === "en", useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", string = function string2(opts, extract) {
      return _this.loc.extract(dt, opts, extract);
    }, formatOffset2 = function formatOffset3(opts) {
      if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
        return "Z";
      }
      return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
    }, meridiem = function meridiem2() {
      return knownEnglish ? meridiemForDateTime(dt) : string({
        hour: "numeric",
        hourCycle: "h12"
      }, "dayperiod");
    }, month = function month2(length, standalone) {
      return knownEnglish ? monthForDateTime(dt, length) : string(standalone ? {
        month: length
      } : {
        month: length,
        day: "numeric"
      }, "month");
    }, weekday = function weekday2(length, standalone) {
      return knownEnglish ? weekdayForDateTime(dt, length) : string(standalone ? {
        weekday: length
      } : {
        weekday: length,
        month: "long",
        day: "numeric"
      }, "weekday");
    }, maybeMacro = function maybeMacro2(token) {
      var formatOpts = Formatter2.macroTokenToFormatOpts(token);
      if (formatOpts) {
        return _this.formatWithSystemDefault(dt, formatOpts);
      } else {
        return token;
      }
    }, era = function era2(length) {
      return knownEnglish ? eraForDateTime(dt, length) : string({
        era: length
      }, "era");
    }, tokenToString = function tokenToString2(token) {
      switch (token) {
        case "S":
          return _this.num(dt.millisecond);
        case "u":
        case "SSS":
          return _this.num(dt.millisecond, 3);
        case "s":
          return _this.num(dt.second);
        case "ss":
          return _this.num(dt.second, 2);
        case "uu":
          return _this.num(Math.floor(dt.millisecond / 10), 2);
        case "uuu":
          return _this.num(Math.floor(dt.millisecond / 100));
        case "m":
          return _this.num(dt.minute);
        case "mm":
          return _this.num(dt.minute, 2);
        case "h":
          return _this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
        case "hh":
          return _this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
        case "H":
          return _this.num(dt.hour);
        case "HH":
          return _this.num(dt.hour, 2);
        case "Z":
          return formatOffset2({
            format: "narrow",
            allowZ: _this.opts.allowZ
          });
        case "ZZ":
          return formatOffset2({
            format: "short",
            allowZ: _this.opts.allowZ
          });
        case "ZZZ":
          return formatOffset2({
            format: "techie",
            allowZ: _this.opts.allowZ
          });
        case "ZZZZ":
          return dt.zone.offsetName(dt.ts, {
            format: "short",
            locale: _this.loc.locale
          });
        case "ZZZZZ":
          return dt.zone.offsetName(dt.ts, {
            format: "long",
            locale: _this.loc.locale
          });
        case "z":
          return dt.zoneName;
        case "a":
          return meridiem();
        case "d":
          return useDateTimeFormatter ? string({
            day: "numeric"
          }, "day") : _this.num(dt.day);
        case "dd":
          return useDateTimeFormatter ? string({
            day: "2-digit"
          }, "day") : _this.num(dt.day, 2);
        case "c":
          return _this.num(dt.weekday);
        case "ccc":
          return weekday("short", true);
        case "cccc":
          return weekday("long", true);
        case "ccccc":
          return weekday("narrow", true);
        case "E":
          return _this.num(dt.weekday);
        case "EEE":
          return weekday("short", false);
        case "EEEE":
          return weekday("long", false);
        case "EEEEE":
          return weekday("narrow", false);
        case "L":
          return useDateTimeFormatter ? string({
            month: "numeric",
            day: "numeric"
          }, "month") : _this.num(dt.month);
        case "LL":
          return useDateTimeFormatter ? string({
            month: "2-digit",
            day: "numeric"
          }, "month") : _this.num(dt.month, 2);
        case "LLL":
          return month("short", true);
        case "LLLL":
          return month("long", true);
        case "LLLLL":
          return month("narrow", true);
        case "M":
          return useDateTimeFormatter ? string({
            month: "numeric"
          }, "month") : _this.num(dt.month);
        case "MM":
          return useDateTimeFormatter ? string({
            month: "2-digit"
          }, "month") : _this.num(dt.month, 2);
        case "MMM":
          return month("short", false);
        case "MMMM":
          return month("long", false);
        case "MMMMM":
          return month("narrow", false);
        case "y":
          return useDateTimeFormatter ? string({
            year: "numeric"
          }, "year") : _this.num(dt.year);
        case "yy":
          return useDateTimeFormatter ? string({
            year: "2-digit"
          }, "year") : _this.num(dt.year.toString().slice(-2), 2);
        case "yyyy":
          return useDateTimeFormatter ? string({
            year: "numeric"
          }, "year") : _this.num(dt.year, 4);
        case "yyyyyy":
          return useDateTimeFormatter ? string({
            year: "numeric"
          }, "year") : _this.num(dt.year, 6);
        case "G":
          return era("short");
        case "GG":
          return era("long");
        case "GGGGG":
          return era("narrow");
        case "kk":
          return _this.num(dt.weekYear.toString().slice(-2), 2);
        case "kkkk":
          return _this.num(dt.weekYear, 4);
        case "W":
          return _this.num(dt.weekNumber);
        case "WW":
          return _this.num(dt.weekNumber, 2);
        case "o":
          return _this.num(dt.ordinal);
        case "ooo":
          return _this.num(dt.ordinal, 3);
        case "q":
          return _this.num(dt.quarter);
        case "qq":
          return _this.num(dt.quarter, 2);
        case "X":
          return _this.num(Math.floor(dt.ts / 1e3));
        case "x":
          return _this.num(dt.ts);
        default:
          return maybeMacro(token);
      }
    };
    return stringifyTokens(Formatter2.parseFormat(fmt), tokenToString);
  };
  _proto.formatDurationFromString = function formatDurationFromString(dur, fmt) {
    var _this2 = this;
    var tokenToField = function tokenToField2(token) {
      switch (token[0]) {
        case "S":
          return "millisecond";
        case "s":
          return "second";
        case "m":
          return "minute";
        case "h":
          return "hour";
        case "d":
          return "day";
        case "w":
          return "week";
        case "M":
          return "month";
        case "y":
          return "year";
        default:
          return null;
      }
    }, tokenToString = function tokenToString2(lildur) {
      return function(token) {
        var mapped = tokenToField(token);
        if (mapped) {
          return _this2.num(lildur.get(mapped), token.length);
        } else {
          return token;
        }
      };
    }, tokens = Formatter2.parseFormat(fmt), realTokens = tokens.reduce(function(found, _ref) {
      var literal = _ref.literal, val = _ref.val;
      return literal ? found : found.concat(val);
    }, []), collapsed = dur.shiftTo.apply(dur, realTokens.map(tokenToField).filter(function(t) {
      return t;
    }));
    return stringifyTokens(tokens, tokenToString(collapsed));
  };
  return Formatter2;
}();
var Invalid = /* @__PURE__ */ function() {
  function Invalid2(reason, explanation) {
    this.reason = reason;
    this.explanation = explanation;
  }
  var _proto = Invalid2.prototype;
  _proto.toMessage = function toMessage() {
    if (this.explanation) {
      return this.reason + ": " + this.explanation;
    } else {
      return this.reason;
    }
  };
  return Invalid2;
}();
var Zone = /* @__PURE__ */ function() {
  function Zone2() {
  }
  var _proto = Zone2.prototype;
  _proto.offsetName = function offsetName(ts, opts) {
    throw new ZoneIsAbstractError();
  };
  _proto.formatOffset = function formatOffset2(ts, format) {
    throw new ZoneIsAbstractError();
  };
  _proto.offset = function offset2(ts) {
    throw new ZoneIsAbstractError();
  };
  _proto.equals = function equals(otherZone) {
    throw new ZoneIsAbstractError();
  };
  _createClass(Zone2, [{
    key: "type",
    get: function get() {
      throw new ZoneIsAbstractError();
    }
  }, {
    key: "name",
    get: function get() {
      throw new ZoneIsAbstractError();
    }
  }, {
    key: "ianaName",
    get: function get() {
      return this.name;
    }
  }, {
    key: "isUniversal",
    get: function get() {
      throw new ZoneIsAbstractError();
    }
  }, {
    key: "isValid",
    get: function get() {
      throw new ZoneIsAbstractError();
    }
  }]);
  return Zone2;
}();
var singleton$1 = null;
var SystemZone = /* @__PURE__ */ function(_Zone) {
  _inheritsLoose(SystemZone2, _Zone);
  function SystemZone2() {
    return _Zone.apply(this, arguments) || this;
  }
  var _proto = SystemZone2.prototype;
  _proto.offsetName = function offsetName(ts, _ref) {
    var format = _ref.format, locale = _ref.locale;
    return parseZoneInfo(ts, format, locale);
  };
  _proto.formatOffset = function formatOffset$1(ts, format) {
    return formatOffset(this.offset(ts), format);
  };
  _proto.offset = function offset2(ts) {
    return -new Date(ts).getTimezoneOffset();
  };
  _proto.equals = function equals(otherZone) {
    return otherZone.type === "system";
  };
  _createClass(SystemZone2, [{
    key: "type",
    get: function get() {
      return "system";
    }
  }, {
    key: "name",
    get: function get() {
      return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
  }, {
    key: "isUniversal",
    get: function get() {
      return false;
    }
  }, {
    key: "isValid",
    get: function get() {
      return true;
    }
  }], [{
    key: "instance",
    get: function get() {
      if (singleton$1 === null) {
        singleton$1 = new SystemZone2();
      }
      return singleton$1;
    }
  }]);
  return SystemZone2;
}(Zone);
var dtfCache = {};
function makeDTF(zone) {
  if (!dtfCache[zone]) {
    dtfCache[zone] = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      era: "short"
    });
  }
  return dtfCache[zone];
}
var typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function hackyOffset(dtf, date) {
  var formatted = dtf.format(date).replace(/\u200E/g, ""), parsed = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(formatted), fMonth = parsed[1], fDay = parsed[2], fYear = parsed[3], fadOrBc = parsed[4], fHour = parsed[5], fMinute = parsed[6], fSecond = parsed[7];
  return [fYear, fMonth, fDay, fadOrBc, fHour, fMinute, fSecond];
}
function partsOffset(dtf, date) {
  var formatted = dtf.formatToParts(date);
  var filled = [];
  for (var i = 0; i < formatted.length; i++) {
    var _formatted$i = formatted[i], type = _formatted$i.type, value = _formatted$i.value;
    var pos = typeToPos[type];
    if (type === "era") {
      filled[pos] = value;
    } else if (!isUndefined(pos)) {
      filled[pos] = parseInt(value, 10);
    }
  }
  return filled;
}
var ianaZoneCache = {};
var IANAZone = /* @__PURE__ */ function(_Zone) {
  _inheritsLoose(IANAZone2, _Zone);
  IANAZone2.create = function create(name) {
    if (!ianaZoneCache[name]) {
      ianaZoneCache[name] = new IANAZone2(name);
    }
    return ianaZoneCache[name];
  };
  IANAZone2.resetCache = function resetCache() {
    ianaZoneCache = {};
    dtfCache = {};
  };
  IANAZone2.isValidSpecifier = function isValidSpecifier(s2) {
    return this.isValidZone(s2);
  };
  IANAZone2.isValidZone = function isValidZone(zone) {
    if (!zone) {
      return false;
    }
    try {
      new Intl.DateTimeFormat("en-US", {
        timeZone: zone
      }).format();
      return true;
    } catch (e) {
      return false;
    }
  };
  function IANAZone2(name) {
    var _this;
    _this = _Zone.call(this) || this;
    _this.zoneName = name;
    _this.valid = IANAZone2.isValidZone(name);
    return _this;
  }
  var _proto = IANAZone2.prototype;
  _proto.offsetName = function offsetName(ts, _ref) {
    var format = _ref.format, locale = _ref.locale;
    return parseZoneInfo(ts, format, locale, this.name);
  };
  _proto.formatOffset = function formatOffset$1(ts, format) {
    return formatOffset(this.offset(ts), format);
  };
  _proto.offset = function offset2(ts) {
    var date = new Date(ts);
    if (isNaN(date))
      return NaN;
    var dtf = makeDTF(this.name);
    var _ref2 = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date), year = _ref2[0], month = _ref2[1], day = _ref2[2], adOrBc = _ref2[3], hour = _ref2[4], minute = _ref2[5], second = _ref2[6];
    if (adOrBc === "BC") {
      year = -Math.abs(year) + 1;
    }
    var adjustedHour = hour === 24 ? 0 : hour;
    var asUTC = objToLocalTS({
      year,
      month,
      day,
      hour: adjustedHour,
      minute,
      second,
      millisecond: 0
    });
    var asTS = +date;
    var over = asTS % 1e3;
    asTS -= over >= 0 ? over : 1e3 + over;
    return (asUTC - asTS) / (60 * 1e3);
  };
  _proto.equals = function equals(otherZone) {
    return otherZone.type === "iana" && otherZone.name === this.name;
  };
  _createClass(IANAZone2, [{
    key: "type",
    get: function get() {
      return "iana";
    }
  }, {
    key: "name",
    get: function get() {
      return this.zoneName;
    }
  }, {
    key: "isUniversal",
    get: function get() {
      return false;
    }
  }, {
    key: "isValid",
    get: function get() {
      return this.valid;
    }
  }]);
  return IANAZone2;
}(Zone);
var singleton = null;
var FixedOffsetZone = /* @__PURE__ */ function(_Zone) {
  _inheritsLoose(FixedOffsetZone2, _Zone);
  FixedOffsetZone2.instance = function instance2(offset2) {
    return offset2 === 0 ? FixedOffsetZone2.utcInstance : new FixedOffsetZone2(offset2);
  };
  FixedOffsetZone2.parseSpecifier = function parseSpecifier(s2) {
    if (s2) {
      var r = s2.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (r) {
        return new FixedOffsetZone2(signedOffset(r[1], r[2]));
      }
    }
    return null;
  };
  function FixedOffsetZone2(offset2) {
    var _this;
    _this = _Zone.call(this) || this;
    _this.fixed = offset2;
    return _this;
  }
  var _proto = FixedOffsetZone2.prototype;
  _proto.offsetName = function offsetName() {
    return this.name;
  };
  _proto.formatOffset = function formatOffset$1(ts, format) {
    return formatOffset(this.fixed, format);
  };
  _proto.offset = function offset2() {
    return this.fixed;
  };
  _proto.equals = function equals(otherZone) {
    return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
  };
  _createClass(FixedOffsetZone2, [{
    key: "type",
    get: function get() {
      return "fixed";
    }
  }, {
    key: "name",
    get: function get() {
      return this.fixed === 0 ? "UTC" : "UTC" + formatOffset(this.fixed, "narrow");
    }
  }, {
    key: "ianaName",
    get: function get() {
      if (this.fixed === 0) {
        return "Etc/UTC";
      } else {
        return "Etc/GMT" + formatOffset(-this.fixed, "narrow");
      }
    }
  }, {
    key: "isUniversal",
    get: function get() {
      return true;
    }
  }, {
    key: "isValid",
    get: function get() {
      return true;
    }
  }], [{
    key: "utcInstance",
    get: function get() {
      if (singleton === null) {
        singleton = new FixedOffsetZone2(0);
      }
      return singleton;
    }
  }]);
  return FixedOffsetZone2;
}(Zone);
var InvalidZone = /* @__PURE__ */ function(_Zone) {
  _inheritsLoose(InvalidZone2, _Zone);
  function InvalidZone2(zoneName) {
    var _this;
    _this = _Zone.call(this) || this;
    _this.zoneName = zoneName;
    return _this;
  }
  var _proto = InvalidZone2.prototype;
  _proto.offsetName = function offsetName() {
    return null;
  };
  _proto.formatOffset = function formatOffset2() {
    return "";
  };
  _proto.offset = function offset2() {
    return NaN;
  };
  _proto.equals = function equals() {
    return false;
  };
  _createClass(InvalidZone2, [{
    key: "type",
    get: function get() {
      return "invalid";
    }
  }, {
    key: "name",
    get: function get() {
      return this.zoneName;
    }
  }, {
    key: "isUniversal",
    get: function get() {
      return false;
    }
  }, {
    key: "isValid",
    get: function get() {
      return false;
    }
  }]);
  return InvalidZone2;
}(Zone);
function normalizeZone(input, defaultZone2) {
  if (isUndefined(input) || input === null) {
    return defaultZone2;
  } else if (input instanceof Zone) {
    return input;
  } else if (isString(input)) {
    var lowered = input.toLowerCase();
    if (lowered === "local" || lowered === "system")
      return defaultZone2;
    else if (lowered === "utc" || lowered === "gmt")
      return FixedOffsetZone.utcInstance;
    else
      return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
  } else if (isNumber(input)) {
    return FixedOffsetZone.instance(input);
  } else if (typeof input === "object" && input.offset && typeof input.offset === "number") {
    return input;
  } else {
    return new InvalidZone(input);
  }
}
var now = function now2() {
  return Date.now();
}, defaultZone = "system", defaultLocale = null, defaultNumberingSystem = null, defaultOutputCalendar = null, throwOnInvalid;
var Settings = /* @__PURE__ */ function() {
  function Settings2() {
  }
  Settings2.resetCaches = function resetCaches() {
    Locale.resetCache();
    IANAZone.resetCache();
  };
  _createClass(Settings2, null, [{
    key: "now",
    get: function get() {
      return now;
    },
    set: function set(n2) {
      now = n2;
    }
  }, {
    key: "defaultZone",
    get: function get() {
      return normalizeZone(defaultZone, SystemZone.instance);
    },
    set: function set(zone) {
      defaultZone = zone;
    }
  }, {
    key: "defaultLocale",
    get: function get() {
      return defaultLocale;
    },
    set: function set(locale) {
      defaultLocale = locale;
    }
  }, {
    key: "defaultNumberingSystem",
    get: function get() {
      return defaultNumberingSystem;
    },
    set: function set(numberingSystem) {
      defaultNumberingSystem = numberingSystem;
    }
  }, {
    key: "defaultOutputCalendar",
    get: function get() {
      return defaultOutputCalendar;
    },
    set: function set(outputCalendar) {
      defaultOutputCalendar = outputCalendar;
    }
  }, {
    key: "throwOnInvalid",
    get: function get() {
      return throwOnInvalid;
    },
    set: function set(t) {
      throwOnInvalid = t;
    }
  }]);
  return Settings2;
}();
var _excluded = ["base"], _excluded2 = ["padTo", "floor"];
var intlLFCache = {};
function getCachedLF(locString, opts) {
  if (opts === void 0) {
    opts = {};
  }
  var key = JSON.stringify([locString, opts]);
  var dtf = intlLFCache[key];
  if (!dtf) {
    dtf = new Intl.ListFormat(locString, opts);
    intlLFCache[key] = dtf;
  }
  return dtf;
}
var intlDTCache = {};
function getCachedDTF(locString, opts) {
  if (opts === void 0) {
    opts = {};
  }
  var key = JSON.stringify([locString, opts]);
  var dtf = intlDTCache[key];
  if (!dtf) {
    dtf = new Intl.DateTimeFormat(locString, opts);
    intlDTCache[key] = dtf;
  }
  return dtf;
}
var intlNumCache = {};
function getCachedINF(locString, opts) {
  if (opts === void 0) {
    opts = {};
  }
  var key = JSON.stringify([locString, opts]);
  var inf = intlNumCache[key];
  if (!inf) {
    inf = new Intl.NumberFormat(locString, opts);
    intlNumCache[key] = inf;
  }
  return inf;
}
var intlRelCache = {};
function getCachedRTF(locString, opts) {
  if (opts === void 0) {
    opts = {};
  }
  var _opts = opts;
  _opts.base;
  var cacheKeyOpts = _objectWithoutPropertiesLoose(_opts, _excluded);
  var key = JSON.stringify([locString, cacheKeyOpts]);
  var inf = intlRelCache[key];
  if (!inf) {
    inf = new Intl.RelativeTimeFormat(locString, opts);
    intlRelCache[key] = inf;
  }
  return inf;
}
var sysLocaleCache = null;
function systemLocale() {
  if (sysLocaleCache) {
    return sysLocaleCache;
  } else {
    sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
    return sysLocaleCache;
  }
}
function parseLocaleString(localeStr) {
  var uIndex = localeStr.indexOf("-u-");
  if (uIndex === -1) {
    return [localeStr];
  } else {
    var options;
    var smaller = localeStr.substring(0, uIndex);
    try {
      options = getCachedDTF(localeStr).resolvedOptions();
    } catch (e) {
      options = getCachedDTF(smaller).resolvedOptions();
    }
    var _options = options, numberingSystem = _options.numberingSystem, calendar = _options.calendar;
    return [smaller, numberingSystem, calendar];
  }
}
function intlConfigString(localeStr, numberingSystem, outputCalendar) {
  if (outputCalendar || numberingSystem) {
    localeStr += "-u";
    if (outputCalendar) {
      localeStr += "-ca-" + outputCalendar;
    }
    if (numberingSystem) {
      localeStr += "-nu-" + numberingSystem;
    }
    return localeStr;
  } else {
    return localeStr;
  }
}
function mapMonths(f) {
  var ms = [];
  for (var i = 1; i <= 12; i++) {
    var dt = DateTime.utc(2016, i, 1);
    ms.push(f(dt));
  }
  return ms;
}
function mapWeekdays(f) {
  var ms = [];
  for (var i = 1; i <= 7; i++) {
    var dt = DateTime.utc(2016, 11, 13 + i);
    ms.push(f(dt));
  }
  return ms;
}
function listStuff(loc, length, defaultOK, englishFn, intlFn) {
  var mode = loc.listingMode(defaultOK);
  if (mode === "error") {
    return null;
  } else if (mode === "en") {
    return englishFn(length);
  } else {
    return intlFn(length);
  }
}
function supportsFastNumbers(loc) {
  if (loc.numberingSystem && loc.numberingSystem !== "latn") {
    return false;
  } else {
    return loc.numberingSystem === "latn" || !loc.locale || loc.locale.startsWith("en") || new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn";
  }
}
var PolyNumberFormatter = /* @__PURE__ */ function() {
  function PolyNumberFormatter2(intl, forceSimple, opts) {
    this.padTo = opts.padTo || 0;
    this.floor = opts.floor || false;
    opts.padTo;
    opts.floor;
    var otherOpts = _objectWithoutPropertiesLoose(opts, _excluded2);
    if (!forceSimple || Object.keys(otherOpts).length > 0) {
      var intlOpts = _extends({
        useGrouping: false
      }, opts);
      if (opts.padTo > 0)
        intlOpts.minimumIntegerDigits = opts.padTo;
      this.inf = getCachedINF(intl, intlOpts);
    }
  }
  var _proto = PolyNumberFormatter2.prototype;
  _proto.format = function format(i) {
    if (this.inf) {
      var fixed = this.floor ? Math.floor(i) : i;
      return this.inf.format(fixed);
    } else {
      var _fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
      return padStart(_fixed, this.padTo);
    }
  };
  return PolyNumberFormatter2;
}();
var PolyDateFormatter = /* @__PURE__ */ function() {
  function PolyDateFormatter2(dt, intl, opts) {
    this.opts = opts;
    var z;
    if (dt.zone.isUniversal) {
      var gmtOffset = -1 * (dt.offset / 60);
      var offsetZ = gmtOffset >= 0 ? "Etc/GMT+" + gmtOffset : "Etc/GMT" + gmtOffset;
      if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
        z = offsetZ;
        this.dt = dt;
      } else {
        z = "UTC";
        if (opts.timeZoneName) {
          this.dt = dt;
        } else {
          this.dt = dt.offset === 0 ? dt : DateTime.fromMillis(dt.ts + dt.offset * 60 * 1e3);
        }
      }
    } else if (dt.zone.type === "system") {
      this.dt = dt;
    } else {
      this.dt = dt;
      z = dt.zone.name;
    }
    var intlOpts = _extends({}, this.opts);
    if (z) {
      intlOpts.timeZone = z;
    }
    this.dtf = getCachedDTF(intl, intlOpts);
  }
  var _proto2 = PolyDateFormatter2.prototype;
  _proto2.format = function format() {
    return this.dtf.format(this.dt.toJSDate());
  };
  _proto2.formatToParts = function formatToParts() {
    return this.dtf.formatToParts(this.dt.toJSDate());
  };
  _proto2.resolvedOptions = function resolvedOptions() {
    return this.dtf.resolvedOptions();
  };
  return PolyDateFormatter2;
}();
var PolyRelFormatter = /* @__PURE__ */ function() {
  function PolyRelFormatter2(intl, isEnglish, opts) {
    this.opts = _extends({
      style: "long"
    }, opts);
    if (!isEnglish && hasRelative()) {
      this.rtf = getCachedRTF(intl, opts);
    }
  }
  var _proto3 = PolyRelFormatter2.prototype;
  _proto3.format = function format(count, unit) {
    if (this.rtf) {
      return this.rtf.format(count, unit);
    } else {
      return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
    }
  };
  _proto3.formatToParts = function formatToParts(count, unit) {
    if (this.rtf) {
      return this.rtf.formatToParts(count, unit);
    } else {
      return [];
    }
  };
  return PolyRelFormatter2;
}();
var Locale = /* @__PURE__ */ function() {
  Locale2.fromOpts = function fromOpts(opts) {
    return Locale2.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
  };
  Locale2.create = function create(locale, numberingSystem, outputCalendar, defaultToEN) {
    if (defaultToEN === void 0) {
      defaultToEN = false;
    }
    var specifiedLocale = locale || Settings.defaultLocale;
    var localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
    var numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
    var outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
    return new Locale2(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
  };
  Locale2.resetCache = function resetCache() {
    sysLocaleCache = null;
    intlDTCache = {};
    intlNumCache = {};
    intlRelCache = {};
  };
  Locale2.fromObject = function fromObject(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, locale = _ref.locale, numberingSystem = _ref.numberingSystem, outputCalendar = _ref.outputCalendar;
    return Locale2.create(locale, numberingSystem, outputCalendar);
  };
  function Locale2(locale, numbering, outputCalendar, specifiedLocale) {
    var _parseLocaleString = parseLocaleString(locale), parsedLocale = _parseLocaleString[0], parsedNumberingSystem = _parseLocaleString[1], parsedOutputCalendar = _parseLocaleString[2];
    this.locale = parsedLocale;
    this.numberingSystem = numbering || parsedNumberingSystem || null;
    this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
    this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
    this.weekdaysCache = {
      format: {},
      standalone: {}
    };
    this.monthsCache = {
      format: {},
      standalone: {}
    };
    this.meridiemCache = null;
    this.eraCache = {};
    this.specifiedLocale = specifiedLocale;
    this.fastNumbersCached = null;
  }
  var _proto4 = Locale2.prototype;
  _proto4.listingMode = function listingMode() {
    var isActuallyEn = this.isEnglish();
    var hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return isActuallyEn && hasNoWeirdness ? "en" : "intl";
  };
  _proto4.clone = function clone2(alts) {
    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
      return this;
    } else {
      return Locale2.create(alts.locale || this.specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, alts.defaultToEN || false);
    }
  };
  _proto4.redefaultToEN = function redefaultToEN(alts) {
    if (alts === void 0) {
      alts = {};
    }
    return this.clone(_extends({}, alts, {
      defaultToEN: true
    }));
  };
  _proto4.redefaultToSystem = function redefaultToSystem(alts) {
    if (alts === void 0) {
      alts = {};
    }
    return this.clone(_extends({}, alts, {
      defaultToEN: false
    }));
  };
  _proto4.months = function months$1(length, format, defaultOK) {
    var _this = this;
    if (format === void 0) {
      format = false;
    }
    if (defaultOK === void 0) {
      defaultOK = true;
    }
    return listStuff(this, length, defaultOK, months, function() {
      var intl = format ? {
        month: length,
        day: "numeric"
      } : {
        month: length
      }, formatStr = format ? "format" : "standalone";
      if (!_this.monthsCache[formatStr][length]) {
        _this.monthsCache[formatStr][length] = mapMonths(function(dt) {
          return _this.extract(dt, intl, "month");
        });
      }
      return _this.monthsCache[formatStr][length];
    });
  };
  _proto4.weekdays = function weekdays$1(length, format, defaultOK) {
    var _this2 = this;
    if (format === void 0) {
      format = false;
    }
    if (defaultOK === void 0) {
      defaultOK = true;
    }
    return listStuff(this, length, defaultOK, weekdays, function() {
      var intl = format ? {
        weekday: length,
        year: "numeric",
        month: "long",
        day: "numeric"
      } : {
        weekday: length
      }, formatStr = format ? "format" : "standalone";
      if (!_this2.weekdaysCache[formatStr][length]) {
        _this2.weekdaysCache[formatStr][length] = mapWeekdays(function(dt) {
          return _this2.extract(dt, intl, "weekday");
        });
      }
      return _this2.weekdaysCache[formatStr][length];
    });
  };
  _proto4.meridiems = function meridiems$1(defaultOK) {
    var _this3 = this;
    if (defaultOK === void 0) {
      defaultOK = true;
    }
    return listStuff(this, void 0, defaultOK, function() {
      return meridiems;
    }, function() {
      if (!_this3.meridiemCache) {
        var intl = {
          hour: "numeric",
          hourCycle: "h12"
        };
        _this3.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map(function(dt) {
          return _this3.extract(dt, intl, "dayperiod");
        });
      }
      return _this3.meridiemCache;
    });
  };
  _proto4.eras = function eras$1(length, defaultOK) {
    var _this4 = this;
    if (defaultOK === void 0) {
      defaultOK = true;
    }
    return listStuff(this, length, defaultOK, eras, function() {
      var intl = {
        era: length
      };
      if (!_this4.eraCache[length]) {
        _this4.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map(function(dt) {
          return _this4.extract(dt, intl, "era");
        });
      }
      return _this4.eraCache[length];
    });
  };
  _proto4.extract = function extract(dt, intlOpts, field) {
    var df = this.dtFormatter(dt, intlOpts), results = df.formatToParts(), matching = results.find(function(m) {
      return m.type.toLowerCase() === field;
    });
    return matching ? matching.value : null;
  };
  _proto4.numberFormatter = function numberFormatter(opts) {
    if (opts === void 0) {
      opts = {};
    }
    return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
  };
  _proto4.dtFormatter = function dtFormatter(dt, intlOpts) {
    if (intlOpts === void 0) {
      intlOpts = {};
    }
    return new PolyDateFormatter(dt, this.intl, intlOpts);
  };
  _proto4.relFormatter = function relFormatter(opts) {
    if (opts === void 0) {
      opts = {};
    }
    return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
  };
  _proto4.listFormatter = function listFormatter(opts) {
    if (opts === void 0) {
      opts = {};
    }
    return getCachedLF(this.intl, opts);
  };
  _proto4.isEnglish = function isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
  };
  _proto4.equals = function equals(other2) {
    return this.locale === other2.locale && this.numberingSystem === other2.numberingSystem && this.outputCalendar === other2.outputCalendar;
  };
  _createClass(Locale2, [{
    key: "fastNumbers",
    get: function get() {
      if (this.fastNumbersCached == null) {
        this.fastNumbersCached = supportsFastNumbers(this);
      }
      return this.fastNumbersCached;
    }
  }]);
  return Locale2;
}();
function combineRegexes() {
  for (var _len = arguments.length, regexes = new Array(_len), _key = 0; _key < _len; _key++) {
    regexes[_key] = arguments[_key];
  }
  var full = regexes.reduce(function(f, r) {
    return f + r.source;
  }, "");
  return RegExp("^" + full + "$");
}
function combineExtractors() {
  for (var _len2 = arguments.length, extractors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    extractors[_key2] = arguments[_key2];
  }
  return function(m) {
    return extractors.reduce(function(_ref, ex) {
      var mergedVals = _ref[0], mergedZone = _ref[1], cursor = _ref[2];
      var _ex = ex(m, cursor), val = _ex[0], zone = _ex[1], next = _ex[2];
      return [_extends({}, mergedVals, val), zone || mergedZone, next];
    }, [{}, null, 1]).slice(0, 2);
  };
}
function parse(s2) {
  if (s2 == null) {
    return [null, null];
  }
  for (var _len3 = arguments.length, patterns = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    patterns[_key3 - 1] = arguments[_key3];
  }
  for (var _i = 0, _patterns = patterns; _i < _patterns.length; _i++) {
    var _patterns$_i = _patterns[_i], regex = _patterns$_i[0], extractor = _patterns$_i[1];
    var m = regex.exec(s2);
    if (m) {
      return extractor(m);
    }
  }
  return [null, null];
}
function simpleParse() {
  for (var _len4 = arguments.length, keys = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    keys[_key4] = arguments[_key4];
  }
  return function(match2, cursor) {
    var ret = {};
    var i;
    for (i = 0; i < keys.length; i++) {
      ret[keys[i]] = parseInteger(match2[cursor + i]);
    }
    return [ret, null, cursor + i];
  };
}
var offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/;
var isoExtendedZone = "(?:" + offsetRegex.source + "?(?:\\[(" + ianaRegex.source + ")\\])?)?";
var isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/;
var isoTimeRegex = RegExp("" + isoTimeBaseRegex.source + isoExtendedZone);
var isoTimeExtensionRegex = RegExp("(?:T" + isoTimeRegex.source + ")?");
var isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/;
var isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/;
var isoOrdinalRegex = /(\d{4})-?(\d{3})/;
var extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay");
var extractISOOrdinalData = simpleParse("year", "ordinal");
var sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/;
var sqlTimeRegex = RegExp(isoTimeBaseRegex.source + " ?(?:" + offsetRegex.source + "|(" + ianaRegex.source + "))?");
var sqlTimeExtensionRegex = RegExp("(?: " + sqlTimeRegex.source + ")?");
function int(match2, pos, fallback) {
  var m = match2[pos];
  return isUndefined(m) ? fallback : parseInteger(m);
}
function extractISOYmd(match2, cursor) {
  var item = {
    year: int(match2, cursor),
    month: int(match2, cursor + 1, 1),
    day: int(match2, cursor + 2, 1)
  };
  return [item, null, cursor + 3];
}
function extractISOTime(match2, cursor) {
  var item = {
    hours: int(match2, cursor, 0),
    minutes: int(match2, cursor + 1, 0),
    seconds: int(match2, cursor + 2, 0),
    milliseconds: parseMillis(match2[cursor + 3])
  };
  return [item, null, cursor + 4];
}
function extractISOOffset(match2, cursor) {
  var local = !match2[cursor] && !match2[cursor + 1], fullOffset = signedOffset(match2[cursor + 1], match2[cursor + 2]), zone = local ? null : FixedOffsetZone.instance(fullOffset);
  return [{}, zone, cursor + 3];
}
function extractIANAZone(match2, cursor) {
  var zone = match2[cursor] ? IANAZone.create(match2[cursor]) : null;
  return [{}, zone, cursor + 1];
}
var isoTimeOnly = RegExp("^T?" + isoTimeBaseRegex.source + "$");
var isoDuration = /^-?P(?:(?:(-?\d{1,9}(?:\.\d{1,9})?)Y)?(?:(-?\d{1,9}(?:\.\d{1,9})?)M)?(?:(-?\d{1,9}(?:\.\d{1,9})?)W)?(?:(-?\d{1,9}(?:\.\d{1,9})?)D)?(?:T(?:(-?\d{1,9}(?:\.\d{1,9})?)H)?(?:(-?\d{1,9}(?:\.\d{1,9})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,9}))?S)?)?)$/;
function extractISODuration(match2) {
  var s2 = match2[0], yearStr = match2[1], monthStr = match2[2], weekStr = match2[3], dayStr = match2[4], hourStr = match2[5], minuteStr = match2[6], secondStr = match2[7], millisecondsStr = match2[8];
  var hasNegativePrefix = s2[0] === "-";
  var negativeSeconds = secondStr && secondStr[0] === "-";
  var maybeNegate = function maybeNegate2(num, force) {
    if (force === void 0) {
      force = false;
    }
    return num !== void 0 && (force || num && hasNegativePrefix) ? -num : num;
  };
  return [{
    years: maybeNegate(parseFloating(yearStr)),
    months: maybeNegate(parseFloating(monthStr)),
    weeks: maybeNegate(parseFloating(weekStr)),
    days: maybeNegate(parseFloating(dayStr)),
    hours: maybeNegate(parseFloating(hourStr)),
    minutes: maybeNegate(parseFloating(minuteStr)),
    seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
    milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
  }];
}
var obsOffsets = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  var result = {
    year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
    month: monthsShort.indexOf(monthStr) + 1,
    day: parseInteger(dayStr),
    hour: parseInteger(hourStr),
    minute: parseInteger(minuteStr)
  };
  if (secondStr)
    result.second = parseInteger(secondStr);
  if (weekdayStr) {
    result.weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
  }
  return result;
}
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function extractRFC2822(match2) {
  var weekdayStr = match2[1], dayStr = match2[2], monthStr = match2[3], yearStr = match2[4], hourStr = match2[5], minuteStr = match2[6], secondStr = match2[7], obsOffset = match2[8], milOffset = match2[9], offHourStr = match2[10], offMinuteStr = match2[11], result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  var offset2;
  if (obsOffset) {
    offset2 = obsOffsets[obsOffset];
  } else if (milOffset) {
    offset2 = 0;
  } else {
    offset2 = signedOffset(offHourStr, offMinuteStr);
  }
  return [result, new FixedOffsetZone(offset2)];
}
function preprocessRFC2822(s2) {
  return s2.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
var rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, rfc850 = /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function extractRFC1123Or850(match2) {
  var weekdayStr = match2[1], dayStr = match2[2], monthStr = match2[3], yearStr = match2[4], hourStr = match2[5], minuteStr = match2[6], secondStr = match2[7], result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}
function extractASCII(match2) {
  var weekdayStr = match2[1], monthStr = match2[2], dayStr = match2[3], hourStr = match2[4], minuteStr = match2[5], secondStr = match2[6], yearStr = match2[7], result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}
var isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
var isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
var isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
var isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
var extractISOYmdTimeAndOffset = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone);
var extractISOWeekTimeAndOffset = combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset, extractIANAZone);
var extractISOOrdinalDateAndTime = combineExtractors(extractISOOrdinalData, extractISOTime, extractISOOffset, extractIANAZone);
var extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
function parseISODate(s2) {
  return parse(s2, [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset], [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime], [isoTimeCombinedRegex, extractISOTimeAndOffset]);
}
function parseRFC2822Date(s2) {
  return parse(preprocessRFC2822(s2), [rfc2822, extractRFC2822]);
}
function parseHTTPDate(s2) {
  return parse(s2, [rfc1123, extractRFC1123Or850], [rfc850, extractRFC1123Or850], [ascii, extractASCII]);
}
function parseISODuration(s2) {
  return parse(s2, [isoDuration, extractISODuration]);
}
var extractISOTimeOnly = combineExtractors(extractISOTime);
function parseISOTimeOnly(s2) {
  return parse(s2, [isoTimeOnly, extractISOTimeOnly]);
}
var sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
var sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
var extractISOTimeOffsetAndIANAZone = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
function parseSQL(s2) {
  return parse(s2, [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]);
}
var INVALID$2 = "Invalid Duration";
var lowOrderMatrix = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1e3
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1e3
  },
  hours: {
    minutes: 60,
    seconds: 60 * 60,
    milliseconds: 60 * 60 * 1e3
  },
  minutes: {
    seconds: 60,
    milliseconds: 60 * 1e3
  },
  seconds: {
    milliseconds: 1e3
  }
}, casualMatrix = _extends({
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 91 * 24,
    minutes: 91 * 24 * 60,
    seconds: 91 * 24 * 60 * 60,
    milliseconds: 91 * 24 * 60 * 60 * 1e3
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 30 * 24,
    minutes: 30 * 24 * 60,
    seconds: 30 * 24 * 60 * 60,
    milliseconds: 30 * 24 * 60 * 60 * 1e3
  }
}, lowOrderMatrix), daysInYearAccurate = 146097 / 400, daysInMonthAccurate = 146097 / 4800, accurateMatrix = _extends({
  years: {
    quarters: 4,
    months: 12,
    weeks: daysInYearAccurate / 7,
    days: daysInYearAccurate,
    hours: daysInYearAccurate * 24,
    minutes: daysInYearAccurate * 24 * 60,
    seconds: daysInYearAccurate * 24 * 60 * 60,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: daysInYearAccurate / 28,
    days: daysInYearAccurate / 4,
    hours: daysInYearAccurate * 24 / 4,
    minutes: daysInYearAccurate * 24 * 60 / 4,
    seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: daysInMonthAccurate / 7,
    days: daysInMonthAccurate,
    hours: daysInMonthAccurate * 24,
    minutes: daysInMonthAccurate * 24 * 60,
    seconds: daysInMonthAccurate * 24 * 60 * 60,
    milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1e3
  }
}, lowOrderMatrix);
var orderedUnits$1 = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"];
var reverseUnits = orderedUnits$1.slice(0).reverse();
function clone$1(dur, alts, clear) {
  if (clear === void 0) {
    clear = false;
  }
  var conf = {
    values: clear ? alts.values : _extends({}, dur.values, alts.values || {}),
    loc: dur.loc.clone(alts.loc),
    conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy
  };
  return new Duration(conf);
}
function antiTrunc(n2) {
  return n2 < 0 ? Math.floor(n2) : Math.ceil(n2);
}
function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
  var conv = matrix[toUnit][fromUnit], raw = fromMap[fromUnit] / conv, sameSign = Math.sign(raw) === Math.sign(toMap[toUnit]), added = !sameSign && toMap[toUnit] !== 0 && Math.abs(raw) <= 1 ? antiTrunc(raw) : Math.trunc(raw);
  toMap[toUnit] += added;
  fromMap[fromUnit] -= added * conv;
}
function normalizeValues(matrix, vals) {
  reverseUnits.reduce(function(previous, current) {
    if (!isUndefined(vals[current])) {
      if (previous) {
        convert(matrix, vals, previous, vals, current);
      }
      return current;
    } else {
      return previous;
    }
  }, null);
}
var Duration = /* @__PURE__ */ function() {
  function Duration2(config) {
    var accurate = config.conversionAccuracy === "longterm" || false;
    this.values = config.values;
    this.loc = config.loc || Locale.create();
    this.conversionAccuracy = accurate ? "longterm" : "casual";
    this.invalid = config.invalid || null;
    this.matrix = accurate ? accurateMatrix : casualMatrix;
    this.isLuxonDuration = true;
  }
  Duration2.fromMillis = function fromMillis(count, opts) {
    return Duration2.fromObject({
      milliseconds: count
    }, opts);
  };
  Duration2.fromObject = function fromObject(obj, opts) {
    if (opts === void 0) {
      opts = {};
    }
    if (obj == null || typeof obj !== "object") {
      throw new InvalidArgumentError("Duration.fromObject: argument expected to be an object, got " + (obj === null ? "null" : typeof obj));
    }
    return new Duration2({
      values: normalizeObject(obj, Duration2.normalizeUnit),
      loc: Locale.fromObject(opts),
      conversionAccuracy: opts.conversionAccuracy
    });
  };
  Duration2.fromDurationLike = function fromDurationLike(durationLike) {
    if (isNumber(durationLike)) {
      return Duration2.fromMillis(durationLike);
    } else if (Duration2.isDuration(durationLike)) {
      return durationLike;
    } else if (typeof durationLike === "object") {
      return Duration2.fromObject(durationLike);
    } else {
      throw new InvalidArgumentError("Unknown duration argument " + durationLike + " of type " + typeof durationLike);
    }
  };
  Duration2.fromISO = function fromISO(text2, opts) {
    var _parseISODuration = parseISODuration(text2), parsed = _parseISODuration[0];
    if (parsed) {
      return Duration2.fromObject(parsed, opts);
    } else {
      return Duration2.invalid("unparsable", 'the input "' + text2 + `" can't be parsed as ISO 8601`);
    }
  };
  Duration2.fromISOTime = function fromISOTime(text2, opts) {
    var _parseISOTimeOnly = parseISOTimeOnly(text2), parsed = _parseISOTimeOnly[0];
    if (parsed) {
      return Duration2.fromObject(parsed, opts);
    } else {
      return Duration2.invalid("unparsable", 'the input "' + text2 + `" can't be parsed as ISO 8601`);
    }
  };
  Duration2.invalid = function invalid(reason, explanation) {
    if (explanation === void 0) {
      explanation = null;
    }
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
    }
    var invalid2 = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidDurationError(invalid2);
    } else {
      return new Duration2({
        invalid: invalid2
      });
    }
  };
  Duration2.normalizeUnit = function normalizeUnit2(unit) {
    var normalized = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[unit ? unit.toLowerCase() : unit];
    if (!normalized)
      throw new InvalidUnitError(unit);
    return normalized;
  };
  Duration2.isDuration = function isDuration(o) {
    return o && o.isLuxonDuration || false;
  };
  var _proto = Duration2.prototype;
  _proto.toFormat = function toFormat(fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }
    var fmtOpts = _extends({}, opts, {
      floor: opts.round !== false && opts.floor !== false
    });
    return this.isValid ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt) : INVALID$2;
  };
  _proto.toHuman = function toHuman(opts) {
    var _this = this;
    if (opts === void 0) {
      opts = {};
    }
    var l2 = orderedUnits$1.map(function(unit) {
      var val = _this.values[unit];
      if (isUndefined(val)) {
        return null;
      }
      return _this.loc.numberFormatter(_extends({
        style: "unit",
        unitDisplay: "long"
      }, opts, {
        unit: unit.slice(0, -1)
      })).format(val);
    }).filter(function(n2) {
      return n2;
    });
    return this.loc.listFormatter(_extends({
      type: "conjunction",
      style: opts.listStyle || "narrow"
    }, opts)).format(l2);
  };
  _proto.toObject = function toObject() {
    if (!this.isValid)
      return {};
    return _extends({}, this.values);
  };
  _proto.toISO = function toISO() {
    if (!this.isValid)
      return null;
    var s2 = "P";
    if (this.years !== 0)
      s2 += this.years + "Y";
    if (this.months !== 0 || this.quarters !== 0)
      s2 += this.months + this.quarters * 3 + "M";
    if (this.weeks !== 0)
      s2 += this.weeks + "W";
    if (this.days !== 0)
      s2 += this.days + "D";
    if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0)
      s2 += "T";
    if (this.hours !== 0)
      s2 += this.hours + "H";
    if (this.minutes !== 0)
      s2 += this.minutes + "M";
    if (this.seconds !== 0 || this.milliseconds !== 0)
      s2 += roundTo(this.seconds + this.milliseconds / 1e3, 3) + "S";
    if (s2 === "P")
      s2 += "T0S";
    return s2;
  };
  _proto.toISOTime = function toISOTime(opts) {
    if (opts === void 0) {
      opts = {};
    }
    if (!this.isValid)
      return null;
    var millis = this.toMillis();
    if (millis < 0 || millis >= 864e5)
      return null;
    opts = _extends({
      suppressMilliseconds: false,
      suppressSeconds: false,
      includePrefix: false,
      format: "extended"
    }, opts);
    var value = this.shiftTo("hours", "minutes", "seconds", "milliseconds");
    var fmt = opts.format === "basic" ? "hhmm" : "hh:mm";
    if (!opts.suppressSeconds || value.seconds !== 0 || value.milliseconds !== 0) {
      fmt += opts.format === "basic" ? "ss" : ":ss";
      if (!opts.suppressMilliseconds || value.milliseconds !== 0) {
        fmt += ".SSS";
      }
    }
    var str = value.toFormat(fmt);
    if (opts.includePrefix) {
      str = "T" + str;
    }
    return str;
  };
  _proto.toJSON = function toJSON() {
    return this.toISO();
  };
  _proto.toString = function toString() {
    return this.toISO();
  };
  _proto.toMillis = function toMillis() {
    return this.as("milliseconds");
  };
  _proto.valueOf = function valueOf() {
    return this.toMillis();
  };
  _proto.plus = function plus(duration) {
    if (!this.isValid)
      return this;
    var dur = Duration2.fromDurationLike(duration), result = {};
    for (var _iterator = _createForOfIteratorHelperLoose(orderedUnits$1), _step; !(_step = _iterator()).done; ) {
      var k = _step.value;
      if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
        result[k] = dur.get(k) + this.get(k);
      }
    }
    return clone$1(this, {
      values: result
    }, true);
  };
  _proto.minus = function minus(duration) {
    if (!this.isValid)
      return this;
    var dur = Duration2.fromDurationLike(duration);
    return this.plus(dur.negate());
  };
  _proto.mapUnits = function mapUnits(fn) {
    if (!this.isValid)
      return this;
    var result = {};
    for (var _i = 0, _Object$keys = Object.keys(this.values); _i < _Object$keys.length; _i++) {
      var k = _Object$keys[_i];
      result[k] = asNumber(fn(this.values[k], k));
    }
    return clone$1(this, {
      values: result
    }, true);
  };
  _proto.get = function get(unit) {
    return this[Duration2.normalizeUnit(unit)];
  };
  _proto.set = function set(values) {
    if (!this.isValid)
      return this;
    var mixed = _extends({}, this.values, normalizeObject(values, Duration2.normalizeUnit));
    return clone$1(this, {
      values: mixed
    });
  };
  _proto.reconfigure = function reconfigure(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, locale = _ref.locale, numberingSystem = _ref.numberingSystem, conversionAccuracy = _ref.conversionAccuracy;
    var loc = this.loc.clone({
      locale,
      numberingSystem
    }), opts = {
      loc
    };
    if (conversionAccuracy) {
      opts.conversionAccuracy = conversionAccuracy;
    }
    return clone$1(this, opts);
  };
  _proto.as = function as(unit) {
    return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
  };
  _proto.normalize = function normalize() {
    if (!this.isValid)
      return this;
    var vals = this.toObject();
    normalizeValues(this.matrix, vals);
    return clone$1(this, {
      values: vals
    }, true);
  };
  _proto.shiftTo = function shiftTo() {
    for (var _len = arguments.length, units = new Array(_len), _key = 0; _key < _len; _key++) {
      units[_key] = arguments[_key];
    }
    if (!this.isValid)
      return this;
    if (units.length === 0) {
      return this;
    }
    units = units.map(function(u) {
      return Duration2.normalizeUnit(u);
    });
    var built = {}, accumulated = {}, vals = this.toObject();
    var lastUnit;
    for (var _iterator2 = _createForOfIteratorHelperLoose(orderedUnits$1), _step2; !(_step2 = _iterator2()).done; ) {
      var k = _step2.value;
      if (units.indexOf(k) >= 0) {
        lastUnit = k;
        var own = 0;
        for (var ak in accumulated) {
          own += this.matrix[ak][k] * accumulated[ak];
          accumulated[ak] = 0;
        }
        if (isNumber(vals[k])) {
          own += vals[k];
        }
        var i = Math.trunc(own);
        built[k] = i;
        accumulated[k] = (own * 1e3 - i * 1e3) / 1e3;
        for (var down in vals) {
          if (orderedUnits$1.indexOf(down) > orderedUnits$1.indexOf(k)) {
            convert(this.matrix, vals, down, built, k);
          }
        }
      } else if (isNumber(vals[k])) {
        accumulated[k] = vals[k];
      }
    }
    for (var key in accumulated) {
      if (accumulated[key] !== 0) {
        built[lastUnit] += key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
      }
    }
    return clone$1(this, {
      values: built
    }, true).normalize();
  };
  _proto.negate = function negate() {
    if (!this.isValid)
      return this;
    var negated = {};
    for (var _i2 = 0, _Object$keys2 = Object.keys(this.values); _i2 < _Object$keys2.length; _i2++) {
      var k = _Object$keys2[_i2];
      negated[k] = this.values[k] === 0 ? 0 : -this.values[k];
    }
    return clone$1(this, {
      values: negated
    }, true);
  };
  _proto.equals = function equals(other2) {
    if (!this.isValid || !other2.isValid) {
      return false;
    }
    if (!this.loc.equals(other2.loc)) {
      return false;
    }
    function eq(v1, v2) {
      if (v1 === void 0 || v1 === 0)
        return v2 === void 0 || v2 === 0;
      return v1 === v2;
    }
    for (var _iterator3 = _createForOfIteratorHelperLoose(orderedUnits$1), _step3; !(_step3 = _iterator3()).done; ) {
      var u = _step3.value;
      if (!eq(this.values[u], other2.values[u])) {
        return false;
      }
    }
    return true;
  };
  _createClass(Duration2, [{
    key: "locale",
    get: function get() {
      return this.isValid ? this.loc.locale : null;
    }
  }, {
    key: "numberingSystem",
    get: function get() {
      return this.isValid ? this.loc.numberingSystem : null;
    }
  }, {
    key: "years",
    get: function get() {
      return this.isValid ? this.values.years || 0 : NaN;
    }
  }, {
    key: "quarters",
    get: function get() {
      return this.isValid ? this.values.quarters || 0 : NaN;
    }
  }, {
    key: "months",
    get: function get() {
      return this.isValid ? this.values.months || 0 : NaN;
    }
  }, {
    key: "weeks",
    get: function get() {
      return this.isValid ? this.values.weeks || 0 : NaN;
    }
  }, {
    key: "days",
    get: function get() {
      return this.isValid ? this.values.days || 0 : NaN;
    }
  }, {
    key: "hours",
    get: function get() {
      return this.isValid ? this.values.hours || 0 : NaN;
    }
  }, {
    key: "minutes",
    get: function get() {
      return this.isValid ? this.values.minutes || 0 : NaN;
    }
  }, {
    key: "seconds",
    get: function get() {
      return this.isValid ? this.values.seconds || 0 : NaN;
    }
  }, {
    key: "milliseconds",
    get: function get() {
      return this.isValid ? this.values.milliseconds || 0 : NaN;
    }
  }, {
    key: "isValid",
    get: function get() {
      return this.invalid === null;
    }
  }, {
    key: "invalidReason",
    get: function get() {
      return this.invalid ? this.invalid.reason : null;
    }
  }, {
    key: "invalidExplanation",
    get: function get() {
      return this.invalid ? this.invalid.explanation : null;
    }
  }]);
  return Duration2;
}();
var INVALID$1 = "Invalid Interval";
function validateStartEnd(start, end) {
  if (!start || !start.isValid) {
    return Interval.invalid("missing or invalid start");
  } else if (!end || !end.isValid) {
    return Interval.invalid("missing or invalid end");
  } else if (end < start) {
    return Interval.invalid("end before start", "The end of an interval must be after its start, but you had start=" + start.toISO() + " and end=" + end.toISO());
  } else {
    return null;
  }
}
var Interval = /* @__PURE__ */ function() {
  function Interval2(config) {
    this.s = config.start;
    this.e = config.end;
    this.invalid = config.invalid || null;
    this.isLuxonInterval = true;
  }
  Interval2.invalid = function invalid(reason, explanation) {
    if (explanation === void 0) {
      explanation = null;
    }
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
    }
    var invalid2 = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidIntervalError(invalid2);
    } else {
      return new Interval2({
        invalid: invalid2
      });
    }
  };
  Interval2.fromDateTimes = function fromDateTimes(start, end) {
    var builtStart = friendlyDateTime(start), builtEnd = friendlyDateTime(end);
    var validateError = validateStartEnd(builtStart, builtEnd);
    if (validateError == null) {
      return new Interval2({
        start: builtStart,
        end: builtEnd
      });
    } else {
      return validateError;
    }
  };
  Interval2.after = function after(start, duration) {
    var dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(start);
    return Interval2.fromDateTimes(dt, dt.plus(dur));
  };
  Interval2.before = function before(end, duration) {
    var dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(end);
    return Interval2.fromDateTimes(dt.minus(dur), dt);
  };
  Interval2.fromISO = function fromISO(text2, opts) {
    var _split = (text2 || "").split("/", 2), s2 = _split[0], e = _split[1];
    if (s2 && e) {
      var start, startIsValid;
      try {
        start = DateTime.fromISO(s2, opts);
        startIsValid = start.isValid;
      } catch (e2) {
        startIsValid = false;
      }
      var end, endIsValid;
      try {
        end = DateTime.fromISO(e, opts);
        endIsValid = end.isValid;
      } catch (e2) {
        endIsValid = false;
      }
      if (startIsValid && endIsValid) {
        return Interval2.fromDateTimes(start, end);
      }
      if (startIsValid) {
        var dur = Duration.fromISO(e, opts);
        if (dur.isValid) {
          return Interval2.after(start, dur);
        }
      } else if (endIsValid) {
        var _dur = Duration.fromISO(s2, opts);
        if (_dur.isValid) {
          return Interval2.before(end, _dur);
        }
      }
    }
    return Interval2.invalid("unparsable", 'the input "' + text2 + `" can't be parsed as ISO 8601`);
  };
  Interval2.isInterval = function isInterval(o) {
    return o && o.isLuxonInterval || false;
  };
  var _proto = Interval2.prototype;
  _proto.length = function length(unit) {
    if (unit === void 0) {
      unit = "milliseconds";
    }
    return this.isValid ? this.toDuration.apply(this, [unit]).get(unit) : NaN;
  };
  _proto.count = function count(unit) {
    if (unit === void 0) {
      unit = "milliseconds";
    }
    if (!this.isValid)
      return NaN;
    var start = this.start.startOf(unit), end = this.end.startOf(unit);
    return Math.floor(end.diff(start, unit).get(unit)) + 1;
  };
  _proto.hasSame = function hasSame(unit) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
  };
  _proto.isEmpty = function isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  };
  _proto.isAfter = function isAfter(dateTime) {
    if (!this.isValid)
      return false;
    return this.s > dateTime;
  };
  _proto.isBefore = function isBefore(dateTime) {
    if (!this.isValid)
      return false;
    return this.e <= dateTime;
  };
  _proto.contains = function contains(dateTime) {
    if (!this.isValid)
      return false;
    return this.s <= dateTime && this.e > dateTime;
  };
  _proto.set = function set(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, start = _ref.start, end = _ref.end;
    if (!this.isValid)
      return this;
    return Interval2.fromDateTimes(start || this.s, end || this.e);
  };
  _proto.splitAt = function splitAt() {
    var _this = this;
    if (!this.isValid)
      return [];
    for (var _len = arguments.length, dateTimes = new Array(_len), _key = 0; _key < _len; _key++) {
      dateTimes[_key] = arguments[_key];
    }
    var sorted = dateTimes.map(friendlyDateTime).filter(function(d) {
      return _this.contains(d);
    }).sort(), results = [];
    var s2 = this.s, i = 0;
    while (s2 < this.e) {
      var added = sorted[i] || this.e, next = +added > +this.e ? this.e : added;
      results.push(Interval2.fromDateTimes(s2, next));
      s2 = next;
      i += 1;
    }
    return results;
  };
  _proto.splitBy = function splitBy(duration) {
    var dur = Duration.fromDurationLike(duration);
    if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
      return [];
    }
    var s2 = this.s, idx = 1, next;
    var results = [];
    while (s2 < this.e) {
      var added = this.start.plus(dur.mapUnits(function(x) {
        return x * idx;
      }));
      next = +added > +this.e ? this.e : added;
      results.push(Interval2.fromDateTimes(s2, next));
      s2 = next;
      idx += 1;
    }
    return results;
  };
  _proto.divideEqually = function divideEqually(numberOfParts) {
    if (!this.isValid)
      return [];
    return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
  };
  _proto.overlaps = function overlaps(other2) {
    return this.e > other2.s && this.s < other2.e;
  };
  _proto.abutsStart = function abutsStart(other2) {
    if (!this.isValid)
      return false;
    return +this.e === +other2.s;
  };
  _proto.abutsEnd = function abutsEnd(other2) {
    if (!this.isValid)
      return false;
    return +other2.e === +this.s;
  };
  _proto.engulfs = function engulfs(other2) {
    if (!this.isValid)
      return false;
    return this.s <= other2.s && this.e >= other2.e;
  };
  _proto.equals = function equals(other2) {
    if (!this.isValid || !other2.isValid) {
      return false;
    }
    return this.s.equals(other2.s) && this.e.equals(other2.e);
  };
  _proto.intersection = function intersection(other2) {
    if (!this.isValid)
      return this;
    var s2 = this.s > other2.s ? this.s : other2.s, e = this.e < other2.e ? this.e : other2.e;
    if (s2 >= e) {
      return null;
    } else {
      return Interval2.fromDateTimes(s2, e);
    }
  };
  _proto.union = function union(other2) {
    if (!this.isValid)
      return this;
    var s2 = this.s < other2.s ? this.s : other2.s, e = this.e > other2.e ? this.e : other2.e;
    return Interval2.fromDateTimes(s2, e);
  };
  Interval2.merge = function merge2(intervals) {
    var _intervals$sort$reduc = intervals.sort(function(a, b) {
      return a.s - b.s;
    }).reduce(function(_ref2, item) {
      var sofar = _ref2[0], current = _ref2[1];
      if (!current) {
        return [sofar, item];
      } else if (current.overlaps(item) || current.abutsStart(item)) {
        return [sofar, current.union(item)];
      } else {
        return [sofar.concat([current]), item];
      }
    }, [[], null]), found = _intervals$sort$reduc[0], final = _intervals$sort$reduc[1];
    if (final) {
      found.push(final);
    }
    return found;
  };
  Interval2.xor = function xor(intervals) {
    var _Array$prototype;
    var start = null, currentCount = 0;
    var results = [], ends = intervals.map(function(i2) {
      return [{
        time: i2.s,
        type: "s"
      }, {
        time: i2.e,
        type: "e"
      }];
    }), flattened = (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, ends), arr = flattened.sort(function(a, b) {
      return a.time - b.time;
    });
    for (var _iterator = _createForOfIteratorHelperLoose(arr), _step; !(_step = _iterator()).done; ) {
      var i = _step.value;
      currentCount += i.type === "s" ? 1 : -1;
      if (currentCount === 1) {
        start = i.time;
      } else {
        if (start && +start !== +i.time) {
          results.push(Interval2.fromDateTimes(start, i.time));
        }
        start = null;
      }
    }
    return Interval2.merge(results);
  };
  _proto.difference = function difference() {
    var _this2 = this;
    for (var _len2 = arguments.length, intervals = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      intervals[_key2] = arguments[_key2];
    }
    return Interval2.xor([this].concat(intervals)).map(function(i) {
      return _this2.intersection(i);
    }).filter(function(i) {
      return i && !i.isEmpty();
    });
  };
  _proto.toString = function toString() {
    if (!this.isValid)
      return INVALID$1;
    return "[" + this.s.toISO() + " \u2013 " + this.e.toISO() + ")";
  };
  _proto.toISO = function toISO(opts) {
    if (!this.isValid)
      return INVALID$1;
    return this.s.toISO(opts) + "/" + this.e.toISO(opts);
  };
  _proto.toISODate = function toISODate() {
    if (!this.isValid)
      return INVALID$1;
    return this.s.toISODate() + "/" + this.e.toISODate();
  };
  _proto.toISOTime = function toISOTime(opts) {
    if (!this.isValid)
      return INVALID$1;
    return this.s.toISOTime(opts) + "/" + this.e.toISOTime(opts);
  };
  _proto.toFormat = function toFormat(dateFormat, _temp2) {
    var _ref3 = _temp2 === void 0 ? {} : _temp2, _ref3$separator = _ref3.separator, separator = _ref3$separator === void 0 ? " \u2013 " : _ref3$separator;
    if (!this.isValid)
      return INVALID$1;
    return "" + this.s.toFormat(dateFormat) + separator + this.e.toFormat(dateFormat);
  };
  _proto.toDuration = function toDuration(unit, opts) {
    if (!this.isValid) {
      return Duration.invalid(this.invalidReason);
    }
    return this.e.diff(this.s, unit, opts);
  };
  _proto.mapEndpoints = function mapEndpoints(mapFn) {
    return Interval2.fromDateTimes(mapFn(this.s), mapFn(this.e));
  };
  _createClass(Interval2, [{
    key: "start",
    get: function get() {
      return this.isValid ? this.s : null;
    }
  }, {
    key: "end",
    get: function get() {
      return this.isValid ? this.e : null;
    }
  }, {
    key: "isValid",
    get: function get() {
      return this.invalidReason === null;
    }
  }, {
    key: "invalidReason",
    get: function get() {
      return this.invalid ? this.invalid.reason : null;
    }
  }, {
    key: "invalidExplanation",
    get: function get() {
      return this.invalid ? this.invalid.explanation : null;
    }
  }]);
  return Interval2;
}();
var Info = /* @__PURE__ */ function() {
  function Info2() {
  }
  Info2.hasDST = function hasDST(zone) {
    if (zone === void 0) {
      zone = Settings.defaultZone;
    }
    var proto = DateTime.now().setZone(zone).set({
      month: 12
    });
    return !zone.isUniversal && proto.offset !== proto.set({
      month: 6
    }).offset;
  };
  Info2.isValidIANAZone = function isValidIANAZone(zone) {
    return IANAZone.isValidZone(zone);
  };
  Info2.normalizeZone = function normalizeZone$1(input) {
    return normalizeZone(input, Settings.defaultZone);
  };
  Info2.months = function months2(length, _temp) {
    if (length === void 0) {
      length = "long";
    }
    var _ref = _temp === void 0 ? {} : _temp, _ref$locale = _ref.locale, locale = _ref$locale === void 0 ? null : _ref$locale, _ref$numberingSystem = _ref.numberingSystem, numberingSystem = _ref$numberingSystem === void 0 ? null : _ref$numberingSystem, _ref$locObj = _ref.locObj, locObj = _ref$locObj === void 0 ? null : _ref$locObj, _ref$outputCalendar = _ref.outputCalendar, outputCalendar = _ref$outputCalendar === void 0 ? "gregory" : _ref$outputCalendar;
    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
  };
  Info2.monthsFormat = function monthsFormat(length, _temp2) {
    if (length === void 0) {
      length = "long";
    }
    var _ref2 = _temp2 === void 0 ? {} : _temp2, _ref2$locale = _ref2.locale, locale = _ref2$locale === void 0 ? null : _ref2$locale, _ref2$numberingSystem = _ref2.numberingSystem, numberingSystem = _ref2$numberingSystem === void 0 ? null : _ref2$numberingSystem, _ref2$locObj = _ref2.locObj, locObj = _ref2$locObj === void 0 ? null : _ref2$locObj, _ref2$outputCalendar = _ref2.outputCalendar, outputCalendar = _ref2$outputCalendar === void 0 ? "gregory" : _ref2$outputCalendar;
    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
  };
  Info2.weekdays = function weekdays2(length, _temp3) {
    if (length === void 0) {
      length = "long";
    }
    var _ref3 = _temp3 === void 0 ? {} : _temp3, _ref3$locale = _ref3.locale, locale = _ref3$locale === void 0 ? null : _ref3$locale, _ref3$numberingSystem = _ref3.numberingSystem, numberingSystem = _ref3$numberingSystem === void 0 ? null : _ref3$numberingSystem, _ref3$locObj = _ref3.locObj, locObj = _ref3$locObj === void 0 ? null : _ref3$locObj;
    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
  };
  Info2.weekdaysFormat = function weekdaysFormat(length, _temp4) {
    if (length === void 0) {
      length = "long";
    }
    var _ref4 = _temp4 === void 0 ? {} : _temp4, _ref4$locale = _ref4.locale, locale = _ref4$locale === void 0 ? null : _ref4$locale, _ref4$numberingSystem = _ref4.numberingSystem, numberingSystem = _ref4$numberingSystem === void 0 ? null : _ref4$numberingSystem, _ref4$locObj = _ref4.locObj, locObj = _ref4$locObj === void 0 ? null : _ref4$locObj;
    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
  };
  Info2.meridiems = function meridiems2(_temp5) {
    var _ref5 = _temp5 === void 0 ? {} : _temp5, _ref5$locale = _ref5.locale, locale = _ref5$locale === void 0 ? null : _ref5$locale;
    return Locale.create(locale).meridiems();
  };
  Info2.eras = function eras2(length, _temp6) {
    if (length === void 0) {
      length = "short";
    }
    var _ref6 = _temp6 === void 0 ? {} : _temp6, _ref6$locale = _ref6.locale, locale = _ref6$locale === void 0 ? null : _ref6$locale;
    return Locale.create(locale, null, "gregory").eras(length);
  };
  Info2.features = function features() {
    return {
      relative: hasRelative()
    };
  };
  return Info2;
}();
function dayDiff(earlier, later) {
  var utcDayStart = function utcDayStart2(dt) {
    return dt.toUTC(0, {
      keepLocalTime: true
    }).startOf("day").valueOf();
  }, ms = utcDayStart(later) - utcDayStart(earlier);
  return Math.floor(Duration.fromMillis(ms).as("days"));
}
function highOrderDiffs(cursor, later, units) {
  var differs = [["years", function(a, b) {
    return b.year - a.year;
  }], ["quarters", function(a, b) {
    return b.quarter - a.quarter;
  }], ["months", function(a, b) {
    return b.month - a.month + (b.year - a.year) * 12;
  }], ["weeks", function(a, b) {
    var days = dayDiff(a, b);
    return (days - days % 7) / 7;
  }], ["days", dayDiff]];
  var results = {};
  var lowestOrder, highWater;
  for (var _i = 0, _differs = differs; _i < _differs.length; _i++) {
    var _differs$_i = _differs[_i], unit = _differs$_i[0], differ = _differs$_i[1];
    if (units.indexOf(unit) >= 0) {
      var _cursor$plus;
      lowestOrder = unit;
      var delta = differ(cursor, later);
      highWater = cursor.plus((_cursor$plus = {}, _cursor$plus[unit] = delta, _cursor$plus));
      if (highWater > later) {
        var _cursor$plus2;
        cursor = cursor.plus((_cursor$plus2 = {}, _cursor$plus2[unit] = delta - 1, _cursor$plus2));
        delta -= 1;
      } else {
        cursor = highWater;
      }
      results[unit] = delta;
    }
  }
  return [cursor, results, highWater, lowestOrder];
}
function _diff(earlier, later, units, opts) {
  var _highOrderDiffs = highOrderDiffs(earlier, later, units), cursor = _highOrderDiffs[0], results = _highOrderDiffs[1], highWater = _highOrderDiffs[2], lowestOrder = _highOrderDiffs[3];
  var remainingMillis = later - cursor;
  var lowerOrderUnits = units.filter(function(u) {
    return ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0;
  });
  if (lowerOrderUnits.length === 0) {
    if (highWater < later) {
      var _cursor$plus3;
      highWater = cursor.plus((_cursor$plus3 = {}, _cursor$plus3[lowestOrder] = 1, _cursor$plus3));
    }
    if (highWater !== cursor) {
      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
    }
  }
  var duration = Duration.fromObject(results, opts);
  if (lowerOrderUnits.length > 0) {
    var _Duration$fromMillis;
    return (_Duration$fromMillis = Duration.fromMillis(remainingMillis, opts)).shiftTo.apply(_Duration$fromMillis, lowerOrderUnits).plus(duration);
  } else {
    return duration;
  }
}
var numberingSystems = {
  arab: "[\u0660-\u0669]",
  arabext: "[\u06F0-\u06F9]",
  bali: "[\u1B50-\u1B59]",
  beng: "[\u09E6-\u09EF]",
  deva: "[\u0966-\u096F]",
  fullwide: "[\uFF10-\uFF19]",
  gujr: "[\u0AE6-\u0AEF]",
  hanidec: "[\u3007|\u4E00|\u4E8C|\u4E09|\u56DB|\u4E94|\u516D|\u4E03|\u516B|\u4E5D]",
  khmr: "[\u17E0-\u17E9]",
  knda: "[\u0CE6-\u0CEF]",
  laoo: "[\u0ED0-\u0ED9]",
  limb: "[\u1946-\u194F]",
  mlym: "[\u0D66-\u0D6F]",
  mong: "[\u1810-\u1819]",
  mymr: "[\u1040-\u1049]",
  orya: "[\u0B66-\u0B6F]",
  tamldec: "[\u0BE6-\u0BEF]",
  telu: "[\u0C66-\u0C6F]",
  thai: "[\u0E50-\u0E59]",
  tibt: "[\u0F20-\u0F29]",
  latn: "\\d"
};
var numberingSystemsUTF16 = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
};
var hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
function parseDigits(str) {
  var value = parseInt(str, 10);
  if (isNaN(value)) {
    value = "";
    for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i);
      if (str[i].search(numberingSystems.hanidec) !== -1) {
        value += hanidecChars.indexOf(str[i]);
      } else {
        for (var key in numberingSystemsUTF16) {
          var _numberingSystemsUTF = numberingSystemsUTF16[key], min = _numberingSystemsUTF[0], max = _numberingSystemsUTF[1];
          if (code >= min && code <= max) {
            value += code - min;
          }
        }
      }
    }
    return parseInt(value, 10);
  } else {
    return value;
  }
}
function digitRegex(_ref, append2) {
  var numberingSystem = _ref.numberingSystem;
  if (append2 === void 0) {
    append2 = "";
  }
  return new RegExp("" + numberingSystems[numberingSystem || "latn"] + append2);
}
var MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";
function intUnit(regex, post) {
  if (post === void 0) {
    post = function post2(i) {
      return i;
    };
  }
  return {
    regex,
    deser: function deser(_ref) {
      var s2 = _ref[0];
      return post(parseDigits(s2));
    }
  };
}
var NBSP = String.fromCharCode(160);
var spaceOrNBSP = "[ " + NBSP + "]";
var spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");
function fixListRegex(s2) {
  return s2.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
}
function stripInsensitivities(s2) {
  return s2.replace(/\./g, "").replace(spaceOrNBSPRegExp, " ").toLowerCase();
}
function oneOf(strings, startIndex) {
  if (strings === null) {
    return null;
  } else {
    return {
      regex: RegExp(strings.map(fixListRegex).join("|")),
      deser: function deser(_ref2) {
        var s2 = _ref2[0];
        return strings.findIndex(function(i) {
          return stripInsensitivities(s2) === stripInsensitivities(i);
        }) + startIndex;
      }
    };
  }
}
function offset(regex, groups) {
  return {
    regex,
    deser: function deser(_ref3) {
      var h = _ref3[1], m = _ref3[2];
      return signedOffset(h, m);
    },
    groups
  };
}
function simple(regex) {
  return {
    regex,
    deser: function deser(_ref4) {
      var s2 = _ref4[0];
      return s2;
    }
  };
}
function escapeToken(value) {
  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function unitForToken(token, loc) {
  var one = digitRegex(loc), two = digitRegex(loc, "{2}"), three = digitRegex(loc, "{3}"), four = digitRegex(loc, "{4}"), six = digitRegex(loc, "{6}"), oneOrTwo = digitRegex(loc, "{1,2}"), oneToThree = digitRegex(loc, "{1,3}"), oneToSix = digitRegex(loc, "{1,6}"), oneToNine = digitRegex(loc, "{1,9}"), twoToFour = digitRegex(loc, "{2,4}"), fourToSix = digitRegex(loc, "{4,6}"), literal = function literal2(t) {
    return {
      regex: RegExp(escapeToken(t.val)),
      deser: function deser(_ref5) {
        var s2 = _ref5[0];
        return s2;
      },
      literal: true
    };
  }, unitate = function unitate2(t) {
    if (token.literal) {
      return literal(t);
    }
    switch (t.val) {
      case "G":
        return oneOf(loc.eras("short", false), 0);
      case "GG":
        return oneOf(loc.eras("long", false), 0);
      case "y":
        return intUnit(oneToSix);
      case "yy":
        return intUnit(twoToFour, untruncateYear);
      case "yyyy":
        return intUnit(four);
      case "yyyyy":
        return intUnit(fourToSix);
      case "yyyyyy":
        return intUnit(six);
      case "M":
        return intUnit(oneOrTwo);
      case "MM":
        return intUnit(two);
      case "MMM":
        return oneOf(loc.months("short", true, false), 1);
      case "MMMM":
        return oneOf(loc.months("long", true, false), 1);
      case "L":
        return intUnit(oneOrTwo);
      case "LL":
        return intUnit(two);
      case "LLL":
        return oneOf(loc.months("short", false, false), 1);
      case "LLLL":
        return oneOf(loc.months("long", false, false), 1);
      case "d":
        return intUnit(oneOrTwo);
      case "dd":
        return intUnit(two);
      case "o":
        return intUnit(oneToThree);
      case "ooo":
        return intUnit(three);
      case "HH":
        return intUnit(two);
      case "H":
        return intUnit(oneOrTwo);
      case "hh":
        return intUnit(two);
      case "h":
        return intUnit(oneOrTwo);
      case "mm":
        return intUnit(two);
      case "m":
        return intUnit(oneOrTwo);
      case "q":
        return intUnit(oneOrTwo);
      case "qq":
        return intUnit(two);
      case "s":
        return intUnit(oneOrTwo);
      case "ss":
        return intUnit(two);
      case "S":
        return intUnit(oneToThree);
      case "SSS":
        return intUnit(three);
      case "u":
        return simple(oneToNine);
      case "uu":
        return simple(oneOrTwo);
      case "uuu":
        return intUnit(one);
      case "a":
        return oneOf(loc.meridiems(), 0);
      case "kkkk":
        return intUnit(four);
      case "kk":
        return intUnit(twoToFour, untruncateYear);
      case "W":
        return intUnit(oneOrTwo);
      case "WW":
        return intUnit(two);
      case "E":
      case "c":
        return intUnit(one);
      case "EEE":
        return oneOf(loc.weekdays("short", false, false), 1);
      case "EEEE":
        return oneOf(loc.weekdays("long", false, false), 1);
      case "ccc":
        return oneOf(loc.weekdays("short", true, false), 1);
      case "cccc":
        return oneOf(loc.weekdays("long", true, false), 1);
      case "Z":
      case "ZZ":
        return offset(new RegExp("([+-]" + oneOrTwo.source + ")(?::(" + two.source + "))?"), 2);
      case "ZZZ":
        return offset(new RegExp("([+-]" + oneOrTwo.source + ")(" + two.source + ")?"), 2);
      case "z":
        return simple(/[a-z_+-/]{1,256}?/i);
      default:
        return literal(t);
    }
  };
  var unit = unitate(token) || {
    invalidReason: MISSING_FTP
  };
  unit.token = token;
  return unit;
}
var partTypeStyleToTokenVal = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour: {
    numeric: "h",
    "2-digit": "hh"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  }
};
function tokenForPart(part, locale, formatOpts) {
  var type = part.type, value = part.value;
  if (type === "literal") {
    return {
      literal: true,
      val: value
    };
  }
  var style = formatOpts[type];
  var val = partTypeStyleToTokenVal[type];
  if (typeof val === "object") {
    val = val[style];
  }
  if (val) {
    return {
      literal: false,
      val
    };
  }
  return void 0;
}
function buildRegex(units) {
  var re = units.map(function(u) {
    return u.regex;
  }).reduce(function(f, r) {
    return f + "(" + r.source + ")";
  }, "");
  return ["^" + re + "$", units];
}
function match(input, regex, handlers) {
  var matches = input.match(regex);
  if (matches) {
    var all = {};
    var matchIndex = 1;
    for (var i in handlers) {
      if (hasOwnProperty(handlers, i)) {
        var h = handlers[i], groups = h.groups ? h.groups + 1 : 1;
        if (!h.literal && h.token) {
          all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
        }
        matchIndex += groups;
      }
    }
    return [matches, all];
  } else {
    return [matches, {}];
  }
}
function dateTimeFromMatches(matches) {
  var toField = function toField2(token) {
    switch (token) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };
  var zone = null;
  var specificOffset;
  if (!isUndefined(matches.z)) {
    zone = IANAZone.create(matches.z);
  }
  if (!isUndefined(matches.Z)) {
    if (!zone) {
      zone = new FixedOffsetZone(matches.Z);
    }
    specificOffset = matches.Z;
  }
  if (!isUndefined(matches.q)) {
    matches.M = (matches.q - 1) * 3 + 1;
  }
  if (!isUndefined(matches.h)) {
    if (matches.h < 12 && matches.a === 1) {
      matches.h += 12;
    } else if (matches.h === 12 && matches.a === 0) {
      matches.h = 0;
    }
  }
  if (matches.G === 0 && matches.y) {
    matches.y = -matches.y;
  }
  if (!isUndefined(matches.u)) {
    matches.S = parseMillis(matches.u);
  }
  var vals = Object.keys(matches).reduce(function(r, k) {
    var f = toField(k);
    if (f) {
      r[f] = matches[k];
    }
    return r;
  }, {});
  return [vals, zone, specificOffset];
}
var dummyDateTimeCache = null;
function getDummyDateTime() {
  if (!dummyDateTimeCache) {
    dummyDateTimeCache = DateTime.fromMillis(1555555555555);
  }
  return dummyDateTimeCache;
}
function maybeExpandMacroToken(token, locale) {
  if (token.literal) {
    return token;
  }
  var formatOpts = Formatter.macroTokenToFormatOpts(token.val);
  if (!formatOpts) {
    return token;
  }
  var formatter = Formatter.create(locale, formatOpts);
  var parts = formatter.formatDateTimeParts(getDummyDateTime());
  var tokens = parts.map(function(p) {
    return tokenForPart(p, locale, formatOpts);
  });
  if (tokens.includes(void 0)) {
    return token;
  }
  return tokens;
}
function expandMacroTokens(tokens, locale) {
  var _Array$prototype;
  return (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, tokens.map(function(t) {
    return maybeExpandMacroToken(t, locale);
  }));
}
function explainFromTokens(locale, input, format) {
  var tokens = expandMacroTokens(Formatter.parseFormat(format), locale), units = tokens.map(function(t) {
    return unitForToken(t, locale);
  }), disqualifyingUnit = units.find(function(t) {
    return t.invalidReason;
  });
  if (disqualifyingUnit) {
    return {
      input,
      tokens,
      invalidReason: disqualifyingUnit.invalidReason
    };
  } else {
    var _buildRegex = buildRegex(units), regexString = _buildRegex[0], handlers = _buildRegex[1], regex = RegExp(regexString, "i"), _match = match(input, regex, handlers), rawMatches = _match[0], matches = _match[1], _ref6 = matches ? dateTimeFromMatches(matches) : [null, null, void 0], result = _ref6[0], zone = _ref6[1], specificOffset = _ref6[2];
    if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
      throw new ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
    }
    return {
      input,
      tokens,
      regex,
      rawMatches,
      matches,
      result,
      zone,
      specificOffset
    };
  }
}
function parseFromTokens(locale, input, format) {
  var _explainFromTokens = explainFromTokens(locale, input, format), result = _explainFromTokens.result, zone = _explainFromTokens.zone, specificOffset = _explainFromTokens.specificOffset, invalidReason = _explainFromTokens.invalidReason;
  return [result, zone, specificOffset, invalidReason];
}
var nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function unitOutOfRange(unit, value) {
  return new Invalid("unit out of range", "you specified " + value + " (of type " + typeof value + ") as a " + unit + ", which is invalid");
}
function dayOfWeek(year, month, day) {
  var d = new Date(Date.UTC(year, month - 1, day));
  if (year < 100 && year >= 0) {
    d.setUTCFullYear(d.getUTCFullYear() - 1900);
  }
  var js = d.getUTCDay();
  return js === 0 ? 7 : js;
}
function computeOrdinal(year, month, day) {
  return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
}
function uncomputeOrdinal(year, ordinal) {
  var table = isLeapYear(year) ? leapLadder : nonLeapLadder, month0 = table.findIndex(function(i) {
    return i < ordinal;
  }), day = ordinal - table[month0];
  return {
    month: month0 + 1,
    day
  };
}
function gregorianToWeek(gregObj) {
  var year = gregObj.year, month = gregObj.month, day = gregObj.day, ordinal = computeOrdinal(year, month, day), weekday = dayOfWeek(year, month, day);
  var weekNumber = Math.floor((ordinal - weekday + 10) / 7), weekYear;
  if (weekNumber < 1) {
    weekYear = year - 1;
    weekNumber = weeksInWeekYear(weekYear);
  } else if (weekNumber > weeksInWeekYear(year)) {
    weekYear = year + 1;
    weekNumber = 1;
  } else {
    weekYear = year;
  }
  return _extends({
    weekYear,
    weekNumber,
    weekday
  }, timeObject(gregObj));
}
function weekToGregorian(weekData) {
  var weekYear = weekData.weekYear, weekNumber = weekData.weekNumber, weekday = weekData.weekday, weekdayOfJan4 = dayOfWeek(weekYear, 1, 4), yearInDays = daysInYear(weekYear);
  var ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3, year;
  if (ordinal < 1) {
    year = weekYear - 1;
    ordinal += daysInYear(year);
  } else if (ordinal > yearInDays) {
    year = weekYear + 1;
    ordinal -= daysInYear(weekYear);
  } else {
    year = weekYear;
  }
  var _uncomputeOrdinal = uncomputeOrdinal(year, ordinal), month = _uncomputeOrdinal.month, day = _uncomputeOrdinal.day;
  return _extends({
    year,
    month,
    day
  }, timeObject(weekData));
}
function gregorianToOrdinal(gregData) {
  var year = gregData.year, month = gregData.month, day = gregData.day;
  var ordinal = computeOrdinal(year, month, day);
  return _extends({
    year,
    ordinal
  }, timeObject(gregData));
}
function ordinalToGregorian(ordinalData) {
  var year = ordinalData.year, ordinal = ordinalData.ordinal;
  var _uncomputeOrdinal2 = uncomputeOrdinal(year, ordinal), month = _uncomputeOrdinal2.month, day = _uncomputeOrdinal2.day;
  return _extends({
    year,
    month,
    day
  }, timeObject(ordinalData));
}
function hasInvalidWeekData(obj) {
  var validYear = isInteger(obj.weekYear), validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear)), validWeekday = integerBetween(obj.weekday, 1, 7);
  if (!validYear) {
    return unitOutOfRange("weekYear", obj.weekYear);
  } else if (!validWeek) {
    return unitOutOfRange("week", obj.week);
  } else if (!validWeekday) {
    return unitOutOfRange("weekday", obj.weekday);
  } else
    return false;
}
function hasInvalidOrdinalData(obj) {
  var validYear = isInteger(obj.year), validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));
  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validOrdinal) {
    return unitOutOfRange("ordinal", obj.ordinal);
  } else
    return false;
}
function hasInvalidGregorianData(obj) {
  var validYear = isInteger(obj.year), validMonth = integerBetween(obj.month, 1, 12), validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));
  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validMonth) {
    return unitOutOfRange("month", obj.month);
  } else if (!validDay) {
    return unitOutOfRange("day", obj.day);
  } else
    return false;
}
function hasInvalidTimeData(obj) {
  var hour = obj.hour, minute = obj.minute, second = obj.second, millisecond = obj.millisecond;
  var validHour = integerBetween(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0, validMinute = integerBetween(minute, 0, 59), validSecond = integerBetween(second, 0, 59), validMillisecond = integerBetween(millisecond, 0, 999);
  if (!validHour) {
    return unitOutOfRange("hour", hour);
  } else if (!validMinute) {
    return unitOutOfRange("minute", minute);
  } else if (!validSecond) {
    return unitOutOfRange("second", second);
  } else if (!validMillisecond) {
    return unitOutOfRange("millisecond", millisecond);
  } else
    return false;
}
var INVALID = "Invalid DateTime";
var MAX_DATE = 864e13;
function unsupportedZone(zone) {
  return new Invalid("unsupported zone", 'the zone "' + zone.name + '" is not supported');
}
function possiblyCachedWeekData(dt) {
  if (dt.weekData === null) {
    dt.weekData = gregorianToWeek(dt.c);
  }
  return dt.weekData;
}
function clone(inst, alts) {
  var current = {
    ts: inst.ts,
    zone: inst.zone,
    c: inst.c,
    o: inst.o,
    loc: inst.loc,
    invalid: inst.invalid
  };
  return new DateTime(_extends({}, current, alts, {
    old: current
  }));
}
function fixOffset(localTS, o, tz) {
  var utcGuess = localTS - o * 60 * 1e3;
  var o2 = tz.offset(utcGuess);
  if (o === o2) {
    return [utcGuess, o];
  }
  utcGuess -= (o2 - o) * 60 * 1e3;
  var o3 = tz.offset(utcGuess);
  if (o2 === o3) {
    return [utcGuess, o2];
  }
  return [localTS - Math.min(o2, o3) * 60 * 1e3, Math.max(o2, o3)];
}
function tsToObj(ts, offset2) {
  ts += offset2 * 60 * 1e3;
  var d = new Date(ts);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: d.getUTCSeconds(),
    millisecond: d.getUTCMilliseconds()
  };
}
function objToTS(obj, offset2, zone) {
  return fixOffset(objToLocalTS(obj), offset2, zone);
}
function adjustTime(inst, dur) {
  var oPre = inst.o, year = inst.c.year + Math.trunc(dur.years), month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3, c = _extends({}, inst.c, {
    year,
    month,
    day: Math.min(inst.c.day, daysInMonth(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
  }), millisToAdd = Duration.fromObject({
    years: dur.years - Math.trunc(dur.years),
    quarters: dur.quarters - Math.trunc(dur.quarters),
    months: dur.months - Math.trunc(dur.months),
    weeks: dur.weeks - Math.trunc(dur.weeks),
    days: dur.days - Math.trunc(dur.days),
    hours: dur.hours,
    minutes: dur.minutes,
    seconds: dur.seconds,
    milliseconds: dur.milliseconds
  }).as("milliseconds"), localTS = objToLocalTS(c);
  var _fixOffset = fixOffset(localTS, oPre, inst.zone), ts = _fixOffset[0], o = _fixOffset[1];
  if (millisToAdd !== 0) {
    ts += millisToAdd;
    o = inst.zone.offset(ts);
  }
  return {
    ts,
    o
  };
}
function parseDataToDateTime(parsed, parsedZone, opts, format, text2, specificOffset) {
  var setZone = opts.setZone, zone = opts.zone;
  if (parsed && Object.keys(parsed).length !== 0) {
    var interpretationZone = parsedZone || zone, inst = DateTime.fromObject(parsed, _extends({}, opts, {
      zone: interpretationZone,
      specificOffset
    }));
    return setZone ? inst : inst.setZone(zone);
  } else {
    return DateTime.invalid(new Invalid("unparsable", 'the input "' + text2 + `" can't be parsed as ` + format));
  }
}
function toTechFormat(dt, format, allowZ) {
  if (allowZ === void 0) {
    allowZ = true;
  }
  return dt.isValid ? Formatter.create(Locale.create("en-US"), {
    allowZ,
    forceSimple: true
  }).formatDateTimeFromString(dt, format) : null;
}
function _toISODate(o, extended) {
  var longFormat = o.c.year > 9999 || o.c.year < 0;
  var c = "";
  if (longFormat && o.c.year >= 0)
    c += "+";
  c += padStart(o.c.year, longFormat ? 6 : 4);
  if (extended) {
    c += "-";
    c += padStart(o.c.month);
    c += "-";
    c += padStart(o.c.day);
  } else {
    c += padStart(o.c.month);
    c += padStart(o.c.day);
  }
  return c;
}
function _toISOTime(o, extended, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone) {
  var c = padStart(o.c.hour);
  if (extended) {
    c += ":";
    c += padStart(o.c.minute);
    if (o.c.second !== 0 || !suppressSeconds) {
      c += ":";
    }
  } else {
    c += padStart(o.c.minute);
  }
  if (o.c.second !== 0 || !suppressSeconds) {
    c += padStart(o.c.second);
    if (o.c.millisecond !== 0 || !suppressMilliseconds) {
      c += ".";
      c += padStart(o.c.millisecond, 3);
    }
  }
  if (includeOffset) {
    if (o.isOffsetFixed && o.offset === 0 && !extendedZone) {
      c += "Z";
    } else if (o.o < 0) {
      c += "-";
      c += padStart(Math.trunc(-o.o / 60));
      c += ":";
      c += padStart(Math.trunc(-o.o % 60));
    } else {
      c += "+";
      c += padStart(Math.trunc(o.o / 60));
      c += ":";
      c += padStart(Math.trunc(o.o % 60));
    }
  }
  if (extendedZone) {
    c += "[" + o.zone.ianaName + "]";
  }
  return c;
}
var defaultUnitValues = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, defaultWeekUnitValues = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, defaultOrdinalUnitValues = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
};
var orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"], orderedWeekUnits = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"], orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function normalizeUnit(unit) {
  var normalized = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[unit.toLowerCase()];
  if (!normalized)
    throw new InvalidUnitError(unit);
  return normalized;
}
function quickDT(obj, opts) {
  var zone = normalizeZone(opts.zone, Settings.defaultZone), loc = Locale.fromObject(opts), tsNow = Settings.now();
  var ts, o;
  if (!isUndefined(obj.year)) {
    for (var _iterator = _createForOfIteratorHelperLoose(orderedUnits), _step; !(_step = _iterator()).done; ) {
      var u = _step.value;
      if (isUndefined(obj[u])) {
        obj[u] = defaultUnitValues[u];
      }
    }
    var invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
    if (invalid) {
      return DateTime.invalid(invalid);
    }
    var offsetProvis = zone.offset(tsNow);
    var _objToTS = objToTS(obj, offsetProvis, zone);
    ts = _objToTS[0];
    o = _objToTS[1];
  } else {
    ts = tsNow;
  }
  return new DateTime({
    ts,
    zone,
    loc,
    o
  });
}
function diffRelative(start, end, opts) {
  var round = isUndefined(opts.round) ? true : opts.round, format = function format2(c, unit2) {
    c = roundTo(c, round || opts.calendary ? 0 : 2, true);
    var formatter = end.loc.clone(opts).relFormatter(opts);
    return formatter.format(c, unit2);
  }, differ = function differ2(unit2) {
    if (opts.calendary) {
      if (!end.hasSame(start, unit2)) {
        return end.startOf(unit2).diff(start.startOf(unit2), unit2).get(unit2);
      } else
        return 0;
    } else {
      return end.diff(start, unit2).get(unit2);
    }
  };
  if (opts.unit) {
    return format(differ(opts.unit), opts.unit);
  }
  for (var _iterator2 = _createForOfIteratorHelperLoose(opts.units), _step2; !(_step2 = _iterator2()).done; ) {
    var unit = _step2.value;
    var count = differ(unit);
    if (Math.abs(count) >= 1) {
      return format(count, unit);
    }
  }
  return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
}
function lastOpts(argList) {
  var opts = {}, args;
  if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
    opts = argList[argList.length - 1];
    args = Array.from(argList).slice(0, argList.length - 1);
  } else {
    args = Array.from(argList);
  }
  return [opts, args];
}
var DateTime = /* @__PURE__ */ function() {
  function DateTime2(config) {
    var zone = config.zone || Settings.defaultZone;
    var invalid = config.invalid || (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) || (!zone.isValid ? unsupportedZone(zone) : null);
    this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;
    var c = null, o = null;
    if (!invalid) {
      var unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);
      if (unchanged) {
        var _ref = [config.old.c, config.old.o];
        c = _ref[0];
        o = _ref[1];
      } else {
        var ot = zone.offset(this.ts);
        c = tsToObj(this.ts, ot);
        invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
        c = invalid ? null : c;
        o = invalid ? null : ot;
      }
    }
    this._zone = zone;
    this.loc = config.loc || Locale.create();
    this.invalid = invalid;
    this.weekData = null;
    this.c = c;
    this.o = o;
    this.isLuxonDateTime = true;
  }
  DateTime2.now = function now3() {
    return new DateTime2({});
  };
  DateTime2.local = function local() {
    var _lastOpts = lastOpts(arguments), opts = _lastOpts[0], args = _lastOpts[1], year = args[0], month = args[1], day = args[2], hour = args[3], minute = args[4], second = args[5], millisecond = args[6];
    return quickDT({
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond
    }, opts);
  };
  DateTime2.utc = function utc() {
    var _lastOpts2 = lastOpts(arguments), opts = _lastOpts2[0], args = _lastOpts2[1], year = args[0], month = args[1], day = args[2], hour = args[3], minute = args[4], second = args[5], millisecond = args[6];
    opts.zone = FixedOffsetZone.utcInstance;
    return quickDT({
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond
    }, opts);
  };
  DateTime2.fromJSDate = function fromJSDate(date, options) {
    if (options === void 0) {
      options = {};
    }
    var ts = isDate(date) ? date.valueOf() : NaN;
    if (Number.isNaN(ts)) {
      return DateTime2.invalid("invalid input");
    }
    var zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
    if (!zoneToUse.isValid) {
      return DateTime2.invalid(unsupportedZone(zoneToUse));
    }
    return new DateTime2({
      ts,
      zone: zoneToUse,
      loc: Locale.fromObject(options)
    });
  };
  DateTime2.fromMillis = function fromMillis(milliseconds, options) {
    if (options === void 0) {
      options = {};
    }
    if (!isNumber(milliseconds)) {
      throw new InvalidArgumentError("fromMillis requires a numerical input, but received a " + typeof milliseconds + " with value " + milliseconds);
    } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
      return DateTime2.invalid("Timestamp out of range");
    } else {
      return new DateTime2({
        ts: milliseconds,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  };
  DateTime2.fromSeconds = function fromSeconds(seconds, options) {
    if (options === void 0) {
      options = {};
    }
    if (!isNumber(seconds)) {
      throw new InvalidArgumentError("fromSeconds requires a numerical input");
    } else {
      return new DateTime2({
        ts: seconds * 1e3,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  };
  DateTime2.fromObject = function fromObject(obj, opts) {
    if (opts === void 0) {
      opts = {};
    }
    obj = obj || {};
    var zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);
    if (!zoneToUse.isValid) {
      return DateTime2.invalid(unsupportedZone(zoneToUse));
    }
    var tsNow = Settings.now(), offsetProvis = !isUndefined(opts.specificOffset) ? opts.specificOffset : zoneToUse.offset(tsNow), normalized = normalizeObject(obj, normalizeUnit), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber, loc = Locale.fromObject(opts);
    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    }
    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }
    var useWeekData = definiteWeekDef || normalized.weekday && !containsGregor;
    var units, defaultValues, objNow = tsToObj(tsNow, offsetProvis);
    if (useWeekData) {
      units = orderedWeekUnits;
      defaultValues = defaultWeekUnitValues;
      objNow = gregorianToWeek(objNow);
    } else if (containsOrdinal) {
      units = orderedOrdinalUnits;
      defaultValues = defaultOrdinalUnitValues;
      objNow = gregorianToOrdinal(objNow);
    } else {
      units = orderedUnits;
      defaultValues = defaultUnitValues;
    }
    var foundFirst = false;
    for (var _iterator3 = _createForOfIteratorHelperLoose(units), _step3; !(_step3 = _iterator3()).done; ) {
      var u = _step3.value;
      var v = normalized[u];
      if (!isUndefined(v)) {
        foundFirst = true;
      } else if (foundFirst) {
        normalized[u] = defaultValues[u];
      } else {
        normalized[u] = objNow[u];
      }
    }
    var higherOrderInvalid = useWeekData ? hasInvalidWeekData(normalized) : containsOrdinal ? hasInvalidOrdinalData(normalized) : hasInvalidGregorianData(normalized), invalid = higherOrderInvalid || hasInvalidTimeData(normalized);
    if (invalid) {
      return DateTime2.invalid(invalid);
    }
    var gregorian = useWeekData ? weekToGregorian(normalized) : containsOrdinal ? ordinalToGregorian(normalized) : normalized, _objToTS2 = objToTS(gregorian, offsetProvis, zoneToUse), tsFinal = _objToTS2[0], offsetFinal = _objToTS2[1], inst = new DateTime2({
      ts: tsFinal,
      zone: zoneToUse,
      o: offsetFinal,
      loc
    });
    if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
      return DateTime2.invalid("mismatched weekday", "you can't specify both a weekday of " + normalized.weekday + " and a date of " + inst.toISO());
    }
    return inst;
  };
  DateTime2.fromISO = function fromISO(text2, opts) {
    if (opts === void 0) {
      opts = {};
    }
    var _parseISODate = parseISODate(text2), vals = _parseISODate[0], parsedZone = _parseISODate[1];
    return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text2);
  };
  DateTime2.fromRFC2822 = function fromRFC2822(text2, opts) {
    if (opts === void 0) {
      opts = {};
    }
    var _parseRFC2822Date = parseRFC2822Date(text2), vals = _parseRFC2822Date[0], parsedZone = _parseRFC2822Date[1];
    return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text2);
  };
  DateTime2.fromHTTP = function fromHTTP(text2, opts) {
    if (opts === void 0) {
      opts = {};
    }
    var _parseHTTPDate = parseHTTPDate(text2), vals = _parseHTTPDate[0], parsedZone = _parseHTTPDate[1];
    return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
  };
  DateTime2.fromFormat = function fromFormat(text2, fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }
    if (isUndefined(text2) || isUndefined(fmt)) {
      throw new InvalidArgumentError("fromFormat requires an input string and a format");
    }
    var _opts = opts, _opts$locale = _opts.locale, locale = _opts$locale === void 0 ? null : _opts$locale, _opts$numberingSystem = _opts.numberingSystem, numberingSystem = _opts$numberingSystem === void 0 ? null : _opts$numberingSystem, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    }), _parseFromTokens = parseFromTokens(localeToUse, text2, fmt), vals = _parseFromTokens[0], parsedZone = _parseFromTokens[1], specificOffset = _parseFromTokens[2], invalid = _parseFromTokens[3];
    if (invalid) {
      return DateTime2.invalid(invalid);
    } else {
      return parseDataToDateTime(vals, parsedZone, opts, "format " + fmt, text2, specificOffset);
    }
  };
  DateTime2.fromString = function fromString(text2, fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }
    return DateTime2.fromFormat(text2, fmt, opts);
  };
  DateTime2.fromSQL = function fromSQL(text2, opts) {
    if (opts === void 0) {
      opts = {};
    }
    var _parseSQL = parseSQL(text2), vals = _parseSQL[0], parsedZone = _parseSQL[1];
    return parseDataToDateTime(vals, parsedZone, opts, "SQL", text2);
  };
  DateTime2.invalid = function invalid(reason, explanation) {
    if (explanation === void 0) {
      explanation = null;
    }
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
    }
    var invalid2 = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidDateTimeError(invalid2);
    } else {
      return new DateTime2({
        invalid: invalid2
      });
    }
  };
  DateTime2.isDateTime = function isDateTime(o) {
    return o && o.isLuxonDateTime || false;
  };
  var _proto = DateTime2.prototype;
  _proto.get = function get(unit) {
    return this[unit];
  };
  _proto.resolvedLocaleOptions = function resolvedLocaleOptions(opts) {
    if (opts === void 0) {
      opts = {};
    }
    var _Formatter$create$res = Formatter.create(this.loc.clone(opts), opts).resolvedOptions(this), locale = _Formatter$create$res.locale, numberingSystem = _Formatter$create$res.numberingSystem, calendar = _Formatter$create$res.calendar;
    return {
      locale,
      numberingSystem,
      outputCalendar: calendar
    };
  };
  _proto.toUTC = function toUTC(offset2, opts) {
    if (offset2 === void 0) {
      offset2 = 0;
    }
    if (opts === void 0) {
      opts = {};
    }
    return this.setZone(FixedOffsetZone.instance(offset2), opts);
  };
  _proto.toLocal = function toLocal() {
    return this.setZone(Settings.defaultZone);
  };
  _proto.setZone = function setZone(zone, _temp) {
    var _ref2 = _temp === void 0 ? {} : _temp, _ref2$keepLocalTime = _ref2.keepLocalTime, keepLocalTime = _ref2$keepLocalTime === void 0 ? false : _ref2$keepLocalTime, _ref2$keepCalendarTim = _ref2.keepCalendarTime, keepCalendarTime = _ref2$keepCalendarTim === void 0 ? false : _ref2$keepCalendarTim;
    zone = normalizeZone(zone, Settings.defaultZone);
    if (zone.equals(this.zone)) {
      return this;
    } else if (!zone.isValid) {
      return DateTime2.invalid(unsupportedZone(zone));
    } else {
      var newTS = this.ts;
      if (keepLocalTime || keepCalendarTime) {
        var offsetGuess = zone.offset(this.ts);
        var asObj = this.toObject();
        var _objToTS3 = objToTS(asObj, offsetGuess, zone);
        newTS = _objToTS3[0];
      }
      return clone(this, {
        ts: newTS,
        zone
      });
    }
  };
  _proto.reconfigure = function reconfigure(_temp2) {
    var _ref3 = _temp2 === void 0 ? {} : _temp2, locale = _ref3.locale, numberingSystem = _ref3.numberingSystem, outputCalendar = _ref3.outputCalendar;
    var loc = this.loc.clone({
      locale,
      numberingSystem,
      outputCalendar
    });
    return clone(this, {
      loc
    });
  };
  _proto.setLocale = function setLocale(locale) {
    return this.reconfigure({
      locale
    });
  };
  _proto.set = function set(values) {
    if (!this.isValid)
      return this;
    var normalized = normalizeObject(values, normalizeUnit), settingWeekStuff = !isUndefined(normalized.weekYear) || !isUndefined(normalized.weekNumber) || !isUndefined(normalized.weekday), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    }
    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }
    var mixed;
    if (settingWeekStuff) {
      mixed = weekToGregorian(_extends({}, gregorianToWeek(this.c), normalized));
    } else if (!isUndefined(normalized.ordinal)) {
      mixed = ordinalToGregorian(_extends({}, gregorianToOrdinal(this.c), normalized));
    } else {
      mixed = _extends({}, this.toObject(), normalized);
      if (isUndefined(normalized.day)) {
        mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
      }
    }
    var _objToTS4 = objToTS(mixed, this.o, this.zone), ts = _objToTS4[0], o = _objToTS4[1];
    return clone(this, {
      ts,
      o
    });
  };
  _proto.plus = function plus(duration) {
    if (!this.isValid)
      return this;
    var dur = Duration.fromDurationLike(duration);
    return clone(this, adjustTime(this, dur));
  };
  _proto.minus = function minus(duration) {
    if (!this.isValid)
      return this;
    var dur = Duration.fromDurationLike(duration).negate();
    return clone(this, adjustTime(this, dur));
  };
  _proto.startOf = function startOf(unit) {
    if (!this.isValid)
      return this;
    var o = {}, normalizedUnit = Duration.normalizeUnit(unit);
    switch (normalizedUnit) {
      case "years":
        o.month = 1;
      case "quarters":
      case "months":
        o.day = 1;
      case "weeks":
      case "days":
        o.hour = 0;
      case "hours":
        o.minute = 0;
      case "minutes":
        o.second = 0;
      case "seconds":
        o.millisecond = 0;
        break;
    }
    if (normalizedUnit === "weeks") {
      o.weekday = 1;
    }
    if (normalizedUnit === "quarters") {
      var q = Math.ceil(this.month / 3);
      o.month = (q - 1) * 3 + 1;
    }
    return this.set(o);
  };
  _proto.endOf = function endOf(unit) {
    var _this$plus;
    return this.isValid ? this.plus((_this$plus = {}, _this$plus[unit] = 1, _this$plus)).startOf(unit).minus(1) : this;
  };
  _proto.toFormat = function toFormat(fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }
    return this.isValid ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID;
  };
  _proto.toLocaleString = function toLocaleString(formatOpts, opts) {
    if (formatOpts === void 0) {
      formatOpts = DATE_SHORT;
    }
    if (opts === void 0) {
      opts = {};
    }
    return this.isValid ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this) : INVALID;
  };
  _proto.toLocaleParts = function toLocaleParts(opts) {
    if (opts === void 0) {
      opts = {};
    }
    return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this) : [];
  };
  _proto.toISO = function toISO(_temp3) {
    var _ref4 = _temp3 === void 0 ? {} : _temp3, _ref4$format = _ref4.format, format = _ref4$format === void 0 ? "extended" : _ref4$format, _ref4$suppressSeconds = _ref4.suppressSeconds, suppressSeconds = _ref4$suppressSeconds === void 0 ? false : _ref4$suppressSeconds, _ref4$suppressMillise = _ref4.suppressMilliseconds, suppressMilliseconds = _ref4$suppressMillise === void 0 ? false : _ref4$suppressMillise, _ref4$includeOffset = _ref4.includeOffset, includeOffset = _ref4$includeOffset === void 0 ? true : _ref4$includeOffset, _ref4$extendedZone = _ref4.extendedZone, extendedZone = _ref4$extendedZone === void 0 ? false : _ref4$extendedZone;
    if (!this.isValid) {
      return null;
    }
    var ext = format === "extended";
    var c = _toISODate(this, ext);
    c += "T";
    c += _toISOTime(this, ext, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone);
    return c;
  };
  _proto.toISODate = function toISODate(_temp4) {
    var _ref5 = _temp4 === void 0 ? {} : _temp4, _ref5$format = _ref5.format, format = _ref5$format === void 0 ? "extended" : _ref5$format;
    if (!this.isValid) {
      return null;
    }
    return _toISODate(this, format === "extended");
  };
  _proto.toISOWeekDate = function toISOWeekDate() {
    return toTechFormat(this, "kkkk-'W'WW-c");
  };
  _proto.toISOTime = function toISOTime(_temp5) {
    var _ref6 = _temp5 === void 0 ? {} : _temp5, _ref6$suppressMillise = _ref6.suppressMilliseconds, suppressMilliseconds = _ref6$suppressMillise === void 0 ? false : _ref6$suppressMillise, _ref6$suppressSeconds = _ref6.suppressSeconds, suppressSeconds = _ref6$suppressSeconds === void 0 ? false : _ref6$suppressSeconds, _ref6$includeOffset = _ref6.includeOffset, includeOffset = _ref6$includeOffset === void 0 ? true : _ref6$includeOffset, _ref6$includePrefix = _ref6.includePrefix, includePrefix = _ref6$includePrefix === void 0 ? false : _ref6$includePrefix, _ref6$extendedZone = _ref6.extendedZone, extendedZone = _ref6$extendedZone === void 0 ? false : _ref6$extendedZone, _ref6$format = _ref6.format, format = _ref6$format === void 0 ? "extended" : _ref6$format;
    if (!this.isValid) {
      return null;
    }
    var c = includePrefix ? "T" : "";
    return c + _toISOTime(this, format === "extended", suppressSeconds, suppressMilliseconds, includeOffset, extendedZone);
  };
  _proto.toRFC2822 = function toRFC2822() {
    return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
  };
  _proto.toHTTP = function toHTTP() {
    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  };
  _proto.toSQLDate = function toSQLDate() {
    if (!this.isValid) {
      return null;
    }
    return _toISODate(this, true);
  };
  _proto.toSQLTime = function toSQLTime(_temp6) {
    var _ref7 = _temp6 === void 0 ? {} : _temp6, _ref7$includeOffset = _ref7.includeOffset, includeOffset = _ref7$includeOffset === void 0 ? true : _ref7$includeOffset, _ref7$includeZone = _ref7.includeZone, includeZone = _ref7$includeZone === void 0 ? false : _ref7$includeZone, _ref7$includeOffsetSp = _ref7.includeOffsetSpace, includeOffsetSpace = _ref7$includeOffsetSp === void 0 ? true : _ref7$includeOffsetSp;
    var fmt = "HH:mm:ss.SSS";
    if (includeZone || includeOffset) {
      if (includeOffsetSpace) {
        fmt += " ";
      }
      if (includeZone) {
        fmt += "z";
      } else if (includeOffset) {
        fmt += "ZZ";
      }
    }
    return toTechFormat(this, fmt, true);
  };
  _proto.toSQL = function toSQL(opts) {
    if (opts === void 0) {
      opts = {};
    }
    if (!this.isValid) {
      return null;
    }
    return this.toSQLDate() + " " + this.toSQLTime(opts);
  };
  _proto.toString = function toString() {
    return this.isValid ? this.toISO() : INVALID;
  };
  _proto.valueOf = function valueOf() {
    return this.toMillis();
  };
  _proto.toMillis = function toMillis() {
    return this.isValid ? this.ts : NaN;
  };
  _proto.toSeconds = function toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  };
  _proto.toUnixInteger = function toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  };
  _proto.toJSON = function toJSON() {
    return this.toISO();
  };
  _proto.toBSON = function toBSON() {
    return this.toJSDate();
  };
  _proto.toObject = function toObject(opts) {
    if (opts === void 0) {
      opts = {};
    }
    if (!this.isValid)
      return {};
    var base = _extends({}, this.c);
    if (opts.includeConfig) {
      base.outputCalendar = this.outputCalendar;
      base.numberingSystem = this.loc.numberingSystem;
      base.locale = this.loc.locale;
    }
    return base;
  };
  _proto.toJSDate = function toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  };
  _proto.diff = function diff(otherDateTime, unit, opts) {
    if (unit === void 0) {
      unit = "milliseconds";
    }
    if (opts === void 0) {
      opts = {};
    }
    if (!this.isValid || !otherDateTime.isValid) {
      return Duration.invalid("created by diffing an invalid DateTime");
    }
    var durOpts = _extends({
      locale: this.locale,
      numberingSystem: this.numberingSystem
    }, opts);
    var units = maybeArray(unit).map(Duration.normalizeUnit), otherIsLater = otherDateTime.valueOf() > this.valueOf(), earlier = otherIsLater ? this : otherDateTime, later = otherIsLater ? otherDateTime : this, diffed = _diff(earlier, later, units, durOpts);
    return otherIsLater ? diffed.negate() : diffed;
  };
  _proto.diffNow = function diffNow(unit, opts) {
    if (unit === void 0) {
      unit = "milliseconds";
    }
    if (opts === void 0) {
      opts = {};
    }
    return this.diff(DateTime2.now(), unit, opts);
  };
  _proto.until = function until(otherDateTime) {
    return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
  };
  _proto.hasSame = function hasSame(otherDateTime, unit) {
    if (!this.isValid)
      return false;
    var inputMs = otherDateTime.valueOf();
    var adjustedToZone = this.setZone(otherDateTime.zone, {
      keepLocalTime: true
    });
    return adjustedToZone.startOf(unit) <= inputMs && inputMs <= adjustedToZone.endOf(unit);
  };
  _proto.equals = function equals(other2) {
    return this.isValid && other2.isValid && this.valueOf() === other2.valueOf() && this.zone.equals(other2.zone) && this.loc.equals(other2.loc);
  };
  _proto.toRelative = function toRelative(options) {
    if (options === void 0) {
      options = {};
    }
    if (!this.isValid)
      return null;
    var base = options.base || DateTime2.fromObject({}, {
      zone: this.zone
    }), padding = options.padding ? this < base ? -options.padding : options.padding : 0;
    var units = ["years", "months", "days", "hours", "minutes", "seconds"];
    var unit = options.unit;
    if (Array.isArray(options.unit)) {
      units = options.unit;
      unit = void 0;
    }
    return diffRelative(base, this.plus(padding), _extends({}, options, {
      numeric: "always",
      units,
      unit
    }));
  };
  _proto.toRelativeCalendar = function toRelativeCalendar(options) {
    if (options === void 0) {
      options = {};
    }
    if (!this.isValid)
      return null;
    return diffRelative(options.base || DateTime2.fromObject({}, {
      zone: this.zone
    }), this, _extends({}, options, {
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: true
    }));
  };
  DateTime2.min = function min() {
    for (var _len = arguments.length, dateTimes = new Array(_len), _key = 0; _key < _len; _key++) {
      dateTimes[_key] = arguments[_key];
    }
    if (!dateTimes.every(DateTime2.isDateTime)) {
      throw new InvalidArgumentError("min requires all arguments be DateTimes");
    }
    return bestBy(dateTimes, function(i) {
      return i.valueOf();
    }, Math.min);
  };
  DateTime2.max = function max() {
    for (var _len2 = arguments.length, dateTimes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      dateTimes[_key2] = arguments[_key2];
    }
    if (!dateTimes.every(DateTime2.isDateTime)) {
      throw new InvalidArgumentError("max requires all arguments be DateTimes");
    }
    return bestBy(dateTimes, function(i) {
      return i.valueOf();
    }, Math.max);
  };
  DateTime2.fromFormatExplain = function fromFormatExplain(text2, fmt, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, _options$locale = _options.locale, locale = _options$locale === void 0 ? null : _options$locale, _options$numberingSys = _options.numberingSystem, numberingSystem = _options$numberingSys === void 0 ? null : _options$numberingSys, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    });
    return explainFromTokens(localeToUse, text2, fmt);
  };
  DateTime2.fromStringExplain = function fromStringExplain(text2, fmt, options) {
    if (options === void 0) {
      options = {};
    }
    return DateTime2.fromFormatExplain(text2, fmt, options);
  };
  _createClass(DateTime2, [{
    key: "isValid",
    get: function get() {
      return this.invalid === null;
    }
  }, {
    key: "invalidReason",
    get: function get() {
      return this.invalid ? this.invalid.reason : null;
    }
  }, {
    key: "invalidExplanation",
    get: function get() {
      return this.invalid ? this.invalid.explanation : null;
    }
  }, {
    key: "locale",
    get: function get() {
      return this.isValid ? this.loc.locale : null;
    }
  }, {
    key: "numberingSystem",
    get: function get() {
      return this.isValid ? this.loc.numberingSystem : null;
    }
  }, {
    key: "outputCalendar",
    get: function get() {
      return this.isValid ? this.loc.outputCalendar : null;
    }
  }, {
    key: "zone",
    get: function get() {
      return this._zone;
    }
  }, {
    key: "zoneName",
    get: function get() {
      return this.isValid ? this.zone.name : null;
    }
  }, {
    key: "year",
    get: function get() {
      return this.isValid ? this.c.year : NaN;
    }
  }, {
    key: "quarter",
    get: function get() {
      return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
    }
  }, {
    key: "month",
    get: function get() {
      return this.isValid ? this.c.month : NaN;
    }
  }, {
    key: "day",
    get: function get() {
      return this.isValid ? this.c.day : NaN;
    }
  }, {
    key: "hour",
    get: function get() {
      return this.isValid ? this.c.hour : NaN;
    }
  }, {
    key: "minute",
    get: function get() {
      return this.isValid ? this.c.minute : NaN;
    }
  }, {
    key: "second",
    get: function get() {
      return this.isValid ? this.c.second : NaN;
    }
  }, {
    key: "millisecond",
    get: function get() {
      return this.isValid ? this.c.millisecond : NaN;
    }
  }, {
    key: "weekYear",
    get: function get() {
      return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
    }
  }, {
    key: "weekNumber",
    get: function get() {
      return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
    }
  }, {
    key: "weekday",
    get: function get() {
      return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
    }
  }, {
    key: "ordinal",
    get: function get() {
      return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
    }
  }, {
    key: "monthShort",
    get: function get() {
      return this.isValid ? Info.months("short", {
        locObj: this.loc
      })[this.month - 1] : null;
    }
  }, {
    key: "monthLong",
    get: function get() {
      return this.isValid ? Info.months("long", {
        locObj: this.loc
      })[this.month - 1] : null;
    }
  }, {
    key: "weekdayShort",
    get: function get() {
      return this.isValid ? Info.weekdays("short", {
        locObj: this.loc
      })[this.weekday - 1] : null;
    }
  }, {
    key: "weekdayLong",
    get: function get() {
      return this.isValid ? Info.weekdays("long", {
        locObj: this.loc
      })[this.weekday - 1] : null;
    }
  }, {
    key: "offset",
    get: function get() {
      return this.isValid ? +this.o : NaN;
    }
  }, {
    key: "offsetNameShort",
    get: function get() {
      if (this.isValid) {
        return this.zone.offsetName(this.ts, {
          format: "short",
          locale: this.locale
        });
      } else {
        return null;
      }
    }
  }, {
    key: "offsetNameLong",
    get: function get() {
      if (this.isValid) {
        return this.zone.offsetName(this.ts, {
          format: "long",
          locale: this.locale
        });
      } else {
        return null;
      }
    }
  }, {
    key: "isOffsetFixed",
    get: function get() {
      return this.isValid ? this.zone.isUniversal : null;
    }
  }, {
    key: "isInDST",
    get: function get() {
      if (this.isOffsetFixed) {
        return false;
      } else {
        return this.offset > this.set({
          month: 1,
          day: 1
        }).offset || this.offset > this.set({
          month: 5
        }).offset;
      }
    }
  }, {
    key: "isInLeapYear",
    get: function get() {
      return isLeapYear(this.year);
    }
  }, {
    key: "daysInMonth",
    get: function get() {
      return daysInMonth(this.year, this.month);
    }
  }, {
    key: "daysInYear",
    get: function get() {
      return this.isValid ? daysInYear(this.year) : NaN;
    }
  }, {
    key: "weeksInWeekYear",
    get: function get() {
      return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
    }
  }], [{
    key: "DATE_SHORT",
    get: function get() {
      return DATE_SHORT;
    }
  }, {
    key: "DATE_MED",
    get: function get() {
      return DATE_MED;
    }
  }, {
    key: "DATE_MED_WITH_WEEKDAY",
    get: function get() {
      return DATE_MED_WITH_WEEKDAY;
    }
  }, {
    key: "DATE_FULL",
    get: function get() {
      return DATE_FULL;
    }
  }, {
    key: "DATE_HUGE",
    get: function get() {
      return DATE_HUGE;
    }
  }, {
    key: "TIME_SIMPLE",
    get: function get() {
      return TIME_SIMPLE;
    }
  }, {
    key: "TIME_WITH_SECONDS",
    get: function get() {
      return TIME_WITH_SECONDS;
    }
  }, {
    key: "TIME_WITH_SHORT_OFFSET",
    get: function get() {
      return TIME_WITH_SHORT_OFFSET;
    }
  }, {
    key: "TIME_WITH_LONG_OFFSET",
    get: function get() {
      return TIME_WITH_LONG_OFFSET;
    }
  }, {
    key: "TIME_24_SIMPLE",
    get: function get() {
      return TIME_24_SIMPLE;
    }
  }, {
    key: "TIME_24_WITH_SECONDS",
    get: function get() {
      return TIME_24_WITH_SECONDS;
    }
  }, {
    key: "TIME_24_WITH_SHORT_OFFSET",
    get: function get() {
      return TIME_24_WITH_SHORT_OFFSET;
    }
  }, {
    key: "TIME_24_WITH_LONG_OFFSET",
    get: function get() {
      return TIME_24_WITH_LONG_OFFSET;
    }
  }, {
    key: "DATETIME_SHORT",
    get: function get() {
      return DATETIME_SHORT;
    }
  }, {
    key: "DATETIME_SHORT_WITH_SECONDS",
    get: function get() {
      return DATETIME_SHORT_WITH_SECONDS;
    }
  }, {
    key: "DATETIME_MED",
    get: function get() {
      return DATETIME_MED;
    }
  }, {
    key: "DATETIME_MED_WITH_SECONDS",
    get: function get() {
      return DATETIME_MED_WITH_SECONDS;
    }
  }, {
    key: "DATETIME_MED_WITH_WEEKDAY",
    get: function get() {
      return DATETIME_MED_WITH_WEEKDAY;
    }
  }, {
    key: "DATETIME_FULL",
    get: function get() {
      return DATETIME_FULL;
    }
  }, {
    key: "DATETIME_FULL_WITH_SECONDS",
    get: function get() {
      return DATETIME_FULL_WITH_SECONDS;
    }
  }, {
    key: "DATETIME_HUGE",
    get: function get() {
      return DATETIME_HUGE;
    }
  }, {
    key: "DATETIME_HUGE_WITH_SECONDS",
    get: function get() {
      return DATETIME_HUGE_WITH_SECONDS;
    }
  }]);
  return DateTime2;
}();
function friendlyDateTime(dateTimeish) {
  if (DateTime.isDateTime(dateTimeish)) {
    return dateTimeish;
  } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
    return DateTime.fromJSDate(dateTimeish);
  } else if (dateTimeish && typeof dateTimeish === "object") {
    return DateTime.fromObject(dateTimeish);
  } else {
    throw new InvalidArgumentError("Unknown datetime argument: " + dateTimeish + ", of type " + typeof dateTimeish);
  }
}
var VERSION = "2.4.0";
var DateTime_1 = luxon.DateTime = DateTime;
var Duration_1 = luxon.Duration = Duration;
luxon.FixedOffsetZone = FixedOffsetZone;
luxon.IANAZone = IANAZone;
luxon.Info = Info;
luxon.Interval = Interval;
luxon.InvalidZone = InvalidZone;
luxon.Settings = Settings;
luxon.SystemZone = SystemZone;
luxon.VERSION = VERSION;
luxon.Zone = Zone;
const DEFAULT_QUERY_SETTINGS = {
  renderNullAs: "\\-",
  taskCompletionTracking: false,
  taskCompletionUseEmojiShorthand: false,
  taskCompletionText: "completion",
  taskCompletionDateFormat: "yyyy-MM-dd",
  recursiveSubTaskCompletion: false,
  warnOnEmptyResult: true,
  refreshEnabled: true,
  refreshInterval: 2500,
  defaultDateFormat: "MMMM dd, yyyy",
  defaultDateTimeFormat: "h:mm a - MMMM dd, yyyy",
  maxRecursiveRenderDepth: 4,
  tableIdColumnName: "File",
  tableGroupColumnName: "Group"
};
const DEFAULT_EXPORT_SETTINGS = {
  allowHtml: true
};
({
  ...DEFAULT_QUERY_SETTINGS,
  ...DEFAULT_EXPORT_SETTINGS,
  ...{
    inlineQueryPrefix: "=",
    inlineJsQueryPrefix: "$=",
    inlineQueriesInCodeblocks: true,
    enableInlineDataview: true,
    enableDataviewJs: false,
    enableInlineDataviewJs: false,
    prettyRenderInlineFields: true
  }
});
class Success {
  constructor(value) {
    this.value = value;
    this.successful = true;
  }
  map(f) {
    return new Success(f(this.value));
  }
  flatMap(f) {
    return f(this.value);
  }
  mapErr(f) {
    return this;
  }
  bimap(succ, _fail) {
    return this.map(succ);
  }
  orElse(_value) {
    return this.value;
  }
  cast() {
    return this;
  }
  orElseThrow(_message) {
    return this.value;
  }
}
class Failure {
  constructor(error) {
    this.error = error;
    this.successful = false;
  }
  map(_f) {
    return this;
  }
  flatMap(_f) {
    return this;
  }
  mapErr(f) {
    return new Failure(f(this.error));
  }
  bimap(_succ, fail) {
    return this.mapErr(fail);
  }
  orElse(value) {
    return value;
  }
  cast() {
    return this;
  }
  orElseThrow(message) {
    if (message)
      throw new Error(message(this.error));
    else
      throw new Error("" + this.error);
  }
}
var Result;
(function(Result2) {
  function success(value) {
    return new Success(value);
  }
  Result2.success = success;
  function failure(error) {
    return new Failure(error);
  }
  Result2.failure = failure;
  function flatMap2(first, second, f) {
    if (first.successful) {
      if (second.successful)
        return f(first.value, second.value);
      else
        return failure(second.error);
    } else {
      return failure(first.error);
    }
  }
  Result2.flatMap2 = flatMap2;
  function map2(first, second, f) {
    return flatMap2(first, second, (a, b) => success(f(a, b)));
  }
  Result2.map2 = map2;
})(Result || (Result = {}));
var parsimmon_umd_min = { exports: {} };
(function(module2, exports2) {
  !function(n2, t) {
    module2.exports = t();
  }("undefined" != typeof self ? self : commonjsGlobal, function() {
    return function(n2) {
      var t = {};
      function r(e) {
        if (t[e])
          return t[e].exports;
        var u = t[e] = { i: e, l: false, exports: {} };
        return n2[e].call(u.exports, u, u.exports, r), u.l = true, u.exports;
      }
      return r.m = n2, r.c = t, r.d = function(n3, t2, e) {
        r.o(n3, t2) || Object.defineProperty(n3, t2, { configurable: false, enumerable: true, get: e });
      }, r.r = function(n3) {
        Object.defineProperty(n3, "__esModule", { value: true });
      }, r.n = function(n3) {
        var t2 = n3 && n3.__esModule ? function() {
          return n3.default;
        } : function() {
          return n3;
        };
        return r.d(t2, "a", t2), t2;
      }, r.o = function(n3, t2) {
        return Object.prototype.hasOwnProperty.call(n3, t2);
      }, r.p = "", r(r.s = 0);
    }([function(n2, t, r) {
      function e(n3) {
        if (!(this instanceof e))
          return new e(n3);
        this._ = n3;
      }
      var u = e.prototype;
      function o(n3, t2) {
        for (var r2 = 0; r2 < n3; r2++)
          t2(r2);
      }
      function i(n3, t2, r2) {
        return function(n4, t3) {
          o(t3.length, function(r3) {
            n4(t3[r3], r3, t3);
          });
        }(function(r3, e2, u2) {
          t2 = n3(t2, r3, e2, u2);
        }, r2), t2;
      }
      function a(n3, t2) {
        return i(function(t3, r2, e2, u2) {
          return t3.concat([n3(r2, e2, u2)]);
        }, [], t2);
      }
      function f(n3, t2) {
        var r2 = { v: 0, buf: t2 };
        return o(n3, function() {
          var n4;
          r2 = { v: r2.v << 1 | (n4 = r2.buf, n4[0] >> 7), buf: function(n5) {
            var t3 = i(function(n6, t4, r3, e2) {
              return n6.concat(r3 === e2.length - 1 ? Buffer.from([t4, 0]).readUInt16BE(0) : e2.readUInt16BE(r3));
            }, [], n5);
            return Buffer.from(a(function(n6) {
              return (n6 << 1 & 65535) >> 8;
            }, t3));
          }(r2.buf) };
        }), r2;
      }
      function c() {
        return "undefined" != typeof Buffer;
      }
      function s2() {
        if (!c())
          throw new Error("Buffer global does not exist; please use webpack if you need to parse Buffers in the browser.");
      }
      function l2(n3) {
        s2();
        var t2 = i(function(n4, t3) {
          return n4 + t3;
        }, 0, n3);
        if (t2 % 8 != 0)
          throw new Error("The bits [" + n3.join(", ") + "] add up to " + t2 + " which is not an even number of bytes; the total should be divisible by 8");
        var r2, u2 = t2 / 8, o2 = (r2 = function(n4) {
          return n4 > 48;
        }, i(function(n4, t3) {
          return n4 || (r2(t3) ? t3 : n4);
        }, null, n3));
        if (o2)
          throw new Error(o2 + " bit range requested exceeds 48 bit (6 byte) Number max.");
        return new e(function(t3, r3) {
          var e2 = u2 + r3;
          return e2 > t3.length ? x(r3, u2.toString() + " bytes") : b(e2, i(function(n4, t4) {
            var r4 = f(t4, n4.buf);
            return { coll: n4.coll.concat(r4.v), buf: r4.buf };
          }, { coll: [], buf: t3.slice(r3, e2) }, n3).coll);
        });
      }
      function h(n3, t2) {
        return new e(function(r2, e2) {
          return s2(), e2 + t2 > r2.length ? x(e2, t2 + " bytes for " + n3) : b(e2 + t2, r2.slice(e2, e2 + t2));
        });
      }
      function p(n3, t2) {
        if ("number" != typeof (r2 = t2) || Math.floor(r2) !== r2 || t2 < 0 || t2 > 6)
          throw new Error(n3 + " requires integer length in range [0, 6].");
        var r2;
      }
      function d(n3) {
        return p("uintBE", n3), h("uintBE(" + n3 + ")", n3).map(function(t2) {
          return t2.readUIntBE(0, n3);
        });
      }
      function v(n3) {
        return p("uintLE", n3), h("uintLE(" + n3 + ")", n3).map(function(t2) {
          return t2.readUIntLE(0, n3);
        });
      }
      function g(n3) {
        return p("intBE", n3), h("intBE(" + n3 + ")", n3).map(function(t2) {
          return t2.readIntBE(0, n3);
        });
      }
      function m(n3) {
        return p("intLE", n3), h("intLE(" + n3 + ")", n3).map(function(t2) {
          return t2.readIntLE(0, n3);
        });
      }
      function y(n3) {
        return n3 instanceof e;
      }
      function E(n3) {
        return "[object Array]" === {}.toString.call(n3);
      }
      function w(n3) {
        return c() && Buffer.isBuffer(n3);
      }
      function b(n3, t2) {
        return { status: true, index: n3, value: t2, furthest: -1, expected: [] };
      }
      function x(n3, t2) {
        return E(t2) || (t2 = [t2]), { status: false, index: -1, value: null, furthest: n3, expected: t2 };
      }
      function B(n3, t2) {
        if (!t2)
          return n3;
        if (n3.furthest > t2.furthest)
          return n3;
        var r2 = n3.furthest === t2.furthest ? function(n4, t3) {
          if (function() {
            if (void 0 !== e._supportsSet)
              return e._supportsSet;
            var n5 = "undefined" != typeof Set;
            return e._supportsSet = n5, n5;
          }() && Array.from) {
            for (var r3 = new Set(n4), u2 = 0; u2 < t3.length; u2++)
              r3.add(t3[u2]);
            var o2 = Array.from(r3);
            return o2.sort(), o2;
          }
          for (var i2 = {}, a2 = 0; a2 < n4.length; a2++)
            i2[n4[a2]] = true;
          for (var f2 = 0; f2 < t3.length; f2++)
            i2[t3[f2]] = true;
          var c2 = [];
          for (var s3 in i2)
            ({}).hasOwnProperty.call(i2, s3) && c2.push(s3);
          return c2.sort(), c2;
        }(n3.expected, t2.expected) : t2.expected;
        return { status: n3.status, index: n3.index, value: n3.value, furthest: t2.furthest, expected: r2 };
      }
      var j = {};
      function S(n3, t2) {
        if (w(n3))
          return { offset: t2, line: -1, column: -1 };
        n3 in j || (j[n3] = {});
        for (var r2 = j[n3], e2 = 0, u2 = 0, o2 = 0, i2 = t2; i2 >= 0; ) {
          if (i2 in r2) {
            e2 = r2[i2].line, 0 === o2 && (o2 = r2[i2].lineStart);
            break;
          }
          ("\n" === n3.charAt(i2) || "\r" === n3.charAt(i2) && "\n" !== n3.charAt(i2 + 1)) && (u2++, 0 === o2 && (o2 = i2 + 1)), i2--;
        }
        var a2 = e2 + u2, f2 = t2 - o2;
        return r2[t2] = { line: a2, lineStart: o2 }, { offset: t2, line: a2 + 1, column: f2 + 1 };
      }
      function _(n3) {
        if (!y(n3))
          throw new Error("not a parser: " + n3);
      }
      function L(n3, t2) {
        return "string" == typeof n3 ? n3.charAt(t2) : n3[t2];
      }
      function O(n3) {
        if ("number" != typeof n3)
          throw new Error("not a number: " + n3);
      }
      function k(n3) {
        if ("function" != typeof n3)
          throw new Error("not a function: " + n3);
      }
      function P(n3) {
        if ("string" != typeof n3)
          throw new Error("not a string: " + n3);
      }
      var q = 2, A = 3, I = 8, F = 5 * I, M = 4 * I, z = "  ";
      function R(n3, t2) {
        return new Array(t2 + 1).join(n3);
      }
      function U(n3, t2, r2) {
        var e2 = t2 - n3.length;
        return e2 <= 0 ? n3 : R(r2, e2) + n3;
      }
      function W(n3, t2, r2, e2) {
        return { from: n3 - t2 > 0 ? n3 - t2 : 0, to: n3 + r2 > e2 ? e2 : n3 + r2 };
      }
      function D(n3, t2) {
        var r2, e2, u2, o2, f2, c2 = t2.index, s3 = c2.offset, l3 = 1;
        if (s3 === n3.length)
          return "Got the end of the input";
        if (w(n3)) {
          var h2 = s3 - s3 % I, p2 = s3 - h2, d2 = W(h2, F, M + I, n3.length), v2 = a(function(n4) {
            return a(function(n5) {
              return U(n5.toString(16), 2, "0");
            }, n4);
          }, function(n4, t3) {
            var r3 = n4.length, e3 = [], u3 = 0;
            if (r3 <= t3)
              return [n4.slice()];
            for (var o3 = 0; o3 < r3; o3++)
              e3[u3] || e3.push([]), e3[u3].push(n4[o3]), (o3 + 1) % t3 == 0 && u3++;
            return e3;
          }(n3.slice(d2.from, d2.to).toJSON().data, I));
          o2 = function(n4) {
            return 0 === n4.from && 1 === n4.to ? { from: n4.from, to: n4.to } : { from: n4.from / I, to: Math.floor(n4.to / I) };
          }(d2), e2 = h2 / I, r2 = 3 * p2, p2 >= 4 && (r2 += 1), l3 = 2, u2 = a(function(n4) {
            return n4.length <= 4 ? n4.join(" ") : n4.slice(0, 4).join(" ") + "  " + n4.slice(4).join(" ");
          }, v2), (f2 = (8 * (o2.to > 0 ? o2.to - 1 : o2.to)).toString(16).length) < 2 && (f2 = 2);
        } else {
          var g2 = n3.split(/\r\n|[\n\r\u2028\u2029]/);
          r2 = c2.column - 1, e2 = c2.line - 1, o2 = W(e2, q, A, g2.length), u2 = g2.slice(o2.from, o2.to), f2 = o2.to.toString().length;
        }
        var m2 = e2 - o2.from;
        return w(n3) && (f2 = (8 * (o2.to > 0 ? o2.to - 1 : o2.to)).toString(16).length) < 2 && (f2 = 2), i(function(t3, e3, u3) {
          var i2, a2 = u3 === m2, c3 = a2 ? "> " : z;
          return i2 = w(n3) ? U((8 * (o2.from + u3)).toString(16), f2, "0") : U((o2.from + u3 + 1).toString(), f2, " "), [].concat(t3, [c3 + i2 + " | " + e3], a2 ? [z + R(" ", f2) + " | " + U("", r2, " ") + R("^", l3)] : []);
        }, [], u2).join("\n");
      }
      function N(n3, t2) {
        return ["\n", "-- PARSING FAILED " + R("-", 50), "\n\n", D(n3, t2), "\n\n", (r2 = t2.expected, 1 === r2.length ? "Expected:\n\n" + r2[0] : "Expected one of the following: \n\n" + r2.join(", ")), "\n"].join("");
        var r2;
      }
      function G(n3) {
        return void 0 !== n3.flags ? n3.flags : [n3.global ? "g" : "", n3.ignoreCase ? "i" : "", n3.multiline ? "m" : "", n3.unicode ? "u" : "", n3.sticky ? "y" : ""].join("");
      }
      function C() {
        for (var n3 = [].slice.call(arguments), t2 = n3.length, r2 = 0; r2 < t2; r2 += 1)
          _(n3[r2]);
        return e(function(r3, e2) {
          for (var u2, o2 = new Array(t2), i2 = 0; i2 < t2; i2 += 1) {
            if (!(u2 = B(n3[i2]._(r3, e2), u2)).status)
              return u2;
            o2[i2] = u2.value, e2 = u2.index;
          }
          return B(b(e2, o2), u2);
        });
      }
      function J() {
        var n3 = [].slice.call(arguments);
        if (0 === n3.length)
          throw new Error("seqMap needs at least one argument");
        var t2 = n3.pop();
        return k(t2), C.apply(null, n3).map(function(n4) {
          return t2.apply(null, n4);
        });
      }
      function T() {
        var n3 = [].slice.call(arguments), t2 = n3.length;
        if (0 === t2)
          return Y("zero alternates");
        for (var r2 = 0; r2 < t2; r2 += 1)
          _(n3[r2]);
        return e(function(t3, r3) {
          for (var e2, u2 = 0; u2 < n3.length; u2 += 1)
            if ((e2 = B(n3[u2]._(t3, r3), e2)).status)
              return e2;
          return e2;
        });
      }
      function V(n3, t2) {
        return H(n3, t2).or(X([]));
      }
      function H(n3, t2) {
        return _(n3), _(t2), J(n3, t2.then(n3).many(), function(n4, t3) {
          return [n4].concat(t3);
        });
      }
      function K(n3) {
        P(n3);
        var t2 = "'" + n3 + "'";
        return e(function(r2, e2) {
          var u2 = e2 + n3.length, o2 = r2.slice(e2, u2);
          return o2 === n3 ? b(u2, o2) : x(e2, t2);
        });
      }
      function Q(n3, t2) {
        !function(n4) {
          if (!(n4 instanceof RegExp))
            throw new Error("not a regexp: " + n4);
          for (var t3 = G(n4), r3 = 0; r3 < t3.length; r3++) {
            var e2 = t3.charAt(r3);
            if ("i" !== e2 && "m" !== e2 && "u" !== e2 && "s" !== e2)
              throw new Error('unsupported regexp flag "' + e2 + '": ' + n4);
          }
        }(n3), arguments.length >= 2 ? O(t2) : t2 = 0;
        var r2 = function(n4) {
          return RegExp("^(?:" + n4.source + ")", G(n4));
        }(n3), u2 = "" + n3;
        return e(function(n4, e2) {
          var o2 = r2.exec(n4.slice(e2));
          if (o2) {
            if (0 <= t2 && t2 <= o2.length) {
              var i2 = o2[0], a2 = o2[t2];
              return b(e2 + i2.length, a2);
            }
            return x(e2, "valid match group (0 to " + o2.length + ") in " + u2);
          }
          return x(e2, u2);
        });
      }
      function X(n3) {
        return e(function(t2, r2) {
          return b(r2, n3);
        });
      }
      function Y(n3) {
        return e(function(t2, r2) {
          return x(r2, n3);
        });
      }
      function Z(n3) {
        if (y(n3))
          return e(function(t2, r2) {
            var e2 = n3._(t2, r2);
            return e2.index = r2, e2.value = "", e2;
          });
        if ("string" == typeof n3)
          return Z(K(n3));
        if (n3 instanceof RegExp)
          return Z(Q(n3));
        throw new Error("not a string, regexp, or parser: " + n3);
      }
      function $(n3) {
        return _(n3), e(function(t2, r2) {
          var e2 = n3._(t2, r2), u2 = t2.slice(r2, e2.index);
          return e2.status ? x(r2, 'not "' + u2 + '"') : b(r2, null);
        });
      }
      function nn(n3) {
        return k(n3), e(function(t2, r2) {
          var e2 = L(t2, r2);
          return r2 < t2.length && n3(e2) ? b(r2 + 1, e2) : x(r2, "a character/byte matching " + n3);
        });
      }
      function tn(n3, t2) {
        arguments.length < 2 && (t2 = n3, n3 = void 0);
        var r2 = e(function(n4, e2) {
          return r2._ = t2()._, r2._(n4, e2);
        });
        return n3 ? r2.desc(n3) : r2;
      }
      function rn() {
        return Y("fantasy-land/empty");
      }
      u.parse = function(n3) {
        if ("string" != typeof n3 && !w(n3))
          throw new Error(".parse must be called with a string or Buffer as its argument");
        var t2, r2 = this.skip(an)._(n3, 0);
        return t2 = r2.status ? { status: true, value: r2.value } : { status: false, index: S(n3, r2.furthest), expected: r2.expected }, delete j[n3], t2;
      }, u.tryParse = function(n3) {
        var t2 = this.parse(n3);
        if (t2.status)
          return t2.value;
        var r2 = N(n3, t2), e2 = new Error(r2);
        throw e2.type = "ParsimmonError", e2.result = t2, e2;
      }, u.assert = function(n3, t2) {
        return this.chain(function(r2) {
          return n3(r2) ? X(r2) : Y(t2);
        });
      }, u.or = function(n3) {
        return T(this, n3);
      }, u.trim = function(n3) {
        return this.wrap(n3, n3);
      }, u.wrap = function(n3, t2) {
        return J(n3, this, t2, function(n4, t3) {
          return t3;
        });
      }, u.thru = function(n3) {
        return n3(this);
      }, u.then = function(n3) {
        return _(n3), C(this, n3).map(function(n4) {
          return n4[1];
        });
      }, u.many = function() {
        var n3 = this;
        return e(function(t2, r2) {
          for (var e2 = [], u2 = void 0; ; ) {
            if (!(u2 = B(n3._(t2, r2), u2)).status)
              return B(b(r2, e2), u2);
            if (r2 === u2.index)
              throw new Error("infinite loop detected in .many() parser --- calling .many() on a parser which can accept zero characters is usually the cause");
            r2 = u2.index, e2.push(u2.value);
          }
        });
      }, u.tieWith = function(n3) {
        return P(n3), this.map(function(t2) {
          if (function(n4) {
            if (!E(n4))
              throw new Error("not an array: " + n4);
          }(t2), t2.length) {
            P(t2[0]);
            for (var r2 = t2[0], e2 = 1; e2 < t2.length; e2++)
              P(t2[e2]), r2 += n3 + t2[e2];
            return r2;
          }
          return "";
        });
      }, u.tie = function() {
        return this.tieWith("");
      }, u.times = function(n3, t2) {
        var r2 = this;
        return arguments.length < 2 && (t2 = n3), O(n3), O(t2), e(function(e2, u2) {
          for (var o2 = [], i2 = void 0, a2 = void 0, f2 = 0; f2 < n3; f2 += 1) {
            if (a2 = B(i2 = r2._(e2, u2), a2), !i2.status)
              return a2;
            u2 = i2.index, o2.push(i2.value);
          }
          for (; f2 < t2 && (a2 = B(i2 = r2._(e2, u2), a2), i2.status); f2 += 1)
            u2 = i2.index, o2.push(i2.value);
          return B(b(u2, o2), a2);
        });
      }, u.result = function(n3) {
        return this.map(function() {
          return n3;
        });
      }, u.atMost = function(n3) {
        return this.times(0, n3);
      }, u.atLeast = function(n3) {
        return J(this.times(n3), this.many(), function(n4, t2) {
          return n4.concat(t2);
        });
      }, u.map = function(n3) {
        k(n3);
        var t2 = this;
        return e(function(r2, e2) {
          var u2 = t2._(r2, e2);
          return u2.status ? B(b(u2.index, n3(u2.value)), u2) : u2;
        });
      }, u.contramap = function(n3) {
        k(n3);
        var t2 = this;
        return e(function(r2, e2) {
          var u2 = t2.parse(n3(r2.slice(e2)));
          return u2.status ? b(e2 + r2.length, u2.value) : u2;
        });
      }, u.promap = function(n3, t2) {
        return k(n3), k(t2), this.contramap(n3).map(t2);
      }, u.skip = function(n3) {
        return C(this, n3).map(function(n4) {
          return n4[0];
        });
      }, u.mark = function() {
        return J(en, this, en, function(n3, t2, r2) {
          return { start: n3, value: t2, end: r2 };
        });
      }, u.node = function(n3) {
        return J(en, this, en, function(t2, r2, e2) {
          return { name: n3, value: r2, start: t2, end: e2 };
        });
      }, u.sepBy = function(n3) {
        return V(this, n3);
      }, u.sepBy1 = function(n3) {
        return H(this, n3);
      }, u.lookahead = function(n3) {
        return this.skip(Z(n3));
      }, u.notFollowedBy = function(n3) {
        return this.skip($(n3));
      }, u.desc = function(n3) {
        E(n3) || (n3 = [n3]);
        var t2 = this;
        return e(function(r2, e2) {
          var u2 = t2._(r2, e2);
          return u2.status || (u2.expected = n3), u2;
        });
      }, u.fallback = function(n3) {
        return this.or(X(n3));
      }, u.ap = function(n3) {
        return J(n3, this, function(n4, t2) {
          return n4(t2);
        });
      }, u.chain = function(n3) {
        var t2 = this;
        return e(function(r2, e2) {
          var u2 = t2._(r2, e2);
          return u2.status ? B(n3(u2.value)._(r2, u2.index), u2) : u2;
        });
      }, u.concat = u.or, u.empty = rn, u.of = X, u["fantasy-land/ap"] = u.ap, u["fantasy-land/chain"] = u.chain, u["fantasy-land/concat"] = u.concat, u["fantasy-land/empty"] = u.empty, u["fantasy-land/of"] = u.of, u["fantasy-land/map"] = u.map;
      var en = e(function(n3, t2) {
        return b(t2, S(n3, t2));
      }), un = e(function(n3, t2) {
        return t2 >= n3.length ? x(t2, "any character/byte") : b(t2 + 1, L(n3, t2));
      }), on = e(function(n3, t2) {
        return b(n3.length, n3.slice(t2));
      }), an = e(function(n3, t2) {
        return t2 < n3.length ? x(t2, "EOF") : b(t2, null);
      }), fn = Q(/[0-9]/).desc("a digit"), cn = Q(/[0-9]*/).desc("optional digits"), sn = Q(/[a-z]/i).desc("a letter"), ln = Q(/[a-z]*/i).desc("optional letters"), hn = Q(/\s*/).desc("optional whitespace"), pn = Q(/\s+/).desc("whitespace"), dn = K("\r"), vn = K("\n"), gn = K("\r\n"), mn = T(gn, vn, dn).desc("newline"), yn = T(mn, an);
      e.all = on, e.alt = T, e.any = un, e.cr = dn, e.createLanguage = function(n3) {
        var t2 = {};
        for (var r2 in n3)
          ({}).hasOwnProperty.call(n3, r2) && function(r3) {
            t2[r3] = tn(function() {
              return n3[r3](t2);
            });
          }(r2);
        return t2;
      }, e.crlf = gn, e.custom = function(n3) {
        return e(n3(b, x));
      }, e.digit = fn, e.digits = cn, e.empty = rn, e.end = yn, e.eof = an, e.fail = Y, e.formatError = N, e.index = en, e.isParser = y, e.lazy = tn, e.letter = sn, e.letters = ln, e.lf = vn, e.lookahead = Z, e.makeFailure = x, e.makeSuccess = b, e.newline = mn, e.noneOf = function(n3) {
        return nn(function(t2) {
          return n3.indexOf(t2) < 0;
        }).desc("none of '" + n3 + "'");
      }, e.notFollowedBy = $, e.of = X, e.oneOf = function(n3) {
        for (var t2 = n3.split(""), r2 = 0; r2 < t2.length; r2++)
          t2[r2] = "'" + t2[r2] + "'";
        return nn(function(t3) {
          return n3.indexOf(t3) >= 0;
        }).desc(t2);
      }, e.optWhitespace = hn, e.Parser = e, e.range = function(n3, t2) {
        return nn(function(r2) {
          return n3 <= r2 && r2 <= t2;
        }).desc(n3 + "-" + t2);
      }, e.regex = Q, e.regexp = Q, e.sepBy = V, e.sepBy1 = H, e.seq = C, e.seqMap = J, e.seqObj = function() {
        for (var n3, t2 = {}, r2 = 0, u2 = (n3 = arguments, Array.prototype.slice.call(n3)), o2 = u2.length, i2 = 0; i2 < o2; i2 += 1) {
          var a2 = u2[i2];
          if (!y(a2)) {
            if (E(a2) && 2 === a2.length && "string" == typeof a2[0] && y(a2[1])) {
              var f2 = a2[0];
              if (Object.prototype.hasOwnProperty.call(t2, f2))
                throw new Error("seqObj: duplicate key " + f2);
              t2[f2] = true, r2++;
              continue;
            }
            throw new Error("seqObj arguments must be parsers or [string, parser] array pairs.");
          }
        }
        if (0 === r2)
          throw new Error("seqObj expects at least one named parser, found zero");
        return e(function(n4, t3) {
          for (var r3, e2 = {}, i3 = 0; i3 < o2; i3 += 1) {
            var a3, f3;
            if (E(u2[i3]) ? (a3 = u2[i3][0], f3 = u2[i3][1]) : (a3 = null, f3 = u2[i3]), !(r3 = B(f3._(n4, t3), r3)).status)
              return r3;
            a3 && (e2[a3] = r3.value), t3 = r3.index;
          }
          return B(b(t3, e2), r3);
        });
      }, e.string = K, e.succeed = X, e.takeWhile = function(n3) {
        return k(n3), e(function(t2, r2) {
          for (var e2 = r2; e2 < t2.length && n3(L(t2, e2)); )
            e2++;
          return b(e2, t2.slice(r2, e2));
        });
      }, e.test = nn, e.whitespace = pn, e["fantasy-land/empty"] = rn, e["fantasy-land/of"] = X, e.Binary = { bitSeq: l2, bitSeqObj: function(n3) {
        s2();
        var t2 = {}, r2 = 0, e2 = a(function(n4) {
          if (E(n4)) {
            var e3 = n4;
            if (2 !== e3.length)
              throw new Error("[" + e3.join(", ") + "] should be length 2, got length " + e3.length);
            if (P(e3[0]), O(e3[1]), Object.prototype.hasOwnProperty.call(t2, e3[0]))
              throw new Error("duplicate key in bitSeqObj: " + e3[0]);
            return t2[e3[0]] = true, r2++, e3;
          }
          return O(n4), [null, n4];
        }, n3);
        if (r2 < 1)
          throw new Error("bitSeqObj expects at least one named pair, got [" + n3.join(", ") + "]");
        var u2 = a(function(n4) {
          return n4[0];
        }, e2);
        return l2(a(function(n4) {
          return n4[1];
        }, e2)).map(function(n4) {
          return i(function(n5, t3) {
            return null !== t3[0] && (n5[t3[0]] = t3[1]), n5;
          }, {}, a(function(t3, r3) {
            return [t3, n4[r3]];
          }, u2));
        });
      }, byte: function(n3) {
        if (s2(), O(n3), n3 > 255)
          throw new Error("Value specified to byte constructor (" + n3 + "=0x" + n3.toString(16) + ") is larger in value than a single byte.");
        var t2 = (n3 > 15 ? "0x" : "0x0") + n3.toString(16);
        return e(function(r2, e2) {
          var u2 = L(r2, e2);
          return u2 === n3 ? b(e2 + 1, u2) : x(e2, t2);
        });
      }, buffer: function(n3) {
        return h("buffer", n3).map(function(n4) {
          return Buffer.from(n4);
        });
      }, encodedString: function(n3, t2) {
        return h("string", t2).map(function(t3) {
          return t3.toString(n3);
        });
      }, uintBE: d, uint8BE: d(1), uint16BE: d(2), uint32BE: d(4), uintLE: v, uint8LE: v(1), uint16LE: v(2), uint32LE: v(4), intBE: g, int8BE: g(1), int16BE: g(2), int32BE: g(4), intLE: m, int8LE: m(1), int16LE: m(2), int32LE: m(4), floatBE: h("floatBE", 4).map(function(n3) {
        return n3.readFloatBE(0);
      }), floatLE: h("floatLE", 4).map(function(n3) {
        return n3.readFloatLE(0);
      }), doubleBE: h("doubleBE", 8).map(function(n3) {
        return n3.readDoubleBE(0);
      }), doubleLE: h("doubleLE", 8).map(function(n3) {
        return n3.readDoubleLE(0);
      }) }, n2.exports = e;
    }]);
  });
})(parsimmon_umd_min);
var emojiRegex = () => {
  return /(?:[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC3\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDD-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF6](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7C\uDE80-\uDE86\uDE90-\uDEAC\uDEB0-\uDEBA\uDEC0-\uDEC2\uDED0-\uDED9\uDEE0-\uDEE7]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?))/g;
};
function normalizeDuration(dur) {
  if (dur === void 0 || dur === null)
    return dur;
  return dur.shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds").normalize();
}
function getFileTitle(path) {
  if (path.includes("/"))
    path = path.substring(path.lastIndexOf("/") + 1);
  if (path.endsWith(".md"))
    path = path.substring(0, path.length - 3);
  return path;
}
parsimmon_umd_min.exports.alt(parsimmon_umd_min.exports.regex(new RegExp(emojiRegex(), "")), parsimmon_umd_min.exports.regex(/[0-9\p{Letter}_-]+/u).map((str) => str.toLocaleLowerCase()), parsimmon_umd_min.exports.whitespace.map((_) => "-"), parsimmon_umd_min.exports.any.map((_) => "")).many().map((result) => result.join(""));
const HEADER_CANONICALIZER = parsimmon_umd_min.exports.alt(parsimmon_umd_min.exports.regex(new RegExp(emojiRegex(), "")), parsimmon_umd_min.exports.regex(/[0-9\p{Letter}_-]+/u), parsimmon_umd_min.exports.whitespace.map((_) => " "), parsimmon_umd_min.exports.any.map((_) => " ")).many().map((result) => {
  return result.join("").split(/\s+/).join(" ").trim();
});
function normalizeHeaderForLink(header) {
  return HEADER_CANONICALIZER.tryParse(header);
}
function renderMinimalDuration(dur) {
  dur = normalizeDuration(dur);
  let result = "";
  if (dur.years)
    result += `${dur.years} years, `;
  if (dur.months)
    result += `${dur.months} months, `;
  if (dur.weeks)
    result += `${dur.weeks} weeks, `;
  if (dur.days)
    result += `${dur.days} days, `;
  if (dur.hours)
    result += `${dur.hours} hours, `;
  if (dur.minutes)
    result += `${dur.minutes} minutes, `;
  if (dur.seconds)
    result += `${Math.round(dur.seconds)} seconds, `;
  if (dur.milliseconds)
    result += `${Math.round(dur.milliseconds)} ms, `;
  if (result.endsWith(", "))
    result = result.substring(0, result.length - 2);
  return result;
}
var Values;
(function(Values2) {
  function toString(field, setting = DEFAULT_QUERY_SETTINGS, recursive = false) {
    let wrapped = wrapValue(field);
    if (!wrapped)
      return setting.renderNullAs;
    switch (wrapped.type) {
      case "null":
        return setting.renderNullAs;
      case "string":
        return wrapped.value;
      case "number":
      case "boolean":
        return "" + wrapped.value;
      case "html":
        return wrapped.value.outerHTML;
      case "widget":
        return wrapped.value.markdown();
      case "link":
        return wrapped.value.markdown();
      case "function":
        return "<function>";
      case "array":
        let result = "";
        if (recursive)
          result += "[";
        result += wrapped.value.map((f) => toString(f, setting, true)).join(", ");
        if (recursive)
          result += "]";
        return result;
      case "object":
        return "{ " + Object.entries(wrapped.value).map((e) => e[0] + ": " + toString(e[1], setting, true)).join(", ") + " }";
      case "date":
        if (wrapped.value.second == 0 && wrapped.value.hour == 0 && wrapped.value.minute == 0) {
          return wrapped.value.toFormat(setting.defaultDateFormat);
        }
        return wrapped.value.toFormat(setting.defaultDateTimeFormat);
      case "duration":
        return renderMinimalDuration(wrapped.value);
    }
  }
  Values2.toString = toString;
  function wrapValue(val) {
    if (isNull(val))
      return { type: "null", value: val };
    else if (isNumber2(val))
      return { type: "number", value: val };
    else if (isString2(val))
      return { type: "string", value: val };
    else if (isBoolean(val))
      return { type: "boolean", value: val };
    else if (isDuration(val))
      return { type: "duration", value: val };
    else if (isDate2(val))
      return { type: "date", value: val };
    else if (isWidget(val))
      return { type: "widget", value: val };
    else if (isArray(val))
      return { type: "array", value: val };
    else if (isLink(val))
      return { type: "link", value: val };
    else if (isFunction(val))
      return { type: "function", value: val };
    else if (isHtml(val))
      return { type: "html", value: val };
    else if (isObject2(val))
      return { type: "object", value: val };
    else
      return void 0;
  }
  Values2.wrapValue = wrapValue;
  function mapLeaves(val, func) {
    if (isObject2(val)) {
      let result = {};
      for (let [key, value] of Object.entries(val))
        result[key] = mapLeaves(value, func);
      return result;
    } else if (isArray(val)) {
      let result = [];
      for (let value of val)
        result.push(mapLeaves(value, func));
      return result;
    } else {
      return func(val);
    }
  }
  Values2.mapLeaves = mapLeaves;
  function compareValue(val1, val2, linkNormalizer) {
    var _a, _b;
    if (val1 === void 0)
      val1 = null;
    if (val2 === void 0)
      val2 = null;
    if (val1 === null && val2 === null)
      return 0;
    else if (val1 === null)
      return -1;
    else if (val2 === null)
      return 1;
    let wrap1 = wrapValue(val1);
    let wrap2 = wrapValue(val2);
    if (wrap1 === void 0 && wrap2 === void 0)
      return 0;
    else if (wrap1 === void 0)
      return -1;
    else if (wrap2 === void 0)
      return 1;
    if (wrap1.type != wrap2.type)
      return wrap1.type.localeCompare(wrap2.type);
    if (wrap1.value === wrap2.value)
      return 0;
    switch (wrap1.type) {
      case "string":
        return wrap1.value.localeCompare(wrap2.value);
      case "number":
        if (wrap1.value < wrap2.value)
          return -1;
        else if (wrap1.value == wrap2.value)
          return 0;
        return 1;
      case "null":
        return 0;
      case "boolean":
        if (wrap1.value == wrap2.value)
          return 0;
        else
          return wrap1.value ? 1 : -1;
      case "link":
        let link1 = wrap1.value;
        let link2 = wrap2.value;
        let normalize = linkNormalizer !== null && linkNormalizer !== void 0 ? linkNormalizer : (x) => x;
        let pathCompare = normalize(link1.path).localeCompare(normalize(link2.path));
        if (pathCompare != 0)
          return pathCompare;
        let typeCompare = link1.type.localeCompare(link2.type);
        if (typeCompare != 0)
          return typeCompare;
        if (link1.subpath && !link2.subpath)
          return 1;
        if (!link1.subpath && link2.subpath)
          return -1;
        if (!link1.subpath && !link2.subpath)
          return 0;
        return ((_a = link1.subpath) !== null && _a !== void 0 ? _a : "").localeCompare((_b = link2.subpath) !== null && _b !== void 0 ? _b : "");
      case "date":
        return wrap1.value < wrap2.value ? -1 : wrap1.value.equals(wrap2.value) ? 0 : 1;
      case "duration":
        return wrap1.value < wrap2.value ? -1 : wrap1.value.equals(wrap2.value) ? 0 : 1;
      case "array":
        let f1 = wrap1.value;
        let f2 = wrap2.value;
        for (let index = 0; index < Math.min(f1.length, f2.length); index++) {
          let comp = compareValue(f1[index], f2[index]);
          if (comp != 0)
            return comp;
        }
        return f1.length - f2.length;
      case "object":
        let o1 = wrap1.value;
        let o2 = wrap2.value;
        let k1 = Array.from(Object.keys(o1));
        let k2 = Array.from(Object.keys(o2));
        k1.sort();
        k2.sort();
        let keyCompare = compareValue(k1, k2);
        if (keyCompare != 0)
          return keyCompare;
        for (let key of k1) {
          let comp = compareValue(o1[key], o2[key]);
          if (comp != 0)
            return comp;
        }
        return 0;
      case "widget":
      case "html":
      case "function":
        return 0;
    }
  }
  Values2.compareValue = compareValue;
  function typeOf(val) {
    var _a;
    return (_a = wrapValue(val)) === null || _a === void 0 ? void 0 : _a.type;
  }
  Values2.typeOf = typeOf;
  function isTruthy(field) {
    let wrapped = wrapValue(field);
    if (!wrapped)
      return false;
    switch (wrapped.type) {
      case "number":
        return wrapped.value != 0;
      case "string":
        return wrapped.value.length > 0;
      case "boolean":
        return wrapped.value;
      case "link":
        return !!wrapped.value.path;
      case "date":
        return wrapped.value.toMillis() != 0;
      case "duration":
        return wrapped.value.as("seconds") != 0;
      case "object":
        return Object.keys(wrapped.value).length > 0;
      case "array":
        return wrapped.value.length > 0;
      case "null":
        return false;
      case "html":
      case "widget":
      case "function":
        return true;
    }
  }
  Values2.isTruthy = isTruthy;
  function deepCopy(field) {
    if (field === null || field === void 0)
      return field;
    if (Values2.isArray(field)) {
      return [].concat(field.map((v) => deepCopy(v)));
    } else if (Values2.isObject(field)) {
      let result = {};
      for (let [key, value] of Object.entries(field))
        result[key] = deepCopy(value);
      return result;
    } else {
      return field;
    }
  }
  Values2.deepCopy = deepCopy;
  function isString2(val) {
    return typeof val == "string";
  }
  Values2.isString = isString2;
  function isNumber2(val) {
    return typeof val == "number";
  }
  Values2.isNumber = isNumber2;
  function isDate2(val) {
    return val instanceof DateTime_1;
  }
  Values2.isDate = isDate2;
  function isDuration(val) {
    return val instanceof Duration_1;
  }
  Values2.isDuration = isDuration;
  function isNull(val) {
    return val === null || val === void 0;
  }
  Values2.isNull = isNull;
  function isArray(val) {
    return Array.isArray(val);
  }
  Values2.isArray = isArray;
  function isBoolean(val) {
    return typeof val === "boolean";
  }
  Values2.isBoolean = isBoolean;
  function isLink(val) {
    return val instanceof Link;
  }
  Values2.isLink = isLink;
  function isWidget(val) {
    return val instanceof Widget;
  }
  Values2.isWidget = isWidget;
  function isHtml(val) {
    if (typeof HTMLElement !== "undefined") {
      return val instanceof HTMLElement;
    } else {
      return false;
    }
  }
  Values2.isHtml = isHtml;
  function isObject2(val) {
    return typeof val == "object" && !isHtml(val) && !isWidget(val) && !isArray(val) && !isDuration(val) && !isDate2(val) && !isLink(val) && val !== void 0 && !isNull(val);
  }
  Values2.isObject = isObject2;
  function isFunction(val) {
    return typeof val == "function";
  }
  Values2.isFunction = isFunction;
})(Values || (Values = {}));
var Groupings;
(function(Groupings2) {
  function isElementGroup(entry) {
    return Values.isObject(entry) && Object.keys(entry).length == 2 && "key" in entry && "rows" in entry;
  }
  Groupings2.isElementGroup = isElementGroup;
  function isGrouping(entry) {
    for (let element2 of entry)
      if (!isElementGroup(element2))
        return false;
    return true;
  }
  Groupings2.isGrouping = isGrouping;
  function count(elements) {
    if (isGrouping(elements)) {
      let result = 0;
      for (let subgroup of elements)
        result += count(subgroup.rows);
      return result;
    } else {
      return elements.length;
    }
  }
  Groupings2.count = count;
})(Groupings || (Groupings = {}));
class Link {
  constructor(fields) {
    Object.assign(this, fields);
  }
  static file(path, embed = false, display) {
    return new Link({
      path,
      embed,
      display,
      subpath: void 0,
      type: "file"
    });
  }
  static infer(linkpath, embed = false, display) {
    if (linkpath.includes("#^")) {
      let split = linkpath.split("#^");
      return Link.block(split[0], split[1], embed, display);
    } else if (linkpath.includes("#")) {
      let split = linkpath.split("#");
      return Link.header(split[0], split[1], embed, display);
    } else
      return Link.file(linkpath, embed, display);
  }
  static header(path, header, embed, display) {
    return new Link({
      path,
      embed,
      display,
      subpath: normalizeHeaderForLink(header),
      type: "header"
    });
  }
  static block(path, blockId, embed, display) {
    return new Link({
      path,
      embed,
      display,
      subpath: blockId,
      type: "block"
    });
  }
  static fromObject(object) {
    return new Link(object);
  }
  equals(other2) {
    if (other2 == void 0 || other2 == null)
      return false;
    return this.path == other2.path && this.type == other2.type && this.subpath == other2.subpath;
  }
  toString() {
    return this.markdown();
  }
  toObject() {
    return { path: this.path, type: this.type, subpath: this.subpath, display: this.display, embed: this.embed };
  }
  withPath(path) {
    return new Link(Object.assign({}, this, { path }));
  }
  withDisplay(display) {
    return new Link(Object.assign({}, this, { display }));
  }
  withHeader(header) {
    return Link.header(this.path, header, this.embed, this.display);
  }
  toFile() {
    return Link.file(this.path, this.embed, this.display);
  }
  toEmbed() {
    if (this.embed) {
      return this;
    } else {
      let link = new Link(this);
      link.embed = true;
      return link;
    }
  }
  fromEmbed() {
    if (!this.embed) {
      return this;
    } else {
      let link = new Link(this);
      link.embed = false;
      return link;
    }
  }
  markdown() {
    let result = (this.embed ? "!" : "") + "[[" + this.obsidianLink();
    if (this.display) {
      result += "|" + this.display;
    } else {
      result += "|" + getFileTitle(this.path);
      if (this.type == "header" || this.type == "block")
        result += " > " + this.subpath;
    }
    result += "]]";
    return result;
  }
  obsidianLink() {
    var _a, _b;
    const escaped = this.path.replace("|", "\\|");
    if (this.type == "header")
      return escaped + "#" + ((_a = this.subpath) === null || _a === void 0 ? void 0 : _a.replace("|", "\\|"));
    if (this.type == "block")
      return escaped + "#^" + ((_b = this.subpath) === null || _b === void 0 ? void 0 : _b.replace("|", "\\|"));
    else
      return escaped;
  }
  fileName() {
    return getFileTitle(this.path).replace(".md", "");
  }
}
class Widget {
  constructor($widget) {
    this.$widget = $widget;
  }
}
class ListPairWidget extends Widget {
  constructor(key, value) {
    super("dataview:list-pair");
    this.key = key;
    this.value = value;
  }
  markdown() {
    return `${Values.toString(this.key)}: ${Values.toString(this.value)}`;
  }
}
class ExternalLinkWidget extends Widget {
  constructor(url, display) {
    super("dataview:external-link");
    this.url = url;
    this.display = display;
  }
  markdown() {
    var _a;
    return `[${(_a = this.display) !== null && _a !== void 0 ? _a : this.url}](${this.url})`;
  }
}
var Widgets;
(function(Widgets2) {
  function listPair(key, value) {
    return new ListPairWidget(key, value);
  }
  Widgets2.listPair = listPair;
  function externalLink(url, display) {
    return new ExternalLinkWidget(url, display);
  }
  Widgets2.externalLink = externalLink;
  function isListPair(widget) {
    return widget.$widget === "dataview:list-pair";
  }
  Widgets2.isListPair = isListPair;
  function isExternalLink(widget) {
    return widget.$widget === "dataview:external-link";
  }
  Widgets2.isExternalLink = isExternalLink;
  function isBuiltin(widget) {
    return isListPair(widget) || isExternalLink(widget);
  }
  Widgets2.isBuiltin = isBuiltin;
})(Widgets || (Widgets = {}));
var Fields;
(function(Fields2) {
  function variable(name) {
    return { type: "variable", name };
  }
  Fields2.variable = variable;
  function literal(value) {
    return { type: "literal", value };
  }
  Fields2.literal = literal;
  function binaryOp(left, op, right) {
    return { type: "binaryop", left, op, right };
  }
  Fields2.binaryOp = binaryOp;
  function index(obj, index2) {
    return { type: "index", object: obj, index: index2 };
  }
  Fields2.index = index;
  function indexVariable(name) {
    let parts = name.split(".");
    let result = Fields2.variable(parts[0]);
    for (let index2 = 1; index2 < parts.length; index2++) {
      result = Fields2.index(result, Fields2.literal(parts[index2]));
    }
    return result;
  }
  Fields2.indexVariable = indexVariable;
  function lambda(args, value) {
    return { type: "lambda", arguments: args, value };
  }
  Fields2.lambda = lambda;
  function func(func2, args) {
    return { type: "function", func: func2, arguments: args };
  }
  Fields2.func = func;
  function list(values) {
    return { type: "list", values };
  }
  Fields2.list = list;
  function object(values) {
    return { type: "object", values };
  }
  Fields2.object = object;
  function negate(child) {
    return { type: "negated", child };
  }
  Fields2.negate = negate;
  function isCompareOp(op) {
    return op == "<=" || op == "<" || op == ">" || op == ">=" || op == "!=" || op == "=";
  }
  Fields2.isCompareOp = isCompareOp;
  Fields2.NULL = Fields2.literal(null);
})(Fields || (Fields = {}));
var Sources;
(function(Sources2) {
  function tag(tag2) {
    return { type: "tag", tag: tag2 };
  }
  Sources2.tag = tag;
  function csv(path) {
    return { type: "csv", path };
  }
  Sources2.csv = csv;
  function folder(prefix) {
    return { type: "folder", folder: prefix };
  }
  Sources2.folder = folder;
  function link(file, incoming) {
    return { type: "link", file, direction: incoming ? "incoming" : "outgoing" };
  }
  Sources2.link = link;
  function binaryOp(left, op, right) {
    return { type: "binaryop", left, op, right };
  }
  Sources2.binaryOp = binaryOp;
  function and(left, right) {
    return { type: "binaryop", left, op: "&", right };
  }
  Sources2.and = and;
  function or(left, right) {
    return { type: "binaryop", left, op: "|", right };
  }
  Sources2.or = or;
  function negate(child) {
    return { type: "negate", child };
  }
  Sources2.negate = negate;
  function empty() {
    return { type: "empty" };
  }
  Sources2.empty = empty;
})(Sources || (Sources = {}));
const EMOJI_REGEX = new RegExp(emojiRegex(), "");
const DURATION_TYPES = {
  year: Duration_1.fromObject({ years: 1 }),
  years: Duration_1.fromObject({ years: 1 }),
  yr: Duration_1.fromObject({ years: 1 }),
  yrs: Duration_1.fromObject({ years: 1 }),
  month: Duration_1.fromObject({ months: 1 }),
  months: Duration_1.fromObject({ months: 1 }),
  mo: Duration_1.fromObject({ months: 1 }),
  mos: Duration_1.fromObject({ months: 1 }),
  week: Duration_1.fromObject({ weeks: 1 }),
  weeks: Duration_1.fromObject({ weeks: 1 }),
  wk: Duration_1.fromObject({ weeks: 1 }),
  wks: Duration_1.fromObject({ weeks: 1 }),
  w: Duration_1.fromObject({ weeks: 1 }),
  day: Duration_1.fromObject({ days: 1 }),
  days: Duration_1.fromObject({ days: 1 }),
  d: Duration_1.fromObject({ days: 1 }),
  hour: Duration_1.fromObject({ hours: 1 }),
  hours: Duration_1.fromObject({ hours: 1 }),
  hr: Duration_1.fromObject({ hours: 1 }),
  hrs: Duration_1.fromObject({ hours: 1 }),
  h: Duration_1.fromObject({ hours: 1 }),
  minute: Duration_1.fromObject({ minutes: 1 }),
  minutes: Duration_1.fromObject({ minutes: 1 }),
  min: Duration_1.fromObject({ minutes: 1 }),
  mins: Duration_1.fromObject({ minutes: 1 }),
  m: Duration_1.fromObject({ minutes: 1 }),
  second: Duration_1.fromObject({ seconds: 1 }),
  seconds: Duration_1.fromObject({ seconds: 1 }),
  sec: Duration_1.fromObject({ seconds: 1 }),
  secs: Duration_1.fromObject({ seconds: 1 }),
  s: Duration_1.fromObject({ seconds: 1 })
};
const DATE_SHORTHANDS = {
  now: () => DateTime_1.local(),
  today: () => DateTime_1.local().startOf("day"),
  yesterday: () => DateTime_1.local().startOf("day").minus(Duration_1.fromObject({ days: 1 })),
  tomorrow: () => DateTime_1.local().startOf("day").plus(Duration_1.fromObject({ days: 1 })),
  sow: () => DateTime_1.local().startOf("week"),
  "start-of-week": () => DateTime_1.local().startOf("week"),
  eow: () => DateTime_1.local().endOf("week"),
  "end-of-week": () => DateTime_1.local().endOf("week"),
  soy: () => DateTime_1.local().startOf("year"),
  "start-of-year": () => DateTime_1.local().startOf("year"),
  eoy: () => DateTime_1.local().endOf("year"),
  "end-of-year": () => DateTime_1.local().endOf("year"),
  som: () => DateTime_1.local().startOf("month"),
  "start-of-month": () => DateTime_1.local().startOf("month"),
  eom: () => DateTime_1.local().endOf("month"),
  "end-of-month": () => DateTime_1.local().endOf("month")
};
const KEYWORDS = ["FROM", "WHERE", "LIMIT", "GROUP", "FLATTEN"];
function splitOnUnescapedPipe(link) {
  let pipe = -1;
  while ((pipe = link.indexOf("|", pipe + 1)) >= 0) {
    if (pipe > 0 && link[pipe - 1] == "\\")
      continue;
    return [link.substring(0, pipe).replace(/\\\|/g, "|"), link.substring(pipe + 1)];
  }
  return [link.replace(/\\\|/g, "|"), void 0];
}
function parseInnerLink(rawlink) {
  let [link, display] = splitOnUnescapedPipe(rawlink);
  return Link.infer(link, false, display);
}
function createBinaryParser(child, sep, combine) {
  return parsimmon_umd_min.exports.seqMap(child, parsimmon_umd_min.exports.seq(parsimmon_umd_min.exports.optWhitespace, sep, parsimmon_umd_min.exports.optWhitespace, child).many(), (first, rest) => {
    if (rest.length == 0)
      return first;
    let node = combine(first, rest[0][1], rest[0][3]);
    for (let index = 1; index < rest.length; index++) {
      node = combine(node, rest[index][1], rest[index][3]);
    }
    return node;
  });
}
function chainOpt(base, ...funcs) {
  return parsimmon_umd_min.exports.custom((success, failure) => {
    return (input, i) => {
      let result = base._(input, i);
      if (!result.status)
        return result;
      for (let func of funcs) {
        let next = func(result.value)._(input, result.index);
        if (!next.status)
          return result;
        result = next;
      }
      return result;
    };
  });
}
const EXPRESSION = parsimmon_umd_min.exports.createLanguage({
  number: (q) => parsimmon_umd_min.exports.regexp(/-?[0-9]+(\.[0-9]+)?/).map((str) => Number.parseFloat(str)).desc("number"),
  string: (q) => parsimmon_umd_min.exports.string('"').then(parsimmon_umd_min.exports.alt(q.escapeCharacter, parsimmon_umd_min.exports.noneOf('"\\')).atLeast(0).map((chars) => chars.join(""))).skip(parsimmon_umd_min.exports.string('"')).desc("string"),
  escapeCharacter: (_) => parsimmon_umd_min.exports.string("\\").then(parsimmon_umd_min.exports.any).map((escaped) => {
    if (escaped === '"')
      return '"';
    if (escaped === "\\")
      return "\\";
    else
      return "\\" + escaped;
  }),
  bool: (_) => parsimmon_umd_min.exports.regexp(/true|false|True|False/).map((str) => str.toLowerCase() == "true").desc("boolean ('true' or 'false')"),
  tag: (_) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("#"), parsimmon_umd_min.exports.alt(parsimmon_umd_min.exports.regexp(/[\p{Letter}0-9_/-]/u).desc("text"), parsimmon_umd_min.exports.regexp(EMOJI_REGEX).desc("text")).many(), (start, rest) => start + rest.join("")).desc("tag ('#hello/stuff')"),
  identifier: (_) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.alt(parsimmon_umd_min.exports.regexp(/\p{Letter}/u), parsimmon_umd_min.exports.regexp(EMOJI_REGEX).desc("text")), parsimmon_umd_min.exports.alt(parsimmon_umd_min.exports.regexp(/[0-9\p{Letter}_-]/u), parsimmon_umd_min.exports.regexp(EMOJI_REGEX).desc("text")).many(), (first, rest) => first + rest.join("")).desc("variable identifier"),
  link: (_) => parsimmon_umd_min.exports.regexp(/\[\[([^\[\]]*?)\]\]/u, 1).map((linkInner) => parseInnerLink(linkInner)).desc("file link"),
  embedLink: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("!").atMost(1), q.link, (p, l2) => {
    if (p.length > 0)
      l2.embed = true;
    return l2;
  }).desc("file link"),
  binaryPlusMinus: (_) => parsimmon_umd_min.exports.regexp(/\+|-/).map((str) => str).desc("'+' or '-'"),
  binaryMulDiv: (_) => parsimmon_umd_min.exports.regexp(/\*|\/|%/).map((str) => str).desc("'*' or '/' or '%'"),
  binaryCompareOp: (_) => parsimmon_umd_min.exports.regexp(/>=|<=|!=|>|<|=/).map((str) => str).desc("'>=' or '<=' or '!=' or '=' or '>' or '<'"),
  binaryBooleanOp: (_) => parsimmon_umd_min.exports.regexp(/and|or|&|\|/i).map((str) => {
    if (str.toLowerCase() == "and")
      return "&";
    else if (str.toLowerCase() == "or")
      return "|";
    else
      return str;
  }).desc("'and' or 'or'"),
  rootDate: (_) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.regexp(/\d{4}/), parsimmon_umd_min.exports.string("-"), parsimmon_umd_min.exports.regexp(/\d{2}/), (year, _2, month) => {
    return DateTime_1.fromObject({ year: Number.parseInt(year), month: Number.parseInt(month) });
  }).desc("date in format YYYY-MM[-DDTHH-MM-SS.MS]"),
  dateShorthand: (_) => parsimmon_umd_min.exports.alt(...Object.keys(DATE_SHORTHANDS).sort((a, b) => b.length - a.length).map(parsimmon_umd_min.exports.string)),
  date: (q) => chainOpt(q.rootDate, (ym) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("-"), parsimmon_umd_min.exports.regexp(/\d{2}/), (_, day) => ym.set({ day: Number.parseInt(day) })), (ymd) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("T"), parsimmon_umd_min.exports.regexp(/\d{2}/), (_, hour) => ymd.set({ hour: Number.parseInt(hour) })), (ymdh) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string(":"), parsimmon_umd_min.exports.regexp(/\d{2}/), (_, minute) => ymdh.set({ minute: Number.parseInt(minute) })), (ymdhm) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string(":"), parsimmon_umd_min.exports.regexp(/\d{2}/), (_, second) => ymdhm.set({ second: Number.parseInt(second) })), (ymdhms) => parsimmon_umd_min.exports.alt(
    parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("."), parsimmon_umd_min.exports.regexp(/\d{3}/), (_, millisecond) => ymdhms.set({ millisecond: Number.parseInt(millisecond) })),
    parsimmon_umd_min.exports.succeed(ymdhms)
  ), (dt) => parsimmon_umd_min.exports.alt(parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("+").or(parsimmon_umd_min.exports.string("-")), parsimmon_umd_min.exports.regexp(/\d{1,2}(:\d{2})?/), (pm, hr) => dt.setZone("UTC" + pm + hr, { keepLocalTime: true })), parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("Z"), () => dt.setZone("utc", { keepLocalTime: true })), parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("["), parsimmon_umd_min.exports.regexp(/[0-9A-Za-z+-\/]+/u), parsimmon_umd_min.exports.string("]"), (_a, zone, _b) => dt.setZone(zone, { keepLocalTime: true })))).assert((dt) => dt.isValid, "valid date").desc("date in format YYYY-MM[-DDTHH-MM-SS.MS]"),
  datePlus: (q) => parsimmon_umd_min.exports.alt(q.dateShorthand.map((d) => DATE_SHORTHANDS[d]()), q.date).desc("date in format YYYY-MM[-DDTHH-MM-SS.MS] or in shorthand"),
  durationType: (_) => parsimmon_umd_min.exports.alt(...Object.keys(DURATION_TYPES).sort((a, b) => b.length - a.length).map(parsimmon_umd_min.exports.string)),
  duration: (q) => parsimmon_umd_min.exports.seqMap(q.number, parsimmon_umd_min.exports.optWhitespace, q.durationType, (count, _, t) => DURATION_TYPES[t].mapUnits((x) => x * count)).sepBy1(parsimmon_umd_min.exports.string(",").trim(parsimmon_umd_min.exports.optWhitespace).or(parsimmon_umd_min.exports.optWhitespace)).map((durations) => durations.reduce((p, c) => p.plus(c))).desc("duration like 4hr2min"),
  rawNull: (_) => parsimmon_umd_min.exports.string("null"),
  tagSource: (q) => q.tag.map((tag) => Sources.tag(tag)),
  csvSource: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("csv(").skip(parsimmon_umd_min.exports.optWhitespace), q.string, parsimmon_umd_min.exports.string(")"), (_1, path, _2) => Sources.csv(path)),
  linkIncomingSource: (q) => q.link.map((link) => Sources.link(link.path, true)),
  linkOutgoingSource: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("outgoing(").skip(parsimmon_umd_min.exports.optWhitespace), q.link, parsimmon_umd_min.exports.string(")"), (_1, link, _2) => Sources.link(link.path, false)),
  folderSource: (q) => q.string.map((str) => Sources.folder(str)),
  parensSource: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("("), parsimmon_umd_min.exports.optWhitespace, q.source, parsimmon_umd_min.exports.optWhitespace, parsimmon_umd_min.exports.string(")"), (_1, _2, field, _3, _4) => field),
  negateSource: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.alt(parsimmon_umd_min.exports.string("-"), parsimmon_umd_min.exports.string("!")), q.atomSource, (_, source) => Sources.negate(source)),
  atomSource: (q) => parsimmon_umd_min.exports.alt(q.parensSource, q.negateSource, q.linkOutgoingSource, q.linkIncomingSource, q.folderSource, q.tagSource, q.csvSource),
  binaryOpSource: (q) => createBinaryParser(q.atomSource, q.binaryBooleanOp.map((s2) => s2), Sources.binaryOp),
  source: (q) => q.binaryOpSource,
  variableField: (q) => q.identifier.chain((r) => {
    if (KEYWORDS.includes(r.toUpperCase())) {
      return parsimmon_umd_min.exports.fail("Variable fields cannot be a keyword (" + KEYWORDS.join(" or ") + ")");
    } else {
      return parsimmon_umd_min.exports.succeed(Fields.variable(r));
    }
  }).desc("variable"),
  numberField: (q) => q.number.map((val) => Fields.literal(val)).desc("number"),
  stringField: (q) => q.string.map((val) => Fields.literal(val)).desc("string"),
  boolField: (q) => q.bool.map((val) => Fields.literal(val)).desc("boolean"),
  dateField: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("date("), parsimmon_umd_min.exports.optWhitespace, q.datePlus, parsimmon_umd_min.exports.optWhitespace, parsimmon_umd_min.exports.string(")"), (prefix, _1, date, _2, postfix) => Fields.literal(date)).desc("date"),
  durationField: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("dur("), parsimmon_umd_min.exports.optWhitespace, q.duration, parsimmon_umd_min.exports.optWhitespace, parsimmon_umd_min.exports.string(")"), (prefix, _1, dur, _2, postfix) => Fields.literal(dur)).desc("duration"),
  nullField: (q) => q.rawNull.map((_) => Fields.NULL),
  linkField: (q) => q.link.map((f) => Fields.literal(f)),
  listField: (q) => q.field.sepBy(parsimmon_umd_min.exports.string(",").trim(parsimmon_umd_min.exports.optWhitespace)).wrap(parsimmon_umd_min.exports.string("[").skip(parsimmon_umd_min.exports.optWhitespace), parsimmon_umd_min.exports.optWhitespace.then(parsimmon_umd_min.exports.string("]"))).map((l2) => Fields.list(l2)).desc("list ('[1, 2, 3]')"),
  objectField: (q) => parsimmon_umd_min.exports.seqMap(q.identifier.or(q.string), parsimmon_umd_min.exports.string(":").trim(parsimmon_umd_min.exports.optWhitespace), q.field, (name, _sep, value) => {
    return { name, value };
  }).sepBy(parsimmon_umd_min.exports.string(",").trim(parsimmon_umd_min.exports.optWhitespace)).wrap(parsimmon_umd_min.exports.string("{").skip(parsimmon_umd_min.exports.optWhitespace), parsimmon_umd_min.exports.optWhitespace.then(parsimmon_umd_min.exports.string("}"))).map((vals) => {
    let res = {};
    for (let entry of vals)
      res[entry.name] = entry.value;
    return Fields.object(res);
  }).desc("object ('{ a: 1, b: 2 }')"),
  atomInlineField: (q) => parsimmon_umd_min.exports.alt(q.date, q.duration.map((d) => normalizeDuration(d)), q.string, q.tag, q.embedLink, q.bool, q.number, q.rawNull),
  inlineFieldList: (q) => q.atomInlineField.sepBy(parsimmon_umd_min.exports.string(",").trim(parsimmon_umd_min.exports.optWhitespace).lookahead(q.atomInlineField)),
  inlineField: (q) => parsimmon_umd_min.exports.alt(parsimmon_umd_min.exports.seqMap(q.atomInlineField, parsimmon_umd_min.exports.string(",").trim(parsimmon_umd_min.exports.optWhitespace), q.inlineFieldList, (f, _s, l2) => [f].concat(l2)), q.atomInlineField),
  atomField: (q) => parsimmon_umd_min.exports.alt(
    q.embedLink.map((l2) => Fields.literal(l2)),
    q.negatedField,
    q.linkField,
    q.listField,
    q.objectField,
    q.lambdaField,
    q.parensField,
    q.boolField,
    q.numberField,
    q.stringField,
    q.dateField,
    q.durationField,
    q.nullField,
    q.variableField
  ),
  indexField: (q) => parsimmon_umd_min.exports.seqMap(q.atomField, parsimmon_umd_min.exports.alt(q.dotPostfix, q.indexPostfix, q.functionPostfix).many(), (obj, postfixes) => {
    let result = obj;
    for (let post of postfixes) {
      switch (post.type) {
        case "dot":
          result = Fields.index(result, Fields.literal(post.field));
          break;
        case "index":
          result = Fields.index(result, post.field);
          break;
        case "function":
          result = Fields.func(result, post.fields);
          break;
      }
    }
    return result;
  }),
  negatedField: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("!"), q.indexField, (_, field) => Fields.negate(field)).desc("negated field"),
  parensField: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("("), parsimmon_umd_min.exports.optWhitespace, q.field, parsimmon_umd_min.exports.optWhitespace, parsimmon_umd_min.exports.string(")"), (_1, _2, field, _3, _4) => field),
  lambdaField: (q) => parsimmon_umd_min.exports.seqMap(q.identifier.sepBy(parsimmon_umd_min.exports.string(",").trim(parsimmon_umd_min.exports.optWhitespace)).wrap(parsimmon_umd_min.exports.string("(").trim(parsimmon_umd_min.exports.optWhitespace), parsimmon_umd_min.exports.string(")").trim(parsimmon_umd_min.exports.optWhitespace)), parsimmon_umd_min.exports.string("=>").trim(parsimmon_umd_min.exports.optWhitespace), q.field, (ident, _ignore, value) => {
    return { type: "lambda", arguments: ident, value };
  }),
  dotPostfix: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("."), q.identifier, (_, field) => {
    return { type: "dot", field };
  }),
  indexPostfix: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("["), parsimmon_umd_min.exports.optWhitespace, q.field, parsimmon_umd_min.exports.optWhitespace, parsimmon_umd_min.exports.string("]"), (_, _2, field, _3, _4) => {
    return { type: "index", field };
  }),
  functionPostfix: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.string("("), parsimmon_umd_min.exports.optWhitespace, q.field.sepBy(parsimmon_umd_min.exports.string(",").trim(parsimmon_umd_min.exports.optWhitespace)), parsimmon_umd_min.exports.optWhitespace, parsimmon_umd_min.exports.string(")"), (_, _1, fields, _2, _3) => {
    return { type: "function", fields };
  }),
  binaryMulDivField: (q) => createBinaryParser(q.indexField, q.binaryMulDiv, Fields.binaryOp),
  binaryPlusMinusField: (q) => createBinaryParser(q.binaryMulDivField, q.binaryPlusMinus, Fields.binaryOp),
  binaryCompareField: (q) => createBinaryParser(q.binaryPlusMinusField, q.binaryCompareOp, Fields.binaryOp),
  binaryBooleanField: (q) => createBinaryParser(q.binaryCompareField, q.binaryBooleanOp, Fields.binaryOp),
  binaryOpField: (q) => q.binaryBooleanField,
  field: (q) => q.binaryOpField
});
function parseField(text2) {
  try {
    return Result.success(EXPRESSION.field.tryParse(text2));
  } catch (error) {
    return Result.failure("" + error);
  }
}
var QueryFields;
(function(QueryFields2) {
  function named(name, field) {
    return { name, field };
  }
  QueryFields2.named = named;
  function sortBy2(field, dir) {
    return { field, direction: dir };
  }
  QueryFields2.sortBy = sortBy2;
})(QueryFields || (QueryFields = {}));
function captureRaw(base) {
  return parsimmon_umd_min.exports.custom((success, failure) => {
    return (input, i) => {
      let result = base._(input, i);
      if (!result.status)
        return result;
      return Object.assign({}, result, { value: [result.value, input.substring(i, result.index)] });
    };
  });
}
function stripNewlines(text2) {
  return text2.split(/[\r\n]+/).map((t) => t.trim()).join("");
}
const QUERY_LANGUAGE = parsimmon_umd_min.exports.createLanguage({
  queryType: (q) => parsimmon_umd_min.exports.alt(parsimmon_umd_min.exports.regexp(/TABLE|LIST|TASK|CALENDAR/i)).map((str) => str.toLowerCase()).desc("query type ('TABLE', 'LIST', 'TASK', or 'CALENDAR')"),
  explicitNamedField: (q) => parsimmon_umd_min.exports.seqMap(EXPRESSION.field.skip(parsimmon_umd_min.exports.whitespace), parsimmon_umd_min.exports.regexp(/AS/i).skip(parsimmon_umd_min.exports.whitespace), EXPRESSION.identifier.or(EXPRESSION.string), (field, _as, ident) => QueryFields.named(ident, field)),
  namedField: (q) => parsimmon_umd_min.exports.alt(q.explicitNamedField, captureRaw(EXPRESSION.field).map(([value, text2]) => QueryFields.named(stripNewlines(text2), value))),
  sortField: (q) => parsimmon_umd_min.exports.seqMap(EXPRESSION.field.skip(parsimmon_umd_min.exports.optWhitespace), parsimmon_umd_min.exports.regexp(/ASCENDING|DESCENDING|ASC|DESC/i).atMost(1), (field, dir) => {
    let direction = dir.length == 0 ? "ascending" : dir[0].toLowerCase();
    if (direction == "desc")
      direction = "descending";
    if (direction == "asc")
      direction = "ascending";
    return {
      field,
      direction
    };
  }),
  headerClause: (q) => q.queryType.skip(parsimmon_umd_min.exports.whitespace).chain((qtype) => {
    switch (qtype) {
      case "table":
        return parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.regexp(/WITHOUT\s+ID/i).skip(parsimmon_umd_min.exports.optWhitespace).atMost(1), parsimmon_umd_min.exports.sepBy(q.namedField, parsimmon_umd_min.exports.string(",").trim(parsimmon_umd_min.exports.optWhitespace)), (withoutId, fields) => {
          return { type: "table", fields, showId: withoutId.length == 0 };
        });
      case "list":
        return parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.regexp(/WITHOUT\s+ID/i).skip(parsimmon_umd_min.exports.optWhitespace).atMost(1), EXPRESSION.field.atMost(1), (withoutId, format) => {
          return {
            type: "list",
            format: format.length == 1 ? format[0] : void 0,
            showId: withoutId.length == 0
          };
        });
      case "task":
        return parsimmon_umd_min.exports.succeed({ type: "task" });
      case "calendar":
        return parsimmon_umd_min.exports.seqMap(q.namedField, (field) => {
          return {
            type: "calendar",
            showId: true,
            field
          };
        });
      default:
        return parsimmon_umd_min.exports.fail(`Unrecognized query type '${qtype}'`);
    }
  }).desc("TABLE or LIST or TASK or CALENDAR"),
  fromClause: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.regexp(/FROM/i), parsimmon_umd_min.exports.whitespace, EXPRESSION.source, (_1, _2, source) => source),
  whereClause: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.regexp(/WHERE/i), parsimmon_umd_min.exports.whitespace, EXPRESSION.field, (where, _, field) => {
    return { type: "where", clause: field };
  }).desc("WHERE <expression>"),
  sortByClause: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.regexp(/SORT/i), parsimmon_umd_min.exports.whitespace, q.sortField.sepBy1(parsimmon_umd_min.exports.string(",").trim(parsimmon_umd_min.exports.optWhitespace)), (sort, _1, fields) => {
    return { type: "sort", fields };
  }).desc("SORT field [ASC/DESC]"),
  limitClause: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.regexp(/LIMIT/i), parsimmon_umd_min.exports.whitespace, EXPRESSION.field, (limit, _1, field) => {
    return { type: "limit", amount: field };
  }).desc("LIMIT <value>"),
  flattenClause: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.regexp(/FLATTEN/i).skip(parsimmon_umd_min.exports.whitespace), q.namedField, (_, field) => {
    return { type: "flatten", field };
  }).desc("FLATTEN <value> [AS <name>]"),
  groupByClause: (q) => parsimmon_umd_min.exports.seqMap(parsimmon_umd_min.exports.regexp(/GROUP BY/i).skip(parsimmon_umd_min.exports.whitespace), q.namedField, (_, field) => {
    return { type: "group", field };
  }).desc("GROUP BY <value> [AS <name>]"),
  clause: (q) => parsimmon_umd_min.exports.alt(q.fromClause, q.whereClause, q.sortByClause, q.limitClause, q.groupByClause, q.flattenClause),
  query: (q) => parsimmon_umd_min.exports.seqMap(q.headerClause.trim(parsimmon_umd_min.exports.optWhitespace), q.fromClause.trim(parsimmon_umd_min.exports.optWhitespace).atMost(1), q.clause.trim(parsimmon_umd_min.exports.optWhitespace).many(), (header, from, clauses) => {
    return {
      header,
      source: from.length == 0 ? Sources.folder("") : from[0],
      operations: clauses,
      settings: DEFAULT_QUERY_SETTINGS
    };
  })
});
const getAPI = (app) => {
  var _a;
  if (app)
    return (_a = app.plugins.plugins.dataview) === null || _a === void 0 ? void 0 : _a.api;
  else
    return window.DataviewAPI;
};
const isPluginEnabled = (app) => app.plugins.enabledPlugins.has("dataview");
lib.DATE_SHORTHANDS = DATE_SHORTHANDS;
lib.DURATION_TYPES = DURATION_TYPES;
lib.EXPRESSION = EXPRESSION;
lib.KEYWORDS = KEYWORDS;
lib.QUERY_LANGUAGE = QUERY_LANGUAGE;
var getAPI_1 = lib.getAPI = getAPI;
lib.isPluginEnabled = isPluginEnabled;
lib.parseField = parseField;
var dist = {};
var __assign = commonjsGlobal$1 && commonjsGlobal$1.__assign || function() {
  __assign = Object.assign || function(t) {
    for (var s2, i = 1, n2 = arguments.length; i < n2; i++) {
      s2 = arguments[i];
      for (var p in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p))
          t[p] = s2[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __read = commonjsGlobal$1 && commonjsGlobal$1.__read || function(o, n2) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
var __spreadArray = commonjsGlobal$1 && commonjsGlobal$1.__spreadArray || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l2 = from.length, ar; i < l2; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(dist, "__esModule", { value: true });
var isObject = function(obj) {
  if (typeof obj === "object" && obj !== null) {
    if (typeof Object.getPrototypeOf === "function") {
      var prototype = Object.getPrototypeOf(obj);
      return prototype === Object.prototype || prototype === null;
    }
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
  return false;
};
var merge = function() {
  var objects = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    objects[_i] = arguments[_i];
  }
  return objects.reduce(function(result, current) {
    if (Array.isArray(current)) {
      throw new TypeError("Arguments provided to ts-deepmerge must be objects, not arrays.");
    }
    Object.keys(current).forEach(function(key) {
      if (["__proto__", "constructor", "prototype"].includes(key)) {
        return;
      }
      if (Array.isArray(result[key]) && Array.isArray(current[key])) {
        result[key] = merge.options.mergeArrays ? Array.from(new Set(result[key].concat(current[key]))) : current[key];
      } else if (isObject(result[key]) && isObject(current[key])) {
        result[key] = merge(result[key], current[key]);
      } else {
        result[key] = current[key];
      }
    });
    return result;
  }, {});
};
var defaultOptions = {
  mergeArrays: true
};
merge.options = defaultOptions;
merge.withOptions = function(options) {
  var objects = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    objects[_i - 1] = arguments[_i];
  }
  merge.options = __assign({ mergeArrays: true }, options);
  var result = merge.apply(void 0, __spreadArray([], __read(objects), false));
  merge.options = defaultOptions;
  return result;
};
var _default = dist.default = merge;
var validate$1 = { exports: {} };
/*!
 * validate.js 0.13.1
 *
 * (c) 2013-2019 Nicklas Ansman, 2013 Wrapp
 * Validate.js may be freely distributed under the MIT license.
 * For all details and documentation:
 * http://validatejs.org/
 */
(function(module2, exports2) {
  (function(exports3, module3, define) {
    var validate2 = function(attributes, constraints, options) {
      options = v.extend({}, v.options, options);
      var results = v.runValidations(attributes, constraints, options);
      if (results.some(function(r) {
        return v.isPromise(r.error);
      })) {
        throw new Error("Use validate.async if you want support for promises");
      }
      return validate2.processValidationResults(results, options);
    };
    var v = validate2;
    v.extend = function(obj) {
      [].slice.call(arguments, 1).forEach(function(source) {
        for (var attr2 in source) {
          obj[attr2] = source[attr2];
        }
      });
      return obj;
    };
    v.extend(validate2, {
      version: {
        major: 0,
        minor: 13,
        patch: 1,
        metadata: null,
        toString: function() {
          var version = v.format("%{major}.%{minor}.%{patch}", v.version);
          if (!v.isEmpty(v.version.metadata)) {
            version += "+" + v.version.metadata;
          }
          return version;
        }
      },
      Promise: typeof Promise !== "undefined" ? Promise : null,
      EMPTY_STRING_REGEXP: /^\s*$/,
      runValidations: function(attributes, constraints, options) {
        var results = [], attr2, validatorName, value, validators, validator, validatorOptions, error;
        if (v.isDomElement(attributes) || v.isJqueryElement(attributes)) {
          attributes = v.collectFormValues(attributes);
        }
        for (attr2 in constraints) {
          value = v.getDeepObjectValue(attributes, attr2);
          validators = v.result(constraints[attr2], value, attributes, attr2, options, constraints);
          for (validatorName in validators) {
            validator = v.validators[validatorName];
            if (!validator) {
              error = v.format("Unknown validator %{name}", { name: validatorName });
              throw new Error(error);
            }
            validatorOptions = validators[validatorName];
            validatorOptions = v.result(validatorOptions, value, attributes, attr2, options, constraints);
            if (!validatorOptions) {
              continue;
            }
            results.push({
              attribute: attr2,
              value,
              validator: validatorName,
              globalOptions: options,
              attributes,
              options: validatorOptions,
              error: validator.call(
                validator,
                value,
                validatorOptions,
                attr2,
                attributes,
                options
              )
            });
          }
        }
        return results;
      },
      processValidationResults: function(errors, options) {
        errors = v.pruneEmptyErrors(errors, options);
        errors = v.expandMultipleErrors(errors, options);
        errors = v.convertErrorMessages(errors, options);
        var format = options.format || "grouped";
        if (typeof v.formatters[format] === "function") {
          errors = v.formatters[format](errors);
        } else {
          throw new Error(v.format("Unknown format %{format}", options));
        }
        return v.isEmpty(errors) ? void 0 : errors;
      },
      async: function(attributes, constraints, options) {
        options = v.extend({}, v.async.options, options);
        var WrapErrors = options.wrapErrors || function(errors) {
          return errors;
        };
        if (options.cleanAttributes !== false) {
          attributes = v.cleanAttributes(attributes, constraints);
        }
        var results = v.runValidations(attributes, constraints, options);
        return new v.Promise(function(resolve, reject) {
          v.waitForResults(results).then(function() {
            var errors = v.processValidationResults(results, options);
            if (errors) {
              reject(new WrapErrors(errors, options, attributes, constraints));
            } else {
              resolve(attributes);
            }
          }, function(err) {
            reject(err);
          });
        });
      },
      single: function(value, constraints, options) {
        options = v.extend({}, v.single.options, options, {
          format: "flat",
          fullMessages: false
        });
        return v({ single: value }, { single: constraints }, options);
      },
      waitForResults: function(results) {
        return results.reduce(function(memo, result) {
          if (!v.isPromise(result.error)) {
            return memo;
          }
          return memo.then(function() {
            return result.error.then(function(error) {
              result.error = error || null;
            });
          });
        }, new v.Promise(function(r) {
          r();
        }));
      },
      result: function(value) {
        var args = [].slice.call(arguments, 1);
        if (typeof value === "function") {
          value = value.apply(null, args);
        }
        return value;
      },
      isNumber: function(value) {
        return typeof value === "number" && !isNaN(value);
      },
      isFunction: function(value) {
        return typeof value === "function";
      },
      isInteger: function(value) {
        return v.isNumber(value) && value % 1 === 0;
      },
      isBoolean: function(value) {
        return typeof value === "boolean";
      },
      isObject: function(obj) {
        return obj === Object(obj);
      },
      isDate: function(obj) {
        return obj instanceof Date;
      },
      isDefined: function(obj) {
        return obj !== null && obj !== void 0;
      },
      isPromise: function(p) {
        return !!p && v.isFunction(p.then);
      },
      isJqueryElement: function(o) {
        return o && v.isString(o.jquery);
      },
      isDomElement: function(o) {
        if (!o) {
          return false;
        }
        if (!o.querySelectorAll || !o.querySelector) {
          return false;
        }
        if (v.isObject(document) && o === document) {
          return true;
        }
        if (typeof HTMLElement === "object") {
          return o instanceof HTMLElement;
        } else {
          return o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
        }
      },
      isEmpty: function(value) {
        var attr2;
        if (!v.isDefined(value)) {
          return true;
        }
        if (v.isFunction(value)) {
          return false;
        }
        if (v.isString(value)) {
          return v.EMPTY_STRING_REGEXP.test(value);
        }
        if (v.isArray(value)) {
          return value.length === 0;
        }
        if (v.isDate(value)) {
          return false;
        }
        if (v.isObject(value)) {
          for (attr2 in value) {
            return false;
          }
          return true;
        }
        return false;
      },
      format: v.extend(function(str, vals) {
        if (!v.isString(str)) {
          return str;
        }
        return str.replace(v.format.FORMAT_REGEXP, function(m0, m1, m2) {
          if (m1 === "%") {
            return "%{" + m2 + "}";
          } else {
            return String(vals[m2]);
          }
        });
      }, {
        FORMAT_REGEXP: /(%?)%\{([^\}]+)\}/g
      }),
      prettify: function(str) {
        if (v.isNumber(str)) {
          if (str * 100 % 1 === 0) {
            return "" + str;
          } else {
            return parseFloat(Math.round(str * 100) / 100).toFixed(2);
          }
        }
        if (v.isArray(str)) {
          return str.map(function(s2) {
            return v.prettify(s2);
          }).join(", ");
        }
        if (v.isObject(str)) {
          if (!v.isDefined(str.toString)) {
            return JSON.stringify(str);
          }
          return str.toString();
        }
        str = "" + str;
        return str.replace(/([^\s])\.([^\s])/g, "$1 $2").replace(/\\+/g, "").replace(/[_-]/g, " ").replace(/([a-z])([A-Z])/g, function(m0, m1, m2) {
          return "" + m1 + " " + m2.toLowerCase();
        }).toLowerCase();
      },
      stringifyValue: function(value, options) {
        var prettify = options && options.prettify || v.prettify;
        return prettify(value);
      },
      isString: function(value) {
        return typeof value === "string";
      },
      isArray: function(value) {
        return {}.toString.call(value) === "[object Array]";
      },
      isHash: function(value) {
        return v.isObject(value) && !v.isArray(value) && !v.isFunction(value);
      },
      contains: function(obj, value) {
        if (!v.isDefined(obj)) {
          return false;
        }
        if (v.isArray(obj)) {
          return obj.indexOf(value) !== -1;
        }
        return value in obj;
      },
      unique: function(array) {
        if (!v.isArray(array)) {
          return array;
        }
        return array.filter(function(el, index, array2) {
          return array2.indexOf(el) == index;
        });
      },
      forEachKeyInKeypath: function(object, keypath, callback) {
        if (!v.isString(keypath)) {
          return void 0;
        }
        var key = "", i, escape = false;
        for (i = 0; i < keypath.length; ++i) {
          switch (keypath[i]) {
            case ".":
              if (escape) {
                escape = false;
                key += ".";
              } else {
                object = callback(object, key, false);
                key = "";
              }
              break;
            case "\\":
              if (escape) {
                escape = false;
                key += "\\";
              } else {
                escape = true;
              }
              break;
            default:
              escape = false;
              key += keypath[i];
              break;
          }
        }
        return callback(object, key, true);
      },
      getDeepObjectValue: function(obj, keypath) {
        if (!v.isObject(obj)) {
          return void 0;
        }
        return v.forEachKeyInKeypath(obj, keypath, function(obj2, key) {
          if (v.isObject(obj2)) {
            return obj2[key];
          }
        });
      },
      collectFormValues: function(form, options) {
        var values = {}, i, j, input, inputs, option, value;
        if (v.isJqueryElement(form)) {
          form = form[0];
        }
        if (!form) {
          return values;
        }
        options = options || {};
        inputs = form.querySelectorAll("input[name], textarea[name]");
        for (i = 0; i < inputs.length; ++i) {
          input = inputs.item(i);
          if (v.isDefined(input.getAttribute("data-ignored"))) {
            continue;
          }
          var name = input.name.replace(/\./g, "\\\\.");
          value = v.sanitizeFormValue(input.value, options);
          if (input.type === "number") {
            value = value ? +value : null;
          } else if (input.type === "checkbox") {
            if (input.attributes.value) {
              if (!input.checked) {
                value = values[name] || null;
              }
            } else {
              value = input.checked;
            }
          } else if (input.type === "radio") {
            if (!input.checked) {
              value = values[name] || null;
            }
          }
          values[name] = value;
        }
        inputs = form.querySelectorAll("select[name]");
        for (i = 0; i < inputs.length; ++i) {
          input = inputs.item(i);
          if (v.isDefined(input.getAttribute("data-ignored"))) {
            continue;
          }
          if (input.multiple) {
            value = [];
            for (j in input.options) {
              option = input.options[j];
              if (option && option.selected) {
                value.push(v.sanitizeFormValue(option.value, options));
              }
            }
          } else {
            var _val = typeof input.options[input.selectedIndex] !== "undefined" ? input.options[input.selectedIndex].value : "";
            value = v.sanitizeFormValue(_val, options);
          }
          values[input.name] = value;
        }
        return values;
      },
      sanitizeFormValue: function(value, options) {
        if (options.trim && v.isString(value)) {
          value = value.trim();
        }
        if (options.nullify !== false && value === "") {
          return null;
        }
        return value;
      },
      capitalize: function(str) {
        if (!v.isString(str)) {
          return str;
        }
        return str[0].toUpperCase() + str.slice(1);
      },
      pruneEmptyErrors: function(errors) {
        return errors.filter(function(error) {
          return !v.isEmpty(error.error);
        });
      },
      expandMultipleErrors: function(errors) {
        var ret = [];
        errors.forEach(function(error) {
          if (v.isArray(error.error)) {
            error.error.forEach(function(msg) {
              ret.push(v.extend({}, error, { error: msg }));
            });
          } else {
            ret.push(error);
          }
        });
        return ret;
      },
      convertErrorMessages: function(errors, options) {
        options = options || {};
        var ret = [], prettify = options.prettify || v.prettify;
        errors.forEach(function(errorInfo) {
          var error = v.result(
            errorInfo.error,
            errorInfo.value,
            errorInfo.attribute,
            errorInfo.options,
            errorInfo.attributes,
            errorInfo.globalOptions
          );
          if (!v.isString(error)) {
            ret.push(errorInfo);
            return;
          }
          if (error[0] === "^") {
            error = error.slice(1);
          } else if (options.fullMessages !== false) {
            error = v.capitalize(prettify(errorInfo.attribute)) + " " + error;
          }
          error = error.replace(/\\\^/g, "^");
          error = v.format(error, {
            value: v.stringifyValue(errorInfo.value, options)
          });
          ret.push(v.extend({}, errorInfo, { error }));
        });
        return ret;
      },
      groupErrorsByAttribute: function(errors) {
        var ret = {};
        errors.forEach(function(error) {
          var list = ret[error.attribute];
          if (list) {
            list.push(error);
          } else {
            ret[error.attribute] = [error];
          }
        });
        return ret;
      },
      flattenErrorsToArray: function(errors) {
        return errors.map(function(error) {
          return error.error;
        }).filter(function(value, index, self2) {
          return self2.indexOf(value) === index;
        });
      },
      cleanAttributes: function(attributes, whitelist) {
        function whitelistCreator(obj, key, last) {
          if (v.isObject(obj[key])) {
            return obj[key];
          }
          return obj[key] = last ? true : {};
        }
        function buildObjectWhitelist(whitelist2) {
          var ow = {}, attr2;
          for (attr2 in whitelist2) {
            if (!whitelist2[attr2]) {
              continue;
            }
            v.forEachKeyInKeypath(ow, attr2, whitelistCreator);
          }
          return ow;
        }
        function cleanRecursive(attributes2, whitelist2) {
          if (!v.isObject(attributes2)) {
            return attributes2;
          }
          var ret = v.extend({}, attributes2), w, attribute;
          for (attribute in attributes2) {
            w = whitelist2[attribute];
            if (v.isObject(w)) {
              ret[attribute] = cleanRecursive(ret[attribute], w);
            } else if (!w) {
              delete ret[attribute];
            }
          }
          return ret;
        }
        if (!v.isObject(whitelist) || !v.isObject(attributes)) {
          return {};
        }
        whitelist = buildObjectWhitelist(whitelist);
        return cleanRecursive(attributes, whitelist);
      },
      exposeModule: function(validate3, root, exports4, module4, define2) {
        if (exports4) {
          if (module4 && module4.exports) {
            exports4 = module4.exports = validate3;
          }
          exports4.validate = validate3;
        } else {
          root.validate = validate3;
          if (validate3.isFunction(define2) && define2.amd) {
            define2([], function() {
              return validate3;
            });
          }
        }
      },
      warn: function(msg) {
        if (typeof console !== "undefined" && console.warn) {
          console.warn("[validate.js] " + msg);
        }
      },
      error: function(msg) {
        if (typeof console !== "undefined" && console.error) {
          console.error("[validate.js] " + msg);
        }
      }
    });
    validate2.validators = {
      presence: function(value, options) {
        options = v.extend({}, this.options, options);
        if (options.allowEmpty !== false ? !v.isDefined(value) : v.isEmpty(value)) {
          return options.message || this.message || "can't be blank";
        }
      },
      length: function(value, options, attribute) {
        if (!v.isDefined(value)) {
          return;
        }
        options = v.extend({}, this.options, options);
        var is = options.is, maximum = options.maximum, minimum = options.minimum, tokenizer = options.tokenizer || function(val) {
          return val;
        }, err, errors = [];
        value = tokenizer(value);
        var length = value.length;
        if (!v.isNumber(length)) {
          return options.message || this.notValid || "has an incorrect length";
        }
        if (v.isNumber(is) && length !== is) {
          err = options.wrongLength || this.wrongLength || "is the wrong length (should be %{count} characters)";
          errors.push(v.format(err, { count: is }));
        }
        if (v.isNumber(minimum) && length < minimum) {
          err = options.tooShort || this.tooShort || "is too short (minimum is %{count} characters)";
          errors.push(v.format(err, { count: minimum }));
        }
        if (v.isNumber(maximum) && length > maximum) {
          err = options.tooLong || this.tooLong || "is too long (maximum is %{count} characters)";
          errors.push(v.format(err, { count: maximum }));
        }
        if (errors.length > 0) {
          return options.message || errors;
        }
      },
      numericality: function(value, options, attribute, attributes, globalOptions) {
        if (!v.isDefined(value)) {
          return;
        }
        options = v.extend({}, this.options, options);
        var errors = [], name, count, checks = {
          greaterThan: function(v2, c) {
            return v2 > c;
          },
          greaterThanOrEqualTo: function(v2, c) {
            return v2 >= c;
          },
          equalTo: function(v2, c) {
            return v2 === c;
          },
          lessThan: function(v2, c) {
            return v2 < c;
          },
          lessThanOrEqualTo: function(v2, c) {
            return v2 <= c;
          },
          divisibleBy: function(v2, c) {
            return v2 % c === 0;
          }
        }, prettify = options.prettify || globalOptions && globalOptions.prettify || v.prettify;
        if (v.isString(value) && options.strict) {
          var pattern = "^-?(0|[1-9]\\d*)";
          if (!options.onlyInteger) {
            pattern += "(\\.\\d+)?";
          }
          pattern += "$";
          if (!new RegExp(pattern).test(value)) {
            return options.message || options.notValid || this.notValid || this.message || "must be a valid number";
          }
        }
        if (options.noStrings !== true && v.isString(value) && !v.isEmpty(value)) {
          value = +value;
        }
        if (!v.isNumber(value)) {
          return options.message || options.notValid || this.notValid || this.message || "is not a number";
        }
        if (options.onlyInteger && !v.isInteger(value)) {
          return options.message || options.notInteger || this.notInteger || this.message || "must be an integer";
        }
        for (name in checks) {
          count = options[name];
          if (v.isNumber(count) && !checks[name](value, count)) {
            var key = "not" + v.capitalize(name);
            var msg = options[key] || this[key] || this.message || "must be %{type} %{count}";
            errors.push(v.format(msg, {
              count,
              type: prettify(name)
            }));
          }
        }
        if (options.odd && value % 2 !== 1) {
          errors.push(options.notOdd || this.notOdd || this.message || "must be odd");
        }
        if (options.even && value % 2 !== 0) {
          errors.push(options.notEven || this.notEven || this.message || "must be even");
        }
        if (errors.length) {
          return options.message || errors;
        }
      },
      datetime: v.extend(function(value, options) {
        if (!v.isFunction(this.parse) || !v.isFunction(this.format)) {
          throw new Error("Both the parse and format functions needs to be set to use the datetime/date validator");
        }
        if (!v.isDefined(value)) {
          return;
        }
        options = v.extend({}, this.options, options);
        var err, errors = [], earliest = options.earliest ? this.parse(options.earliest, options) : NaN, latest = options.latest ? this.parse(options.latest, options) : NaN;
        value = this.parse(value, options);
        if (isNaN(value) || options.dateOnly && value % 864e5 !== 0) {
          err = options.notValid || options.message || this.notValid || "must be a valid date";
          return v.format(err, { value: arguments[0] });
        }
        if (!isNaN(earliest) && value < earliest) {
          err = options.tooEarly || options.message || this.tooEarly || "must be no earlier than %{date}";
          err = v.format(err, {
            value: this.format(value, options),
            date: this.format(earliest, options)
          });
          errors.push(err);
        }
        if (!isNaN(latest) && value > latest) {
          err = options.tooLate || options.message || this.tooLate || "must be no later than %{date}";
          err = v.format(err, {
            date: this.format(latest, options),
            value: this.format(value, options)
          });
          errors.push(err);
        }
        if (errors.length) {
          return v.unique(errors);
        }
      }, {
        parse: null,
        format: null
      }),
      date: function(value, options) {
        options = v.extend({}, options, { dateOnly: true });
        return v.validators.datetime.call(v.validators.datetime, value, options);
      },
      format: function(value, options) {
        if (v.isString(options) || options instanceof RegExp) {
          options = { pattern: options };
        }
        options = v.extend({}, this.options, options);
        var message = options.message || this.message || "is invalid", pattern = options.pattern, match2;
        if (!v.isDefined(value)) {
          return;
        }
        if (!v.isString(value)) {
          return message;
        }
        if (v.isString(pattern)) {
          pattern = new RegExp(options.pattern, options.flags);
        }
        match2 = pattern.exec(value);
        if (!match2 || match2[0].length != value.length) {
          return message;
        }
      },
      inclusion: function(value, options) {
        if (!v.isDefined(value)) {
          return;
        }
        if (v.isArray(options)) {
          options = { within: options };
        }
        options = v.extend({}, this.options, options);
        if (v.contains(options.within, value)) {
          return;
        }
        var message = options.message || this.message || "^%{value} is not included in the list";
        return v.format(message, { value });
      },
      exclusion: function(value, options) {
        if (!v.isDefined(value)) {
          return;
        }
        if (v.isArray(options)) {
          options = { within: options };
        }
        options = v.extend({}, this.options, options);
        if (!v.contains(options.within, value)) {
          return;
        }
        var message = options.message || this.message || "^%{value} is restricted";
        if (v.isString(options.within[value])) {
          value = options.within[value];
        }
        return v.format(message, { value });
      },
      email: v.extend(function(value, options) {
        options = v.extend({}, this.options, options);
        var message = options.message || this.message || "is not a valid email";
        if (!v.isDefined(value)) {
          return;
        }
        if (!v.isString(value)) {
          return message;
        }
        if (!this.PATTERN.exec(value)) {
          return message;
        }
      }, {
        PATTERN: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
      }),
      equality: function(value, options, attribute, attributes, globalOptions) {
        if (!v.isDefined(value)) {
          return;
        }
        if (v.isString(options)) {
          options = { attribute: options };
        }
        options = v.extend({}, this.options, options);
        var message = options.message || this.message || "is not equal to %{attribute}";
        if (v.isEmpty(options.attribute) || !v.isString(options.attribute)) {
          throw new Error("The attribute must be a non empty string");
        }
        var otherValue = v.getDeepObjectValue(attributes, options.attribute), comparator = options.comparator || function(v1, v2) {
          return v1 === v2;
        }, prettify = options.prettify || globalOptions && globalOptions.prettify || v.prettify;
        if (!comparator(value, otherValue, options, attribute, attributes)) {
          return v.format(message, { attribute: prettify(options.attribute) });
        }
      },
      url: function(value, options) {
        if (!v.isDefined(value)) {
          return;
        }
        options = v.extend({}, this.options, options);
        var message = options.message || this.message || "is not a valid url", schemes = options.schemes || this.schemes || ["http", "https"], allowLocal = options.allowLocal || this.allowLocal || false, allowDataUrl = options.allowDataUrl || this.allowDataUrl || false;
        if (!v.isString(value)) {
          return message;
        }
        var regex = "^(?:(?:" + schemes.join("|") + ")://)(?:\\S+(?::\\S*)?@)?(?:";
        var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";
        if (allowLocal) {
          tld += "?";
        } else {
          regex += "(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})";
        }
        regex += "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" + tld + ")(?::\\d{2,5})?(?:[/?#]\\S*)?$";
        if (allowDataUrl) {
          var mediaType = "\\w+\\/[-+.\\w]+(?:;[\\w=]+)*";
          var urlchar = "[A-Za-z0-9-_.!~\\*'();\\/?:@&=+$,%]*";
          var dataurl = "data:(?:" + mediaType + ")?(?:;base64)?," + urlchar;
          regex = "(?:" + regex + ")|(?:^" + dataurl + "$)";
        }
        var PATTERN = new RegExp(regex, "i");
        if (!PATTERN.exec(value)) {
          return message;
        }
      },
      type: v.extend(function(value, originalOptions, attribute, attributes, globalOptions) {
        if (v.isString(originalOptions)) {
          originalOptions = { type: originalOptions };
        }
        if (!v.isDefined(value)) {
          return;
        }
        var options = v.extend({}, this.options, originalOptions);
        var type = options.type;
        if (!v.isDefined(type)) {
          throw new Error("No type was specified");
        }
        var check;
        if (v.isFunction(type)) {
          check = type;
        } else {
          check = this.types[type];
        }
        if (!v.isFunction(check)) {
          throw new Error("validate.validators.type.types." + type + " must be a function.");
        }
        if (!check(value, options, attribute, attributes, globalOptions)) {
          var message = originalOptions.message || this.messages[type] || this.message || options.message || (v.isFunction(type) ? "must be of the correct type" : "must be of type %{type}");
          if (v.isFunction(message)) {
            message = message(value, originalOptions, attribute, attributes, globalOptions);
          }
          return v.format(message, { attribute: v.prettify(attribute), type });
        }
      }, {
        types: {
          object: function(value) {
            return v.isObject(value) && !v.isArray(value);
          },
          array: v.isArray,
          integer: v.isInteger,
          number: v.isNumber,
          string: v.isString,
          date: v.isDate,
          boolean: v.isBoolean
        },
        messages: {}
      })
    };
    validate2.formatters = {
      detailed: function(errors) {
        return errors;
      },
      flat: v.flattenErrorsToArray,
      grouped: function(errors) {
        var attr2;
        errors = v.groupErrorsByAttribute(errors);
        for (attr2 in errors) {
          errors[attr2] = v.flattenErrorsToArray(errors[attr2]);
        }
        return errors;
      },
      constraint: function(errors) {
        var attr2;
        errors = v.groupErrorsByAttribute(errors);
        for (attr2 in errors) {
          errors[attr2] = errors[attr2].map(function(result) {
            return result.validator;
          }).sort();
        }
        return errors;
      }
    };
    validate2.exposeModule(validate2, this, exports3, module3, define);
  }).call(
    commonjsGlobal$1,
    exports2,
    module2,
    null
  );
})(validate$1, validate$1.exports);
const validate = validate$1.exports;
function sortBy(fields) {
  return (a, b) => {
    for (const field of fields) {
      const aval = a[field], bval = b[field];
      if (typeof aval !== void 0) {
        if (typeof bval !== void 0) {
          if (aval < bval) {
            return -1;
          } else if (aval > bval) {
            return 1;
          }
        } else {
          return -1;
        }
      } else if (typeof bval !== void 0) {
        return 1;
      }
    }
    return 0;
  };
}
const DEFAULT_CONFIG = {
  fields: [],
  limit: 100,
  filter: true
};
const GOLDEN_RATIO = 1.618;
function defaultSort(a, b) {
  return a.file.path.localeCompare(b.file.path);
}
const SCHEMA = {
  debug: { type: "boolean" },
  from: { presence: { allowEmpty: false }, type: "string" },
  fields: { type: "array" },
  limit: { type: "number" },
  groupBy: { type: "array" },
  sortBy: { type: "array" },
  filter: { type: "boolean" },
  columns: { type: "number" },
  gutterSize: { type: "string" },
  orientation: { type: "string", inclusion: ["portrait", "landscape"] },
  height: { type: "string" },
  width: { type: "string" },
  size: { type: "string" },
  position: { type: "string" },
  repeat: { type: "string" }
};
class Config {
  constructor(config) {
    __publicField(this, "debug");
    __publicField(this, "from");
    __publicField(this, "fields");
    __publicField(this, "limit");
    __publicField(this, "groupBy");
    __publicField(this, "sortBy");
    __publicField(this, "filter");
    __publicField(this, "columns");
    __publicField(this, "gutterSize");
    __publicField(this, "orientation");
    __publicField(this, "height");
    __publicField(this, "width");
    __publicField(this, "size");
    __publicField(this, "position");
    __publicField(this, "repeat");
    config = _default(DEFAULT_CONFIG, config);
    for (const arrayField of ["fields", "groupBy", "sortBy"]) {
      if (config[arrayField] && !Array.isArray(config[arrayField])) {
        config[arrayField] = [config[arrayField]];
      }
    }
    const errors = validate(config, SCHEMA);
    if (errors) {
      throw new Error(`Invalid config: ${errors}`);
    }
    this.debug = config.debug;
    this.from = config.from.trim().replace(/[\n\r]+/g, " ");
    this.fields = config.fields;
    this.limit = config.limit;
    this.groupBy = config.groupBy;
    this.sortBy = config.sortBy;
    this.filter = config.filter;
    this.height = config.height;
    this.width = config.width;
    this.columns = config.columns;
    this.gutterSize = config.gutterSize;
    this.orientation = config.orientation;
    this.size = config.size;
    this.position = config.position;
    this.repeat = config.repeat;
  }
  static parse(source) {
    const parsed = obsidian.parseYaml(source);
    return new Config(parsed);
  }
  get aspectRatio() {
    if (!this.orientation || this.orientation === "portrait") {
      return GOLDEN_RATIO;
    } else if (this.orientation === "landscape") {
      return 1 / GOLDEN_RATIO;
    } else {
      return null;
    }
  }
  getSortFn() {
    if (Array.isArray(this.sortBy) && this.sortBy.length > 0) {
      return sortBy(this.sortBy);
    } else {
      return defaultSort;
    }
  }
}
function Mime$1() {
  this._types = /* @__PURE__ */ Object.create(null);
  this._extensions = /* @__PURE__ */ Object.create(null);
  for (let i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }
  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}
Mime$1.prototype.define = function(typeMap, force) {
  for (let type in typeMap) {
    let extensions = typeMap[type].map(function(t) {
      return t.toLowerCase();
    });
    type = type.toLowerCase();
    for (let i = 0; i < extensions.length; i++) {
      const ext = extensions[i];
      if (ext[0] === "*") {
        continue;
      }
      if (!force && ext in this._types) {
        throw new Error(
          'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
        );
      }
      this._types[ext] = type;
    }
    if (force || !this._extensions[type]) {
      const ext = extensions[0];
      this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
    }
  }
};
Mime$1.prototype.getType = function(path) {
  path = String(path);
  let last = path.replace(/^.*[/\\]/, "").toLowerCase();
  let ext = last.replace(/^.*\./, "").toLowerCase();
  let hasPath = last.length < path.length;
  let hasDot = ext.length < last.length - 1;
  return (hasDot || !hasPath) && this._types[ext] || null;
};
Mime$1.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};
var Mime_1 = Mime$1;
var standard = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
var other = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
let Mime = Mime_1;
var mime = new Mime(standard, other);
var objectPath$1 = { exports: {} };
(function(module2) {
  (function(root, factory2) {
    {
      module2.exports = factory2();
    }
  })(commonjsGlobal$1, function() {
    var toStr = Object.prototype.toString;
    function hasOwnProperty2(obj, prop) {
      if (obj == null) {
        return false;
      }
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    function isEmpty(value) {
      if (!value) {
        return true;
      }
      if (isArray(value) && value.length === 0) {
        return true;
      } else if (typeof value !== "string") {
        for (var i in value) {
          if (hasOwnProperty2(value, i)) {
            return false;
          }
        }
        return true;
      }
      return false;
    }
    function toString(type) {
      return toStr.call(type);
    }
    function isObject2(obj) {
      return typeof obj === "object" && toString(obj) === "[object Object]";
    }
    var isArray = Array.isArray || function(obj) {
      return toStr.call(obj) === "[object Array]";
    };
    function isBoolean(obj) {
      return typeof obj === "boolean" || toString(obj) === "[object Boolean]";
    }
    function getKey(key) {
      var intKey = parseInt(key);
      if (intKey.toString() === key) {
        return intKey;
      }
      return key;
    }
    function factory2(options) {
      options = options || {};
      var objectPath2 = function(obj) {
        return Object.keys(objectPath2).reduce(function(proxy, prop) {
          if (prop === "create") {
            return proxy;
          }
          if (typeof objectPath2[prop] === "function") {
            proxy[prop] = objectPath2[prop].bind(objectPath2, obj);
          }
          return proxy;
        }, {});
      };
      var hasShallowProperty;
      if (options.includeInheritedProps) {
        hasShallowProperty = function() {
          return true;
        };
      } else {
        hasShallowProperty = function(obj, prop) {
          return typeof prop === "number" && Array.isArray(obj) || hasOwnProperty2(obj, prop);
        };
      }
      function getShallowProperty(obj, prop) {
        if (hasShallowProperty(obj, prop)) {
          return obj[prop];
        }
      }
      var getShallowPropertySafely;
      if (options.includeInheritedProps) {
        getShallowPropertySafely = function(obj, currentPath) {
          if (typeof currentPath !== "string" && typeof currentPath !== "number") {
            currentPath = String(currentPath);
          }
          var currentValue = getShallowProperty(obj, currentPath);
          if (currentPath === "__proto__" || currentPath === "prototype" || currentPath === "constructor" && typeof currentValue === "function") {
            throw new Error("For security reasons, object's magic properties cannot be set");
          }
          return currentValue;
        };
      } else {
        getShallowPropertySafely = function(obj, currentPath) {
          return getShallowProperty(obj, currentPath);
        };
      }
      function set(obj, path, value, doNotReplace) {
        if (typeof path === "number") {
          path = [path];
        }
        if (!path || path.length === 0) {
          return obj;
        }
        if (typeof path === "string") {
          return set(obj, path.split(".").map(getKey), value, doNotReplace);
        }
        var currentPath = path[0];
        var currentValue = getShallowPropertySafely(obj, currentPath);
        if (path.length === 1) {
          if (currentValue === void 0 || !doNotReplace) {
            obj[currentPath] = value;
          }
          return currentValue;
        }
        if (currentValue === void 0) {
          if (typeof path[1] === "number") {
            obj[currentPath] = [];
          } else {
            obj[currentPath] = {};
          }
        }
        return set(obj[currentPath], path.slice(1), value, doNotReplace);
      }
      objectPath2.has = function(obj, path) {
        if (typeof path === "number") {
          path = [path];
        } else if (typeof path === "string") {
          path = path.split(".");
        }
        if (!path || path.length === 0) {
          return !!obj;
        }
        for (var i = 0; i < path.length; i++) {
          var j = getKey(path[i]);
          if (typeof j === "number" && isArray(obj) && j < obj.length || (options.includeInheritedProps ? j in Object(obj) : hasOwnProperty2(obj, j))) {
            obj = obj[j];
          } else {
            return false;
          }
        }
        return true;
      };
      objectPath2.ensureExists = function(obj, path, value) {
        return set(obj, path, value, true);
      };
      objectPath2.set = function(obj, path, value, doNotReplace) {
        return set(obj, path, value, doNotReplace);
      };
      objectPath2.insert = function(obj, path, value, at) {
        var arr = objectPath2.get(obj, path);
        at = ~~at;
        if (!isArray(arr)) {
          arr = [];
          objectPath2.set(obj, path, arr);
        }
        arr.splice(at, 0, value);
      };
      objectPath2.empty = function(obj, path) {
        if (isEmpty(path)) {
          return void 0;
        }
        if (obj == null) {
          return void 0;
        }
        var value, i;
        if (!(value = objectPath2.get(obj, path))) {
          return void 0;
        }
        if (typeof value === "string") {
          return objectPath2.set(obj, path, "");
        } else if (isBoolean(value)) {
          return objectPath2.set(obj, path, false);
        } else if (typeof value === "number") {
          return objectPath2.set(obj, path, 0);
        } else if (isArray(value)) {
          value.length = 0;
        } else if (isObject2(value)) {
          for (i in value) {
            if (hasShallowProperty(value, i)) {
              delete value[i];
            }
          }
        } else {
          return objectPath2.set(obj, path, null);
        }
      };
      objectPath2.push = function(obj, path) {
        var arr = objectPath2.get(obj, path);
        if (!isArray(arr)) {
          arr = [];
          objectPath2.set(obj, path, arr);
        }
        arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
      };
      objectPath2.coalesce = function(obj, paths, defaultValue) {
        var value;
        for (var i = 0, len = paths.length; i < len; i++) {
          if ((value = objectPath2.get(obj, paths[i])) !== void 0) {
            return value;
          }
        }
        return defaultValue;
      };
      objectPath2.get = function(obj, path, defaultValue) {
        if (typeof path === "number") {
          path = [path];
        }
        if (!path || path.length === 0) {
          return obj;
        }
        if (obj == null) {
          return defaultValue;
        }
        if (typeof path === "string") {
          return objectPath2.get(obj, path.split("."), defaultValue);
        }
        var currentPath = getKey(path[0]);
        var nextObj = getShallowPropertySafely(obj, currentPath);
        if (nextObj === void 0) {
          return defaultValue;
        }
        if (path.length === 1) {
          return nextObj;
        }
        return objectPath2.get(obj[currentPath], path.slice(1), defaultValue);
      };
      objectPath2.del = function del(obj, path) {
        if (typeof path === "number") {
          path = [path];
        }
        if (obj == null) {
          return obj;
        }
        if (isEmpty(path)) {
          return obj;
        }
        if (typeof path === "string") {
          return objectPath2.del(obj, path.split("."));
        }
        var currentPath = getKey(path[0]);
        getShallowPropertySafely(obj, currentPath);
        if (!hasShallowProperty(obj, currentPath)) {
          return obj;
        }
        if (path.length === 1) {
          if (isArray(obj)) {
            obj.splice(currentPath, 1);
          } else {
            delete obj[currentPath];
          }
        } else {
          return objectPath2.del(obj[currentPath], path.slice(1));
        }
        return obj;
      };
      return objectPath2;
    }
    var mod = factory2();
    mod.create = factory2;
    mod.withInheritedProps = factory2({ includeInheritedProps: true });
    return mod;
  });
})(objectPath$1);
const objectPath = objectPath$1.exports;
function createError(message) {
  var err = new Error(message);
  err.source = "ulid";
  return err;
}
var ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
var ENCODING_LEN = ENCODING.length;
var TIME_MAX = Math.pow(2, 48) - 1;
var TIME_LEN = 10;
var RANDOM_LEN = 16;
function randomChar(prng) {
  var rand = Math.floor(prng() * ENCODING_LEN);
  if (rand === ENCODING_LEN) {
    rand = ENCODING_LEN - 1;
  }
  return ENCODING.charAt(rand);
}
function encodeTime(now3, len) {
  if (isNaN(now3)) {
    throw new Error(now3 + " must be a number");
  }
  if (now3 > TIME_MAX) {
    throw createError("cannot encode time greater than " + TIME_MAX);
  }
  if (now3 < 0) {
    throw createError("time must be positive");
  }
  if (Number.isInteger(now3) === false) {
    throw createError("time must be an integer");
  }
  var mod = void 0;
  var str = "";
  for (; len > 0; len--) {
    mod = now3 % ENCODING_LEN;
    str = ENCODING.charAt(mod) + str;
    now3 = (now3 - mod) / ENCODING_LEN;
  }
  return str;
}
function encodeRandom(len, prng) {
  var str = "";
  for (; len > 0; len--) {
    str = randomChar(prng) + str;
  }
  return str;
}
function detectPrng() {
  var allowInsecure = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
  var root = arguments[1];
  if (!root) {
    root = typeof window !== "undefined" ? window : null;
  }
  var browserCrypto = root && (root.crypto || root.msCrypto);
  if (browserCrypto) {
    return function() {
      var buffer = new Uint8Array(1);
      browserCrypto.getRandomValues(buffer);
      return buffer[0] / 255;
    };
  } else {
    try {
      var nodeCrypto = require("crypto");
      return function() {
        return nodeCrypto.randomBytes(1).readUInt8() / 255;
      };
    } catch (e) {
    }
  }
  if (allowInsecure) {
    try {
      console.error("secure crypto unusable, falling back to insecure Math.random()!");
    } catch (e) {
    }
    return function() {
      return Math.random();
    };
  }
  throw createError("secure crypto unusable, insecure Math.random not allowed");
}
function factory(currPrng) {
  if (!currPrng) {
    currPrng = detectPrng();
  }
  return function ulid2(seedTime) {
    if (isNaN(seedTime)) {
      seedTime = Date.now();
    }
    return encodeTime(seedTime, TIME_LEN) + encodeRandom(RANDOM_LEN, currPrng);
  };
}
var ulid = factory();
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function append(target, node) {
  target.appendChild(node);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
function set_style(node, key, value, important) {
  if (value === null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
let crossorigin;
function is_crossorigin() {
  if (crossorigin === void 0) {
    crossorigin = false;
    try {
      if (typeof window !== "undefined" && window.parent) {
        void window.parent.document;
      }
    } catch (error) {
      crossorigin = true;
    }
  }
  return crossorigin;
}
function add_resize_listener(node, fn) {
  const computed_style = getComputedStyle(node);
  if (computed_style.position === "static") {
    node.style.position = "relative";
  }
  const iframe = element("iframe");
  iframe.setAttribute("style", "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;");
  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;
  const crossorigin2 = is_crossorigin();
  let unsubscribe;
  if (crossorigin2) {
    iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>";
    unsubscribe = listen(window, "message", (event) => {
      if (event.source === iframe.contentWindow)
        fn();
    });
  } else {
    iframe.src = "about:blank";
    iframe.onload = () => {
      unsubscribe = listen(iframe.contentWindow, "resize", fn);
    };
  }
  append(node, iframe);
  return () => {
    if (crossorigin2) {
      unsubscribe();
    } else if (unsubscribe && iframe.contentWindow) {
      unsubscribe();
    }
    detach(iframe);
  };
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  const saved_component = current_component;
  do {
    while (flushidx < dirty_components.length) {
      const component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
}
function create_fragment$5(ctx) {
  let div;
  let raw_value = ctx[0].rendered + "";
  let div_data_page_gallery_field_name_value;
  return {
    c() {
      div = element("div");
      attr(div, "class", "page-gallery__field");
      attr(div, "data-page-gallery-field-name", div_data_page_gallery_field_name_value = ctx[0].name);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p(ctx2, [dirty]) {
      if (dirty & 1 && raw_value !== (raw_value = ctx2[0].rendered + ""))
        div.innerHTML = raw_value;
      if (dirty & 1 && div_data_page_gallery_field_name_value !== (div_data_page_gallery_field_name_value = ctx2[0].name)) {
        attr(div, "data-page-gallery-field-name", div_data_page_gallery_field_name_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let { field } = $$props;
  $$self.$$set = ($$props2) => {
    if ("field" in $$props2)
      $$invalidate(0, field = $$props2.field);
  };
  return [field];
}
class PageGalleryField extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, { field: 0 });
  }
}
function create_fragment$4(ctx) {
  let a;
  let t_value = ctx[0].filename + "";
  let t;
  let a_data_href_value;
  let a_href_value;
  return {
    c() {
      a = element("a");
      t = text(t_value);
      attr(a, "class", "page-gallery__fallback internal-link");
      attr(a, "data-href", a_data_href_value = ctx[0].href);
      attr(a, "href", a_href_value = ctx[0].href);
      attr(a, "rel", "noopener");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, t);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1 && t_value !== (t_value = ctx2[0].filename + ""))
        set_data(t, t_value);
      if (dirty & 1 && a_data_href_value !== (a_data_href_value = ctx2[0].href)) {
        attr(a, "data-href", a_data_href_value);
      }
      if (dirty & 1 && a_href_value !== (a_href_value = ctx2[0].href)) {
        attr(a, "href", a_href_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(a);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { tile } = $$props;
  $$self.$$set = ($$props2) => {
    if ("tile" in $$props2)
      $$invalidate(0, tile = $$props2.tile);
  };
  return [tile];
}
class PageGalleryTileFallback extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { tile: 0 });
  }
}
function create_fragment$3(ctx) {
  let a;
  let span;
  let t0;
  let t1_value = ctx[0].filename + "";
  let t1;
  let a_data_href_value;
  let a_href_value;
  return {
    c() {
      a = element("a");
      span = element("span");
      t0 = text("Link to ");
      t1 = text(t1_value);
      attr(span, "class", "page-gallery__hidden");
      attr(a, "class", "page-gallery__image internal-link");
      attr(a, "data-href", a_data_href_value = ctx[0].href);
      attr(a, "href", a_href_value = ctx[0].href);
      attr(a, "rel", "noopener");
      set_style(a, "background-image", `url('${ctx[0].imageUrl}')`);
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, span);
      append(span, t0);
      append(span, t1);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1 && t1_value !== (t1_value = ctx2[0].filename + ""))
        set_data(t1, t1_value);
      if (dirty & 1 && a_data_href_value !== (a_data_href_value = ctx2[0].href)) {
        attr(a, "data-href", a_data_href_value);
      }
      if (dirty & 1 && a_href_value !== (a_href_value = ctx2[0].href)) {
        attr(a, "href", a_href_value);
      }
      if (dirty & 1) {
        set_style(a, "background-image", `url('${ctx2[0].imageUrl}')`);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(a);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { tile } = $$props;
  $$self.$$set = ($$props2) => {
    if ("tile" in $$props2)
      $$invalidate(0, tile = $$props2.tile);
  };
  return [tile];
}
class PageGalleryTileImage extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { tile: 0 });
  }
}
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[1] = list[i];
  return child_ctx;
}
function create_else_block(ctx) {
  let pagegallerytilefallback;
  let current;
  pagegallerytilefallback = new PageGalleryTileFallback({ props: { tile: ctx[0] } });
  return {
    c() {
      create_component(pagegallerytilefallback.$$.fragment);
    },
    m(target, anchor) {
      mount_component(pagegallerytilefallback, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const pagegallerytilefallback_changes = {};
      if (dirty & 1)
        pagegallerytilefallback_changes.tile = ctx2[0];
      pagegallerytilefallback.$set(pagegallerytilefallback_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(pagegallerytilefallback.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(pagegallerytilefallback.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(pagegallerytilefallback, detaching);
    }
  };
}
function create_if_block_1$1(ctx) {
  let pagegallerytileimage;
  let current;
  pagegallerytileimage = new PageGalleryTileImage({ props: { tile: ctx[0] } });
  return {
    c() {
      create_component(pagegallerytileimage.$$.fragment);
    },
    m(target, anchor) {
      mount_component(pagegallerytileimage, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const pagegallerytileimage_changes = {};
      if (dirty & 1)
        pagegallerytileimage_changes.tile = ctx2[0];
      pagegallerytileimage.$set(pagegallerytileimage_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(pagegallerytileimage.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(pagegallerytileimage.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(pagegallerytileimage, detaching);
    }
  };
}
function create_if_block$1(ctx) {
  let div;
  let current;
  let each_value = ctx[0].fields;
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "page-gallery__fields");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & 1) {
        each_value = ctx2[0].fields;
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block$1(ctx) {
  let pagegalleryfield;
  let current;
  pagegalleryfield = new PageGalleryField({ props: { field: ctx[1] } });
  return {
    c() {
      create_component(pagegalleryfield.$$.fragment);
    },
    m(target, anchor) {
      mount_component(pagegalleryfield, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const pagegalleryfield_changes = {};
      if (dirty & 1)
        pagegalleryfield_changes.field = ctx2[1];
      pagegalleryfield.$set(pagegalleryfield_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(pagegalleryfield.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(pagegalleryfield.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(pagegalleryfield, detaching);
    }
  };
}
function create_fragment$2(ctx) {
  let div;
  let current_block_type_index;
  let if_block0;
  let t;
  let current;
  const if_block_creators = [create_if_block_1$1, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[0].imageUrl)
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block1 = ctx[0].fields.length > 0 && create_if_block$1(ctx);
  return {
    c() {
      div = element("div");
      if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      attr(div, "class", "page-gallery__tile");
      set_style(div, "--image-size", ctx[0].size || null);
      set_style(div, "--image-position", ctx[0].position || null);
      set_style(div, "--image-repeat", ctx[0].repeat || null);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      append(div, t);
      if (if_block1)
        if_block1.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block0 = if_blocks[current_block_type_index];
        if (!if_block0) {
          if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block0.c();
        } else {
          if_block0.p(ctx2, dirty);
        }
        transition_in(if_block0, 1);
        if_block0.m(div, t);
      }
      if (ctx2[0].fields.length > 0) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$1(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (dirty & 1) {
        set_style(div, "--image-size", ctx2[0].size || null);
      }
      if (dirty & 1) {
        set_style(div, "--image-position", ctx2[0].position || null);
      }
      if (dirty & 1) {
        set_style(div, "--image-repeat", ctx2[0].repeat || null);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if_blocks[current_block_type_index].d();
      if (if_block1)
        if_block1.d();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { tile } = $$props;
  $$self.$$set = ($$props2) => {
    if ("tile" in $$props2)
      $$invalidate(0, tile = $$props2.tile);
  };
  return [tile];
}
class PageGalleryTile extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { tile: 0 });
  }
}
function create_fragment$1(ctx) {
  let div;
  let label;
  let t0;
  let t1;
  let input;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      label = element("label");
      t0 = text("\u{1F50E}");
      t1 = space();
      input = element("input");
      attr(label, "for", ctx[2]);
      attr(input, "id", ctx[2]);
      attr(input, "type", "text");
      attr(div, "class", "page-gallery__filter");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, label);
      append(label, t0);
      append(div, t1);
      append(div, input);
      set_input_value(input, ctx[1]);
      if (!mounted) {
        dispose = listen(input, "input", ctx[3]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 2 && input.value !== ctx2[1]) {
        set_input_value(input, ctx2[1]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let $query, $$unsubscribe_query = noop, $$subscribe_query = () => ($$unsubscribe_query(), $$unsubscribe_query = subscribe(query, ($$value) => $$invalidate(1, $query = $$value)), query);
  $$self.$$.on_destroy.push(() => $$unsubscribe_query());
  const id = ulid();
  let { query } = $$props;
  $$subscribe_query();
  function input_input_handler() {
    $query = this.value;
    query.set($query);
  }
  $$self.$$set = ($$props2) => {
    if ("query" in $$props2)
      $$subscribe_query($$invalidate(0, query = $$props2.query));
  };
  return [query, $query, id, input_input_handler];
}
class PageGalleryFilter extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { query: 0 });
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  return child_ctx;
}
function create_if_block_1(ctx) {
  let pre;
  let t_value = JSON.stringify(ctx[0], null, 2) + "";
  let t;
  return {
    c() {
      pre = element("pre");
      t = text(t_value);
      attr(pre, "class", "page-gallery__debug");
    },
    m(target, anchor) {
      insert(target, pre, anchor);
      append(pre, t);
    },
    p(ctx2, dirty) {
      if (dirty & 1 && t_value !== (t_value = JSON.stringify(ctx2[0], null, 2) + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(pre);
    }
  };
}
function create_if_block(ctx) {
  let pagegalleryfilter;
  let current;
  pagegalleryfilter = new PageGalleryFilter({ props: { query: ctx[1] } });
  return {
    c() {
      create_component(pagegalleryfilter.$$.fragment);
    },
    m(target, anchor) {
      mount_component(pagegalleryfilter, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const pagegalleryfilter_changes = {};
      if (dirty & 2)
        pagegalleryfilter_changes.query = ctx2[1];
      pagegalleryfilter.$set(pagegalleryfilter_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(pagegalleryfilter.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(pagegalleryfilter.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(pagegalleryfilter, detaching);
    }
  };
}
function create_each_block(ctx) {
  let pagegallerytile;
  let current;
  pagegallerytile = new PageGalleryTile({ props: { tile: ctx[5] } });
  return {
    c() {
      create_component(pagegallerytile.$$.fragment);
    },
    m(target, anchor) {
      mount_component(pagegallerytile, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const pagegallerytile_changes = {};
      if (dirty & 4)
        pagegallerytile_changes.tile = ctx2[5];
      pagegallerytile.$set(pagegallerytile_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(pagegallerytile.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(pagegallerytile.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(pagegallerytile, detaching);
    }
  };
}
function create_fragment(ctx) {
  let div1;
  let t0;
  let t1;
  let div0;
  let div1_resize_listener;
  let current;
  let if_block0 = ctx[0].debug && create_if_block_1(ctx);
  let if_block1 = ctx[0].filter && create_if_block(ctx);
  let each_value = ctx[2];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      div1 = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      div0 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div0, "class", "page-gallery__tiles");
      attr(div1, "class", "page-gallery");
      add_render_callback(() => ctx[4].call(div1));
      set_style(div1, "--page-gallery-width", `${ctx[3]}px`);
      set_style(div1, "--custom-columns", ctx[0].columns || null);
      set_style(div1, "--custom-gutter-size", ctx[0].gutterSize || null);
      set_style(div1, "--custom-aspect-ratio", ctx[0].aspectRatio || null);
      set_style(div1, "--custom-image-height", ctx[0].height || null);
      set_style(div1, "--custom-image-width", ctx[0].width || null);
      set_style(div1, "--custom-image-size", ctx[0].size || null);
      set_style(div1, "--custom-image-position", ctx[0].position || null);
      set_style(div1, "--custom-image-repeat", ctx[0].repeat || null);
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      if (if_block0)
        if_block0.m(div1, null);
      append(div1, t0);
      if (if_block1)
        if_block1.m(div1, null);
      append(div1, t1);
      append(div1, div0);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div0, null);
      }
      div1_resize_listener = add_resize_listener(div1, ctx[4].bind(div1));
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[0].debug) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_1(ctx2);
          if_block0.c();
          if_block0.m(div1, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (ctx2[0].filter) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div1, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (dirty & 4) {
        each_value = ctx2[2];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div0, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (dirty & 8) {
        set_style(div1, "--page-gallery-width", `${ctx2[3]}px`);
      }
      if (dirty & 1) {
        set_style(div1, "--custom-columns", ctx2[0].columns || null);
      }
      if (dirty & 1) {
        set_style(div1, "--custom-gutter-size", ctx2[0].gutterSize || null);
      }
      if (dirty & 1) {
        set_style(div1, "--custom-aspect-ratio", ctx2[0].aspectRatio || null);
      }
      if (dirty & 1) {
        set_style(div1, "--custom-image-height", ctx2[0].height || null);
      }
      if (dirty & 1) {
        set_style(div1, "--custom-image-width", ctx2[0].width || null);
      }
      if (dirty & 1) {
        set_style(div1, "--custom-image-size", ctx2[0].size || null);
      }
      if (dirty & 1) {
        set_style(div1, "--custom-image-position", ctx2[0].position || null);
      }
      if (dirty & 1) {
        set_style(div1, "--custom-image-repeat", ctx2[0].repeat || null);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block1);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      transition_out(if_block1);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      destroy_each(each_blocks, detaching);
      div1_resize_listener();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { config } = $$props;
  let { query } = $$props;
  let { tiles = [] } = $$props;
  let clientWidth;
  function div1_elementresize_handler() {
    clientWidth = this.clientWidth;
    $$invalidate(3, clientWidth);
  }
  $$self.$$set = ($$props2) => {
    if ("config" in $$props2)
      $$invalidate(0, config = $$props2.config);
    if ("query" in $$props2)
      $$invalidate(1, query = $$props2.query);
    if ("tiles" in $$props2)
      $$invalidate(2, tiles = $$props2.tiles);
  };
  return [config, query, tiles, clientWidth, div1_elementresize_handler];
}
class PageGallery extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { config: 0, query: 1, tiles: 2 });
  }
}
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}
const DEBOUNCE_RENDER_TIME = 100;
const IMG_MIME_TYPES = [
  "image/jpeg",
  "image/png"
];
class PageGalleryRenderChild extends obsidian.MarkdownRenderChild {
  constructor(plugin, config, api, el) {
    super(el);
    __publicField(this, "id", ulid());
    __publicField(this, "plugin");
    __publicField(this, "config");
    __publicField(this, "api");
    __publicField(this, "gallery");
    __publicField(this, "filter");
    __publicField(this, "updateTiles", obsidian.debounce(async () => {
      try {
        const pages = await this.getMatchingPages();
        const tiles = await Promise.all(pages.map((p) => this.getTileInfo(p)));
        this.gallery.$set({ tiles });
      } catch (err) {
        console.error(err);
      }
    }, DEBOUNCE_RENDER_TIME, true));
    this.plugin = plugin;
    this.config = config;
    this.api = api;
    this.filter = {
      query: writable(""),
      parsed: []
    };
  }
  async onload() {
    const tiles = [];
    this.gallery = new PageGallery({
      target: this.containerEl,
      props: {
        config: this.config,
        query: this.filter.query,
        tiles
      }
    });
    this.filter.query.subscribe((q) => {
      this.filter.parsed = q.split(/\s+/).map((p) => p.toLowerCase());
      this.updateTiles();
    });
    this.updateTiles();
    this.registerEvent(this.plugin.app.metadataCache.on("dataview:metadata-change", async () => {
      await this.updateTiles();
    }));
    this.registerEvent(this.plugin.app.metadataCache.on("dataview:index-ready", async () => {
      await this.updateTiles();
    }));
  }
  async getMatchingPages() {
    const pages = Array.from(this.config.from ? this.api.pages(this.config.from) : this.api.pages());
    pages.sort(this.config.getSortFn());
    const filtered = pages.filter((p) => this.matchFilter(p));
    return filtered.slice(0, this.config.limit);
  }
  matchFilter(page) {
    for (const pattern of this.filter.parsed) {
      if (pattern.startsWith("#")) {
        for (const tag of page.file.tags) {
          if (tag.toLowerCase().startsWith(pattern)) {
            return true;
          }
        }
        return false;
      } else {
        if (!page.file.path.toLowerCase().contains(pattern)) {
          return false;
        }
      }
    }
    return true;
  }
  async getTileInfo(page) {
    const tile = {
      href: page.file.path,
      imageUrl: await this.getFirstImageSrc(page),
      filename: page.file.name,
      path: page.file.path,
      fields: [],
      size: objectPath.get(page, "pageGallery.size"),
      position: objectPath.get(page, "pageGallery.position"),
      repeat: objectPath.get(page, "pageGallery.repeat")
    };
    if (this.config.fields) {
      tile.fields = await Promise.all(
        this.config.fields.map((f) => ({
          name: f,
          value: objectPath.get(page, f)
        })).filter(({ value }) => typeof value !== void 0).filter(({ value }) => !Array.isArray(value) || value.length).map(async (f) => ({
          ...f,
          rendered: await this.renderFieldValue(tile, f)
        }))
      );
    } else {
      tile.fields = [];
    }
    return tile;
  }
  async getFirstImageSrc(page) {
    try {
      const file = this.plugin.app.vault.getAbstractFileByPath(page.file.path);
      if (!(file instanceof obsidian.TFile)) {
        return null;
      }
      const source = await this.plugin.app.vault.cachedRead(file);
      const rendered = document.createElement("div");
      obsidian.MarkdownPreviewView.renderMarkdown(source, rendered, page.file.path, this);
      for (const el of rendered.findAll(".internal-embed[src], img[src]")) {
        const src = el.getAttribute("src");
        if (!src) {
          continue;
        }
        if (el.tagName === "IMG" && src.match(/^https?:\/\//)) {
          return src;
        }
        const ext = src.split(".").pop();
        if (!ext) {
          continue;
        }
        const mimeType = mime.getType(ext);
        if (!mimeType || !IMG_MIME_TYPES.contains(mimeType)) {
          continue;
        }
        const file2 = this.plugin.app.vault.getFiles().find((f) => f.path.endsWith(src));
        if (!file2) {
          continue;
        }
        return this.plugin.app.vault.getResourcePath(file2);
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async renderFieldValue(tile, field) {
    if (field.name === "file.name") {
      return field.value;
    }
    const temp = document.createElement("div");
    await this.api.renderValue(field.value, temp, this, tile.path, true);
    return temp.innerHTML;
  }
}
class PageGalleryPlugin extends obsidian.Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "api");
  }
  async onload() {
    const api = getAPI_1();
    if (api) {
      this.api = api;
    } else {
      this.showMissingDataviewNotice();
      return;
    }
    this.registerMarkdownCodeBlockProcessor("page-gallery", (source, el, ctx) => this.handlePageGalleryBlock(source, el, ctx));
    console.info(`PageGallery (${this.manifest.version}) plugin loaded`);
  }
  showMissingDataviewNotice() {
    const fragment = document.createDocumentFragment();
    fragment.appendText("Failed to load the Dataview API! Is the ");
    const a = document.createElement("a");
    a.setAttribute("href", "https://github.com/blacksmithgu/obsidian-dataview");
    a.appendText("obsidian-dataview");
    fragment.appendChild(a);
    fragment.appendText(" plugin enabled?");
    new obsidian.Notice(fragment);
  }
  async handlePageGalleryBlock(source, el, ctx) {
    try {
      const config = Config.parse(source);
      const child = new PageGalleryRenderChild(this, config, this.api, el);
      ctx.addChild(child);
    } catch (err) {
      const pre = document.createElement("pre");
      pre.append(err.message);
      if (err.stack) {
        pre.append(err.stack);
      }
      el.append(pre);
    }
  }
}
module.exports = PageGalleryPlugin;