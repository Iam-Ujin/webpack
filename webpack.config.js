const path = require("path");
// const myLoader = require('./myLoader');
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  mode: "production",
  entry: {
    main: path.resolve("./src/app.js"),
  },
  output: {
    publicPath: "/webpack/dist/",
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      // {
      //     test: /\.js$/,
      //     use: [
      //         path.resolve('./myLoader.js')
      //     ]
      // },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
                Commit version : ${childProcess.execSync(
                  "git rev-parse --short HEAD"
                )}
                Committer name : ${childProcess.execSync(
                  "git config user.name"
                )}
                Commit Date : ${new Date().toLocaleString()}
            `,
    }),

    new webpack.DefinePlugin({
      dev: JSON.stringify(process.env.DEV_API),
      pro: JSON.stringify(process.env.PRO_API),
    }),

    new HtmlWebpackPlugin({
      template: "./src/index.html", // 목표 html 파일의 위치입니다.
    }),

    new CleanWebpackPlugin(),
  ],
};
