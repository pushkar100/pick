import uglify from 'rollup-plugin-uglify-es';

export default {
  input: 'src/pick.js',
  output: {
    file: 'dist/pick.min.js',
    format: 'iife',
    name: 'pick'
  },
  plugins: [
    uglify()
  ]
}