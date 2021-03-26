const embed = require( "../utils/embed" ),
    messages = require("../utils/messages");

module.exports = {
	name: 'clear',
	desc: 'Borra max. 100 mensajes en el canal.',

	execute( client, message, args ) {
        if ( messages( message ) ) {
            if ( args === "" || isNaN( args ) || args > 100 ) args = 100;

            if ( Number( args ) >= 0 && Number( args ) <= 100 ) {
                message.channel.bulkDelete( args ).then(() => {
                    return embed( message, "YELLOW", "Clear!",
                        `Limpiaste los últimos ${ args } mensajes.`
                    )
                });
            }
        }
	}
};