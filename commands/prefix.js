const embed = require( "../utils/embed" ),
    fs = require( "fs" );

module.exports = {
	name: 'prefix',
	desc: 'Cambia de prefijo.',

	execute( client, message, args ) {
        if ( args ) {

            let config = {};
            config.prefix = args;
            
            if ( config.prefix.length >= 1 && config.prefix.length <= 5 ) {
                fs.writeFileSync("config.json", JSON.stringify( config ));

                return embed( message, "YELLOW", "Prefijo cambiado!",
                    `El nuevo prefijo: **${ config.prefix }**`
                );
            }

        } else {
            return embed( message, "RED", "Error 506!", "Especifica un prefijo válido entre 1-5 letras" );
        }

	}
};