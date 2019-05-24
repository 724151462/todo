module.exports = (isDev) => {
  return {
    preserveWhitepace: true, // 处理模板空格
    extractCSS: !isDev, // 单独打包css
    cssModules: {
      localIndentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    },
    // hotReload: true  // 根据环境变量生成
  }
}