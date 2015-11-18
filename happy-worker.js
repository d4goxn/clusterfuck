import koa from "koa";

function happyWorker(happiness, laziness) {
	const id = process.pid;
	let i = 0;

	const app = koa();
	app.use(function* (next) {

		this.body = yield new Promise((resolve) => {
			setTimeout(() => {
				if (Math.random() > happiness) {
					process.exit(1);
				}

				resolve(`<3\t${id}\t#${i += 1}`);
			}, Math.random() * laziness * 1000);
		});
	});

	app.listen(8080);
	console.log(`:D\t\t${id}`);
}

module.exports = happyWorker;
