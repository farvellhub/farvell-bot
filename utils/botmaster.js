const embed = require( "../utils/embed" );

module.exports = function( message ) {

    if( !message.member.roles.cache.some(r => r.name === "BotMaster") ) {
        embed( message, "RED", "Rol insuficiente!",
            "Debes ser BotMaster para usar este comando."
        );

        return false;
    }

    return true;
}