const BugZapper = require("./index.js");
const bz = new BugZapper({
    showFileName: true
});
require("./testing.js")

function test() {
    let statement = true
    bz.var({statement})
}

test()