const path = require('path') //стандартный модуль NodeJS, позволяет удобно работать с путями к файлам
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

console.log('IS PROD', isProd)
console.log('IS DEV', isDev)

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'), //указываем за то, где лежат исходники приложения. __dirname - путь до папки, в которой находится данный файл
    mode: 'development', //по умолчанию WP работает в режиме production
    entry: './index.js',
    output: { //указываем, где будет лежать результат сборки проекта ВебПаком после запуска
        filename: filename('js'), //название файла. Hash нужен для ...
        path: path.resolve(__dirname, 'dist') //где находится
    },
    resolve: {
        extensions: ['.js'],
        alias: { //Присваивает названия путям
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devtool: isDev ? 'source-map' : false,
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     compress: true,
    //     port: 3000
    // },
    devServer: {
        port: 3000,
        hot: isDev
    },
    plugins: [ //тут находятся все плагины
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            { //sass
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            { //babel
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
}