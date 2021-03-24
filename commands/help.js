const embed = require( "../utils/embed" ),
    fs = require( "fs" );

module.exports = {
    name: "help",
    desc: "Muestra todos los comandos.",

    execute( client, message, args ) {
        const file = fs.readFileSync( __dirname +  "/../config.json" ),
            config = JSON.parse( file );

        let text = `Prefijo asignado:  **\`${ config.prefix }\`**\n\n`;

        client.commands.forEach(( command ) => {
            const prefix = `${ config.prefix }${ command.name }`;

            text += `**\`${ prefix }\`**: ${ command.desc }\n\n`;
        });
    
        return embed( message, "BLUE", "Commandos:", text )
    }
}