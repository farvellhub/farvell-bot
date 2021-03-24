const embed = require( "../utils/embed" ),
    comprover = require( "../utils/comprover" );

module.exports = {
	name: 'stop',
	desc: 'Para la canción y el bot sale del canal.',

	execute( client, message, args ) {
		const queue = comprover( client, message );

        if ( queue ) {
            embed( message, "RED", "Stopped!" );
            return client.distube.stop( message );
        }
	}
};