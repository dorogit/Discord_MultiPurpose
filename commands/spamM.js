module.exports = {
	Name:'spam',
	execute(message, msg) {
		let content= message.content.slice(5);
		for (let num=0 ; num<10 ; num++) {
			message.channel.send(content)
		}
	},
};