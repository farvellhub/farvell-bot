const embed = require( "../utils/embed" ),
    mention = require( "../utils/mention" );

module.exports = {
	name: "kiss",
	desc: "Manda un beso a un usuario. [@mencion]",
    category: "fun",

	execute( client, message, args ) {
        const urls = [
            "https://media2.giphy.com/media/j98SQB5Y7WqnC/giphy.gif?cid=ecf05e471c3n7ljhkmc9xf8oyiys62cx6h6uchhrqkailuvk&rid=giphy.gif",
            "https://media2.giphy.com/media/lEGpiFvQDX4U8/giphy.gif?cid=ecf05e47tr6psgsa6ob4vxm6o79ppmrf8godylet5obiewjb&rid=giphy.gif",
            "https://media4.giphy.com/media/lTQF0ODLLjhza/giphy.gif?cid=ecf05e47q8yabqt4xlsje9p9d6oplrq8zudmng3xpze1jhfu&rid=giphy.gif"
        ];
        
		if ( !args ) {
            return embed( message, "RED", "Error 506!", 
            "Sin @mencion no hay besito >:[" );
        }
    
        const user = mention( client, args );

        if ( !user ) {
            return embed( message, "RANDOM", "Besitos para todos!",
                `${ message.author } le mandó un besito a \`${ message.channel.name }\`! Os quiere mucho a tod@s!`,
                urls[ Math.floor(Math.random() * Math.floor( urls.length )) ]
            );
        }

        if ( user ) {
    
            return embed( message, "RANDOM", "Besitos In-Coming!",
                `${ message.author } le mandó un dulce besito a \`${ user.username }\`! The love is in the wind <3`,
                urls[ Math.floor(Math.random() * Math.floor( urls.length )) ]
            );
        }
	}
};