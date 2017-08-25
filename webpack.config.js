var path = require('path');
var webpack = require('webpack');
require("babel-polyfill");

const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  //属于 antd-mobile 内置 svg 文件
    path.resolve(__dirname, './public/svgs'),  //自己私人的 svg 存放目录
];

//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
const config = {
    devtool: 'eval-source-map', //生成Source Maps,选择合适的选项
    entry:['webpack-hot-middleware/client','babel-polyfill',path.resolve(__dirname, './app/index.js')], //唯一入口文件
    output: { //输出目录
        path: __dirname + "/public/js", //打包后的js文件存放的目录
        filename: 'bundle.js', //打包后的js文件名
        publicPath: 'http://127.0.0.1:3001'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/, //屏蔽不需要处理的文件（文件夹）（可选）
            loader: 'babel-loader',
        }, {
            test: /\.css$/, 
            loader: 'style-loader!css-loader'
        }, {
            test: /\.css$/,
            loader: 'css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!',
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=25000'
        },{　　　　
    　　　　test: /\.(svg)$/i,
    　　　　loader: 'svg-sprite-loader',
    　　　　include: svgDirs,
    　　}]
    },
    // antd需要
    resolve: {
        extensions: ['.web.js', '.js', '.json'],// webpack2 不再需要一个空的字符串
        modules: ['node_modules', path.join(__dirname, './node_modules')]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
              compress: {
                warnings: false
              }
        })
    ],
};

module.exports = config;