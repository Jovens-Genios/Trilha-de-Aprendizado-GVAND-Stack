const not = require("./");


test("true value to false", not(true) === false);
test("false value to true", not(false) === true);


function test(testName, assertion) {
    if (assertion) console.log(`\u2713 ${testName}`);
    else throw new Error(`\u2715 ${testName}`);
}
