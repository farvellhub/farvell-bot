const embed = require( "../utils/embed" ),
    comprover = require( "../utils/comprover" );

module.exports = {
	name: 'volume',
	desc: 'Cambia el volúmen de la lista de reproducción.',

	execute( client, message, args ) {
		const queue = comprover( client, message );
        
        if ( queue ) {
            if ( args && Number( args ) >= 0 && Number( args ) <= 20 ) {
                client.distube.setVolume( message, Number( args ) );
                return embed( message, "YELLOW", `Volumen cambiado al \`${ queue.volume * 10 }%\``);
            
            } else {
                return embed( message, "BLUE", "Volúmen!", `**${ queue.volume * 10 }%**` );
            }
        }
	}
};