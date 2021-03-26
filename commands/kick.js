const embed = require( "../utils/embed" ),
    mention = require( "../utils/mention" );

module.exports = {
	name: 'kick',
	desc: 'Patea a un usuario por mencion.',

	execute( client, message, args ) {
		if ( !args ) {
            return embed( message, "RANDOM", "Pateo de culo grupal!",
                `${ message.author } os pateo el culo a tod@s en \`${ message.channel.name }\`! `,
                urls[ Math.floor(Math.random() * Math.floor( urls.length )) ]
            );
        }
    
        const user = mention( client, args );

        if ( !user ) {
            return embed( message, "Red", "Error 506!",
                "El usuario no existe."
            );
        }

        if ( user ) {
            const urls = [
                "https://media4.giphy.com/media/4N57n3Rei8iEE/giphy.gif?cid=ecf05e47jta4xy7awgt0e1f9wh4jh8i66705ahwdao99wxpw&rid=giphy.gif",
                "https://media4.giphy.com/media/3o7bucCgne0vPiz3PO/giphy.gif",
                "https://media1.giphy.com/media/xThuWduqIgOw1N2d3O/giphy.gif?cid=ecf05e476sg3zn7i514qpdhpscwzlymbeeqfxcfkxqhburni&rid=giphy.gif",
                "https://media3.giphy.com/media/l3V0j3ytFyGHqiV7W/giphy.gif?cid=ecf05e47e9avn1l5s2aipz5yqhehcm3ccfm07cli9l63h95o&rid=giphy.gif"
            ];
    
            return embed( message, "RANDOM", "Pateo de culo!",
                `${ message.author } le pateo el culo a \`${ user.username }\`! R.I.P`,
                urls[ Math.floor(Math.random() * Math.floor( urls.length )) ]
            );
        }
	}
};