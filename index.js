const path = require("path")

module.exports = class BugZapper {
  constructor(options = {}) {
    this.showFileName = new Boolean(options.showFileName || true)
    this.showFullPath = new Boolean(options.showFullPath || false)
    this.pointMessage = new String(options.logMessage || "Point fired at line %l")
    this.varMessage = new String(options.varMessage || "%l fired: %k = %v")
    this.alterLN = new Number(options.alterLN || -1)
  }

  get pt() {
    let m = (this.showFileName ? __filename : "") + this.logMessage.replace("%l", bz__line)
    console.log(m)
  }

  set pt(t) {
    let m = (this.showFileName ? __filename : "") + this.logMessage.replace("%l", bz__line) + ": " + t
    console.log(m)
  }

  var (v) {
    this.filename = bz__stack[0].getFileName()

    console.log(this.filename)
    let key = Object.keys(v)[0]
    let value = v[key]
    let m = this.varMessage.replace("%l", bz__line).replace("%k", key).replace("%v", value)
    //console.log((this.showFileName ? bz__filename : "") + m)
  }

  fn() {

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
      return bz__stack[0].getLineNumber();
    }
  });
}