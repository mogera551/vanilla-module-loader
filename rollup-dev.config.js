import terser from '@rollup/plugin-terser';

export default {
  input: 'src/exports.js',
	output: {
		file: 'dist/vanilla_module_loader.js',
	},  
  plugins: [
  ]
}