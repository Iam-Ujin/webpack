const path = require("path");
// const myLoader = require("./myLoader");
const webpack = require("webpack");

module.exports = {
  mode: "development",
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
      // }
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      //toLocaleString : 날짜의 문자열 표현을 지역의 언어에 맞는 형식으로 반환합니다.
      banner: "마지막 빌드 시간은 " + new Date().toLocaleString() + " 입니다.",
    }),
  ],
};
