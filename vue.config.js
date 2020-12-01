module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    devtool: "source-map",
    devServer: {
      watchOptions: {
        poll: true
      }
    }
  }
};
