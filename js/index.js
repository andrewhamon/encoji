"use strict";

require('babel/polyfill');

function makeEncoding(decode) {
  var base64Runes = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
  var encojiRunes = Array.from("😀😬😁😂😃😄😅😆😇😉😊😋😌😍😘😗😙😚😜😝😛😎😏💩👻😺😸😹😻🐶🐱🐭🐹🐰🐻🐼🐨🐯🐮🐷🐽🐸🐙🐵🙈🙉🙊🐒🐔🐧🐦🐤🐣🐥🐺🐗🐴🐝🐛🐌🐞🐜🐘🐬🐳");

  if (base64Runes.length !== encojiRunes.length) {
    throw new Error("Charsets must be the same length");
  }

  var encoding = {};

  var from, to;

  if (decode) {
    from = encojiRunes;
    to = base64Runes;
  } else {
    from = base64Runes;
    to = encojiRunes;
  }

  for (var i = 0; i < from.length; i++) {
    encoding[from[i]] = to[i];
  }

  return encoding;
}

function makeMapper(encoding) {
  return function (codepoint) {
    return encoding[codepoint] || "";
  };
}

function encode(raw) {
  raw = new Buffer(raw);
  raw = raw.toString("base64");
  return Array.from(raw, makeMapper(makeEncoding(false))).join("");
}

function decode(raw) {
  raw = Array.from(raw, makeMapper(makeEncoding(true))).join("");
  raw = new Buffer(raw, "base64");
  return raw.toString();
}

module.exports = { encode: encode, decode: decode };

