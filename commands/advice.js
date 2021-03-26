const embed = require( "../utils/embed" ),
    mdembed = require( "../utils/mdembed" ),
    waitFor = require( "../utils/waitfor" ),
    itsok = require( "../utils/itsok" ),
    botmaster = require("../utils/botmaster");

module.exports = {
	name: 'advice',
	desc: 'Envía un aviso del server [nombre-canal].',

    getChannel( client, message, args ) {
        const channel = client.channels.cache.find(
            ( ch ) => ch.name === args && ch.type === "text"
        );
        
        if ( !channel ) return embed( message, "RED", "Error 506!", 
            "El nombre no es válido"
        );

        return channel;
    },

	async execute( client, message, args ) {

		if ( botmaster( message ) ) {
            if (!args) return embed( message,"RED", "Error 506!", "No has especificado un nombre de canal" );

            let channel = this.getChannel( client, message, args );
            
            if ( channel.then ) return;

            dok = await waitFor( message, "Inserta el cuerpo del mensaje.");
            iok = await waitFor( message, "Inserta la url de la imagen." );

            if ( !iok.startsWith( "http" ) ) {
                return embed( message, "RED", "Erro 506!",
                    "No has especificado una URL valida. Envio cancelado"
                );
            }
                
            const server = client.guilds.cache.get( message.guild.id );

            let ok = await itsok( message, server, dok, iok );

            if ( !ok ) return embed( message, "RED", "Has cancelado el envío" );

            mdembed( message, channel, server, dok, iok );

            return embed( message, "BLUE", "Mensaje enviado con éxito!" );
        }
	}
};