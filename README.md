# node-bugzapper
Simple bug zapping for your node application. 

## Example

```js
const BugZapper = require("bugzapper");
const bz = new BugZapper({
    showFileName: true
});

function checkDoor(isBarred) {
    bz.var({isBarred})
    if (isBarred) {
        bz.pt
        return "move on"
    } else {
        bz.pt("The door should never be unbarred")
        return "open"
    }
}

checkDoor(true)
// door.js - Line 6 fired: isBarred = true
// door.js - Point fired at line 9

checkDoor(false)
// door.js - Line 6 fired: isBarred = false
// door.js - Point fired at line 12: The door should never be unbarred
```

### Options

```js
// With Defaults
const bz = new BugZapper({
    showFileName: false, // Show name of file.
    fullFilePath: false // Show the entire path to file.
    pointMessage: "Point fired at line %l" // Redefine the message for bz.pt and bz.pt(), %l = line number
    varMessage: "Line %l fired: %k = %v" // Redefine the message for bz.var(), %l = line number, %k = Key/Variable name, %v = variable value
    alterVarLN: -1 // Offset the line number shown for bz.var() compared to its location in the code + (moves down) or - (moves up)
    alterPtLN: 0 // Offset the line number shown for bz.pt and bz.pt() compared to their location in the code + or -
})
```

### pt

##### bz.pt - Mark a point in your code to be logged when it is reached.
```js
bz.pt; // myfile.js - Point fired at line 152
```

### pt()

##### bz.pt(\<Your Message\>) - Mark a point of your code to be logged with a message when it is reached
```js
bz.pt("This should never happen"); // myfile.js - Point fired at line 892: This should never happen
```

### var()'

##### bz.var({variable[, ...]}) - Mark a variable in your code to have its name and value logged when it is reached, must be an object, 
```js
let myVar = true
let myFalseVar = false
bz.var({myVar, myFalseVar}) // myfile.js - Line 536 fired: myVar = true, myFalseVar = false
```