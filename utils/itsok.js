const embed = require( "../utils/embed" ),
    waitFor = require( "../utils/waitfor" );

module.exports = async function( message, server ) {
    const dok = await waitFor( message, "Introduce el cuerpo del mensaje:" ),
        iok = await waitFor( message, "Introduce la url de la imagen:" );

    let ok;

    embed( message, "RANDOM", `${ server.name } te informa:`,
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
        }).catch( e => embed( message, "RED", "Tiempo agotado!", e ) );
    });

    if ( !ok ) return embed( message, "RED", "Has cancelado el envío" );

    return { dok, iok };
}