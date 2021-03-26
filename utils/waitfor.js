const embed = require( "../utils/embed" );

module.exports = async function( message, title ) {
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
        }).catch( e => embed( message, "RED", "Envio cancelado!" ) );

    });

    return content;
}