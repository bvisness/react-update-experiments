const esbuild = require('esbuild');
const fs = require('fs');

async function serve() {
	const server = await esbuild.serve({
		servedir: 'dist',
	}, {
		entryPoints: ['src/app.jsx'],
		bundle: true,
		outfile: 'dist/dist.js',
		define: {
			'process.env.NODE_ENV': '"development"',
		},
	});

	console.log(`Listening on port ${server.port}`);
}

serve();
