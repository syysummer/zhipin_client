const {

      override,
    
      fixBabelImports,
    
      addLessLoader,
    
    } = require("customize-cra");
    
    module.exports = override(
    
        fixBabelImports("import", {
            libraryName: "antd-mobile", libraryDirectory: 'es',style: true // change importing css to less
        }),
    
      addLessLoader({
    
        javascriptEnabled: true,//支持css文件中写入js
    
        modifyVars: {
        "@brand-primary": "#1cae82", // 正常
        "@brand-primary-tap": "#1DA57A", // 按下
       }
      })
    )