const embed = require( "../utils/embed" );

module.exports = {
	name: "ping",
	desc: "Muestra tu ping",
	category: "utils",

	execute( client, message, args ) {
		return embed( message, "BLUE", "Ping!",
            `Tu ping ${ message.author.username }:
            \`${ client.ws.ping }ms\``
        );
	}
};