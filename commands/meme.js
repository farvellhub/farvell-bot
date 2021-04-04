const embed = require( "../utils/embed" ),
    got = require( "got" );

module.exports = {
    name: "meme",
	desc: "Muestra un meme random de Reddit.",
    category: "fun",

	execute( client, message, args ) {
        const url = "https://www.reddit.com/r/memes/random/.json";

		got( url ).then(( response ) => {
            const content = JSON.parse( response.body ),
                dataMeme = content[0].data.children[0].data,
                memeImage = dataMeme.url,
                memeTitle = dataMeme.title;

            return embed( message, "BLUE", "Meme!", 
                `${ memeTitle }`, memeImage 
            );
        });
	}
};