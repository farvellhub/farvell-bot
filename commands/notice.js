const embed = require( "../utils/embed" ),
    mdEmbed = require( "../utils/mdembed" ),
    botmaster = require("../utils/botmaster");  

module.exports = {
	name: 'notice',
	desc: 'Envía un MD a todos los miembros. (BotMaster)',

    async waitFor( message, title ) {
        let content = "";

        await embed( message, "YELLOW", "Por favor:",
            title + "\n*Espera 1 minuto para cancelar*"    
        )
        .then(async () => {

            content = await message.channel.awaitMessages( () => true, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).then( m => {
                return m.first().content;
            }).catch( e => embed( message, "RED", "Busqueda cancelada" ) );

        });

        return content;
    },

    async itsok( message, server, dok, iok ) {
        let ok = false;

        embed( message, "YELLOW", `${ server.name }`,
             dok, iok
        );
        
        await embed( message, "YELLOW", "Quieres enviar este mensaje?Y/yes",
        "*Espera 1 minuto para cancelar*" ).then(async () => {
            ok = await message.channel.awaitMessages( () => true, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).then( m => {
                return m.first().content.startsWith("yes")
                || m.first().content.startsWith("Y");
            }).catch( e => embed( message, "RED", "Error en argumentos", e ) );
        });

        return ok;
    },

    send( message, member, server, desc, image ) {
        if( !member.user.bot ) {
            mdEmbed( message, member.user, server, desc, image );
        }
    },

	async execute( client, message ) {
        let { dok, iok } = "";

		if ( botmaster( message ) ) {
            dok = await this.waitFor( message, "Inserta el cuerpo del mensaje.");
            iok = await this.waitFor( message, "Inserta la url de la imagen." );

            if ( !iok.startsWith( "http" ) ) {
                return embed( message, "RED", "No has introducido una URL.",
                    "Envio cancelado"
                );
            }

            const server = client.guilds.cache.get( message.guild.id ),
                members = await server.members.fetch();

            let ok = await this.itsok( message, server, dok, iok );

            if ( !ok ) return embed( message, "RED", "Has cancelado el envío" );

            members.forEach(( member ) => {
                this.send( message, member, server, dok, iok );
            });

            return embed( message, "BLUE", "Mensaje enviado con éxito!" );
        }
	}
};