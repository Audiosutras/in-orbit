import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: './src/index.js',
  output: {
    file: './dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      mainFields: ['module', 'main'],
      dedupe: ['react', 'react-dom']
    }),
    commonjs({
      namedExports: {
        'node_modules/react/index.js': ['useState', 'useEffect', 'Children', 'Component', 'createElement', 'PropTypes'],
        'node_modules/react-dom/index.js': ['render']
      }
    })
  ],
  external: ['React', 'ReactDOM']
}