const embed = require( "../utils/embed" ),
    comprover = require( "../utils/comprover" );

module.exports = {
	name: 'skip',
	desc: 'Salta a la siguiente cancion.',

	execute( client, message, args ) {
		const queue = comprover( client, message );

        if ( queue ) {
            embed( message, "YELLOW", "Skipped!" );
            return client.distube.skip( message );
        }
	}
};