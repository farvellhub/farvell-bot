const embed = require( "../utils/embed" );

module.exports = function( client, message ) {
    const queue = client.distube.getQueue( message );
    if ( !queue ){
        embed( message, "RED", "Error 506!", "No estás reproduciendo nada." );
        return;
    } 

    if ( queue ) return queue;
}