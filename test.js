const BugZapper = require("./index")
const bz = new BugZapper({
    showFileName: true,
    fullFilePath: true
})

function test() {
    bz.pt
    bz.ptm("Point")
    bz.ptm(false)
    let statement = false
    let state = true
    bz.var({statement, state})
}

test()