import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "bundle.js",
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: /\.module\.css$/i, // CSS 모듈 활성화
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|woff2?|eot|ttf|otf|ico)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),

    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "" }],
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.join(process.cwd(), "dist"),
      },
      {
        directory: path.join(process.cwd(), "public"),
      },
    ],

    historyApiFallback: true,
    open: true,
    hot: true,
    port: 3000,
    compress: true,
    allowedHosts: "auto",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
};
