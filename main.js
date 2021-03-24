const Discord = require('discord.js'),
    embed = require( "./utils/embed" ),
    fs = require( "fs" );

const DisTubeHandler = require( "./utils/distube" );

require( "dotenv" ).config();

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.distube = new DisTubeHandler( client );

const commandFiles = fs.readdirSync('./commands').filter(
    file => file.endsWith('.js')
);

for (const file of commandFiles) {

	const command = require( `./commands/${file}` );
	client.commands.set( command.name, command );

}

client.on("ready", () => {
    client.user.setActivity(
        "Lol: Wild Rift!",
        { type: "PLAYING" }
    );

    return console.log(
        `Bot has started as ${ client.user.tag }`
    )
});

client.on("message", ( message ) =>  {
    const file = fs.readFileSync( __dirname +  "/config.json" ),
        config = JSON.parse( file );

    if ( !message.content.startsWith( config.prefix ) )
        return;

    if ( message.author.bot ) return;

    const args = getArgs( message, config );

    if ( args ) tryCommand( client, message, args );
    
});

function getArgs( message, config ) {
    
    const args = message.content.slice( 
        config.prefix.length 
    ).trim().split( / +/g );

    return {
        command: args.shift(),
        body: args.join( " " )
    }
}

function tryCommand( client, message, { command, body } ) {
    if ( !client.commands.has( command )) return;

    try {
        client.commands.get( command ).execute( client, message, body );

    } catch ( error ) {
        return embed( message, "RED", "Error!", error );
    }
}



client.distube.listen();

client.login( process.env.TESTTOKEN );