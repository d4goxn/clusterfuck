var axios = require("axios");

console.log("let's test dwarves");

var requestsPerCycle = 10;
var cycleTime = 299;

function main() {
	setTimeout(() => {
		setInterval(() => {
			for (let i = 0; i < requestsPerCycle; i++) {
				axios.get("http://localhost:8080")
				.then(res => console.log(`:)\t${res.data}`))
				.catch(err => console.error(`:O\tRIP`));
			}
		}, cycleTime);
	}, 6000);
}

module.exports = main;
