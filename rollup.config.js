import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default {
  input: './src/index.js',
  output: {
    file: pkg.main,
    format: 'cjs',
    globals: {
      react: 'React',
      "react-dom": 'ReactDom'
    }
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      },
      dedupe: ['react', 'react-dom']
    }),
    commonjs({
      include: 'node_modules/**',
      exclude: ['node_modules/react/**', 'node_modules/react-dom/**'],
      namedExports: {
        'node_modules/react/index.js': ['useState', 'useEffect', 'Children', 'Component', 'createElement', 'PropTypes'],
        'node_modules/react-dom/index.js': ['render']
      },
      modulesOnly: true
    })
  ],
  external: ['react', 'react-dom']
}