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
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                use: 'file-loader',
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.*', '.js', '.jsx', '.scss', '.ts', '.tsx'],
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
