const path = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
const glob = require('glob')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const getTSFileExtensionsRegex = /\.\/|\.ts/g
const getFileName = name => name.replace(getTSFileExtensionsRegex, '')
const files = glob.sync('./*\.ts')
const entries = files.reduce((acc, file) => Object.assign(acc, {
    [getFileName(file)]: file
}), {})

Object.keys(slsw.lib.entries)
    .forEach(key => (entries[key] = ['./scripts/source-map-install.js', slsw.lib.entries[key]]))

module.exports = {
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    entry: entries,
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        modules: [
            path.resolve(__dirname, './src'),
            'node_modules'
        ]
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js'
    },
    target: 'node',
    plugins: [new CopyWebpackPlugin([
        { from: '_warmup', to: '_warmup' }
    ])],
    externals: [nodeExternals()],
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
}
