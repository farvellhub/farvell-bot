const embed = require( "../utils/embed" ),
    mdembed = require( "../utils/mdembed" ),
    itsok = require( "../utils/itsok" ),
    botmaster = require("../utils/botmaster");

module.exports = {
	name: "advice",
	desc: "Envía un aviso del server [nombre-canal].",
    category: "moderation",

    getChannel( client, message, args ) {
        const channel = client.channels.cache.find(
            ( ch ) => ch.name === args && ch.type === "text"
        );
        
        if ( !channel ) return embed( message, "RED", "Canal no encontrado!" );

        return channel;
    },

	async execute( client, message, args ) {

		if ( botmaster( message ) ) {
            if (!args) return embed( message,"RED", "Error 506!", "No has especificado un nombre de canal" );

            let channel = this.getChannel( client, message, args );
            
            if ( channel.then ) return;
                
            const server = client.guilds.cache.get( message.guild.id ),
                { desc, image } = await itsok( message, server );

            mdembed( message, channel, server, desc, image );

            return embed( message, "BLUE", "Mensaje enviado con éxito!" );
        }
	}
};