module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`[INFO] Discord API responded, connection established, logged in as ${client.user.tag}`);
	},
};