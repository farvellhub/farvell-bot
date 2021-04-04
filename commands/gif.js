const embed = require( "../utils/embed" ),
    got = require( "got" );

module.exports = {
    name: "gif",
	desc: "Busca un gif en Tenor. [búsqueda]",
    category: "fun",

	execute( client, message, args ) {
        const url = `https://g.tenor.com/v1/search?q=${ args }&key=${ process.env.TENORKEY }&limit=8`;

        got( url ).then(( response ) => {
            const content = JSON.parse( response.body ),
                gif = content.results[
                    Math.floor(Math.random() * Math.floor( content.results.length ))
                ].media[0].gif.url;

            return embed( message, "BLUE", "Gif!", args, gif )
        });
	}
};