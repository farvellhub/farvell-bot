const DisTube = require( "distube" ),
    embed = require( "../utils/embed" );

module.exports = class extends DisTube {

    constructor( client ) {

        super(client, {
            searchSongs: true,
            emitNewSongOnly: true
        });
    }

    status( queue ){
        return `Volúmen: \`${ queue.volume * 10 }%\` | Filtro: \`${ queue.filter || "Off" }\` | Autoplay: \`${ queue.autoplay ? "On" : "Off" }\``;
    }

    listen() {
        return this.on("playSong", ( message, queue, song ) => {
            embed( message, "BLUE",
                `Reproduciendo ${ song.name } - \`${ song.formattedDuration }\``,
                `${ this.status( queue ) }\n`,
                song.thumbnail
            );
        })
        .on("addSong", ( message, queue, song ) => 
            embed( message, "BLUE", "Canción añadida a la lista!",
                `\`${ song.formattedDuration }\` - ${ song.name }`,
                song.thumbnail
            )
        )
        .on("playList", ( message, queue, playlist, song ) => 
            embed( message, "BLUE",
                `Lista \`${ playlist.name }\` (${ playlist.songs.length } canciones).\n`
                `Reproduciendo \`${ song.formattedDuration }\` - ${ song.name }\n${ status( queue ) }`,
                song.thumbnail
            )
        )
        .on("addList", ( message, queue, playlist ) => 
            embed( message, "BLUE"
                `Añadida \`${ playlist.name }\` playlist (${ playlist.songs.length } cancione) a la lista`
        ))

        .on("searchResult", ( message, result ) => {
            let i = 0;

            embed( message, "YELLOW", "**Elige una opción:**",
                `${ result.map(song => `**${ ++i }**. \`${ song.formattedDuration }\` - ${ song.name }`).join("\n") }
                *Escribir cualquier cosa o esperar 60 segundos cancela la búsqueda.*`
            );
        })
        
        .on("searchCancel", ( message ) => embed( message, "RED", `Búsqueda cancelada!` ))
        .on("error", ( message, e ) => {
            embed( message, "RED",  "Ups! Ocurrió algo inesperado! ", e );
        });
    }

}