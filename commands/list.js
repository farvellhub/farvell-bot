const embed = require( "../utils/embed" ),
    comprover = require( "../utils/comprover" );

module.exports = {
	name: 'list',
	desc: 'Muestra la lista de reproducción.',

	execute( client, message, args ) {
		const queue = comprover( client, message );
        
        if ( queue ) {
            
            return embed( message, "YELLOW", "Lista de reproducción:\n",
                "" + queue.songs.map(( song, id ) =>
                    `**${ id + 1 }**. \`${ song.formattedDuration }\` - ${ song.name }`
                ).slice( 0, 10 ).join( "\n" )
            );
        }
	}
};