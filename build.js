// build.js
const esbuild = require("esbuild");
const inlineImage = require("esbuild-plugin-inline-image");

let OnResolvePlugin = {
	name: 'image',
	setup(build) {
	  let path = require('path')
  
	  // 将所有包含 "/static/" 的路径标记为”外部路径“（不然会在编译遇到时会报错）
	  build.onResolve({ filter: /^\/static\// }, args => {
		return { path: args.path, external: true }
	  })
	},
  }

esbuild.build({
	  entryPoints: ["./src/index.js"],
	  outfile: "./build/js/app.js",
	  platform: 'browser',
	  minify: true,
	  bundle: true,
	  sourcemap: true,
	  loader: {
		      ".js": "jsx",
		    },
	  plugins: [inlineImage(), OnResolvePlugin],
}).catch(() => process.exit(1));
