const embed = require( "../utils/embed" ),
    mention = require( "../utils/mention" );

module.exports = {
	name: 'alive',
	desc: 'Muestra el estado de un usuario.',

	execute( client, message, args ) {
		if ( !args ) {
            return embed( message, "BLUE", "Alive!",
                `Tu avatar ${ message.author.username }:`,
                message.author.displayAvatarURL()
            );
        }
                
        const user = mention( client, args );

        if ( !user ) {
            return embed( message, "Red", "Error 506!",
                "El usuario no existe."
            );
        }

        return embed( message, "BLUE", "Alive!",
            `${ user.username } is ${ user.presence.status }:`,
            user.displayAvatarURL()
        );
	}
};