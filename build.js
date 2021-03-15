const esbuild = require('esbuild');
const fs = require('fs');

async function build() {
	try {
		await esbuild.build({
			entryPoints: ['src/app.jsx'],
			bundle: true,
			outfile: 'dist/dist.js',
			define: {
				'process.env.NODE_ENV': '"development"',
			},
		});
	} catch (e) {
		process.exit(1);
	}

	fs.copyFileSync('src/index.html', 'dist/index.html');
}

build();
