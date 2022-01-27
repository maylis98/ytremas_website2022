const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors:{
				"y_yellow": "#DBFF00"
			},
			fontFamily: {
				sneakers: ['sneakers-pro'],
				roboto: "'Roboto', sans-serif",
			},
		}, 
	},

	plugins: []
};

module.exports = config;
