const embed = require( "../utils/embed" );

module.exports = async function( message, server, dok, iok ) {
    let ok = false;

    embed( message, "RANDOM", `${ server.name }`,
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
        }).catch( e => embed( message, "RED", "Ups! Ocurrió algo inesperado!", e ) );
    });

    return ok;
}