const embed = require( "../utils/embed" ),
    mention = require( "../utils/mention" );

module.exports = {
	name: 'sub',
	desc: 'Aviso de subnormalidad en el canal.',
    category: "fun",

	execute( client, message, args ) {
		const urls = [
            "https://media2.giphy.com/media/eYamBvyTZTUAM/giphy.gif?cid=ecf05e470n1z3iqz7k72p042l92c6jwtpfuk6tftnoo8wkk0&rid=giphy.gif",
            "https://media3.giphy.com/media/3ohhwiN1AhoRGzpyNO/giphy.gif?cid=ecf05e479qtntdnieqh69b1519l5mfyw1jbod90p8oa853yh&rid=giphy.gif",
            "https://media3.giphy.com/media/7Jq6ufAgpblcm0Ih2z/giphy.gif?cid=ecf05e472870baayc629bejzikpecs6kf1057h5di6zluoxr&rid=giphy.gif"
        ];
    
        return embed( message, "GREEN", "Alerta!",
            `En ${ message.channel } sub salvaje apareció!`,
            urls[ Math.floor(Math.random() * Math.floor( urls.length )) ]
        );
	}
};