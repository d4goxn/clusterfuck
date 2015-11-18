require("babel-core/register");
require("babel-polyfill");

var happyWorker = require("./happy-worker");
console.log(happyWorker);
happyWorker(0.99, 1);
