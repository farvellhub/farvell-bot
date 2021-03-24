const embed = require( "../utils/embed" ),
    mention = require( "../utils/mention" );

module.exports = {
	name: 'kiss',
	desc: 'Manda un beso a un usuario por mencion.',

	execute( client, message, args ) {
		if ( !args ) {
            return embed( message, "RED", "Error 506!", 
            "Sin @mencion no hay besito >:[" );
        }
    
        const user = mention( client, args );

        if ( !user ) {
            return embed( message, "Red", "Error 506!",
                "El usuario no existe."
            );
        }

        if ( user ) {
            const urls = [
                "https://media2.giphy.com/media/j98SQB5Y7WqnC/giphy.gif?cid=ecf05e471c3n7ljhkmc9xf8oyiys62cx6h6uchhrqkailuvk&rid=giphy.gif",
                "https://media2.giphy.com/media/lEGpiFvQDX4U8/giphy.gif?cid=ecf05e47tr6psgsa6ob4vxm6o79ppmrf8godylet5obiewjb&rid=giphy.gif",
                "https://media4.giphy.com/media/3ohze3kG5qO9DcTUbe/giphy.gif?cid=ecf05e47tr6psgsa6ob4vxm6o79ppmrf8godylet5obiewjb&rid=giphy.gif",
                "https://media4.giphy.com/media/lTQF0ODLLjhza/giphy.gif?cid=ecf05e47q8yabqt4xlsje9p9d6oplrq8zudmng3xpze1jhfu&rid=giphy.gif",
                "https://media0.giphy.com/media/5GdhgaBpA3oCA/giphy.gif?cid=ecf05e47l8tuegg0635pmyuu5jmlz5v185u92cs4hnzn0quf&rid=giphy.gif"
            ];
    
            return embed( message, "BLUE", "Besitos In-Coming!",
                `${ message.author } le mandó un dulce besito a \`${ user.username }\`! The love is in the wind <3`,
                urls[ Math.floor(Math.random() * Math.floor( urls.length )) ]
            );
        }
	}
};