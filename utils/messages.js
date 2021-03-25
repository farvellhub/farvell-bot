const embed = require( "../utils/embed" );

module.exports = function( message ) {

    if ( !message.member.hasPermission('MANAGE_MESSAGES') ) {

        embed( message, "RED", "Permisos insuficientes!",
            "Debes tener permisos para manejar mensajes."
        );

        return false;
    }

    return true;
}