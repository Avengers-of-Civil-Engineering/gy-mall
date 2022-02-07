module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://gymall.guying18.com',
        ws: true,
        changeOrigin: true
      },
      '/media': {
        target: 'https://gymall.guying18.com',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
