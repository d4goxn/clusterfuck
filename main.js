import cluster from "cluster";
import os from "os";
import koa from "koa";
import axios from "axios";


function master(requestsPerCycle, cycleTime) {
	os.cpus().map(cpu => {
		cluster.fork();
	});

	cluster.on("exit", (worker) => {
		console.log(`X(\t\t${worker.process.pid}`);
		cluster.fork();
	});

	console.log(`${os.cpus().length} happy, lazy dwarves go to work for a demanding, impatient master. How many will make it home?`);
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

function happyWorker(happiness, laziness) {
	const id = process.pid;
	let i = 0;

	const app = koa();
	app.use(function* (next) {

		this.body = yield new Promise((resolve) => {
			setTimeout(() => {
				if (Math.random() > happiness) {
					cluster.worker.kill();
				}

				resolve(`<3\t${id}\t#${i += 1}`);
			}, Math.random() * laziness * 1000);
		});
	});

	app.listen(8080);
	console.log(`:D\t\t${id}`);
}

if (cluster.isMaster) {
	master(10, 299);
} else {
	happyWorker(0.95, 0.5);
}
