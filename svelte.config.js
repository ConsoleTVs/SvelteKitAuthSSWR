import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		target: '#svelte',
		vite: {
			server:
				process.env !== 'production'
					? {
							host: 'svelte.auth.test',
							port: 3000
					  }
					: undefined,
			resolve: {
				alias: {
					$lib: path.resolve('./src/lib'),
					$middleware: path.resolve('./src/middleware'),
					$components: path.resolve('./src/components')
				}
			}
		}
	},

	optimizeDeps: {
		exclude: ['sswr']
	}
}

export default config
