const path = require("path")

module.exports = class BugZapper {
  constructor(options = {}) {
    this.showFileName = options.showFileName || false
    this.fullFilePath = options.fullFilePath || false
    this.pointMessage = new String(options.logMessage || "Point fired at line %l")
    this.varMessage = new String(options.varMessage || "Line %l fired: %k = %v")
    this.alterVarLN = new Number(options.alterVarLN || -1)
    this.alterPtLN = new Number(options.alterPtLN || 0)
  }

  get pt() {
    let m = this.fn + this.pointMessage.replace("%l", bz__line + this.alterPtLN)
    console.log(m)
  }

  ptm(t) {
    let m = this.fn + this.pointMessage.replace("%l", bz__line + this.alterPtLN).replace("%f", bz__filename)
    console.log(m)
  }

  var (v) {
    if (!v) return console.log("Line " + (bz__line - this.alterVarLN + " missing argument."))
    if (typeof v !== "object") return console.log((bz__line - this.alterVarLN + " argument must be Object."))
    let key = Object.keys(v)
    let value = key.map(k => `${k} = ${v[k]}`).join(", ")
    let m = this.fn + this.varMessage.replace("%l", bz__line + this.alterVarLN).replace("%k", key).replace("%v", value)
    console.log(m)
  }

  get fn() {
    if (!this.showFileName) return ""
    return this.showFullFileName ? `${bz__filename} - ` : `${path.basename(bz__filename)} - `
  }
}

if (!global.bz__stack) {
  Object.defineProperty(global, 'bz__stack', {
    get: function () {
      var orig = Error.prepareStackTrace;
      Error.prepareStackTrace = function (_, stack) {
        return stack;
      };
      var err = new Error;
      Error.captureStackTrace(err, arguments.callee);
      var stack = err.stack;
      Error.prepareStackTrace = orig;
      return stack;
    }
  });
}

if (!global.bz__line) {
  Object.defineProperty(global, 'bz__line', {
    get: function () {
      return bz__stack[2].getLineNumber();
    }
  });
}

if (!global.bz__filename) {
  Object.defineProperty(global, 'bz__filename', {
    get: function () {
      return bz__stack[3].getFileName();
    }
  });
}