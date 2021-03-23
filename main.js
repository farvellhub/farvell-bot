const Discord = require( "discord.js" ),
    DisTube = require( "distube" ),
    client = new Discord.Client(),
    got = require( "got" ),
    config = require( "./config.json" );

require( "dotenv" ).config();

const distube = new DisTube(client, {
    searchSongs: true,
    emitNewSongOnly: true
});

client.on("ready", () => {
    client.user.setActivity( 
        "Lol: Wild Rift!",
        { type: "PLAYING" }
    );

    return console.log( 
        `Bot started as ${ client.user.tag }`
    );
});

client.on("message", ( msg ) => { 

    if ( msg.author.bot ) return;
    if ( !msg.guild ) return;

    const args = getArgs( msg );

    if ( args ) route( msg, args );

});

function route( message, { command , body } ) {

    switch ( command ) {
        case "ping":
            return ping( message );
        case "clear":
            return clear( message, body );
        case "play":
            return executePlay( message, body );
        case "skip":
            return skip( message );
        case "stop":
            return stop( message );
        case "list":
            return list( message );
        case "volume":
            return volume( message, body );
        case "meme":
            return meme( message );
        case "gif":
            return gif( message, body );
        case "avatar":
            return avatar( message, body );
        case "alive":
            return alive( message, body );
        case "kick":
            return kick( message, body );
        case "kiss":
            return kiss( message, body );
        case "sub":
            return sub( message );
        case "help":
            return help( message );
        default:
            if( !message.content.startsWith( ".." ) 
            || !message.content.startsWith( "._" ) ) {
                return msgEmbed( message, "RED", "Command not recognized!",
                    `Try typing .help to see a description of all commands`
                )
            }
    }
    
}

function ping( message ) {
    return msgEmbed( message, "BLUE", "Ping!",
        `\`${ client.ws.ping }ms\`` 
    );
}

function clear( message, body ) {
    if ( body === "" ) body = 100;
    if ( Number( body ) >= 0 && Number( body ) <= 100 ) {
        message.channel.bulkDelete( body ).then(() => {
            return msgEmbed( message, "YELLOW", "Clear!",
            `Cleared the last ${ body } messages`)
        });
    }
}

async function executePlay( message, body ) {
    if ( !body ) return msgEmbed( message, "RED", "Wrong!", "No search key specified" );

    if ( !message.member.voice.channel ) return msgEmbed( message, "RED", "Wrong!", "You must be in a voice channel");

    return await distube.play( message, body );

    
}

function skip( message ) {
    const queue = comproveQueue( message );
    if ( queue ) {
        msgEmbed( message, "YELLOW", "Skipped!" );
        return distube.skip( message );
    }
}

function stop( message ) {
    const queue = comproveQueue( message );
    if ( queue ) {
        msgEmbed( message, "RED", "Stopped!" );
        return distube.stop( message );
    }
}

function comproveQueue( message ) {
    const queue = distube.getQueue( message );
    if ( !queue ){
        msgEmbed( message, "RED", "Wrong!", "There is no queue" );
        return;
    } 

    if ( queue ) return queue;
}

function list( message ) {
    const queue = comproveQueue( message );
    if ( queue ) {
        
        return msgEmbed( message, "YELLOW", "Current queue:\n",
            "" + queue.songs.map(( song, id ) =>
                `**${ id + 1 }**. \`${ song.formattedDuration }\` - ${ song.name }`
            ).slice( 0, 10 ).join( "\n" )
        );
    }
}

function volume( message, body ) {
    const queue = comproveQueue( message );

    if ( queue ) {
        if ( body && Number( body ) >= 0 && Number( body ) <= 20 ) {
            distube.setVolume( message, Number( body ) );
            return msgEmbed( message, "YELLOW", "Volume changed!",
                `Current volume: \`${ queue.volume }\``
            );
        
        } else {
            return msgEmbed( message, "RED", "Wrong!", "Specify a valid digit [0-20]" );
        }
    }
}

function meme( message ) {
    got("https://www.reddit.com/r/memes/random/.json").then(( response ) => {
        const content = JSON.parse( response.body ),
            dataMeme = content[0].data.children[0].data,
            memeImage = dataMeme.url,
            memeTitle = dataMeme.title;

        return msgEmbed( message, "BLUE", "MEME!", `${ memeTitle }`, memeImage )
    })
}

function gif( message, body ) {
    got(`https://g.tenor.com/v1/search?q=${ body }&key=${ process.env.TENORKEY }&limit=8`).then(( response ) => {
        const content = JSON.parse( response.body ),
            gifImage = content.results[
                Math.floor(Math.random() * Math.floor( content.results.length ))
            ].media[0].gif.url;

        return msgEmbed( message, "BLUE", "Gif!", "", gifImage )
    })
}

function avatar( message, body ) {
    if ( !body ) {
        return msgEmbed( message, "BLUE", "Avatar!",
            `${ message.author.username }, your avatar:`,
            message.author.displayAvatarURL()
        );
    }
            
    const user = getUserFromMention( body );
    return msgEmbed( message, "BLUE", "Avatar!",
        `Avatar of ${ user.username }:`,
        user.displayAvatarURL()
    );
}

function kick( message, body ) {
    if ( !body ) {
        return msgEmbed( message, "RED", "Wrong!", 
        "You must mention a user to kick-off him/her butt >:[" );
    }

    const user = getUserFromMention( body );
    if ( user ) {
        const urls = [
            "https://media4.giphy.com/media/4N57n3Rei8iEE/giphy.gif?cid=ecf05e47jta4xy7awgt0e1f9wh4jh8i66705ahwdao99wxpw&rid=giphy.gif",
            "https://media4.giphy.com/media/3o7bucCgne0vPiz3PO/giphy.gif",
            "https://media1.giphy.com/media/xThuWduqIgOw1N2d3O/giphy.gif?cid=ecf05e476sg3zn7i514qpdhpscwzlymbeeqfxcfkxqhburni&rid=giphy.gif",
            "https://media3.giphy.com/media/l3V0j3ytFyGHqiV7W/giphy.gif?cid=ecf05e47e9avn1l5s2aipz5yqhehcm3ccfm07cli9l63h95o&rid=giphy.gif"
        ];

        return msgEmbed( message, "RED", "KickButt!",
            `${ message.author } has kicked off the enormous butt of \`${ user.username }\`!`,
            urls[ Math.floor(Math.random() * Math.floor( urls.length )) ]
        );
    }
}

function kiss( message, body ) {
    if ( !body ) {
        return msgEmbed( message, "RED", "Wrong!", 
        "You must mention a user to kiss him/her >:[" );
    }

    const user = getUserFromMention( body );

    if ( user ) {
        const urls = [
            "https://media2.giphy.com/media/j98SQB5Y7WqnC/giphy.gif?cid=ecf05e471c3n7ljhkmc9xf8oyiys62cx6h6uchhrqkailuvk&rid=giphy.gif",
            "https://media2.giphy.com/media/lEGpiFvQDX4U8/giphy.gif?cid=ecf05e47tr6psgsa6ob4vxm6o79ppmrf8godylet5obiewjb&rid=giphy.gif",
            "https://media4.giphy.com/media/3ohze3kG5qO9DcTUbe/giphy.gif?cid=ecf05e47tr6psgsa6ob4vxm6o79ppmrf8godylet5obiewjb&rid=giphy.gif",
            "https://media4.giphy.com/media/lTQF0ODLLjhza/giphy.gif?cid=ecf05e47q8yabqt4xlsje9p9d6oplrq8zudmng3xpze1jhfu&rid=giphy.gif",
            "https://media0.giphy.com/media/5GdhgaBpA3oCA/giphy.gif?cid=ecf05e47l8tuegg0635pmyuu5jmlz5v185u92cs4hnzn0quf&rid=giphy.gif"
        ];

        return msgEmbed( message, "BLUE", "Kiss!",
            `${ message.author } gives a huge and passionate kiss to \`${ user.username }\`!`,
            urls[ Math.floor(Math.random() * Math.floor( urls.length )) ]
        );
    }
}

function sub( message ) {
    const urls = [
        "https://media2.giphy.com/media/eYamBvyTZTUAM/giphy.gif?cid=ecf05e470n1z3iqz7k72p042l92c6jwtpfuk6tftnoo8wkk0&rid=giphy.gif",
        "https://media3.giphy.com/media/3ohhwiN1AhoRGzpyNO/giphy.gif?cid=ecf05e479qtntdnieqh69b1519l5mfyw1jbod90p8oa853yh&rid=giphy.gif",
        "https://media3.giphy.com/media/7Jq6ufAgpblcm0Ih2z/giphy.gif?cid=ecf05e472870baayc629bejzikpecs6kf1057h5di6zluoxr&rid=giphy.gif"
    ];

    return msgEmbed( message, "GREEN", "Alert!",
        `${ message.author } is alerting of subnormality on this channel!`,
        urls[ Math.floor(Math.random() * Math.floor( urls.length )) ]
    );
}

function help( message ) {
    let text = "";
    
    config.commands.forEach(( command, id ) => {
        text += `**${ id + 1 }. ${ command.name }** - ${ command.desc } ${
            Array.isArray( command.value ) ? `\n\` ${ command.value[0] }\` or \`${ command.value[1] } \`` : `\n\` ${ command.value } \``
        }\n\n`;
    });

    return msgEmbed( message, "BLUE", "Commands", text );
}

function getUserFromMention( mention ) {
	if ( !mention ) return;

	if ( mention.startsWith( "<@" ) && mention.endsWith( ">" )) {
		mention = mention.slice(2, -1);

		if (mention.startsWith( '!' )) mention = mention.slice(1);

		return client.users.cache.get( mention );
	}
}

function msgEmbed( message, color, titl, desc, image ) {
    const embed = new Discord.MessageEmbed()
        .setColor( color )
        .setFooter(
            message.author.username,
            message.author.displayAvatarURL()
        );
        

    if ( titl ) embed.setTitle( titl );
    if ( desc ) embed.setDescription( desc );
    if ( image ) embed.setImage( image );

    return message.channel.send( embed );
}

function getArgs( message ) {
    if ( !message.content.startsWith( config.prefix ) )
        return;
    
    const args = message.content.slice( 
            config.prefix.length 
        ).trim().split( / +/g );

    return {
        command: args.shift(),
        body: args.join( " " )
    }
}


const status = ( queue ) => `Volume: \`${ queue.volume * 10 }%\` | Filter: \`${ queue.filter || "Off" }\` | Autoplay: \`${ queue.autoplay ? "On" : "Off" }\``;

distube
    .on("playSong", ( message, queue, song ) => {
        queue.dispatcher.setVolumeLogarithmic( 0.2 );
        
        msgEmbed( message, "BLUE",
            `Playing ${ song.name } - \`${ song.formattedDuration }\``,
            `${ status( queue ) }\n`,
            song.thumbnail
        );
    })
    .on("addSong", ( message, queue, song ) => 
        msgEmbed( message, "BLUE", "Added to the queue",
            `\`${ song.formattedDuration }\` - ${ song.name }`,
            song.thumbnail
        )
    )
    .on("playList", ( message, queue, playlist, song ) => 
        msgEmbed( message, "BLUE",
            `Play \`${ playlist.name }\` playlist (${ playlist.songs.length } songs).\n`
            `Now playing \`${ song.formattedDuration }\` - ${ song.name }\n${ status( queue ) }`,
            song.thumbnail
        )
    )
    .on("addList", ( message, queue, playlist ) => 
        msgEmbed( message, "BLUE"
            `Added \`${ playlist.name }\` playlist (${ playlist.songs.length } songs) to queue`
    ))

    .on("searchResult", ( message, result ) => {
        let i = 0;
        msgEmbed( message, "YELLOW", "**Choose an option from below**",
            `${ result.map(song => `**${ ++i }**. \`${ song.formattedDuration }\` - ${ song.name }`).join("\n") }
            *Enter anything else or wait 60 seconds to cancel*`
        );
    })
    
    .on("searchCancel", ( message ) => msgEmbed( message, "RED", `Searching canceled` ))
    .on("error", ( message, e ) => {
        msgEmbed( message, "RED",  "An error encountered: ", e );
    });

client.login( process.env.TOKEN );