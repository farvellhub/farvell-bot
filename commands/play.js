const embed = require( "../utils/embed" );

module.exports = {
	name: "play",
	desc: "Reproduce o añade una cancion. [búsqueda/URL]",
    category: "music",

    async getSong( client, message, args ) {
        await client.distube.play( message, args );
        return client.distube.setVolume( message, 5 );
    },

	async execute( client, message, args ) {
		if ( !args ) return embed( message, "RED", "Error 506!", 
            "No has especificado ningun argumento." 
        );

        if ( !message.member.voice.channel ) return embed( message, "RED",
            "Error 506!", "Tienes que estar en un canal de voz."
        );

        return this.getSong( client, message, args );
	}
};