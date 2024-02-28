import swaggerJSDoc from "swagger-jsdoc";
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "My brand BE API",
			version: "1.0.0",
			description: "Backend for my portfolio",
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ["./public/*.js"],
};
const specs=swaggerJSDoc(options);

export default specs;