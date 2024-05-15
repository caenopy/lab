"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/node-gyp-build/node-gyp-build.js
var require_node_gyp_build = __commonJS({
  "node_modules/node-gyp-build/node-gyp-build.js"(exports, module2) {
    var fs2 = require("fs");
    var path2 = require("path");
    var os = require("os");
    var runtimeRequire = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
    var vars = process.config && process.config.variables || {};
    var prebuildsOnly = !!process.env.PREBUILDS_ONLY;
    var abi = process.versions.modules;
    var runtime = isElectron() ? "electron" : isNwjs() ? "node-webkit" : "node";
    var arch = process.env.npm_config_arch || os.arch();
    var platform = process.env.npm_config_platform || os.platform();
    var libc = process.env.LIBC || (isAlpine(platform) ? "musl" : "glibc");
    var armv = process.env.ARM_VERSION || (arch === "arm64" ? "8" : vars.arm_version) || "";
    var uv = (process.versions.uv || "").split(".")[0];
    module2.exports = load;
    function load(dir) {
      return runtimeRequire(load.resolve(dir));
    }
    load.resolve = load.path = function(dir) {
      dir = path2.resolve(dir || ".");
      try {
        var name = runtimeRequire(path2.join(dir, "package.json")).name.toUpperCase().replace(/-/g, "_");
        if (process.env[name + "_PREBUILD"])
          dir = process.env[name + "_PREBUILD"];
      } catch (err) {
      }
      if (!prebuildsOnly) {
        var release = getFirst(path2.join(dir, "build/Release"), matchBuild);
        if (release)
          return release;
        var debug = getFirst(path2.join(dir, "build/Debug"), matchBuild);
        if (debug)
          return debug;
      }
      var prebuild = resolve(dir);
      if (prebuild)
        return prebuild;
      var nearby = resolve(path2.dirname(process.execPath));
      if (nearby)
        return nearby;
      var target = [
        "platform=" + platform,
        "arch=" + arch,
        "runtime=" + runtime,
        "abi=" + abi,
        "uv=" + uv,
        armv ? "armv=" + armv : "",
        "libc=" + libc,
        "node=" + process.versions.node,
        process.versions.electron ? "electron=" + process.versions.electron : "",
        typeof __webpack_require__ === "function" ? "webpack=true" : ""
        // eslint-disable-line
      ].filter(Boolean).join(" ");
      throw new Error("No native build was found for " + target + "\n    loaded from: " + dir + "\n");
      function resolve(dir2) {
        var tuples = readdirSync(path2.join(dir2, "prebuilds")).map(parseTuple);
        var tuple = tuples.filter(matchTuple(platform, arch)).sort(compareTuples)[0];
        if (!tuple)
          return;
        var prebuilds = path2.join(dir2, "prebuilds", tuple.name);
        var parsed = readdirSync(prebuilds).map(parseTags);
        var candidates = parsed.filter(matchTags(runtime, abi));
        var winner = candidates.sort(compareTags(runtime))[0];
        if (winner)
          return path2.join(prebuilds, winner.file);
      }
    };
    function readdirSync(dir) {
      try {
        return fs2.readdirSync(dir);
      } catch (err) {
        return [];
      }
    }
    function getFirst(dir, filter) {
      var files = readdirSync(dir).filter(filter);
      return files[0] && path2.join(dir, files[0]);
    }
    function matchBuild(name) {
      return /\.node$/.test(name);
    }
    function parseTuple(name) {
      var arr = name.split("-");
      if (arr.length !== 2)
        return;
      var platform2 = arr[0];
      var architectures = arr[1].split("+");
      if (!platform2)
        return;
      if (!architectures.length)
        return;
      if (!architectures.every(Boolean))
        return;
      return { name, platform: platform2, architectures };
    }
    function matchTuple(platform2, arch2) {
      return function(tuple) {
        if (tuple == null)
          return false;
        if (tuple.platform !== platform2)
          return false;
        return tuple.architectures.includes(arch2);
      };
    }
    function compareTuples(a, b) {
      return a.architectures.length - b.architectures.length;
    }
    function parseTags(file) {
      var arr = file.split(".");
      var extension2 = arr.pop();
      var tags = { file, specificity: 0 };
      if (extension2 !== "node")
        return;
      for (var i = 0; i < arr.length; i++) {
        var tag = arr[i];
        if (tag === "node" || tag === "electron" || tag === "node-webkit") {
          tags.runtime = tag;
        } else if (tag === "napi") {
          tags.napi = true;
        } else if (tag.slice(0, 3) === "abi") {
          tags.abi = tag.slice(3);
        } else if (tag.slice(0, 2) === "uv") {
          tags.uv = tag.slice(2);
        } else if (tag.slice(0, 4) === "armv") {
          tags.armv = tag.slice(4);
        } else if (tag === "glibc" || tag === "musl") {
          tags.libc = tag;
        } else {
          continue;
        }
        tags.specificity++;
      }
      return tags;
    }
    function matchTags(runtime2, abi2) {
      return function(tags) {
        if (tags == null)
          return false;
        if (tags.runtime && tags.runtime !== runtime2 && !runtimeAgnostic(tags))
          return false;
        if (tags.abi && tags.abi !== abi2 && !tags.napi)
          return false;
        if (tags.uv && tags.uv !== uv)
          return false;
        if (tags.armv && tags.armv !== armv)
          return false;
        if (tags.libc && tags.libc !== libc)
          return false;
        return true;
      };
    }
    function runtimeAgnostic(tags) {
      return tags.runtime === "node" && tags.napi;
    }
    function compareTags(runtime2) {
      return function(a, b) {
        if (a.runtime !== b.runtime) {
          return a.runtime === runtime2 ? -1 : 1;
        } else if (a.abi !== b.abi) {
          return a.abi ? -1 : 1;
        } else if (a.specificity !== b.specificity) {
          return a.specificity > b.specificity ? -1 : 1;
        } else {
          return 0;
        }
      };
    }
    function isNwjs() {
      return !!(process.versions && process.versions.nw);
    }
    function isElectron() {
      if (process.versions && process.versions.electron)
        return true;
      if (process.env.ELECTRON_RUN_AS_NODE)
        return true;
      return typeof window !== "undefined" && window.process && window.process.type === "renderer";
    }
    function isAlpine(platform2) {
      return platform2 === "linux" && fs2.existsSync("/etc/alpine-release");
    }
    load.parseTags = parseTags;
    load.matchTags = matchTags;
    load.compareTags = compareTags;
    load.parseTuple = parseTuple;
    load.matchTuple = matchTuple;
    load.compareTuples = compareTuples;
  }
});

// node_modules/node-gyp-build/index.js
var require_node_gyp_build2 = __commonJS({
  "node_modules/node-gyp-build/index.js"(exports, module2) {
    var runtimeRequire = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
    if (typeof runtimeRequire.addon === "function") {
      module2.exports = runtimeRequire.addon.bind(runtimeRequire);
    } else {
      module2.exports = require_node_gyp_build();
    }
  }
});

// node_modules/bufferutil/fallback.js
var require_fallback = __commonJS({
  "node_modules/bufferutil/fallback.js"(exports, module2) {
    "use strict";
    var mask2 = (source, mask3, output, offset, length) => {
      for (var i = 0; i < length; i++) {
        output[offset + i] = source[i] ^ mask3[i & 3];
      }
    };
    var unmask2 = (buffer, mask3) => {
      const length = buffer.length;
      for (var i = 0; i < length; i++) {
        buffer[i] ^= mask3[i & 3];
      }
    };
    module2.exports = { mask: mask2, unmask: unmask2 };
  }
});

// node_modules/bufferutil/index.js
var require_bufferutil = __commonJS({
  "node_modules/bufferutil/index.js"(exports, module2) {
    "use strict";
    try {
      module2.exports = require_node_gyp_build2()(__dirname);
    } catch (e) {
      module2.exports = require_fallback();
    }
  }
});

// node_modules/@gradio/client/dist/wrapper-6f348d45.js
var wrapper_6f348d45_exports = {};
__export(wrapper_6f348d45_exports, {
  Receiver: () => receiver$1,
  Sender: () => sender$1,
  WebSocket: () => WebSocket$2,
  WebSocketServer: () => websocketServer$1,
  createWebSocketStream: () => stream$1,
  default: () => WebSocket$2
});
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        var args2 = [null];
        args2.push.apply(args2, arguments);
        var Ctor = Function.bind.apply(f, args2);
        return new Ctor();
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
function emitClose$1(stream2) {
  stream2.emit("close");
}
function duplexOnEnd() {
  if (!this.destroyed && this._writableState.finished) {
    this.destroy();
  }
}
function duplexOnError(err) {
  this.removeListener("error", duplexOnError);
  this.destroy();
  if (this.listenerCount("error") === 0) {
    this.emit("error", err);
  }
}
function createWebSocketStream(ws, options) {
  let terminateOnDestroy = true;
  const duplex = new Duplex({
    ...options,
    autoDestroy: false,
    emitClose: false,
    objectMode: false,
    writableObjectMode: false
  });
  ws.on("message", function message(msg, isBinary) {
    const data = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;
    if (!duplex.push(data))
      ws.pause();
  });
  ws.once("error", function error2(err) {
    if (duplex.destroyed)
      return;
    terminateOnDestroy = false;
    duplex.destroy(err);
  });
  ws.once("close", function close() {
    if (duplex.destroyed)
      return;
    duplex.push(null);
  });
  duplex._destroy = function(err, callback) {
    if (ws.readyState === ws.CLOSED) {
      callback(err);
      process.nextTick(emitClose$1, duplex);
      return;
    }
    let called = false;
    ws.once("error", function error2(err2) {
      called = true;
      callback(err2);
    });
    ws.once("close", function close() {
      if (!called)
        callback(err);
      process.nextTick(emitClose$1, duplex);
    });
    if (terminateOnDestroy)
      ws.terminate();
  };
  duplex._final = function(callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once("open", function open() {
        duplex._final(callback);
      });
      return;
    }
    if (ws._socket === null)
      return;
    if (ws._socket._writableState.finished) {
      callback();
      if (duplex._readableState.endEmitted)
        duplex.destroy();
    } else {
      ws._socket.once("finish", function finish() {
        callback();
      });
      ws.close();
    }
  };
  duplex._read = function() {
    if (ws.isPaused)
      ws.resume();
  };
  duplex._write = function(chunk, encoding, callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once("open", function open() {
        duplex._write(chunk, encoding, callback);
      });
      return;
    }
    ws.send(chunk, callback);
  };
  duplex.on("end", duplexOnEnd);
  duplex.on("error", duplexOnError);
  return duplex;
}
function concat$1(list, totalLength) {
  if (list.length === 0)
    return EMPTY_BUFFER$3;
  if (list.length === 1)
    return list[0];
  const target = Buffer.allocUnsafe(totalLength);
  let offset = 0;
  for (let i = 0; i < list.length; i++) {
    const buf = list[i];
    target.set(buf, offset);
    offset += buf.length;
  }
  if (offset < totalLength) {
    return new FastBuffer$2(target.buffer, target.byteOffset, offset);
  }
  return target;
}
function _mask(source, mask2, output, offset, length) {
  for (let i = 0; i < length; i++) {
    output[offset + i] = source[i] ^ mask2[i & 3];
  }
}
function _unmask(buffer, mask2) {
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] ^= mask2[i & 3];
  }
}
function toArrayBuffer$1(buf) {
  if (buf.length === buf.buffer.byteLength) {
    return buf.buffer;
  }
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
}
function toBuffer$2(data) {
  toBuffer$2.readOnly = true;
  if (Buffer.isBuffer(data))
    return data;
  let buf;
  if (data instanceof ArrayBuffer) {
    buf = new FastBuffer$2(data);
  } else if (ArrayBuffer.isView(data)) {
    buf = new FastBuffer$2(data.buffer, data.byteOffset, data.byteLength);
  } else {
    buf = Buffer.from(data);
    toBuffer$2.readOnly = false;
  }
  return buf;
}
function deflateOnData(chunk) {
  this[kBuffers].push(chunk);
  this[kTotalLength] += chunk.length;
}
function inflateOnData(chunk) {
  this[kTotalLength] += chunk.length;
  if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
    this[kBuffers].push(chunk);
    return;
  }
  this[kError$1] = new RangeError("Max payload size exceeded");
  this[kError$1].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
  this[kError$1][kStatusCode$2] = 1009;
  this.removeListener("data", inflateOnData);
  this.reset();
}
function inflateOnError(err) {
  this[kPerMessageDeflate]._inflate = null;
  err[kStatusCode$2] = 1007;
  this[kCallback](err);
}
function isValidStatusCode$2(code) {
  return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
}
function _isValidUTF8(buf) {
  const len = buf.length;
  let i = 0;
  while (i < len) {
    if ((buf[i] & 128) === 0) {
      i++;
    } else if ((buf[i] & 224) === 192) {
      if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
        return false;
      }
      i += 2;
    } else if ((buf[i] & 240) === 224) {
      if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || // Overlong
      buf[i] === 237 && (buf[i + 1] & 224) === 160) {
        return false;
      }
      i += 3;
    } else if ((buf[i] & 248) === 240) {
      if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || // Overlong
      buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
        return false;
      }
      i += 4;
    } else {
      return false;
    }
  }
  return true;
}
function error(ErrorCtor, message, prefix, statusCode, errorCode) {
  const err = new ErrorCtor(
    prefix ? `Invalid WebSocket frame: ${message}` : message
  );
  Error.captureStackTrace(err, error);
  err.code = errorCode;
  err[kStatusCode$1] = statusCode;
  return err;
}
function callListener(listener, thisArg, event) {
  if (typeof listener === "object" && listener.handleEvent) {
    listener.handleEvent.call(listener, event);
  } else {
    listener.call(thisArg, event);
  }
}
function push(dest, name, elem) {
  if (dest[name] === void 0)
    dest[name] = [elem];
  else
    dest[name].push(elem);
}
function parse$2(header) {
  const offers = /* @__PURE__ */ Object.create(null);
  let params = /* @__PURE__ */ Object.create(null);
  let mustUnescape = false;
  let isEscaping = false;
  let inQuotes = false;
  let extensionName;
  let paramName;
  let start = -1;
  let code = -1;
  let end = -1;
  let i = 0;
  for (; i < header.length; i++) {
    code = header.charCodeAt(i);
    if (extensionName === void 0) {
      if (end === -1 && tokenChars$1[code] === 1) {
        if (start === -1)
          start = i;
      } else if (i !== 0 && (code === 32 || code === 9)) {
        if (end === -1 && start !== -1)
          end = i;
      } else if (code === 59 || code === 44) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
        if (end === -1)
          end = i;
        const name = header.slice(start, end);
        if (code === 44) {
          push(offers, name, params);
          params = /* @__PURE__ */ Object.create(null);
        } else {
          extensionName = name;
        }
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else if (paramName === void 0) {
      if (end === -1 && tokenChars$1[code] === 1) {
        if (start === -1)
          start = i;
      } else if (code === 32 || code === 9) {
        if (end === -1 && start !== -1)
          end = i;
      } else if (code === 59 || code === 44) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
        if (end === -1)
          end = i;
        push(params, header.slice(start, end), true);
        if (code === 44) {
          push(offers, extensionName, params);
          params = /* @__PURE__ */ Object.create(null);
          extensionName = void 0;
        }
        start = end = -1;
      } else if (code === 61 && start !== -1 && end === -1) {
        paramName = header.slice(start, i);
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else {
      if (isEscaping) {
        if (tokenChars$1[code] !== 1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
        if (start === -1)
          start = i;
        else if (!mustUnescape)
          mustUnescape = true;
        isEscaping = false;
      } else if (inQuotes) {
        if (tokenChars$1[code] === 1) {
          if (start === -1)
            start = i;
        } else if (code === 34 && start !== -1) {
          inQuotes = false;
          end = i;
        } else if (code === 92) {
          isEscaping = true;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
        inQuotes = true;
      } else if (end === -1 && tokenChars$1[code] === 1) {
        if (start === -1)
          start = i;
      } else if (start !== -1 && (code === 32 || code === 9)) {
        if (end === -1)
          end = i;
      } else if (code === 59 || code === 44) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
        if (end === -1)
          end = i;
        let value = header.slice(start, end);
        if (mustUnescape) {
          value = value.replace(/\\/g, "");
          mustUnescape = false;
        }
        push(params, paramName, value);
        if (code === 44) {
          push(offers, extensionName, params);
          params = /* @__PURE__ */ Object.create(null);
          extensionName = void 0;
        }
        paramName = void 0;
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
  }
  if (start === -1 || inQuotes || code === 32 || code === 9) {
    throw new SyntaxError("Unexpected end of input");
  }
  if (end === -1)
    end = i;
  const token = header.slice(start, end);
  if (extensionName === void 0) {
    push(offers, token, params);
  } else {
    if (paramName === void 0) {
      push(params, token, true);
    } else if (mustUnescape) {
      push(params, paramName, token.replace(/\\/g, ""));
    } else {
      push(params, paramName, token);
    }
    push(offers, extensionName, params);
  }
  return offers;
}
function format$1(extensions) {
  return Object.keys(extensions).map((extension2) => {
    let configurations = extensions[extension2];
    if (!Array.isArray(configurations))
      configurations = [configurations];
    return configurations.map((params) => {
      return [extension2].concat(
        Object.keys(params).map((k) => {
          let values = params[k];
          if (!Array.isArray(values))
            values = [values];
          return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
        })
      ).join("; ");
    }).join(", ");
  }).join(", ");
}
function initAsClient(websocket2, address, protocols, options) {
  const opts = {
    protocolVersion: protocolVersions[1],
    maxPayload: 100 * 1024 * 1024,
    skipUTF8Validation: false,
    perMessageDeflate: true,
    followRedirects: false,
    maxRedirects: 10,
    ...options,
    createConnection: void 0,
    socketPath: void 0,
    hostname: void 0,
    protocol: void 0,
    timeout: void 0,
    method: "GET",
    host: void 0,
    path: void 0,
    port: void 0
  };
  if (!protocolVersions.includes(opts.protocolVersion)) {
    throw new RangeError(
      `Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`
    );
  }
  let parsedUrl;
  if (address instanceof URL2) {
    parsedUrl = address;
    websocket2._url = address.href;
  } else {
    try {
      parsedUrl = new URL2(address);
    } catch (e) {
      throw new SyntaxError(`Invalid URL: ${address}`);
    }
    websocket2._url = address;
  }
  const isSecure = parsedUrl.protocol === "wss:";
  const isIpcUrl = parsedUrl.protocol === "ws+unix:";
  let invalidUrlMessage;
  if (parsedUrl.protocol !== "ws:" && !isSecure && !isIpcUrl) {
    invalidUrlMessage = `The URL's protocol must be one of "ws:", "wss:", or "ws+unix:"`;
  } else if (isIpcUrl && !parsedUrl.pathname) {
    invalidUrlMessage = "The URL's pathname is empty";
  } else if (parsedUrl.hash) {
    invalidUrlMessage = "The URL contains a fragment identifier";
  }
  if (invalidUrlMessage) {
    const err = new SyntaxError(invalidUrlMessage);
    if (websocket2._redirects === 0) {
      throw err;
    } else {
      emitErrorAndClose(websocket2, err);
      return;
    }
  }
  const defaultPort = isSecure ? 443 : 80;
  const key = randomBytes(16).toString("base64");
  const request = isSecure ? https.request : http$1.request;
  const protocolSet = /* @__PURE__ */ new Set();
  let perMessageDeflate;
  opts.createConnection = isSecure ? tlsConnect : netConnect;
  opts.defaultPort = opts.defaultPort || defaultPort;
  opts.port = parsedUrl.port || defaultPort;
  opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
  opts.headers = {
    ...opts.headers,
    "Sec-WebSocket-Version": opts.protocolVersion,
    "Sec-WebSocket-Key": key,
    Connection: "Upgrade",
    Upgrade: "websocket"
  };
  opts.path = parsedUrl.pathname + parsedUrl.search;
  opts.timeout = opts.handshakeTimeout;
  if (opts.perMessageDeflate) {
    perMessageDeflate = new PerMessageDeflate$1(
      opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
      false,
      opts.maxPayload
    );
    opts.headers["Sec-WebSocket-Extensions"] = format({
      [PerMessageDeflate$1.extensionName]: perMessageDeflate.offer()
    });
  }
  if (protocols.length) {
    for (const protocol of protocols) {
      if (typeof protocol !== "string" || !subprotocolRegex.test(protocol) || protocolSet.has(protocol)) {
        throw new SyntaxError(
          "An invalid or duplicated subprotocol was specified"
        );
      }
      protocolSet.add(protocol);
    }
    opts.headers["Sec-WebSocket-Protocol"] = protocols.join(",");
  }
  if (opts.origin) {
    if (opts.protocolVersion < 13) {
      opts.headers["Sec-WebSocket-Origin"] = opts.origin;
    } else {
      opts.headers.Origin = opts.origin;
    }
  }
  if (parsedUrl.username || parsedUrl.password) {
    opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
  }
  if (isIpcUrl) {
    const parts = opts.path.split(":");
    opts.socketPath = parts[0];
    opts.path = parts[1];
  }
  let req;
  if (opts.followRedirects) {
    if (websocket2._redirects === 0) {
      websocket2._originalIpc = isIpcUrl;
      websocket2._originalSecure = isSecure;
      websocket2._originalHostOrSocketPath = isIpcUrl ? opts.socketPath : parsedUrl.host;
      const headers = options && options.headers;
      options = { ...options, headers: {} };
      if (headers) {
        for (const [key2, value] of Object.entries(headers)) {
          options.headers[key2.toLowerCase()] = value;
        }
      }
    } else if (websocket2.listenerCount("redirect") === 0) {
      const isSameHost = isIpcUrl ? websocket2._originalIpc ? opts.socketPath === websocket2._originalHostOrSocketPath : false : websocket2._originalIpc ? false : parsedUrl.host === websocket2._originalHostOrSocketPath;
      if (!isSameHost || websocket2._originalSecure && !isSecure) {
        delete opts.headers.authorization;
        delete opts.headers.cookie;
        if (!isSameHost)
          delete opts.headers.host;
        opts.auth = void 0;
      }
    }
    if (opts.auth && !options.headers.authorization) {
      options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
    }
    req = websocket2._req = request(opts);
    if (websocket2._redirects) {
      websocket2.emit("redirect", websocket2.url, req);
    }
  } else {
    req = websocket2._req = request(opts);
  }
  if (opts.timeout) {
    req.on("timeout", () => {
      abortHandshake$1(websocket2, req, "Opening handshake has timed out");
    });
  }
  req.on("error", (err) => {
    if (req === null || req[kAborted])
      return;
    req = websocket2._req = null;
    emitErrorAndClose(websocket2, err);
  });
  req.on("response", (res) => {
    const location2 = res.headers.location;
    const statusCode = res.statusCode;
    if (location2 && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
      if (++websocket2._redirects > opts.maxRedirects) {
        abortHandshake$1(websocket2, req, "Maximum redirects exceeded");
        return;
      }
      req.abort();
      let addr;
      try {
        addr = new URL2(location2, address);
      } catch (e) {
        const err = new SyntaxError(`Invalid URL: ${location2}`);
        emitErrorAndClose(websocket2, err);
        return;
      }
      initAsClient(websocket2, addr, protocols, options);
    } else if (!websocket2.emit("unexpected-response", req, res)) {
      abortHandshake$1(
        websocket2,
        req,
        `Unexpected server response: ${res.statusCode}`
      );
    }
  });
  req.on("upgrade", (res, socket, head) => {
    websocket2.emit("upgrade", res);
    if (websocket2.readyState !== WebSocket$1.CONNECTING)
      return;
    req = websocket2._req = null;
    if (res.headers.upgrade.toLowerCase() !== "websocket") {
      abortHandshake$1(websocket2, socket, "Invalid Upgrade header");
      return;
    }
    const digest = createHash$1("sha1").update(key + GUID$1).digest("base64");
    if (res.headers["sec-websocket-accept"] !== digest) {
      abortHandshake$1(websocket2, socket, "Invalid Sec-WebSocket-Accept header");
      return;
    }
    const serverProt = res.headers["sec-websocket-protocol"];
    let protError;
    if (serverProt !== void 0) {
      if (!protocolSet.size) {
        protError = "Server sent a subprotocol but none was requested";
      } else if (!protocolSet.has(serverProt)) {
        protError = "Server sent an invalid subprotocol";
      }
    } else if (protocolSet.size) {
      protError = "Server sent no subprotocol";
    }
    if (protError) {
      abortHandshake$1(websocket2, socket, protError);
      return;
    }
    if (serverProt)
      websocket2._protocol = serverProt;
    const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
    if (secWebSocketExtensions !== void 0) {
      if (!perMessageDeflate) {
        const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
        abortHandshake$1(websocket2, socket, message);
        return;
      }
      let extensions;
      try {
        extensions = parse$1(secWebSocketExtensions);
      } catch (err) {
        const message = "Invalid Sec-WebSocket-Extensions header";
        abortHandshake$1(websocket2, socket, message);
        return;
      }
      const extensionNames = Object.keys(extensions);
      if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate$1.extensionName) {
        const message = "Server indicated an extension that was not requested";
        abortHandshake$1(websocket2, socket, message);
        return;
      }
      try {
        perMessageDeflate.accept(extensions[PerMessageDeflate$1.extensionName]);
      } catch (err) {
        const message = "Invalid Sec-WebSocket-Extensions header";
        abortHandshake$1(websocket2, socket, message);
        return;
      }
      websocket2._extensions[PerMessageDeflate$1.extensionName] = perMessageDeflate;
    }
    websocket2.setSocket(socket, head, {
      generateMask: opts.generateMask,
      maxPayload: opts.maxPayload,
      skipUTF8Validation: opts.skipUTF8Validation
    });
  });
  if (opts.finishRequest) {
    opts.finishRequest(req, websocket2);
  } else {
    req.end();
  }
}
function emitErrorAndClose(websocket2, err) {
  websocket2._readyState = WebSocket$1.CLOSING;
  websocket2.emit("error", err);
  websocket2.emitClose();
}
function netConnect(options) {
  options.path = options.socketPath;
  return net.connect(options);
}
function tlsConnect(options) {
  options.path = void 0;
  if (!options.servername && options.servername !== "") {
    options.servername = net.isIP(options.host) ? "" : options.host;
  }
  return tls.connect(options);
}
function abortHandshake$1(websocket2, stream2, message) {
  websocket2._readyState = WebSocket$1.CLOSING;
  const err = new Error(message);
  Error.captureStackTrace(err, abortHandshake$1);
  if (stream2.setHeader) {
    stream2[kAborted] = true;
    stream2.abort();
    if (stream2.socket && !stream2.socket.destroyed) {
      stream2.socket.destroy();
    }
    process.nextTick(emitErrorAndClose, websocket2, err);
  } else {
    stream2.destroy(err);
    stream2.once("error", websocket2.emit.bind(websocket2, "error"));
    stream2.once("close", websocket2.emitClose.bind(websocket2));
  }
}
function sendAfterClose(websocket2, data, cb) {
  if (data) {
    const length = toBuffer(data).length;
    if (websocket2._socket)
      websocket2._sender._bufferedBytes += length;
    else
      websocket2._bufferedAmount += length;
  }
  if (cb) {
    const err = new Error(
      `WebSocket is not open: readyState ${websocket2.readyState} (${readyStates[websocket2.readyState]})`
    );
    process.nextTick(cb, err);
  }
}
function receiverOnConclude(code, reason) {
  const websocket2 = this[kWebSocket$1];
  websocket2._closeFrameReceived = true;
  websocket2._closeMessage = reason;
  websocket2._closeCode = code;
  if (websocket2._socket[kWebSocket$1] === void 0)
    return;
  websocket2._socket.removeListener("data", socketOnData);
  process.nextTick(resume, websocket2._socket);
  if (code === 1005)
    websocket2.close();
  else
    websocket2.close(code, reason);
}
function receiverOnDrain() {
  const websocket2 = this[kWebSocket$1];
  if (!websocket2.isPaused)
    websocket2._socket.resume();
}
function receiverOnError(err) {
  const websocket2 = this[kWebSocket$1];
  if (websocket2._socket[kWebSocket$1] !== void 0) {
    websocket2._socket.removeListener("data", socketOnData);
    process.nextTick(resume, websocket2._socket);
    websocket2.close(err[kStatusCode]);
  }
  websocket2.emit("error", err);
}
function receiverOnFinish() {
  this[kWebSocket$1].emitClose();
}
function receiverOnMessage(data, isBinary) {
  this[kWebSocket$1].emit("message", data, isBinary);
}
function receiverOnPing(data) {
  const websocket2 = this[kWebSocket$1];
  websocket2.pong(data, !websocket2._isServer, NOOP);
  websocket2.emit("ping", data);
}
function receiverOnPong(data) {
  this[kWebSocket$1].emit("pong", data);
}
function resume(stream2) {
  stream2.resume();
}
function socketOnClose() {
  const websocket2 = this[kWebSocket$1];
  this.removeListener("close", socketOnClose);
  this.removeListener("data", socketOnData);
  this.removeListener("end", socketOnEnd);
  websocket2._readyState = WebSocket$1.CLOSING;
  let chunk;
  if (!this._readableState.endEmitted && !websocket2._closeFrameReceived && !websocket2._receiver._writableState.errorEmitted && (chunk = websocket2._socket.read()) !== null) {
    websocket2._receiver.write(chunk);
  }
  websocket2._receiver.end();
  this[kWebSocket$1] = void 0;
  clearTimeout(websocket2._closeTimer);
  if (websocket2._receiver._writableState.finished || websocket2._receiver._writableState.errorEmitted) {
    websocket2.emitClose();
  } else {
    websocket2._receiver.on("error", receiverOnFinish);
    websocket2._receiver.on("finish", receiverOnFinish);
  }
}
function socketOnData(chunk) {
  if (!this[kWebSocket$1]._receiver.write(chunk)) {
    this.pause();
  }
}
function socketOnEnd() {
  const websocket2 = this[kWebSocket$1];
  websocket2._readyState = WebSocket$1.CLOSING;
  websocket2._receiver.end();
  this.end();
}
function socketOnError$1() {
  const websocket2 = this[kWebSocket$1];
  this.removeListener("error", socketOnError$1);
  this.on("error", NOOP);
  if (websocket2) {
    websocket2._readyState = WebSocket$1.CLOSING;
    this.destroy();
  }
}
function parse(header) {
  const protocols = /* @__PURE__ */ new Set();
  let start = -1;
  let end = -1;
  let i = 0;
  for (i; i < header.length; i++) {
    const code = header.charCodeAt(i);
    if (end === -1 && tokenChars[code] === 1) {
      if (start === -1)
        start = i;
    } else if (i !== 0 && (code === 32 || code === 9)) {
      if (end === -1 && start !== -1)
        end = i;
    } else if (code === 44) {
      if (start === -1) {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
      if (end === -1)
        end = i;
      const protocol2 = header.slice(start, end);
      if (protocols.has(protocol2)) {
        throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
      }
      protocols.add(protocol2);
      start = end = -1;
    } else {
      throw new SyntaxError(`Unexpected character at index ${i}`);
    }
  }
  if (start === -1 || end !== -1) {
    throw new SyntaxError("Unexpected end of input");
  }
  const protocol = header.slice(start, i);
  if (protocols.has(protocol)) {
    throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
  }
  protocols.add(protocol);
  return protocols;
}
function addListeners(server, map) {
  for (const event of Object.keys(map))
    server.on(event, map[event]);
  return function removeListeners() {
    for (const event of Object.keys(map)) {
      server.removeListener(event, map[event]);
    }
  };
}
function emitClose(server) {
  server._state = CLOSED;
  server.emit("close");
}
function socketOnError() {
  this.destroy();
}
function abortHandshake(socket, code, message, headers) {
  message = message || http.STATUS_CODES[code];
  headers = {
    Connection: "close",
    "Content-Type": "text/html",
    "Content-Length": Buffer.byteLength(message),
    ...headers
  };
  socket.once("finish", socket.destroy);
  socket.end(
    `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message
  );
}
function abortHandshakeOrEmitwsClientError(server, req, socket, code, message) {
  if (server.listenerCount("wsClientError")) {
    const err = new Error(message);
    Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
    server.emit("wsClientError", err, socket, req);
  } else {
    abortHandshake(socket, code, message);
  }
}
var import_stream, import_zlib, import_buffer, import_net, import_tls, import_crypto, import_events, import_https, import_http, import_url, Duplex, stream, stream$1, bufferUtil$1, constants, unmask$1, mask, EMPTY_BUFFER$3, FastBuffer$2, bufferUtilExports, kDone, kRun, Limiter$1, limiter, zlib, bufferUtil, Limiter2, kStatusCode$2, FastBuffer$1, TRAILER, kPerMessageDeflate, kTotalLength, kCallback, kBuffers, kError$1, zlibLimiter, PerMessageDeflate$4, permessageDeflate, validation, __viteOptionalPeerDep_utf8Validate_ws, __viteOptionalPeerDep_utf8Validate_ws$1, require$$1, isValidUTF8_1, isUtf8, tokenChars$2, validationExports, Writable, PerMessageDeflate$3, BINARY_TYPES$1, EMPTY_BUFFER$2, kStatusCode$1, kWebSocket$2, concat, toArrayBuffer, unmask, isValidStatusCode$1, isValidUTF8, FastBuffer, GET_INFO, GET_PAYLOAD_LENGTH_16, GET_PAYLOAD_LENGTH_64, GET_MASK, GET_DATA, INFLATING, Receiver$1, receiver, receiver$1, randomFillSync, PerMessageDeflate$2, EMPTY_BUFFER$1, isValidStatusCode, applyMask, toBuffer$1, kByteLength, maskBuffer, Sender$1, sender, sender$1, kForOnEventAttribute$1, kListener$1, kCode, kData, kError, kMessage, kReason, kTarget, kType, kWasClean, Event, CloseEvent, ErrorEvent, MessageEvent, EventTarget, eventTarget, tokenChars$1, extension$1, EventEmitter$1, https, http$1, net, tls, randomBytes, createHash$1, URL2, PerMessageDeflate$1, Receiver2, Sender2, BINARY_TYPES, EMPTY_BUFFER, GUID$1, kForOnEventAttribute, kListener, kStatusCode, kWebSocket$1, NOOP, addEventListener2, removeEventListener, format, parse$1, toBuffer, closeTimeout, kAborted, protocolVersions, readyStates, subprotocolRegex, WebSocket$1, websocket, WebSocket$2, tokenChars, subprotocol$1, EventEmitter, http, createHash, extension, PerMessageDeflate2, subprotocol, WebSocket22, GUID, kWebSocket, keyRegex, RUNNING, CLOSING, CLOSED, WebSocketServer, websocketServer, websocketServer$1;
var init_wrapper_6f348d45 = __esm({
  "node_modules/@gradio/client/dist/wrapper-6f348d45.js"() {
    import_stream = __toESM(require("stream"), 1);
    import_zlib = __toESM(require("zlib"), 1);
    import_buffer = __toESM(require("buffer"), 1);
    import_net = __toESM(require("net"), 1);
    import_tls = __toESM(require("tls"), 1);
    import_crypto = __toESM(require("crypto"), 1);
    import_events = __toESM(require("events"), 1);
    import_https = __toESM(require("https"), 1);
    import_http = __toESM(require("http"), 1);
    import_url = __toESM(require("url"), 1);
    ({ Duplex } = import_stream.default);
    stream = createWebSocketStream;
    stream$1 = /* @__PURE__ */ getDefaultExportFromCjs(stream);
    bufferUtil$1 = { exports: {} };
    constants = {
      BINARY_TYPES: ["nodebuffer", "arraybuffer", "fragments"],
      EMPTY_BUFFER: Buffer.alloc(0),
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
      kListener: Symbol("kListener"),
      kStatusCode: Symbol("status-code"),
      kWebSocket: Symbol("websocket"),
      NOOP: () => {
      }
    };
    ({ EMPTY_BUFFER: EMPTY_BUFFER$3 } = constants);
    FastBuffer$2 = Buffer[Symbol.species];
    bufferUtil$1.exports = {
      concat: concat$1,
      mask: _mask,
      toArrayBuffer: toArrayBuffer$1,
      toBuffer: toBuffer$2,
      unmask: _unmask
    };
    if (!process.env.WS_NO_BUFFER_UTIL) {
      try {
        const bufferUtil2 = require_bufferutil();
        mask = bufferUtil$1.exports.mask = function(source, mask2, output, offset, length) {
          if (length < 48)
            _mask(source, mask2, output, offset, length);
          else
            bufferUtil2.mask(source, mask2, output, offset, length);
        };
        unmask$1 = bufferUtil$1.exports.unmask = function(buffer, mask2) {
          if (buffer.length < 32)
            _unmask(buffer, mask2);
          else
            bufferUtil2.unmask(buffer, mask2);
        };
      } catch (e) {
      }
    }
    bufferUtilExports = bufferUtil$1.exports;
    kDone = Symbol("kDone");
    kRun = Symbol("kRun");
    Limiter$1 = class Limiter {
      /**
       * Creates a new `Limiter`.
       *
       * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
       *     to run concurrently
       */
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--;
          this[kRun]();
        };
        this.concurrency = concurrency || Infinity;
        this.jobs = [];
        this.pending = 0;
      }
      /**
       * Adds a job to the queue.
       *
       * @param {Function} job The job to run
       * @public
       */
      add(job) {
        this.jobs.push(job);
        this[kRun]();
      }
      /**
       * Removes a job from the queue and runs it if possible.
       *
       * @private
       */
      [kRun]() {
        if (this.pending === this.concurrency)
          return;
        if (this.jobs.length) {
          const job = this.jobs.shift();
          this.pending++;
          job(this[kDone]);
        }
      }
    };
    limiter = Limiter$1;
    zlib = import_zlib.default;
    bufferUtil = bufferUtilExports;
    Limiter2 = limiter;
    ({ kStatusCode: kStatusCode$2 } = constants);
    FastBuffer$1 = Buffer[Symbol.species];
    TRAILER = Buffer.from([0, 0, 255, 255]);
    kPerMessageDeflate = Symbol("permessage-deflate");
    kTotalLength = Symbol("total-length");
    kCallback = Symbol("callback");
    kBuffers = Symbol("buffers");
    kError$1 = Symbol("error");
    PerMessageDeflate$4 = class PerMessageDeflate {
      /**
       * Creates a PerMessageDeflate instance.
       *
       * @param {Object} [options] Configuration options
       * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
       *     for, or request, a custom client window size
       * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
       *     acknowledge disabling of client context takeover
       * @param {Number} [options.concurrencyLimit=10] The number of concurrent
       *     calls to zlib
       * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
       *     use of a custom server window size
       * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
       *     disabling of server context takeover
       * @param {Number} [options.threshold=1024] Size (in bytes) below which
       *     messages should not be compressed if context takeover is disabled
       * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
       *     deflate
       * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
       *     inflate
       * @param {Boolean} [isServer=false] Create the instance in either server or
       *     client mode
       * @param {Number} [maxPayload=0] The maximum allowed message length
       */
      constructor(options, isServer, maxPayload) {
        this._maxPayload = maxPayload | 0;
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._isServer = !!isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter2(concurrency);
        }
      }
      /**
       * @type {String}
       */
      static get extensionName() {
        return "permessage-deflate";
      }
      /**
       * Create an extension negotiation offer.
       *
       * @return {Object} Extension parameters
       * @public
       */
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      /**
       * Accept an extension negotiation offer/response.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Object} Accepted configuration
       * @public
       */
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      /**
       * Releases all resources used by the extension.
       *
       * @public
       */
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          const callback = this._deflate[kCallback];
          this._deflate.close();
          this._deflate = null;
          if (callback) {
            callback(
              new Error(
                "The deflate stream was closed while data was being processed"
              )
            );
          }
        }
      }
      /**
       *  Accept an extension negotiation offer.
       *
       * @param {Array} offers The extension negotiation offers
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
            return false;
          }
          return true;
        });
        if (!accepted) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted.client_max_window_bits;
        }
        return accepted;
      }
      /**
       * Accept the extension negotiation response.
       *
       * @param {Array} response The extension negotiation response
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"'
          );
        }
        return params;
      }
      /**
       * Normalize parameters.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Array} The offers/response with normalized parameters
       * @private
       */
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key) => {
            let value = params[key];
            if (value.length > 1) {
              throw new Error(`Parameter "${key}" must have only a single value`);
            }
            value = value[0];
            if (key === "client_max_window_bits") {
              if (value !== true) {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(
                    `Invalid value for parameter "${key}": ${value}`
                  );
                }
                value = num;
              } else if (!this._isServer) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else if (key === "server_max_window_bits") {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
              value = num;
            } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else {
              throw new Error(`Unknown parameter "${key}"`);
            }
            params[key] = value;
          });
        });
        return configurations;
      }
      /**
       * Decompress data. Concurrency limited.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Compress data. Concurrency limited.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Decompress data.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._inflate = zlib.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits
          });
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin)
          this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError$1];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(
            this._inflate[kBuffers],
            this._inflate[kTotalLength]
          );
          if (this._inflate._readableState.endEmitted) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._inflate.reset();
            }
          }
          callback(null, data2);
        });
      }
      /**
       * Compress data.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _compress(data, fin, callback) {
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._deflate = zlib.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits
          });
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback;
        this._deflate.write(data);
        this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          let data2 = bufferUtil.concat(
            this._deflate[kBuffers],
            this._deflate[kTotalLength]
          );
          if (fin) {
            data2 = new FastBuffer$1(data2.buffer, data2.byteOffset, data2.length - 4);
          }
          this._deflate[kCallback] = null;
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.reset();
          }
          callback(null, data2);
        });
      }
    };
    permessageDeflate = PerMessageDeflate$4;
    validation = { exports: {} };
    __viteOptionalPeerDep_utf8Validate_ws = {};
    __viteOptionalPeerDep_utf8Validate_ws$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: __viteOptionalPeerDep_utf8Validate_ws
    }, Symbol.toStringTag, { value: "Module" }));
    require$$1 = /* @__PURE__ */ getAugmentedNamespace(__viteOptionalPeerDep_utf8Validate_ws$1);
    ({ isUtf8 } = import_buffer.default);
    tokenChars$2 = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 0 - 15
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 16 - 31
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      // 32 - 47
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      // 48 - 63
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 64 - 79
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      // 80 - 95
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 96 - 111
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
      // 112 - 127
    ];
    validation.exports = {
      isValidStatusCode: isValidStatusCode$2,
      isValidUTF8: _isValidUTF8,
      tokenChars: tokenChars$2
    };
    if (isUtf8) {
      isValidUTF8_1 = validation.exports.isValidUTF8 = function(buf) {
        return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
      };
    } else if (!process.env.WS_NO_UTF_8_VALIDATE) {
      try {
        const isValidUTF82 = require$$1;
        isValidUTF8_1 = validation.exports.isValidUTF8 = function(buf) {
          return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF82(buf);
        };
      } catch (e) {
      }
    }
    validationExports = validation.exports;
    ({ Writable } = import_stream.default);
    PerMessageDeflate$3 = permessageDeflate;
    ({
      BINARY_TYPES: BINARY_TYPES$1,
      EMPTY_BUFFER: EMPTY_BUFFER$2,
      kStatusCode: kStatusCode$1,
      kWebSocket: kWebSocket$2
    } = constants);
    ({ concat, toArrayBuffer, unmask } = bufferUtilExports);
    ({ isValidStatusCode: isValidStatusCode$1, isValidUTF8 } = validationExports);
    FastBuffer = Buffer[Symbol.species];
    GET_INFO = 0;
    GET_PAYLOAD_LENGTH_16 = 1;
    GET_PAYLOAD_LENGTH_64 = 2;
    GET_MASK = 3;
    GET_DATA = 4;
    INFLATING = 5;
    Receiver$1 = class Receiver extends Writable {
      /**
       * Creates a Receiver instance.
       *
       * @param {Object} [options] Options object
       * @param {String} [options.binaryType=nodebuffer] The type for binary data
       * @param {Object} [options.extensions] An object containing the negotiated
       *     extensions
       * @param {Boolean} [options.isServer=false] Specifies whether to operate in
       *     client or server mode
       * @param {Number} [options.maxPayload=0] The maximum allowed message length
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       */
      constructor(options = {}) {
        super();
        this._binaryType = options.binaryType || BINARY_TYPES$1[0];
        this._extensions = options.extensions || {};
        this._isServer = !!options.isServer;
        this._maxPayload = options.maxPayload | 0;
        this._skipUTF8Validation = !!options.skipUTF8Validation;
        this[kWebSocket$2] = void 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];
        this._state = GET_INFO;
        this._loop = false;
      }
      /**
       * Implements `Writable.prototype._write()`.
       *
       * @param {Buffer} chunk The chunk of data to write
       * @param {String} encoding The character encoding of `chunk`
       * @param {Function} cb Callback
       * @private
       */
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO)
          return cb();
        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
      }
      /**
       * Consumes `n` bytes from the buffered data.
       *
       * @param {Number} n The number of bytes to consume
       * @return {Buffer} The consumed bytes
       * @private
       */
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length)
          return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = new FastBuffer(
            buf.buffer,
            buf.byteOffset + n,
            buf.length - n
          );
          return new FastBuffer(buf.buffer, buf.byteOffset, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          const offset = dst.length - n;
          if (n >= buf.length) {
            dst.set(this._buffers.shift(), offset);
          } else {
            dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
            this._buffers[0] = new FastBuffer(
              buf.buffer,
              buf.byteOffset + n,
              buf.length - n
            );
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      /**
       * Starts the parsing loop.
       *
       * @param {Function} cb Callback
       * @private
       */
      startLoop(cb) {
        let err;
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              err = this.getInfo();
              break;
            case GET_PAYLOAD_LENGTH_16:
              err = this.getPayloadLength16();
              break;
            case GET_PAYLOAD_LENGTH_64:
              err = this.getPayloadLength64();
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              err = this.getData(cb);
              break;
            default:
              this._loop = false;
              return;
          }
        } while (this._loop);
        cb(err);
      }
      /**
       * Reads the first two bytes of a frame.
       *
       * @return {(RangeError|undefined)} A possible error
       * @private
       */
      getInfo() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          this._loop = false;
          return error(
            RangeError,
            "RSV2 and RSV3 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_2_3"
          );
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate$3.extensionName]) {
          this._loop = false;
          return error(
            RangeError,
            "RSV1 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            this._loop = false;
            return error(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
          }
          if (!this._fragmented) {
            this._loop = false;
            return error(
              RangeError,
              "invalid opcode 0",
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            this._loop = false;
            return error(
              RangeError,
              `invalid opcode ${this._opcode}`,
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            this._loop = false;
            return error(
              RangeError,
              "FIN must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_FIN"
            );
          }
          if (compressed) {
            this._loop = false;
            return error(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
          }
          if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
            this._loop = false;
            return error(
              RangeError,
              `invalid payload length ${this._payloadLength}`,
              true,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
          }
        } else {
          this._loop = false;
          return error(
            RangeError,
            `invalid opcode ${this._opcode}`,
            true,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
        }
        if (!this._fin && !this._fragmented)
          this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._isServer) {
          if (!this._masked) {
            this._loop = false;
            return error(
              RangeError,
              "MASK must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_MASK"
            );
          }
        } else if (this._masked) {
          this._loop = false;
          return error(
            RangeError,
            "MASK must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_MASK"
          );
        }
        if (this._payloadLength === 126)
          this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127)
          this._state = GET_PAYLOAD_LENGTH_64;
        else
          return this.haveLength();
      }
      /**
       * Gets extended payload length (7+16).
       *
       * @return {(RangeError|undefined)} A possible error
       * @private
       */
      getPayloadLength16() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        return this.haveLength();
      }
      /**
       * Gets extended payload length (7+64).
       *
       * @return {(RangeError|undefined)} A possible error
       * @private
       */
      getPayloadLength64() {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 53 - 32) - 1) {
          this._loop = false;
          return error(
            RangeError,
            "Unsupported WebSocket frame: payload length > 2^53 - 1",
            false,
            1009,
            "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
          );
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        return this.haveLength();
      }
      /**
       * Payload length has been read.
       *
       * @return {(RangeError|undefined)} A possible error
       * @private
       */
      haveLength() {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            this._loop = false;
            return error(
              RangeError,
              "Max payload size exceeded",
              false,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            );
          }
        }
        if (this._masked)
          this._state = GET_MASK;
        else
          this._state = GET_DATA;
      }
      /**
       * Reads mask bytes.
       *
       * @private
       */
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      /**
       * Reads data bytes.
       *
       * @param {Function} cb Callback
       * @return {(Error|RangeError|undefined)} A possible error
       * @private
       */
      getData(cb) {
        let data = EMPTY_BUFFER$2;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0) {
            unmask(data, this._mask);
          }
        }
        if (this._opcode > 7)
          return this.controlMessage(data);
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        return this.dataMessage();
      }
      /**
       * Decompresses data.
       *
       * @param {Buffer} data Compressed data
       * @param {Function} cb Callback
       * @private
       */
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate$3.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err)
            return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              return cb(
                error(
                  RangeError,
                  "Max payload size exceeded",
                  false,
                  1009,
                  "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
                )
              );
            }
            this._fragments.push(buf);
          }
          const er = this.dataMessage();
          if (er)
            return cb(er);
          this.startLoop(cb);
        });
      }
      /**
       * Handles a data message.
       *
       * @return {(Error|undefined)} A possible error
       * @private
       */
      dataMessage() {
        if (this._fin) {
          const messageLength = this._messageLength;
          const fragments = this._fragments;
          this._totalPayloadLength = 0;
          this._messageLength = 0;
          this._fragmented = 0;
          this._fragments = [];
          if (this._opcode === 2) {
            let data;
            if (this._binaryType === "nodebuffer") {
              data = concat(fragments, messageLength);
            } else if (this._binaryType === "arraybuffer") {
              data = toArrayBuffer(concat(fragments, messageLength));
            } else {
              data = fragments;
            }
            this.emit("message", data, true);
          } else {
            const buf = concat(fragments, messageLength);
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              this._loop = false;
              return error(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
            }
            this.emit("message", buf, false);
          }
        }
        this._state = GET_INFO;
      }
      /**
       * Handles a control message.
       *
       * @param {Buffer} data Data to handle
       * @return {(Error|RangeError|undefined)} A possible error
       * @private
       */
      controlMessage(data) {
        if (this._opcode === 8) {
          this._loop = false;
          if (data.length === 0) {
            this.emit("conclude", 1005, EMPTY_BUFFER$2);
            this.end();
          } else {
            const code = data.readUInt16BE(0);
            if (!isValidStatusCode$1(code)) {
              return error(
                RangeError,
                `invalid status code ${code}`,
                true,
                1002,
                "WS_ERR_INVALID_CLOSE_CODE"
              );
            }
            const buf = new FastBuffer(
              data.buffer,
              data.byteOffset + 2,
              data.length - 2
            );
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              return error(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
            }
            this.emit("conclude", code, buf);
            this.end();
          }
        } else if (this._opcode === 9) {
          this.emit("ping", data);
        } else {
          this.emit("pong", data);
        }
        this._state = GET_INFO;
      }
    };
    receiver = Receiver$1;
    receiver$1 = /* @__PURE__ */ getDefaultExportFromCjs(receiver);
    ({ randomFillSync } = import_crypto.default);
    PerMessageDeflate$2 = permessageDeflate;
    ({ EMPTY_BUFFER: EMPTY_BUFFER$1 } = constants);
    ({ isValidStatusCode } = validationExports);
    ({ mask: applyMask, toBuffer: toBuffer$1 } = bufferUtilExports);
    kByteLength = Symbol("kByteLength");
    maskBuffer = Buffer.alloc(4);
    Sender$1 = class Sender {
      /**
       * Creates a Sender instance.
       *
       * @param {(net.Socket|tls.Socket)} socket The connection socket
       * @param {Object} [extensions] An object containing the negotiated extensions
       * @param {Function} [generateMask] The function used to generate the masking
       *     key
       */
      constructor(socket, extensions, generateMask) {
        this._extensions = extensions || {};
        if (generateMask) {
          this._generateMask = generateMask;
          this._maskBuffer = Buffer.alloc(4);
        }
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._deflating = false;
        this._queue = [];
      }
      /**
       * Frames a piece of data according to the HyBi WebSocket protocol.
       *
       * @param {(Buffer|String)} data The data to frame
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @return {(Buffer|String)[]} The framed data
       * @public
       */
      static frame(data, options) {
        let mask2;
        let merge = false;
        let offset = 2;
        let skipMasking = false;
        if (options.mask) {
          mask2 = options.maskBuffer || maskBuffer;
          if (options.generateMask) {
            options.generateMask(mask2);
          } else {
            randomFillSync(mask2, 0, 4);
          }
          skipMasking = (mask2[0] | mask2[1] | mask2[2] | mask2[3]) === 0;
          offset = 6;
        }
        let dataLength;
        if (typeof data === "string") {
          if ((!options.mask || skipMasking) && options[kByteLength] !== void 0) {
            dataLength = options[kByteLength];
          } else {
            data = Buffer.from(data);
            dataLength = data.length;
          }
        } else {
          dataLength = data.length;
          merge = options.mask && options.readOnly && !skipMasking;
        }
        let payloadLength = dataLength;
        if (dataLength >= 65536) {
          offset += 8;
          payloadLength = 127;
        } else if (dataLength > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);
        target[0] = options.fin ? options.opcode | 128 : options.opcode;
        if (options.rsv1)
          target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(dataLength, 2);
        } else if (payloadLength === 127) {
          target[2] = target[3] = 0;
          target.writeUIntBE(dataLength, 4, 6);
        }
        if (!options.mask)
          return [target, data];
        target[1] |= 128;
        target[offset - 4] = mask2[0];
        target[offset - 3] = mask2[1];
        target[offset - 2] = mask2[2];
        target[offset - 1] = mask2[3];
        if (skipMasking)
          return [target, data];
        if (merge) {
          applyMask(data, mask2, target, offset, dataLength);
          return [target];
        }
        applyMask(data, mask2, data, 0, dataLength);
        return [target, data];
      }
      /**
       * Sends a close message to the other peer.
       *
       * @param {Number} [code] The status code component of the body
       * @param {(String|Buffer)} [data] The message component of the body
       * @param {Boolean} [mask=false] Specifies whether or not to mask the message
       * @param {Function} [cb] Callback
       * @public
       */
      close(code, data, mask2, cb) {
        let buf;
        if (code === void 0) {
          buf = EMPTY_BUFFER$1;
        } else if (typeof code !== "number" || !isValidStatusCode(code)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || !data.length) {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code, 0);
        } else {
          const length = Buffer.byteLength(data);
          if (length > 123) {
            throw new RangeError("The message must not be greater than 123 bytes");
          }
          buf = Buffer.allocUnsafe(2 + length);
          buf.writeUInt16BE(code, 0);
          if (typeof data === "string") {
            buf.write(data, 2);
          } else {
            buf.set(data, 2);
          }
        }
        const options = {
          [kByteLength]: buf.length,
          fin: true,
          generateMask: this._generateMask,
          mask: mask2,
          maskBuffer: this._maskBuffer,
          opcode: 8,
          readOnly: false,
          rsv1: false
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, buf, false, options, cb]);
        } else {
          this.sendFrame(Sender.frame(buf, options), cb);
        }
      }
      /**
       * Sends a ping message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      ping(data, mask2, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else {
          data = toBuffer$1(data);
          byteLength = data.length;
          readOnly = toBuffer$1.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask: mask2,
          maskBuffer: this._maskBuffer,
          opcode: 9,
          readOnly,
          rsv1: false
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a pong message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      pong(data, mask2, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else {
          data = toBuffer$1(data);
          byteLength = data.length;
          readOnly = toBuffer$1.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask: mask2,
          maskBuffer: this._maskBuffer,
          opcode: 10,
          readOnly,
          rsv1: false
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a data message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Object} options Options object
       * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
       *     or text
       * @param {Boolean} [options.compress=false] Specifies whether or not to
       *     compress `data`
       * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Function} [cb] Callback
       * @public
       */
      send(data, options, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate$2.extensionName];
        let opcode = options.binary ? 2 : 1;
        let rsv1 = options.compress;
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else {
          data = toBuffer$1(data);
          byteLength = data.length;
          readOnly = toBuffer$1.readOnly;
        }
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? "server_no_context_takeover" : "client_no_context_takeover"]) {
            rsv1 = byteLength >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options.fin)
          this._firstFragment = true;
        if (perMessageDeflate) {
          const opts = {
            [kByteLength]: byteLength,
            fin: options.fin,
            generateMask: this._generateMask,
            mask: options.mask,
            maskBuffer: this._maskBuffer,
            opcode,
            readOnly,
            rsv1
          };
          if (this._deflating) {
            this.enqueue([this.dispatch, data, this._compress, opts, cb]);
          } else {
            this.dispatch(data, this._compress, opts, cb);
          }
        } else {
          this.sendFrame(
            Sender.frame(data, {
              [kByteLength]: byteLength,
              fin: options.fin,
              generateMask: this._generateMask,
              mask: options.mask,
              maskBuffer: this._maskBuffer,
              opcode,
              readOnly,
              rsv1: false
            }),
            cb
          );
        }
      }
      /**
       * Dispatches a message.
       *
       * @param {(Buffer|String)} data The message to send
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     `data`
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(Sender.frame(data, options), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate$2.extensionName];
        this._bufferedBytes += options[kByteLength];
        this._deflating = true;
        perMessageDeflate.compress(data, options.fin, (_, buf) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while data was being compressed"
            );
            if (typeof cb === "function")
              cb(err);
            for (let i = 0; i < this._queue.length; i++) {
              const params = this._queue[i];
              const callback = params[params.length - 1];
              if (typeof callback === "function")
                callback(err);
            }
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          this._deflating = false;
          options.readOnly = false;
          this.sendFrame(Sender.frame(buf, options), cb);
          this.dequeue();
        });
      }
      /**
       * Executes queued send operations.
       *
       * @private
       */
      dequeue() {
        while (!this._deflating && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[3][kByteLength];
          Reflect.apply(params[0], this, params.slice(1));
        }
      }
      /**
       * Enqueues a send operation.
       *
       * @param {Array} params Send operation parameters.
       * @private
       */
      enqueue(params) {
        this._bufferedBytes += params[3][kByteLength];
        this._queue.push(params);
      }
      /**
       * Sends a frame.
       *
       * @param {Buffer[]} list The frame to send
       * @param {Function} [cb] Callback
       * @private
       */
      sendFrame(list, cb) {
        if (list.length === 2) {
          this._socket.cork();
          this._socket.write(list[0]);
          this._socket.write(list[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list[0], cb);
        }
      }
    };
    sender = Sender$1;
    sender$1 = /* @__PURE__ */ getDefaultExportFromCjs(sender);
    ({ kForOnEventAttribute: kForOnEventAttribute$1, kListener: kListener$1 } = constants);
    kCode = Symbol("kCode");
    kData = Symbol("kData");
    kError = Symbol("kError");
    kMessage = Symbol("kMessage");
    kReason = Symbol("kReason");
    kTarget = Symbol("kTarget");
    kType = Symbol("kType");
    kWasClean = Symbol("kWasClean");
    Event = class {
      /**
       * Create a new `Event`.
       *
       * @param {String} type The name of the event
       * @throws {TypeError} If the `type` argument is not specified
       */
      constructor(type) {
        this[kTarget] = null;
        this[kType] = type;
      }
      /**
       * @type {*}
       */
      get target() {
        return this[kTarget];
      }
      /**
       * @type {String}
       */
      get type() {
        return this[kType];
      }
    };
    Object.defineProperty(Event.prototype, "target", { enumerable: true });
    Object.defineProperty(Event.prototype, "type", { enumerable: true });
    CloseEvent = class extends Event {
      /**
       * Create a new `CloseEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {Number} [options.code=0] The status code explaining why the
       *     connection was closed
       * @param {String} [options.reason=''] A human-readable string explaining why
       *     the connection was closed
       * @param {Boolean} [options.wasClean=false] Indicates whether or not the
       *     connection was cleanly closed
       */
      constructor(type, options = {}) {
        super(type);
        this[kCode] = options.code === void 0 ? 0 : options.code;
        this[kReason] = options.reason === void 0 ? "" : options.reason;
        this[kWasClean] = options.wasClean === void 0 ? false : options.wasClean;
      }
      /**
       * @type {Number}
       */
      get code() {
        return this[kCode];
      }
      /**
       * @type {String}
       */
      get reason() {
        return this[kReason];
      }
      /**
       * @type {Boolean}
       */
      get wasClean() {
        return this[kWasClean];
      }
    };
    Object.defineProperty(CloseEvent.prototype, "code", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "reason", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "wasClean", { enumerable: true });
    ErrorEvent = class extends Event {
      /**
       * Create a new `ErrorEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.error=null] The error that generated this event
       * @param {String} [options.message=''] The error message
       */
      constructor(type, options = {}) {
        super(type);
        this[kError] = options.error === void 0 ? null : options.error;
        this[kMessage] = options.message === void 0 ? "" : options.message;
      }
      /**
       * @type {*}
       */
      get error() {
        return this[kError];
      }
      /**
       * @type {String}
       */
      get message() {
        return this[kMessage];
      }
    };
    Object.defineProperty(ErrorEvent.prototype, "error", { enumerable: true });
    Object.defineProperty(ErrorEvent.prototype, "message", { enumerable: true });
    MessageEvent = class extends Event {
      /**
       * Create a new `MessageEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.data=null] The message content
       */
      constructor(type, options = {}) {
        super(type);
        this[kData] = options.data === void 0 ? null : options.data;
      }
      /**
       * @type {*}
       */
      get data() {
        return this[kData];
      }
    };
    Object.defineProperty(MessageEvent.prototype, "data", { enumerable: true });
    EventTarget = {
      /**
       * Register an event listener.
       *
       * @param {String} type A string representing the event type to listen for
       * @param {(Function|Object)} handler The listener to add
       * @param {Object} [options] An options object specifies characteristics about
       *     the event listener
       * @param {Boolean} [options.once=false] A `Boolean` indicating that the
       *     listener should be invoked at most once after being added. If `true`,
       *     the listener would be automatically removed when invoked.
       * @public
       */
      addEventListener(type, handler, options = {}) {
        for (const listener of this.listeners(type)) {
          if (!options[kForOnEventAttribute$1] && listener[kListener$1] === handler && !listener[kForOnEventAttribute$1]) {
            return;
          }
        }
        let wrapper;
        if (type === "message") {
          wrapper = function onMessage(data, isBinary) {
            const event = new MessageEvent("message", {
              data: isBinary ? data : data.toString()
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "close") {
          wrapper = function onClose(code, message) {
            const event = new CloseEvent("close", {
              code,
              reason: message.toString(),
              wasClean: this._closeFrameReceived && this._closeFrameSent
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "error") {
          wrapper = function onError(error2) {
            const event = new ErrorEvent("error", {
              error: error2,
              message: error2.message
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "open") {
          wrapper = function onOpen() {
            const event = new Event("open");
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else {
          return;
        }
        wrapper[kForOnEventAttribute$1] = !!options[kForOnEventAttribute$1];
        wrapper[kListener$1] = handler;
        if (options.once) {
          this.once(type, wrapper);
        } else {
          this.on(type, wrapper);
        }
      },
      /**
       * Remove an event listener.
       *
       * @param {String} type A string representing the event type to remove
       * @param {(Function|Object)} handler The listener to remove
       * @public
       */
      removeEventListener(type, handler) {
        for (const listener of this.listeners(type)) {
          if (listener[kListener$1] === handler && !listener[kForOnEventAttribute$1]) {
            this.removeListener(type, listener);
            break;
          }
        }
      }
    };
    eventTarget = {
      CloseEvent,
      ErrorEvent,
      Event,
      EventTarget,
      MessageEvent
    };
    ({ tokenChars: tokenChars$1 } = validationExports);
    extension$1 = { format: format$1, parse: parse$2 };
    EventEmitter$1 = import_events.default;
    https = import_https.default;
    http$1 = import_http.default;
    net = import_net.default;
    tls = import_tls.default;
    ({ randomBytes, createHash: createHash$1 } = import_crypto.default);
    ({ URL: URL2 } = import_url.default);
    PerMessageDeflate$1 = permessageDeflate;
    Receiver2 = receiver;
    Sender2 = sender;
    ({
      BINARY_TYPES,
      EMPTY_BUFFER,
      GUID: GUID$1,
      kForOnEventAttribute,
      kListener,
      kStatusCode,
      kWebSocket: kWebSocket$1,
      NOOP
    } = constants);
    ({
      EventTarget: { addEventListener: addEventListener2, removeEventListener }
    } = eventTarget);
    ({ format, parse: parse$1 } = extension$1);
    ({ toBuffer } = bufferUtilExports);
    closeTimeout = 30 * 1e3;
    kAborted = Symbol("kAborted");
    protocolVersions = [8, 13];
    readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
    WebSocket$1 = class WebSocket2 extends EventEmitter$1 {
      /**
       * Create a new `WebSocket`.
       *
       * @param {(String|URL)} address The URL to which to connect
       * @param {(String|String[])} [protocols] The subprotocols
       * @param {Object} [options] Connection options
       */
      constructor(address, protocols, options) {
        super();
        this._binaryType = BINARY_TYPES[0];
        this._closeCode = 1006;
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = EMPTY_BUFFER;
        this._closeTimer = null;
        this._extensions = {};
        this._paused = false;
        this._protocol = "";
        this._readyState = WebSocket2.CONNECTING;
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._bufferedAmount = 0;
          this._isServer = false;
          this._redirects = 0;
          if (protocols === void 0) {
            protocols = [];
          } else if (!Array.isArray(protocols)) {
            if (typeof protocols === "object" && protocols !== null) {
              options = protocols;
              protocols = [];
            } else {
              protocols = [protocols];
            }
          }
          initAsClient(this, address, protocols, options);
        } else {
          this._isServer = true;
        }
      }
      /**
       * This deviates from the WHATWG interface since ws doesn't support the
       * required default "blob" type (instead we define a custom "nodebuffer"
       * type).
       *
       * @type {String}
       */
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type))
          return;
        this._binaryType = type;
        if (this._receiver)
          this._receiver._binaryType = type;
      }
      /**
       * @type {Number}
       */
      get bufferedAmount() {
        if (!this._socket)
          return this._bufferedAmount;
        return this._socket._writableState.length + this._sender._bufferedBytes;
      }
      /**
       * @type {String}
       */
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      /**
       * @type {Boolean}
       */
      get isPaused() {
        return this._paused;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onclose() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onerror() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onopen() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onmessage() {
        return null;
      }
      /**
       * @type {String}
       */
      get protocol() {
        return this._protocol;
      }
      /**
       * @type {Number}
       */
      get readyState() {
        return this._readyState;
      }
      /**
       * @type {String}
       */
      get url() {
        return this._url;
      }
      /**
       * Set up the socket and the internal resources.
       *
       * @param {(net.Socket|tls.Socket)} socket The network socket between the
       *     server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Object} options Options object
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Number} [options.maxPayload=0] The maximum allowed message size
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @private
       */
      setSocket(socket, head, options) {
        const receiver2 = new Receiver2({
          binaryType: this.binaryType,
          extensions: this._extensions,
          isServer: this._isServer,
          maxPayload: options.maxPayload,
          skipUTF8Validation: options.skipUTF8Validation
        });
        this._sender = new Sender2(socket, this._extensions, options.generateMask);
        this._receiver = receiver2;
        this._socket = socket;
        receiver2[kWebSocket$1] = this;
        socket[kWebSocket$1] = this;
        receiver2.on("conclude", receiverOnConclude);
        receiver2.on("drain", receiverOnDrain);
        receiver2.on("error", receiverOnError);
        receiver2.on("message", receiverOnMessage);
        receiver2.on("ping", receiverOnPing);
        receiver2.on("pong", receiverOnPong);
        socket.setTimeout(0);
        socket.setNoDelay();
        if (head.length > 0)
          socket.unshift(head);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError$1);
        this._readyState = WebSocket2.OPEN;
        this.emit("open");
      }
      /**
       * Emit the `'close'` event.
       *
       * @private
       */
      emitClose() {
        if (!this._socket) {
          this._readyState = WebSocket2.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate$1.extensionName]) {
          this._extensions[PerMessageDeflate$1.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this._readyState = WebSocket2.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
      }
      /**
       * Start a closing handshake.
       *
       *          +----------+   +-----------+   +----------+
       *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
       *    |     +----------+   +-----------+   +----------+     |
       *          +----------+   +-----------+         |
       * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
       *          +----------+   +-----------+   |
       *    |           |                        |   +---+        |
       *                +------------------------+-->|fin| - - - -
       *    |         +---+                      |   +---+
       *     - - - - -|fin|<---------------------+
       *              +---+
       *
       * @param {Number} [code] Status code explaining why the connection is closing
       * @param {(String|Buffer)} [data] The reason why the connection is
       *     closing
       * @public
       */
      close(code, data) {
        if (this.readyState === WebSocket2.CLOSED)
          return;
        if (this.readyState === WebSocket2.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake$1(this, this._req, msg);
          return;
        }
        if (this.readyState === WebSocket2.CLOSING) {
          if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
            this._socket.end();
          }
          return;
        }
        this._readyState = WebSocket2.CLOSING;
        this._sender.close(code, data, !this._isServer, (err) => {
          if (err)
            return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
            this._socket.end();
          }
        });
        this._closeTimer = setTimeout(
          this._socket.destroy.bind(this._socket),
          closeTimeout
        );
      }
      /**
       * Pause the socket.
       *
       * @public
       */
      pause() {
        if (this.readyState === WebSocket2.CONNECTING || this.readyState === WebSocket2.CLOSED) {
          return;
        }
        this._paused = true;
        this._socket.pause();
      }
      /**
       * Send a ping.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the ping is sent
       * @public
       */
      ping(data, mask2, cb) {
        if (this.readyState === WebSocket2.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask2 = void 0;
        } else if (typeof mask2 === "function") {
          cb = mask2;
          mask2 = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket2.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask2 === void 0)
          mask2 = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask2, cb);
      }
      /**
       * Send a pong.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the pong is sent
       * @public
       */
      pong(data, mask2, cb) {
        if (this.readyState === WebSocket2.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask2 = void 0;
        } else if (typeof mask2 === "function") {
          cb = mask2;
          mask2 = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket2.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask2 === void 0)
          mask2 = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask2, cb);
      }
      /**
       * Resume the socket.
       *
       * @public
       */
      resume() {
        if (this.readyState === WebSocket2.CONNECTING || this.readyState === WebSocket2.CLOSED) {
          return;
        }
        this._paused = false;
        if (!this._receiver._writableState.needDrain)
          this._socket.resume();
      }
      /**
       * Send a data message.
       *
       * @param {*} data The message to send
       * @param {Object} [options] Options object
       * @param {Boolean} [options.binary] Specifies whether `data` is binary or
       *     text
       * @param {Boolean} [options.compress] Specifies whether or not to compress
       *     `data`
       * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when data is written out
       * @public
       */
      send(data, options, cb) {
        if (this.readyState === WebSocket2.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket2.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        const opts = {
          binary: typeof data !== "string",
          mask: !this._isServer,
          compress: true,
          fin: true,
          ...options
        };
        if (!this._extensions[PerMessageDeflate$1.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      /**
       * Forcibly close the connection.
       *
       * @public
       */
      terminate() {
        if (this.readyState === WebSocket2.CLOSED)
          return;
        if (this.readyState === WebSocket2.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake$1(this, this._req, msg);
          return;
        }
        if (this._socket) {
          this._readyState = WebSocket2.CLOSING;
          this._socket.destroy();
        }
      }
    };
    Object.defineProperty(WebSocket$1, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket$1.prototype, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket$1, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket$1.prototype, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket$1, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket$1.prototype, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket$1, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    Object.defineProperty(WebSocket$1.prototype, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "isPaused",
      "protocol",
      "readyState",
      "url"
    ].forEach((property) => {
      Object.defineProperty(WebSocket$1.prototype, property, { enumerable: true });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket$1.prototype, `on${method}`, {
        enumerable: true,
        get() {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute])
              return listener[kListener];
          }
          return null;
        },
        set(handler) {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) {
              this.removeListener(method, listener);
              break;
            }
          }
          if (typeof handler !== "function")
            return;
          this.addEventListener(method, handler, {
            [kForOnEventAttribute]: true
          });
        }
      });
    });
    WebSocket$1.prototype.addEventListener = addEventListener2;
    WebSocket$1.prototype.removeEventListener = removeEventListener;
    websocket = WebSocket$1;
    WebSocket$2 = /* @__PURE__ */ getDefaultExportFromCjs(websocket);
    ({ tokenChars } = validationExports);
    subprotocol$1 = { parse };
    EventEmitter = import_events.default;
    http = import_http.default;
    ({ createHash } = import_crypto.default);
    extension = extension$1;
    PerMessageDeflate2 = permessageDeflate;
    subprotocol = subprotocol$1;
    WebSocket22 = websocket;
    ({ GUID, kWebSocket } = constants);
    keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    RUNNING = 0;
    CLOSING = 1;
    CLOSED = 2;
    WebSocketServer = class extends EventEmitter {
      /**
       * Create a `WebSocketServer` instance.
       *
       * @param {Object} options Configuration options
       * @param {Number} [options.backlog=511] The maximum length of the queue of
       *     pending connections
       * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
       *     track clients
       * @param {Function} [options.handleProtocols] A hook to handle protocols
       * @param {String} [options.host] The hostname where to bind the server
       * @param {Number} [options.maxPayload=104857600] The maximum allowed message
       *     size
       * @param {Boolean} [options.noServer=false] Enable no server mode
       * @param {String} [options.path] Accept only connections matching this path
       * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
       *     permessage-deflate
       * @param {Number} [options.port] The port where to bind the server
       * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
       *     server to use
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @param {Function} [options.verifyClient] A hook to reject connections
       * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
       *     class to use. It must be the `WebSocket` class or class that extends it
       * @param {Function} [callback] A listener for the `listening` event
       */
      constructor(options, callback) {
        super();
        options = {
          maxPayload: 100 * 1024 * 1024,
          skipUTF8Validation: false,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          verifyClient: null,
          noServer: false,
          backlog: null,
          // use default (511 as implemented in net.js)
          server: null,
          host: null,
          path: null,
          port: null,
          WebSocket: WebSocket22,
          ...options
        };
        if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
          throw new TypeError(
            'One and only one of the "port", "server", or "noServer" options must be specified'
          );
        }
        if (options.port != null) {
          this._server = http.createServer((req, res) => {
            const body = http.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(
            options.port,
            options.host,
            options.backlog,
            callback
          );
        } else if (options.server) {
          this._server = options.server;
        }
        if (this._server) {
          const emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head) => {
              this.handleUpgrade(req, socket, head, emitConnection);
            }
          });
        }
        if (options.perMessageDeflate === true)
          options.perMessageDeflate = {};
        if (options.clientTracking) {
          this.clients = /* @__PURE__ */ new Set();
          this._shouldEmitClose = false;
        }
        this.options = options;
        this._state = RUNNING;
      }
      /**
       * Returns the bound address, the address family name, and port of the server
       * as reported by the operating system if listening on an IP socket.
       * If the server is listening on a pipe or UNIX domain socket, the name is
       * returned as a string.
       *
       * @return {(Object|String|null)} The address of the server
       * @public
       */
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server)
          return null;
        return this._server.address();
      }
      /**
       * Stop the server from accepting new connections and emit the `'close'` event
       * when all existing connections are closed.
       *
       * @param {Function} [cb] A one-time listener for the `'close'` event
       * @public
       */
      close(cb) {
        if (this._state === CLOSED) {
          if (cb) {
            this.once("close", () => {
              cb(new Error("The server is not running"));
            });
          }
          process.nextTick(emitClose, this);
          return;
        }
        if (cb)
          this.once("close", cb);
        if (this._state === CLOSING)
          return;
        this._state = CLOSING;
        if (this.options.noServer || this.options.server) {
          if (this._server) {
            this._removeListeners();
            this._removeListeners = this._server = null;
          }
          if (this.clients) {
            if (!this.clients.size) {
              process.nextTick(emitClose, this);
            } else {
              this._shouldEmitClose = true;
            }
          } else {
            process.nextTick(emitClose, this);
          }
        } else {
          const server = this._server;
          this._removeListeners();
          this._removeListeners = this._server = null;
          server.close(() => {
            emitClose(this);
          });
        }
      }
      /**
       * See if a given request should be handled by this server instance.
       *
       * @param {http.IncomingMessage} req Request object to inspect
       * @return {Boolean} `true` if the request is valid, else `false`
       * @public
       */
      shouldHandle(req) {
        if (this.options.path) {
          const index = req.url.indexOf("?");
          const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
          if (pathname !== this.options.path)
            return false;
        }
        return true;
      }
      /**
       * Handle a HTTP Upgrade request.
       *
       * @param {http.IncomingMessage} req The request object
       * @param {(net.Socket|tls.Socket)} socket The network socket between the
       *     server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @public
       */
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        const key = req.headers["sec-websocket-key"];
        const version = +req.headers["sec-websocket-version"];
        if (req.method !== "GET") {
          const message = "Invalid HTTP method";
          abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
          return;
        }
        if (req.headers.upgrade.toLowerCase() !== "websocket") {
          const message = "Invalid Upgrade header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (!key || !keyRegex.test(key)) {
          const message = "Missing or invalid Sec-WebSocket-Key header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (version !== 8 && version !== 13) {
          const message = "Missing or invalid Sec-WebSocket-Version header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (!this.shouldHandle(req)) {
          abortHandshake(socket, 400);
          return;
        }
        const secWebSocketProtocol = req.headers["sec-websocket-protocol"];
        let protocols = /* @__PURE__ */ new Set();
        if (secWebSocketProtocol !== void 0) {
          try {
            protocols = subprotocol.parse(secWebSocketProtocol);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Protocol header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        const secWebSocketExtensions = req.headers["sec-websocket-extensions"];
        const extensions = {};
        if (this.options.perMessageDeflate && secWebSocketExtensions !== void 0) {
          const perMessageDeflate = new PerMessageDeflate2(
            this.options.perMessageDeflate,
            true,
            this.options.maxPayload
          );
          try {
            const offers = extension.parse(secWebSocketExtensions);
            if (offers[PerMessageDeflate2.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate2.extensionName]);
              extensions[PerMessageDeflate2.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            const message = "Invalid or unacceptable Sec-WebSocket-Extensions header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code || 401, message, headers);
              }
              this.completeUpgrade(
                extensions,
                key,
                protocols,
                req,
                socket,
                head,
                cb
              );
            });
            return;
          }
          if (!this.options.verifyClient(info))
            return abortHandshake(socket, 401);
        }
        this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
      }
      /**
       * Upgrade the connection to WebSocket.
       *
       * @param {Object} extensions The accepted extensions
       * @param {String} key The value of the `Sec-WebSocket-Key` header
       * @param {Set} protocols The subprotocols
       * @param {http.IncomingMessage} req The request object
       * @param {(net.Socket|tls.Socket)} socket The network socket between the
       *     server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @throws {Error} If called more than once with the same socket
       * @private
       */
      completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
        if (!socket.readable || !socket.writable)
          return socket.destroy();
        if (socket[kWebSocket]) {
          throw new Error(
            "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
          );
        }
        if (this._state > RUNNING)
          return abortHandshake(socket, 503);
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new this.options.WebSocket(null);
        if (protocols.size) {
          const protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws._protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate2.extensionName]) {
          const params = extensions[PerMessageDeflate2.extensionName].params;
          const value = extension.format({
            [PerMessageDeflate2.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head, {
          maxPayload: this.options.maxPayload,
          skipUTF8Validation: this.options.skipUTF8Validation
        });
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => {
            this.clients.delete(ws);
            if (this._shouldEmitClose && !this.clients.size) {
              process.nextTick(emitClose, this);
            }
          });
        }
        cb(ws, req);
      }
    };
    websocketServer = WebSocketServer;
    websocketServer$1 = /* @__PURE__ */ getDefaultExportFromCjs(websocketServer);
  }
});

// node_modules/eventsource/lib/eventsource.js
var require_eventsource = __commonJS({
  "node_modules/eventsource/lib/eventsource.js"(exports, module2) {
    var parse2 = require("url").parse;
    var events = require("events");
    var https2 = require("https");
    var http2 = require("http");
    var util = require("util");
    var httpsOptions = [
      "pfx",
      "key",
      "passphrase",
      "cert",
      "ca",
      "ciphers",
      "rejectUnauthorized",
      "secureProtocol",
      "servername",
      "checkServerIdentity"
    ];
    var bom = [239, 187, 191];
    var colon = 58;
    var space = 32;
    var lineFeed = 10;
    var carriageReturn = 13;
    var maxBufferAheadAllocation = 1024 * 256;
    var reUnsafeHeader = /^(cookie|authorization)$/i;
    function hasBom(buf) {
      return bom.every(function(charCode, index) {
        return buf[index] === charCode;
      });
    }
    function EventSource2(url, eventSourceInitDict) {
      var readyState = EventSource2.CONNECTING;
      var headers = eventSourceInitDict && eventSourceInitDict.headers;
      var hasNewOrigin = false;
      Object.defineProperty(this, "readyState", {
        get: function() {
          return readyState;
        }
      });
      Object.defineProperty(this, "url", {
        get: function() {
          return url;
        }
      });
      var self = this;
      self.reconnectInterval = 1e3;
      self.connectionInProgress = false;
      function onConnectionClosed(message) {
        if (readyState === EventSource2.CLOSED)
          return;
        readyState = EventSource2.CONNECTING;
        _emit("error", new Event2("error", { message }));
        if (reconnectUrl) {
          url = reconnectUrl;
          reconnectUrl = null;
          hasNewOrigin = false;
        }
        setTimeout(function() {
          if (readyState !== EventSource2.CONNECTING || self.connectionInProgress) {
            return;
          }
          self.connectionInProgress = true;
          connect();
        }, self.reconnectInterval);
      }
      var req;
      var lastEventId = "";
      if (headers && headers["Last-Event-ID"]) {
        lastEventId = headers["Last-Event-ID"];
        delete headers["Last-Event-ID"];
      }
      var discardTrailingNewline = false;
      var data = "";
      var eventName = "";
      var reconnectUrl = null;
      function connect() {
        var options = parse2(url);
        var isSecure = options.protocol === "https:";
        options.headers = { "Cache-Control": "no-cache", "Accept": "text/event-stream" };
        if (lastEventId)
          options.headers["Last-Event-ID"] = lastEventId;
        if (headers) {
          var reqHeaders = hasNewOrigin ? removeUnsafeHeaders(headers) : headers;
          for (var i in reqHeaders) {
            var header = reqHeaders[i];
            if (header) {
              options.headers[i] = header;
            }
          }
        }
        options.rejectUnauthorized = !(eventSourceInitDict && !eventSourceInitDict.rejectUnauthorized);
        if (eventSourceInitDict && eventSourceInitDict.createConnection !== void 0) {
          options.createConnection = eventSourceInitDict.createConnection;
        }
        var useProxy = eventSourceInitDict && eventSourceInitDict.proxy;
        if (useProxy) {
          var proxy = parse2(eventSourceInitDict.proxy);
          isSecure = proxy.protocol === "https:";
          options.protocol = isSecure ? "https:" : "http:";
          options.path = url;
          options.headers.Host = options.host;
          options.hostname = proxy.hostname;
          options.host = proxy.host;
          options.port = proxy.port;
        }
        if (eventSourceInitDict && eventSourceInitDict.https) {
          for (var optName in eventSourceInitDict.https) {
            if (httpsOptions.indexOf(optName) === -1) {
              continue;
            }
            var option = eventSourceInitDict.https[optName];
            if (option !== void 0) {
              options[optName] = option;
            }
          }
        }
        if (eventSourceInitDict && eventSourceInitDict.withCredentials !== void 0) {
          options.withCredentials = eventSourceInitDict.withCredentials;
        }
        req = (isSecure ? https2 : http2).request(options, function(res) {
          self.connectionInProgress = false;
          if (res.statusCode === 500 || res.statusCode === 502 || res.statusCode === 503 || res.statusCode === 504) {
            _emit("error", new Event2("error", { status: res.statusCode, message: res.statusMessage }));
            onConnectionClosed();
            return;
          }
          if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
            var location2 = res.headers.location;
            if (!location2) {
              _emit("error", new Event2("error", { status: res.statusCode, message: res.statusMessage }));
              return;
            }
            var prevOrigin = new URL(url).origin;
            var nextOrigin = new URL(location2).origin;
            hasNewOrigin = prevOrigin !== nextOrigin;
            if (res.statusCode === 307)
              reconnectUrl = url;
            url = location2;
            process.nextTick(connect);
            return;
          }
          if (res.statusCode !== 200) {
            _emit("error", new Event2("error", { status: res.statusCode, message: res.statusMessage }));
            return self.close();
          }
          readyState = EventSource2.OPEN;
          res.on("close", function() {
            res.removeAllListeners("close");
            res.removeAllListeners("end");
            onConnectionClosed();
          });
          res.on("end", function() {
            res.removeAllListeners("close");
            res.removeAllListeners("end");
            onConnectionClosed();
          });
          _emit("open", new Event2("open"));
          var buf;
          var newBuffer;
          var startingPos = 0;
          var startingFieldLength = -1;
          var newBufferSize = 0;
          var bytesUsed = 0;
          res.on("data", function(chunk) {
            if (!buf) {
              buf = chunk;
              if (hasBom(buf)) {
                buf = buf.slice(bom.length);
              }
              bytesUsed = buf.length;
            } else {
              if (chunk.length > buf.length - bytesUsed) {
                newBufferSize = buf.length * 2 + chunk.length;
                if (newBufferSize > maxBufferAheadAllocation) {
                  newBufferSize = buf.length + chunk.length + maxBufferAheadAllocation;
                }
                newBuffer = Buffer.alloc(newBufferSize);
                buf.copy(newBuffer, 0, 0, bytesUsed);
                buf = newBuffer;
              }
              chunk.copy(buf, bytesUsed);
              bytesUsed += chunk.length;
            }
            var pos = 0;
            var length = bytesUsed;
            while (pos < length) {
              if (discardTrailingNewline) {
                if (buf[pos] === lineFeed) {
                  ++pos;
                }
                discardTrailingNewline = false;
              }
              var lineLength = -1;
              var fieldLength = startingFieldLength;
              var c;
              for (var i2 = startingPos; lineLength < 0 && i2 < length; ++i2) {
                c = buf[i2];
                if (c === colon) {
                  if (fieldLength < 0) {
                    fieldLength = i2 - pos;
                  }
                } else if (c === carriageReturn) {
                  discardTrailingNewline = true;
                  lineLength = i2 - pos;
                } else if (c === lineFeed) {
                  lineLength = i2 - pos;
                }
              }
              if (lineLength < 0) {
                startingPos = length - pos;
                startingFieldLength = fieldLength;
                break;
              } else {
                startingPos = 0;
                startingFieldLength = -1;
              }
              parseEventStreamLine(buf, pos, fieldLength, lineLength);
              pos += lineLength + 1;
            }
            if (pos === length) {
              buf = void 0;
              bytesUsed = 0;
            } else if (pos > 0) {
              buf = buf.slice(pos, bytesUsed);
              bytesUsed = buf.length;
            }
          });
        });
        req.on("error", function(err) {
          self.connectionInProgress = false;
          onConnectionClosed(err.message);
        });
        if (req.setNoDelay)
          req.setNoDelay(true);
        req.end();
      }
      connect();
      function _emit() {
        if (self.listeners(arguments[0]).length > 0) {
          self.emit.apply(self, arguments);
        }
      }
      this._close = function() {
        if (readyState === EventSource2.CLOSED)
          return;
        readyState = EventSource2.CLOSED;
        if (req.abort)
          req.abort();
        if (req.xhr && req.xhr.abort)
          req.xhr.abort();
      };
      function parseEventStreamLine(buf, pos, fieldLength, lineLength) {
        if (lineLength === 0) {
          if (data.length > 0) {
            var type = eventName || "message";
            _emit(type, new MessageEvent2(type, {
              data: data.slice(0, -1),
              // remove trailing newline
              lastEventId,
              origin: new URL(url).origin
            }));
            data = "";
          }
          eventName = void 0;
        } else if (fieldLength > 0) {
          var noValue = fieldLength < 0;
          var step = 0;
          var field = buf.slice(pos, pos + (noValue ? lineLength : fieldLength)).toString();
          if (noValue) {
            step = lineLength;
          } else if (buf[pos + fieldLength + 1] !== space) {
            step = fieldLength + 1;
          } else {
            step = fieldLength + 2;
          }
          pos += step;
          var valueLength = lineLength - step;
          var value = buf.slice(pos, pos + valueLength).toString();
          if (field === "data") {
            data += value + "\n";
          } else if (field === "event") {
            eventName = value;
          } else if (field === "id") {
            lastEventId = value;
          } else if (field === "retry") {
            var retry = parseInt(value, 10);
            if (!Number.isNaN(retry)) {
              self.reconnectInterval = retry;
            }
          }
        }
      }
    }
    module2.exports = EventSource2;
    util.inherits(EventSource2, events.EventEmitter);
    EventSource2.prototype.constructor = EventSource2;
    ["open", "error", "message"].forEach(function(method) {
      Object.defineProperty(EventSource2.prototype, "on" + method, {
        /**
         * Returns the current listener
         *
         * @return {Mixed} the set function or undefined
         * @api private
         */
        get: function get() {
          var listener = this.listeners(method)[0];
          return listener ? listener._listener ? listener._listener : listener : void 0;
        },
        /**
         * Start listening for events
         *
         * @param {Function} listener the listener
         * @return {Mixed} the set function or undefined
         * @api private
         */
        set: function set(listener) {
          this.removeAllListeners(method);
          this.addEventListener(method, listener);
        }
      });
    });
    Object.defineProperty(EventSource2, "CONNECTING", { enumerable: true, value: 0 });
    Object.defineProperty(EventSource2, "OPEN", { enumerable: true, value: 1 });
    Object.defineProperty(EventSource2, "CLOSED", { enumerable: true, value: 2 });
    EventSource2.prototype.CONNECTING = 0;
    EventSource2.prototype.OPEN = 1;
    EventSource2.prototype.CLOSED = 2;
    EventSource2.prototype.close = function() {
      this._close();
    };
    EventSource2.prototype.addEventListener = function addEventListener3(type, listener) {
      if (typeof listener === "function") {
        listener._listener = listener;
        this.on(type, listener);
      }
    };
    EventSource2.prototype.dispatchEvent = function dispatchEvent(event) {
      if (!event.type) {
        throw new Error("UNSPECIFIED_EVENT_TYPE_ERR");
      }
      this.emit(event.type, event.detail);
    };
    EventSource2.prototype.removeEventListener = function removeEventListener2(type, listener) {
      if (typeof listener === "function") {
        listener._listener = void 0;
        this.removeListener(type, listener);
      }
    };
    function Event2(type, optionalProperties) {
      Object.defineProperty(this, "type", { writable: false, value: type, enumerable: true });
      if (optionalProperties) {
        for (var f in optionalProperties) {
          if (optionalProperties.hasOwnProperty(f)) {
            Object.defineProperty(this, f, { writable: false, value: optionalProperties[f], enumerable: true });
          }
        }
      }
    }
    function MessageEvent2(type, eventInitDict) {
      Object.defineProperty(this, "type", { writable: false, value: type, enumerable: true });
      for (var f in eventInitDict) {
        if (eventInitDict.hasOwnProperty(f)) {
          Object.defineProperty(this, f, { writable: false, value: eventInitDict[f], enumerable: true });
        }
      }
    }
    function removeUnsafeHeaders(headers) {
      var safe = {};
      for (var key in headers) {
        if (reUnsafeHeader.test(key)) {
          continue;
        }
        safe[key] = headers[key];
      }
      return safe;
    }
  }
});

// node_modules/@gradio/client/dist/index.js
var fn = new Intl.Collator(0, { numeric: 1 }).compare;
function semiver(a, b, bool) {
  a = a.split(".");
  b = b.split(".");
  return fn(a[0], b[0]) || fn(a[1], b[1]) || (b[2] = b.slice(2).join("."), bool = /[.-]/.test(a[2] = a.slice(2).join(".")), bool == /[.-]/.test(b[2]) ? fn(a[2], b[2]) : bool ? -1 : 1);
}
function resolve_root(base_url, root_path, prioritize_base) {
  if (root_path.startsWith("http://") || root_path.startsWith("https://")) {
    return prioritize_base ? base_url : root_path;
  }
  return base_url + root_path;
}
function determine_protocol(endpoint) {
  if (endpoint.startsWith("http")) {
    const { protocol, host } = new URL(endpoint);
    if (host.endsWith("hf.space")) {
      return {
        ws_protocol: "wss",
        host,
        http_protocol: protocol
      };
    }
    return {
      ws_protocol: protocol === "https:" ? "wss" : "ws",
      http_protocol: protocol,
      host
    };
  } else if (endpoint.startsWith("file:")) {
    return {
      ws_protocol: "ws",
      http_protocol: "http:",
      host: "lite.local"
      // Special fake hostname only used for this case. This matches the hostname allowed in `is_self_host()` in `js/wasm/network/host.ts`.
    };
  }
  return {
    ws_protocol: "wss",
    http_protocol: "https:",
    host: endpoint
  };
}
var RE_SPACE_NAME = /^[^\/]*\/[^\/]*$/;
var RE_SPACE_DOMAIN = /.*hf\.space\/{0,1}$/;
async function process_endpoint(app_reference, token) {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const _app_reference = app_reference.trim();
  if (RE_SPACE_NAME.test(_app_reference)) {
    try {
      const res = await fetch(
        `https://huggingface.co/api/spaces/${_app_reference}/host`,
        { headers }
      );
      if (res.status !== 200)
        throw new Error("Space metadata could not be loaded.");
      const _host = (await res.json()).host;
      return {
        space_id: app_reference,
        ...determine_protocol(_host)
      };
    } catch (e) {
      throw new Error("Space metadata could not be loaded." + e.message);
    }
  }
  if (RE_SPACE_DOMAIN.test(_app_reference)) {
    const { ws_protocol, http_protocol, host } = determine_protocol(_app_reference);
    return {
      space_id: host.replace(".hf.space", ""),
      ws_protocol,
      http_protocol,
      host
    };
  }
  return {
    space_id: false,
    ...determine_protocol(_app_reference)
  };
}
function map_names_to_ids(fns) {
  let apis = {};
  fns.forEach(({ api_name }, i) => {
    if (api_name)
      apis[api_name] = i;
  });
  return apis;
}
var RE_DISABLED_DISCUSSION = /^(?=[^]*\b[dD]iscussions{0,1}\b)(?=[^]*\b[dD]isabled\b)[^]*$/;
async function discussions_enabled(space_id) {
  try {
    const r = await fetch(
      `https://huggingface.co/api/spaces/${space_id}/discussions`,
      {
        method: "HEAD"
      }
    );
    const error2 = r.headers.get("x-error-message");
    if (error2 && RE_DISABLED_DISCUSSION.test(error2))
      return false;
    return true;
  } catch (e) {
    return false;
  }
}
function apply_edit(target, path2, action, value) {
  if (path2.length === 0) {
    if (action === "replace") {
      return value;
    } else if (action === "append") {
      return target + value;
    }
    throw new Error(`Unsupported action: ${action}`);
  }
  let current = target;
  for (let i = 0; i < path2.length - 1; i++) {
    current = current[path2[i]];
  }
  const last_path = path2[path2.length - 1];
  switch (action) {
    case "replace":
      current[last_path] = value;
      break;
    case "append":
      current[last_path] += value;
      break;
    case "add":
      if (Array.isArray(current)) {
        current.splice(Number(last_path), 0, value);
      } else {
        current[last_path] = value;
      }
      break;
    case "delete":
      if (Array.isArray(current)) {
        current.splice(Number(last_path), 1);
      } else {
        delete current[last_path];
      }
      break;
    default:
      throw new Error(`Unknown action: ${action}`);
  }
  return target;
}
function apply_diff(obj, diff) {
  diff.forEach(([action, path2, value]) => {
    obj = apply_edit(obj, path2, action, value);
  });
  return obj;
}
var FileData = class {
  constructor({
    path: path2,
    url,
    orig_name,
    size,
    blob,
    is_stream,
    mime_type,
    alt_text
  }) {
    this.path = path2;
    this.url = url;
    this.orig_name = orig_name;
    this.size = size;
    this.blob = url ? void 0 : blob;
    this.is_stream = is_stream;
    this.mime_type = mime_type;
    this.alt_text = alt_text;
  }
};
var QUEUE_FULL_MSG = "This application is too busy. Keep trying!";
var BROKEN_CONNECTION_MSG = "Connection errored out.";
var NodeBlob;
function api_factory(fetch_implementation, EventSource_factory) {
  return { post_data: post_data2, upload_files: upload_files2, client: client2, handle_blob: handle_blob2 };
  async function post_data2(url, body, token) {
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    try {
      var response = await fetch_implementation(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers
      });
    } catch (e) {
      return [{ error: BROKEN_CONNECTION_MSG }, 500];
    }
    let output;
    let status;
    try {
      output = await response.json();
      status = response.status;
    } catch (e) {
      output = { error: `Could not parse server response: ${e}` };
      status = 500;
    }
    return [output, status];
  }
  async function upload_files2(root, files, token, upload_id) {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const chunkSize = 1e3;
    const uploadResponses = [];
    for (let i = 0; i < files.length; i += chunkSize) {
      const chunk = files.slice(i, i + chunkSize);
      const formData = new FormData();
      chunk.forEach((file) => {
        formData.append("files", file);
      });
      try {
        const upload_url = upload_id ? `${root}/upload?upload_id=${upload_id}` : `${root}/upload`;
        var response = await fetch_implementation(upload_url, {
          method: "POST",
          body: formData,
          headers
        });
      } catch (e) {
        return { error: BROKEN_CONNECTION_MSG };
      }
      const output = await response.json();
      uploadResponses.push(...output);
    }
    return { files: uploadResponses };
  }
  async function client2(app_reference, options = {}) {
    return new Promise(async (res) => {
      const { status_callback, hf_token } = options;
      const return_obj = {
        predict,
        submit,
        view_api,
        component_server
      };
      if ((typeof window === "undefined" || !("WebSocket" in window)) && !global.Websocket) {
        const ws = await Promise.resolve().then(() => (init_wrapper_6f348d45(), wrapper_6f348d45_exports));
        NodeBlob = (await import("node:buffer")).Blob;
        global.WebSocket = ws.WebSocket;
      }
      const { ws_protocol, http_protocol, host, space_id } = await process_endpoint(app_reference, hf_token);
      const session_hash = Math.random().toString(36).substring(2);
      const last_status = {};
      let stream_open = false;
      let pending_stream_messages = {};
      let pending_diff_streams = {};
      let event_stream = null;
      const event_callbacks = {};
      const unclosed_events = /* @__PURE__ */ new Set();
      let config;
      let api_map = {};
      let jwt = false;
      if (hf_token && space_id) {
        jwt = await get_jwt(space_id, hf_token);
      }
      async function config_success(_config) {
        config = _config;
        api_map = map_names_to_ids((_config == null ? void 0 : _config.dependencies) || []);
        if (config.auth_required) {
          return {
            config,
            ...return_obj
          };
        }
        try {
          api = await view_api(config);
        } catch (e) {
          console.error(`Could not get api details: ${e.message}`);
        }
        return {
          config,
          ...return_obj
        };
      }
      let api;
      async function handle_space_sucess(status) {
        if (status_callback)
          status_callback(status);
        if (status.status === "running")
          try {
            config = await resolve_config(
              fetch_implementation,
              `${http_protocol}//${host}`,
              hf_token
            );
            const _config = await config_success(config);
            res(_config);
          } catch (e) {
            console.error(e);
            if (status_callback) {
              status_callback({
                status: "error",
                message: "Could not load this space.",
                load_status: "error",
                detail: "NOT_FOUND"
              });
            }
          }
      }
      try {
        config = await resolve_config(
          fetch_implementation,
          `${http_protocol}//${host}`,
          hf_token
        );
        const _config = await config_success(config);
        res(_config);
      } catch (e) {
        console.error(e);
        if (space_id) {
          check_space_status(
            space_id,
            RE_SPACE_NAME.test(space_id) ? "space_name" : "subdomain",
            handle_space_sucess
          );
        } else {
          if (status_callback)
            status_callback({
              status: "error",
              message: "Could not load this space.",
              load_status: "error",
              detail: "NOT_FOUND"
            });
        }
      }
      function predict(endpoint, data, event_data) {
        let data_returned = false;
        let status_complete = false;
        let dependency;
        if (typeof endpoint === "number") {
          dependency = config.dependencies[endpoint];
        } else {
          const trimmed_endpoint = endpoint.replace(/^\//, "");
          dependency = config.dependencies[api_map[trimmed_endpoint]];
        }
        if (dependency.types.continuous) {
          throw new Error(
            "Cannot call predict on this function as it may run forever. Use submit instead"
          );
        }
        return new Promise((res2, rej) => {
          const app = submit(endpoint, data, event_data);
          let result;
          app.on("data", (d) => {
            if (status_complete) {
              app.destroy();
              res2(d);
            }
            data_returned = true;
            result = d;
          }).on("status", (status) => {
            if (status.stage === "error")
              rej(status);
            if (status.stage === "complete") {
              status_complete = true;
              if (data_returned) {
                app.destroy();
                res2(result);
              }
            }
          });
        });
      }
      function submit(endpoint, data, event_data, trigger_id = null) {
        let fn_index;
        let api_info;
        if (typeof endpoint === "number") {
          fn_index = endpoint;
          api_info = api.unnamed_endpoints[fn_index];
        } else {
          const trimmed_endpoint = endpoint.replace(/^\//, "");
          fn_index = api_map[trimmed_endpoint];
          api_info = api.named_endpoints[endpoint.trim()];
        }
        if (typeof fn_index !== "number") {
          throw new Error(
            "There is no endpoint matching that name of fn_index matching that number."
          );
        }
        let websocket2;
        let eventSource;
        let protocol = config.protocol ?? "ws";
        const _endpoint = typeof endpoint === "number" ? "/predict" : endpoint;
        let payload;
        let event_id = null;
        let complete = false;
        const listener_map = {};
        let url_params = "";
        if (typeof window !== "undefined") {
          url_params = new URLSearchParams(window.location.search).toString();
        }
        handle_blob2(`${config.root}`, data, api_info, hf_token).then(
          (_payload) => {
            payload = {
              data: _payload || [],
              event_data,
              fn_index,
              trigger_id
            };
            if (skip_queue(fn_index, config)) {
              fire_event({
                type: "status",
                endpoint: _endpoint,
                stage: "pending",
                queue: false,
                fn_index,
                time: /* @__PURE__ */ new Date()
              });
              post_data2(
                `${config.root}/run${_endpoint.startsWith("/") ? _endpoint : `/${_endpoint}`}${url_params ? "?" + url_params : ""}`,
                {
                  ...payload,
                  session_hash
                },
                hf_token
              ).then(([output, status_code]) => {
                const data2 = output.data;
                if (status_code == 200) {
                  fire_event({
                    type: "data",
                    endpoint: _endpoint,
                    fn_index,
                    data: data2,
                    time: /* @__PURE__ */ new Date()
                  });
                  fire_event({
                    type: "status",
                    endpoint: _endpoint,
                    fn_index,
                    stage: "complete",
                    eta: output.average_duration,
                    queue: false,
                    time: /* @__PURE__ */ new Date()
                  });
                } else {
                  fire_event({
                    type: "status",
                    stage: "error",
                    endpoint: _endpoint,
                    fn_index,
                    message: output.error,
                    queue: false,
                    time: /* @__PURE__ */ new Date()
                  });
                }
              }).catch((e) => {
                fire_event({
                  type: "status",
                  stage: "error",
                  message: e.message,
                  endpoint: _endpoint,
                  fn_index,
                  queue: false,
                  time: /* @__PURE__ */ new Date()
                });
              });
            } else if (protocol == "ws") {
              fire_event({
                type: "status",
                stage: "pending",
                queue: true,
                endpoint: _endpoint,
                fn_index,
                time: /* @__PURE__ */ new Date()
              });
              let url = new URL(`${ws_protocol}://${resolve_root(
                host,
                config.path,
                true
              )}
							/queue/join${url_params ? "?" + url_params : ""}`);
              if (jwt) {
                url.searchParams.set("__sign", jwt);
              }
              websocket2 = new WebSocket(url);
              websocket2.onclose = (evt) => {
                if (!evt.wasClean) {
                  fire_event({
                    type: "status",
                    stage: "error",
                    broken: true,
                    message: BROKEN_CONNECTION_MSG,
                    queue: true,
                    endpoint: _endpoint,
                    fn_index,
                    time: /* @__PURE__ */ new Date()
                  });
                }
              };
              websocket2.onmessage = function(event) {
                const _data = JSON.parse(event.data);
                const { type, status, data: data2 } = handle_message(
                  _data,
                  last_status[fn_index]
                );
                if (type === "update" && status && !complete) {
                  fire_event({
                    type: "status",
                    endpoint: _endpoint,
                    fn_index,
                    time: /* @__PURE__ */ new Date(),
                    ...status
                  });
                  if (status.stage === "error") {
                    websocket2.close();
                  }
                } else if (type === "hash") {
                  websocket2.send(JSON.stringify({ fn_index, session_hash }));
                  return;
                } else if (type === "data") {
                  websocket2.send(JSON.stringify({ ...payload, session_hash }));
                } else if (type === "complete") {
                  complete = status;
                } else if (type === "log") {
                  fire_event({
                    type: "log",
                    log: data2.log,
                    level: data2.level,
                    endpoint: _endpoint,
                    fn_index
                  });
                } else if (type === "generating") {
                  fire_event({
                    type: "status",
                    time: /* @__PURE__ */ new Date(),
                    ...status,
                    stage: status == null ? void 0 : status.stage,
                    queue: true,
                    endpoint: _endpoint,
                    fn_index
                  });
                }
                if (data2) {
                  fire_event({
                    type: "data",
                    time: /* @__PURE__ */ new Date(),
                    data: data2.data,
                    endpoint: _endpoint,
                    fn_index
                  });
                  if (complete) {
                    fire_event({
                      type: "status",
                      time: /* @__PURE__ */ new Date(),
                      ...complete,
                      stage: status == null ? void 0 : status.stage,
                      queue: true,
                      endpoint: _endpoint,
                      fn_index
                    });
                    websocket2.close();
                  }
                }
              };
              if (semiver(config.version || "2.0.0", "3.6") < 0) {
                addEventListener(
                  "open",
                  () => websocket2.send(JSON.stringify({ hash: session_hash }))
                );
              }
            } else if (protocol == "sse") {
              fire_event({
                type: "status",
                stage: "pending",
                queue: true,
                endpoint: _endpoint,
                fn_index,
                time: /* @__PURE__ */ new Date()
              });
              var params = new URLSearchParams({
                fn_index: fn_index.toString(),
                session_hash
              }).toString();
              let url = new URL(
                `${config.root}/queue/join?${url_params ? url_params + "&" : ""}${params}`
              );
              eventSource = EventSource_factory(url.toString());
              eventSource.onmessage = async function(event) {
                const _data = JSON.parse(event.data);
                const { type, status, data: data2 } = handle_message(
                  _data,
                  last_status[fn_index]
                );
                if (type === "update" && status && !complete) {
                  fire_event({
                    type: "status",
                    endpoint: _endpoint,
                    fn_index,
                    time: /* @__PURE__ */ new Date(),
                    ...status
                  });
                  if (status.stage === "error") {
                    eventSource.close();
                  }
                } else if (type === "data") {
                  event_id = _data.event_id;
                  let [_, status2] = await post_data2(
                    `${config.root}/queue/data`,
                    {
                      ...payload,
                      session_hash,
                      event_id
                    },
                    hf_token
                  );
                  if (status2 !== 200) {
                    fire_event({
                      type: "status",
                      stage: "error",
                      message: BROKEN_CONNECTION_MSG,
                      queue: true,
                      endpoint: _endpoint,
                      fn_index,
                      time: /* @__PURE__ */ new Date()
                    });
                    eventSource.close();
                  }
                } else if (type === "complete") {
                  complete = status;
                } else if (type === "log") {
                  fire_event({
                    type: "log",
                    log: data2.log,
                    level: data2.level,
                    endpoint: _endpoint,
                    fn_index
                  });
                } else if (type === "generating") {
                  fire_event({
                    type: "status",
                    time: /* @__PURE__ */ new Date(),
                    ...status,
                    stage: status == null ? void 0 : status.stage,
                    queue: true,
                    endpoint: _endpoint,
                    fn_index
                  });
                }
                if (data2) {
                  fire_event({
                    type: "data",
                    time: /* @__PURE__ */ new Date(),
                    data: data2.data,
                    endpoint: _endpoint,
                    fn_index
                  });
                  if (complete) {
                    fire_event({
                      type: "status",
                      time: /* @__PURE__ */ new Date(),
                      ...complete,
                      stage: status == null ? void 0 : status.stage,
                      queue: true,
                      endpoint: _endpoint,
                      fn_index
                    });
                    eventSource.close();
                  }
                }
              };
            } else if (protocol == "sse_v1" || protocol == "sse_v2") {
              fire_event({
                type: "status",
                stage: "pending",
                queue: true,
                endpoint: _endpoint,
                fn_index,
                time: /* @__PURE__ */ new Date()
              });
              post_data2(
                `${config.root}/queue/join?${url_params}`,
                {
                  ...payload,
                  session_hash
                },
                hf_token
              ).then(([response, status]) => {
                if (status === 503) {
                  fire_event({
                    type: "status",
                    stage: "error",
                    message: QUEUE_FULL_MSG,
                    queue: true,
                    endpoint: _endpoint,
                    fn_index,
                    time: /* @__PURE__ */ new Date()
                  });
                } else if (status !== 200) {
                  fire_event({
                    type: "status",
                    stage: "error",
                    message: BROKEN_CONNECTION_MSG,
                    queue: true,
                    endpoint: _endpoint,
                    fn_index,
                    time: /* @__PURE__ */ new Date()
                  });
                } else {
                  event_id = response.event_id;
                  let callback = async function(_data) {
                    try {
                      const { type, status: status2, data: data2 } = handle_message(
                        _data,
                        last_status[fn_index]
                      );
                      if (type == "heartbeat") {
                        return;
                      }
                      if (type === "update" && status2 && !complete) {
                        fire_event({
                          type: "status",
                          endpoint: _endpoint,
                          fn_index,
                          time: /* @__PURE__ */ new Date(),
                          ...status2
                        });
                      } else if (type === "complete") {
                        complete = status2;
                      } else if (type == "unexpected_error") {
                        console.error("Unexpected error", status2 == null ? void 0 : status2.message);
                        fire_event({
                          type: "status",
                          stage: "error",
                          message: (status2 == null ? void 0 : status2.message) || "An Unexpected Error Occurred!",
                          queue: true,
                          endpoint: _endpoint,
                          fn_index,
                          time: /* @__PURE__ */ new Date()
                        });
                      } else if (type === "log") {
                        fire_event({
                          type: "log",
                          log: data2.log,
                          level: data2.level,
                          endpoint: _endpoint,
                          fn_index
                        });
                        return;
                      } else if (type === "generating") {
                        fire_event({
                          type: "status",
                          time: /* @__PURE__ */ new Date(),
                          ...status2,
                          stage: status2 == null ? void 0 : status2.stage,
                          queue: true,
                          endpoint: _endpoint,
                          fn_index
                        });
                        if (data2 && protocol === "sse_v2") {
                          apply_diff_stream(event_id, data2);
                        }
                      }
                      if (data2) {
                        fire_event({
                          type: "data",
                          time: /* @__PURE__ */ new Date(),
                          data: data2.data,
                          endpoint: _endpoint,
                          fn_index
                        });
                        if (complete) {
                          fire_event({
                            type: "status",
                            time: /* @__PURE__ */ new Date(),
                            ...complete,
                            stage: status2 == null ? void 0 : status2.stage,
                            queue: true,
                            endpoint: _endpoint,
                            fn_index
                          });
                        }
                      }
                      if ((status2 == null ? void 0 : status2.stage) === "complete" || (status2 == null ? void 0 : status2.stage) === "error") {
                        if (event_callbacks[event_id]) {
                          delete event_callbacks[event_id];
                        }
                        if (event_id in pending_diff_streams) {
                          delete pending_diff_streams[event_id];
                        }
                      }
                    } catch (e) {
                      console.error("Unexpected client exception", e);
                      fire_event({
                        type: "status",
                        stage: "error",
                        message: "An Unexpected Error Occurred!",
                        queue: true,
                        endpoint: _endpoint,
                        fn_index,
                        time: /* @__PURE__ */ new Date()
                      });
                      close_stream();
                    }
                  };
                  if (event_id in pending_stream_messages) {
                    pending_stream_messages[event_id].forEach(
                      (msg) => callback(msg)
                    );
                    delete pending_stream_messages[event_id];
                  }
                  event_callbacks[event_id] = callback;
                  unclosed_events.add(event_id);
                  if (!stream_open) {
                    open_stream();
                  }
                }
              });
            }
          }
        );
        function apply_diff_stream(event_id2, data2) {
          let is_first_generation = !pending_diff_streams[event_id2];
          if (is_first_generation) {
            pending_diff_streams[event_id2] = [];
            data2.data.forEach((value, i) => {
              pending_diff_streams[event_id2][i] = value;
            });
          } else {
            data2.data.forEach((value, i) => {
              let new_data = apply_diff(
                pending_diff_streams[event_id2][i],
                value
              );
              pending_diff_streams[event_id2][i] = new_data;
              data2.data[i] = new_data;
            });
          }
        }
        function fire_event(event) {
          const narrowed_listener_map = listener_map;
          const listeners = narrowed_listener_map[event.type] || [];
          listeners == null ? void 0 : listeners.forEach((l) => l(event));
        }
        function on(eventType, listener) {
          const narrowed_listener_map = listener_map;
          const listeners = narrowed_listener_map[eventType] || [];
          narrowed_listener_map[eventType] = listeners;
          listeners == null ? void 0 : listeners.push(listener);
          return { on, off, cancel, destroy };
        }
        function off(eventType, listener) {
          const narrowed_listener_map = listener_map;
          let listeners = narrowed_listener_map[eventType] || [];
          listeners = listeners == null ? void 0 : listeners.filter((l) => l !== listener);
          narrowed_listener_map[eventType] = listeners;
          return { on, off, cancel, destroy };
        }
        async function cancel() {
          const _status = {
            stage: "complete",
            queue: false,
            time: /* @__PURE__ */ new Date()
          };
          complete = _status;
          fire_event({
            ..._status,
            type: "status",
            endpoint: _endpoint,
            fn_index
          });
          let cancel_request = {};
          if (protocol === "ws") {
            if (websocket2 && websocket2.readyState === 0) {
              websocket2.addEventListener("open", () => {
                websocket2.close();
              });
            } else {
              websocket2.close();
            }
            cancel_request = { fn_index, session_hash };
          } else {
            eventSource.close();
            cancel_request = { event_id };
          }
          try {
            await fetch_implementation(`${config.root}/reset`, {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              body: JSON.stringify(cancel_request)
            });
          } catch (e) {
            console.warn(
              "The `/reset` endpoint could not be called. Subsequent endpoint results may be unreliable."
            );
          }
        }
        function destroy() {
          for (const event_type in listener_map) {
            listener_map[event_type].forEach((fn2) => {
              off(event_type, fn2);
            });
          }
        }
        return {
          on,
          off,
          cancel,
          destroy
        };
      }
      function open_stream() {
        stream_open = true;
        let params = new URLSearchParams({
          session_hash
        }).toString();
        let url = new URL(`${config.root}/queue/data?${params}`);
        event_stream = EventSource_factory(url.toString());
        event_stream.onmessage = async function(event) {
          let _data = JSON.parse(event.data);
          const event_id = _data.event_id;
          if (!event_id) {
            await Promise.all(
              Object.keys(event_callbacks).map(
                (event_id2) => event_callbacks[event_id2](_data)
              )
            );
          } else if (event_callbacks[event_id]) {
            if (_data.msg === "process_completed") {
              unclosed_events.delete(event_id);
              if (unclosed_events.size === 0) {
                close_stream();
              }
            }
            let fn2 = event_callbacks[event_id];
            window.setTimeout(fn2, 0, _data);
          } else {
            if (!pending_stream_messages[event_id]) {
              pending_stream_messages[event_id] = [];
            }
            pending_stream_messages[event_id].push(_data);
          }
        };
        event_stream.onerror = async function(event) {
          await Promise.all(
            Object.keys(event_callbacks).map(
              (event_id) => event_callbacks[event_id]({
                msg: "unexpected_error",
                message: BROKEN_CONNECTION_MSG
              })
            )
          );
          close_stream();
        };
      }
      function close_stream() {
        stream_open = false;
        event_stream == null ? void 0 : event_stream.close();
      }
      async function component_server(component_id, fn_name, data) {
        var _a;
        const headers = { "Content-Type": "application/json" };
        if (hf_token) {
          headers.Authorization = `Bearer ${hf_token}`;
        }
        let root_url;
        let component = config.components.find(
          (comp) => comp.id === component_id
        );
        if ((_a = component == null ? void 0 : component.props) == null ? void 0 : _a.root_url) {
          root_url = component.props.root_url;
        } else {
          root_url = config.root;
        }
        const response = await fetch_implementation(
          `${root_url}/component_server/`,
          {
            method: "POST",
            body: JSON.stringify({
              data,
              component_id,
              fn_name,
              session_hash
            }),
            headers
          }
        );
        if (!response.ok) {
          throw new Error(
            "Could not connect to component server: " + response.statusText
          );
        }
        const output = await response.json();
        return output;
      }
      async function view_api(config2) {
        if (api)
          return api;
        const headers = { "Content-Type": "application/json" };
        if (hf_token) {
          headers.Authorization = `Bearer ${hf_token}`;
        }
        let response;
        if (semiver(config2.version || "2.0.0", "3.30") < 0) {
          response = await fetch_implementation(
            "https://gradio-space-api-fetcher-v2.hf.space/api",
            {
              method: "POST",
              body: JSON.stringify({
                serialize: false,
                config: JSON.stringify(config2)
              }),
              headers
            }
          );
        } else {
          response = await fetch_implementation(`${config2.root}/info`, {
            headers
          });
        }
        if (!response.ok) {
          throw new Error(BROKEN_CONNECTION_MSG);
        }
        let api_info = await response.json();
        if ("api" in api_info) {
          api_info = api_info.api;
        }
        if (api_info.named_endpoints["/predict"] && !api_info.unnamed_endpoints["0"]) {
          api_info.unnamed_endpoints[0] = api_info.named_endpoints["/predict"];
        }
        const x = transform_api_info(api_info, config2, api_map);
        return x;
      }
    });
  }
  async function handle_blob2(endpoint, data, api_info, token) {
    const blob_refs = await walk_and_store_blobs(
      data,
      void 0,
      [],
      true,
      api_info
    );
    return Promise.all(
      blob_refs.map(async ({ path: path2, blob, type }) => {
        if (blob) {
          const file_url = (await upload_files2(endpoint, [blob], token)).files[0];
          return { path: path2, file_url, type, name: blob == null ? void 0 : blob.name };
        }
        return { path: path2, type };
      })
    ).then((r) => {
      r.forEach(({ path: path2, file_url, type, name }) => {
        if (type === "Gallery") {
          update_object(data, file_url, path2);
        } else if (file_url) {
          const file = new FileData({ path: file_url, orig_name: name });
          update_object(data, file, path2);
        }
      });
      return data;
    });
  }
}
var { post_data, upload_files, client, handle_blob } = api_factory(
  fetch,
  (...args2) => new EventSource(...args2)
);
function get_type(type, component, serializer, signature_type) {
  switch (type.type) {
    case "string":
      return "string";
    case "boolean":
      return "boolean";
    case "number":
      return "number";
  }
  if (serializer === "JSONSerializable" || serializer === "StringSerializable") {
    return "any";
  } else if (serializer === "ListStringSerializable") {
    return "string[]";
  } else if (component === "Image") {
    return signature_type === "parameter" ? "Blob | File | Buffer" : "string";
  } else if (serializer === "FileSerializable") {
    if ((type == null ? void 0 : type.type) === "array") {
      return signature_type === "parameter" ? "(Blob | File | Buffer)[]" : `{ name: string; data: string; size?: number; is_file?: boolean; orig_name?: string}[]`;
    }
    return signature_type === "parameter" ? "Blob | File | Buffer" : `{ name: string; data: string; size?: number; is_file?: boolean; orig_name?: string}`;
  } else if (serializer === "GallerySerializable") {
    return signature_type === "parameter" ? "[(Blob | File | Buffer), (string | null)][]" : `[{ name: string; data: string; size?: number; is_file?: boolean; orig_name?: string}, (string | null))][]`;
  }
}
function get_description(type, serializer) {
  if (serializer === "GallerySerializable") {
    return "array of [file, label] tuples";
  } else if (serializer === "ListStringSerializable") {
    return "array of strings";
  } else if (serializer === "FileSerializable") {
    return "array of files or single file";
  }
  return type.description;
}
function transform_api_info(api_info, config, api_map) {
  const new_data = {
    named_endpoints: {},
    unnamed_endpoints: {}
  };
  for (const key in api_info) {
    const cat = api_info[key];
    for (const endpoint in cat) {
      const dep_index = config.dependencies[endpoint] ? endpoint : api_map[endpoint.replace("/", "")];
      const info = cat[endpoint];
      new_data[key][endpoint] = {};
      new_data[key][endpoint].parameters = {};
      new_data[key][endpoint].returns = {};
      new_data[key][endpoint].type = config.dependencies[dep_index].types;
      new_data[key][endpoint].parameters = info.parameters.map(
        ({ label, component, type, serializer }) => ({
          label,
          component,
          type: get_type(type, component, serializer, "parameter"),
          description: get_description(type, serializer)
        })
      );
      new_data[key][endpoint].returns = info.returns.map(
        ({ label, component, type, serializer }) => ({
          label,
          component,
          type: get_type(type, component, serializer, "return"),
          description: get_description(type, serializer)
        })
      );
    }
  }
  return new_data;
}
async function get_jwt(space, token) {
  try {
    const r = await fetch(`https://huggingface.co/api/spaces/${space}/jwt`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const jwt = (await r.json()).token;
    return jwt || false;
  } catch (e) {
    console.error(e);
    return false;
  }
}
function update_object(object, newValue, stack) {
  while (stack.length > 1) {
    object = object[stack.shift()];
  }
  object[stack.shift()] = newValue;
}
async function walk_and_store_blobs(param, type = void 0, path2 = [], root = false, api_info = void 0) {
  if (Array.isArray(param)) {
    let blob_refs = [];
    await Promise.all(
      param.map(async (v, i) => {
        var _a;
        let new_path = path2.slice();
        new_path.push(i);
        const array_refs = await walk_and_store_blobs(
          param[i],
          root ? ((_a = api_info == null ? void 0 : api_info.parameters[i]) == null ? void 0 : _a.component) || void 0 : type,
          new_path,
          false,
          api_info
        );
        blob_refs = blob_refs.concat(array_refs);
      })
    );
    return blob_refs;
  } else if (globalThis.Buffer && param instanceof globalThis.Buffer) {
    const is_image = type === "Image";
    return [
      {
        path: path2,
        blob: is_image ? false : new NodeBlob([param]),
        type
      }
    ];
  } else if (typeof param === "object") {
    let blob_refs = [];
    for (let key in param) {
      if (param.hasOwnProperty(key)) {
        let new_path = path2.slice();
        new_path.push(key);
        blob_refs = blob_refs.concat(
          await walk_and_store_blobs(
            param[key],
            void 0,
            new_path,
            false,
            api_info
          )
        );
      }
    }
    return blob_refs;
  }
  return [];
}
function skip_queue(id, config) {
  var _a, _b, _c, _d;
  return !(((_b = (_a = config == null ? void 0 : config.dependencies) == null ? void 0 : _a[id]) == null ? void 0 : _b.queue) === null ? config.enable_queue : (_d = (_c = config == null ? void 0 : config.dependencies) == null ? void 0 : _c[id]) == null ? void 0 : _d.queue) || false;
}
async function resolve_config(fetch_implementation, endpoint, token) {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (typeof window !== "undefined" && window.gradio_config && location.origin !== "http://localhost:9876" && !window.gradio_config.dev_mode) {
    const path2 = window.gradio_config.root;
    const config = window.gradio_config;
    config.root = resolve_root(endpoint, config.root, false);
    return { ...config, path: path2 };
  } else if (endpoint) {
    let response = await fetch_implementation(`${endpoint}/config`, {
      headers
    });
    if (response.status === 200) {
      const config = await response.json();
      config.path = config.path ?? "";
      config.root = endpoint;
      return config;
    }
    throw new Error("Could not get config.");
  }
  throw new Error("No config or app endpoint found");
}
async function check_space_status(id, type, status_callback) {
  let endpoint = type === "subdomain" ? `https://huggingface.co/api/spaces/by-subdomain/${id}` : `https://huggingface.co/api/spaces/${id}`;
  let response;
  let _status;
  try {
    response = await fetch(endpoint);
    _status = response.status;
    if (_status !== 200) {
      throw new Error();
    }
    response = await response.json();
  } catch (e) {
    status_callback({
      status: "error",
      load_status: "error",
      message: "Could not get space status",
      detail: "NOT_FOUND"
    });
    return;
  }
  if (!response || _status !== 200)
    return;
  const {
    runtime: { stage },
    id: space_name
  } = response;
  switch (stage) {
    case "STOPPED":
    case "SLEEPING":
      status_callback({
        status: "sleeping",
        load_status: "pending",
        message: "Space is asleep. Waking it up...",
        detail: stage
      });
      setTimeout(() => {
        check_space_status(id, type, status_callback);
      }, 1e3);
      break;
    case "PAUSED":
      status_callback({
        status: "paused",
        load_status: "error",
        message: "This space has been paused by the author. If you would like to try this demo, consider duplicating the space.",
        detail: stage,
        discussions_enabled: await discussions_enabled(space_name)
      });
      break;
    case "RUNNING":
    case "RUNNING_BUILDING":
      status_callback({
        status: "running",
        load_status: "complete",
        message: "",
        detail: stage
      });
      break;
    case "BUILDING":
      status_callback({
        status: "building",
        load_status: "pending",
        message: "Space is building...",
        detail: stage
      });
      setTimeout(() => {
        check_space_status(id, type, status_callback);
      }, 1e3);
      break;
    default:
      status_callback({
        status: "space_error",
        load_status: "error",
        message: "This space is experiencing an issue.",
        detail: stage,
        discussions_enabled: await discussions_enabled(space_name)
      });
      break;
  }
}
function handle_message(data, last_status) {
  const queue = true;
  switch (data.msg) {
    case "send_data":
      return { type: "data" };
    case "send_hash":
      return { type: "hash" };
    case "queue_full":
      return {
        type: "update",
        status: {
          queue,
          message: QUEUE_FULL_MSG,
          stage: "error",
          code: data.code,
          success: data.success
        }
      };
    case "heartbeat":
      return {
        type: "heartbeat"
      };
    case "unexpected_error":
      return {
        type: "unexpected_error",
        status: {
          queue,
          message: data.message,
          stage: "error",
          success: false
        }
      };
    case "estimation":
      return {
        type: "update",
        status: {
          queue,
          stage: last_status || "pending",
          code: data.code,
          size: data.queue_size,
          position: data.rank,
          eta: data.rank_eta,
          success: data.success
        }
      };
    case "progress":
      return {
        type: "update",
        status: {
          queue,
          stage: "pending",
          code: data.code,
          progress_data: data.progress_data,
          success: data.success
        }
      };
    case "log":
      return { type: "log", data };
    case "process_generating":
      return {
        type: "generating",
        status: {
          queue,
          message: !data.success ? data.output.error : null,
          stage: data.success ? "generating" : "error",
          code: data.code,
          progress_data: data.progress_data,
          eta: data.average_duration
        },
        data: data.success ? data.output : null
      };
    case "process_completed":
      if ("error" in data.output) {
        return {
          type: "update",
          status: {
            queue,
            message: data.output.error,
            stage: "error",
            code: data.code,
            success: data.success
          }
        };
      }
      return {
        type: "complete",
        status: {
          queue,
          message: !data.success ? data.output.error : void 0,
          stage: data.success ? "complete" : "error",
          code: data.code,
          progress_data: data.progress_data
        },
        data: data.success ? data.output : null
      };
    case "process_starts":
      return {
        type: "update",
        status: {
          queue,
          stage: "pending",
          code: data.code,
          size: data.rank,
          position: 0,
          success: data.success,
          eta: data.eta
        }
      };
  }
  return { type: "none", status: { stage: "error", queue } };
}

// src/gradio.ts
var maxAPI = require("max-api");
var fs = require("fs");
var path = require("path");
global.EventSource = require_eventsource();
var args = process.argv.slice(2);
var topP = 0.95;
var model = "small";
var patcherpath = "";
var jobs = [];
function openFileAsJson(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);
    return jsonData;
  } catch (error2) {
    maxAPI.post(`Error opening file as JSON: ${error2}`);
    return null;
  }
}
async function sendState() {
  maxAPI.post("Generate: sending to Gradio");
  maxAPI.post("model: " + model);
  maxAPI.post("topP: " + topP);
  var filePath = path.join(patcherpath, "../../tmp/OutgoingArrangementState.json");
  if (filePath.startsWith("Macintosh HD:")) {
    filePath = filePath.replace("Macintosh HD:", "");
  }
  const app = await client(args[0]);
  var tracks = openFileAsJson(filePath);
  maxAPI.post(tracks.length);
  const job = app.submit("/predict", [model, JSON.stringify(tracks), topP]);
  job.on("data", (data) => {
    const incomingArrangementState = JSON.stringify(data.data[0]);
    const filePath2 = path.join(patcherpath, "../../tmp/IncomingArrangementState.json");
    fs.writeFileSync(filePath2, incomingArrangementState);
    maxAPI.outlet("data", JSON.stringify(data.data[0]));
  });
  job.on("status", (status) => {
    if (status["stage"] === "complete") {
      jobs.pop();
    }
    maxAPI.outlet("status", JSON.stringify(status));
  });
  jobs.push(job);
}
maxAPI.addHandler("setTopP", (inputTopP) => {
  topP = inputTopP;
});
maxAPI.addHandler("setModel", (inputModel) => {
  model = inputModel;
});
maxAPI.addHandler("cancel", () => {
  if (jobs.length == 0) {
    return;
  }
  var job = jobs[jobs.length - 1];
  if (job) {
    job.cancel();
    jobs.pop();
  }
});
maxAPI.addHandler("sendState", () => {
  sendState();
});
maxAPI.addHandler("setPath", (path2) => {
  if (path2.startsWith("Macintosh HD:")) {
    path2 = path2.replace("Macintosh HD:", "");
  }
  patcherpath = path2;
});
maxAPI.addHandler("tracks", (tracksJsonString) => {
  send(tracksJsonString);
});
async function send(tracksJsonString) {
  maxAPI.post("Generate: sending to Gradio");
  maxAPI.post("model: " + model);
  maxAPI.post("topP: " + topP);
  const app = await client(args[0]);
  var tracks = JSON.parse(tracksJsonString);
  const job = app.submit("/predict", [model, JSON.stringify(tracks), topP]);
  job.on("data", (data) => maxAPI.outlet("data", JSON.stringify(data.data[0])));
  job.on("status", (status) => {
    if (status["stage"] === "complete") {
      jobs.pop();
    }
    maxAPI.outlet("status", JSON.stringify(status));
  });
  jobs.push(job);
}
