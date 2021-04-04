const embed = require( "../utils/embed" ),
    mdEmbed = require( "../utils/mdembed" ),
    botmaster = require("../utils/botmaster"),
    itsok = require( "../utils/itsok" );

module.exports = {
	name: "notice",
	desc: "Envía un MD a todos los miembros.",
    category: "moderation",
    
    send( message, members, server, desc, image ) {
        members.forEach(( member ) => {
            if( !member.user.bot ) {
                mdEmbed( message, member.user, server, desc, image );
            }
        });

        return embed( message, "BLUE", "Mensaje enviado con éxito!" );
    },

    async fetchMembers( message ) {
        const server = client.guilds.cache.get( message.guild.id );
        const members = await server.members.fetch();

        return { server, members };
    },

	async execute( client, message, args ) {

		if ( botmaster( message ) ) {
            const { server, members } = await this.fetchMembers( message ),
                { desc, image } = await itsok( message, server );

            if ( ok ) this.send( message, members, server, desc, image );   
        }
	}
};