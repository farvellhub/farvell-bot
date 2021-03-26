const embed = require( "../utils/embed" ),
    mdEmbed = require( "../utils/mdembed" ),
    waitFor = require( "../utils/waitfor" ),
    itsok = require( "../utils/itsok" ),
    botmaster = require("../utils/botmaster");

module.exports = {
	name: 'notice',
	desc: 'Envía un MD a todos los miembros.',

    
    send( message, member, server, desc, image ) {
        if( !member.user.bot ) {
            mdEmbed( message, member.user, server, desc, image );
        }
    },

	async execute( client, message, args ) {
        let { dok, iok } = "";
        console.log(args);

		if ( botmaster( message ) ) {
            dok = await waitFor( message, "Inserta el cuerpo del mensaje.");
            iok = await waitFor( message, "Inserta la url de la imagen." );

            if ( !iok.startsWith( "http" ) ) {
                return embed( message, "RED", "Erro 506!",
                    "No has especificado una URL valida. Envio cancelado"
                );
            }

            const server = client.guilds.cache.get( message.guild.id );
            const members = await server.members.fetch();

            let ok = await itsok( message, server, dok, iok );

            if ( !ok ) return embed( message, "RED", "Has cancelado el envío" );

            members.forEach(( member ) => {
                this.send( message, member, server, dok, iok );
            });

            return embed( message, "BLUE", "Mensaje enviado con éxito!" );
        }
	}
};