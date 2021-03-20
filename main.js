const Discord = require("discord.js"),
    ytdl = require("ytdl-core");

const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log( "Ready!" );
});


const queue = new Map();

function show( msg, obj ) {
    let index = 0;

    for ( const o in obj ) {
        msg.channel.send(
            `${ ++index }. ${ o }: ${ obj[ o ] }`
        );
    }
}

client.on("message", async ( msg ) => {

    if ( msg.author.bot ) return;
    if ( !msg.content.startsWith( config.prefix ) ) return;

    const serverQueue = queue.get( msg.guild.id );

    if ( msg.content.startsWith( config.commands.play ) )
        return execute( msg, serverQueue );

    if ( msg.content.startsWith( config.commands.skip ) )
        return skip( msg, serverQueue );

    if ( msg.content.startsWith( config.commands.stop ) )
        return stop( msg, serverQueue );

    if ( msg.content.startsWith( config.commands.list ) )
        return show( msg, config.playlist );

    if ( msg.content.startsWith( config.commands.help ) )
        return show( msg, config.commands );

    return msg.channel.send(
        "Command not admitted. Type !help to see comands"
    );

});



function inVoiceChannel( msg ) {
    const voiceChannel = msg.member.voice.channel;

    if ( !voiceChannel )
        return msg.channel.send(
            "You need to be in a voice channel to play music!"
        );
    
    return voiceChannel;
}

function hasPermissions( msg, voiceChannel ) {
    const permissions = voiceChannel.permissionsFor( msg.client.user );

    if ( !permissions.has( "CONNECT" ) || !permissions.has( "SPEAK" ) )
        return msg.channel.send(
            "I need the permissions to join and speak in your voice channel!"
        );
}

async function getSong( id ) {
    try {
        const songInfo = await ytdl.getInfo( id );

        return {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
        };

    } catch( err ) {
        return console.log( err );
    }
}

async function tryConnection( msg, voiceChannel, queueConstruct ) {
    try {
        const connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        return play( msg.guild, queueConstruct.songs[0] );

      } catch ( err ) {
        console.log( err );
        queue.delete( msg.guild.id );

        return msg.channel.send( err );
      }
}

async function addToQueue( msg, serverQueue, voiceChannel, song ) {
    if ( !serverQueue ) {
        const queueConstruct = {
          textChannel: msg.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true
        };
    
        queue.set( msg.guild.id, queueConstruct );
        queueConstruct.songs.push( song );
        await tryConnection( msg, voiceChannel, queueConstruct );
        
      } else {
        serverQueue.songs.push( song );

        return msg.channel.send( 
            `${ song.title } has been added to the queue!` 
        );
      }
}

function comproveArgs( msg, args ) {
    const option = args[1];

    if ( !option )
        return msg.channel.send(
            "Put url or playlist-code after !play command"
        );

    if ( option.startsWith("https://") )
            return option;
    
    const playlist = config.playlist[ option ];

    if ( !playlist ) {
        msg.channel.send(
            "Choose one of these options available:"
        );
        show( msg, config.playlist );
        msg.channel.send(
            "Or type an url."
        );
        return;
    }

    return playlist;
}

async function execute( msg, serverQueue ) {
    const args = msg.content.split(" ");
    const option = comproveArgs( msg, args );

    const voiceChannel = inVoiceChannel( msg );
    hasPermissions( msg, voiceChannel );

    const song = await getSong( option );
    addToQueue( msg, serverQueue, voiceChannel, song )
}

function songInQueue( msg, serverQueue ) {
    if ( !serverQueue )
        return msg.channel.send(
            "There is no song that I could skip!"
        );
    
    return true;
}

function skip( msg, serverQueue ) {
    inVoiceChannel( msg );
    const inQueue = songInQueue( msg, serverQueue );

    if ( inQueue ) serverQueue.connection.dispatcher.end();
}

function stop( msg, serverQueue ) {
    serverQueue.connection.dispatcher.end()
    serverQueue.voiceChannel.leave();
    serverQueue.songs = [];

    return msg.channel.send( "Stop it!" );
}

function getDispatcher( serverQueue , song) {
    return serverQueue.connection
        .play( ytdl( song.url ) )
        .on("finish", () => {
            serverQueue.songs.shift();
            play( guild, serverQueue.songs[0] );
        })
        .on("error", error => console.error( error ));
}

function play( guild, song ) {
    const serverQueue = queue.get( guild.id );

    if ( !song ) {
        serverQueue.voiceChannel.leave();
        queue.delete( guild.id );
        return;
    }

    const dispatcher = getDispatcher( serverQueue, song );

    dispatcher.setVolumeLogarithmic( serverQueue.volume / config.volume );
    
    serverQueue.textChannel.send(
      `Start playing: **${ song.title }**`
    );
}



client.login( config.token );