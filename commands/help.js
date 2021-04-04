const embed = require( "../utils/embed" ),
    fs = require( "fs" );

module.exports = {
    name: "help",
    desc: "Muestra todos los comandos.",
    categories: [ "music", "fun", "moderation", "utils"],

    execute( client, message, args ) {
        const file = fs.readFileSync( __dirname +  "/../config.json" ),
            config = JSON.parse( file );

        let text = `Prefijo asignado:  **\`${ config.prefix }\`**\n`;

        this.categories.forEach(( c ) => {
            text += `\n**${ c.toUpperCase() }**\n\n`;

            client.commands.filter(( command ) => {
                return command.category === c
            }).forEach(( command ) => {
                const prefix = `${ config.prefix }${ command.name }`;
    
                text += `**\`${ prefix }\`**: ${ command.desc }\n`;
            });
        });
    
        return embed( message, "BLUE", "Comandos:", text );
    }
}