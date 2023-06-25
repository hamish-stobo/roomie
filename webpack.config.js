const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
    context: __dirname,
    entry: './src/client/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        inline: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                use: 'babel-loader',
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: 'file-loader',
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.ts', '.tsx'],
    },
    plugins: [
        new HtmlWebPackPlugin({
            inject: true,
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html',
            favicon: './src/client/android-chrome-256x256.png',
        }),
    ],
}
