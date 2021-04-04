const Discord = require('discord.js');

module.exports = function( message, color, titl, desc, image ) {
    const embed = new Discord.MessageEmbed()
        .setColor( color )
        .setFooter(
            message.author.username,
            message.author.displayAvatarURL()
        );
        

    if ( titl ) embed.setTitle( titl );
    if ( desc ) embed.setDescription( desc );
    if ( image && image.startsWith( "http" ) )
        embed.setImage( image );

    return message.channel.send( embed );
}