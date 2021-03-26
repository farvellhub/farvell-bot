const Discord = require( "discord.js" ),
    embed = require( "../utils/embed" );

module.exports = function( message, dest, server, desc, image ) {

    const embed = new Discord.MessageEmbed()
        .setColor( "RANDOM" )
        .setTitle( `${ server.name } te informa:` )
        .setDescription( desc )
        .setImage( image )
        .setFooter(
            message.author.username,
            message.author.displayAvatarURL()
        );
        
    return dest.send( embed );
}