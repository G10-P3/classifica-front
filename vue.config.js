const webpack = require("webpack");

module.exports = {
  transpileDependencies: true,
  devServer: {
    port: 3000, // Porta do servidor do Vue.js
    proxy: {
      "/classes": {
        target: "http://localhost:8080", // URL do back-end
        changeOrigin: true, // Permite alterar a origem para evitar problemas de CORS
        pathRewrite: { "^/classes": "/classes" }, // Mantém o caminho da API
      },
    },
  },
  configureWebpack: {
    resolve: {
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        process: require.resolve("process/browser"),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
    ],
  },
};
