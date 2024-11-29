const webpack = require("webpack");

module.exports = {
  transpileDependencies: true,
  devServer: {
    port: 3000, // Porta do servidor do Vue.js
    proxy: {
      "/classes": {
        target: "http://localhost:8080", // URL do back-end
        changeOrigin: true, // Permite alterar a origem para evitar problemas de CORS
        pathRewrite: { "^/classes": "/classes" }, // Mapeia o caminho original
      },
      "/exam": {
        target: "http://localhost:8080", // Caso use a rota para simulado
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:8001",
          changeOrigin: true,
        },
      },
    },
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
