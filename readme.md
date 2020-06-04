# vue单页面webpack框架模板
webpack搭建vue单页面项目框架，区分环境打包。（未做html模板加载优化）

## template分支：模板分支

## master分支：设置常用的webpack配置优化测试
1. 使用speed-measure-webpack-plugin进行打包进程监控。
用法：
```javascript
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config = {
    //...webpack配置
}
module.exports = smp.wrap(config);
```

2. cacheLoader
是否使用cacheLoader来为性能开销大的loader增加缓存，使第二次打包时加快打包的速度.
npm install cache-loader -D 并将rules -> cache-loader放在其他的loader之前即可。

3. happyPack开启多线程并发打包
[npm install happypack -D](npmjs.com/package/happypack)
官方文档中：若是使用多个happypack插件，则最好自己创建一个线程池，然后配置插件共享线程池， 从而最大程度的减少其中的线程的空闲时间。且配合DLL使用可以加快极多打包速度。

用法：
```javascript
const Happypack = require('happypack');
// 若要开启线程池
const happyThreadPool = Happypack.ThreadPool({size: 5})
module.exports = {
    //...
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: 'Happypack/loader?id=js',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.css$/,
                use: 'Happypack/loader?id=css',
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules', 'bootstrap', 'dist')
                ]
            }
        ]
    },
    plugins: [
        new Happypack({
            id: 'js', //和rule中的id=js对应
            //将之前 rule 中的 loader 在此配置
            use: ['babel-loader'] //必须是数组
            threads: happyThreadPool //使用共享线程池
        }),
        new Happypack({
            id: 'css',//和rule中的id=css对应
            use: ['style-loader', 'css-loader','postcss-loader'],
            threads: happyThreadPool //使用共享线程池
             //threads: 3 可以开启的最大线程
        })
    ]
}
```

4. terser-webpack-plugin 默认开启多进程压缩优化 缓存文件在node-modules/.cache里。
5. HardSourceWebpackPlugin为模块提供中间缓存，缓存默认的存放路径是: node_modules/.cache/hard-source。
6. noParse
如果一些第三方模块没有AMD/CommonJS规范版本，可以使用 noParse 来标识这个模块，
这样 Webpack 会引入这些模块，但是不进行转化和解析，从而提升 Webpack 的构建性能 ，例如：jquery 、lodash。用法：
```javascript 
module.exports = {
    //...
    module: {
        noParse: /jquery|lodash/
    }
}
```

8. IgnorePlugin忽略第三方指定目录
当引入一些第三方包的时候，有的包经常会带有没有压缩的文件、各国语言的文件，比如Select2就会带上一排国家语言包OwO，这个时候我们就可以使用IgnorePlugin在打包时忽略
本地化内容。
例如
```javascript
module.exports = {
    //...
    plugins: [
        //忽略 moment 下的 ./locale 目录
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        new webpack.IgnorePlugin(/^\.\/dist/js/i18n$/, /select2$/)
    ]
}

在引入时：
import moment from 'moment';
import 'moment/locale/zh-cn';// 手动引入语言包

import select2 from 'select2';
import 'select2/dist/js/i18n/zh-cn';// 手动引入语言包
```

9. DLL
10. 抽离公共代码 -- 详看打包配置
```javascript
module.exports = {
  optimization: {
    splitChunks: {//分割代码块
      cacheGroups: {
        vendor: {
          //第三方依赖
          priority: 1,   //设置优先级，首先抽离第三方模块
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 1 //最少引入了1次
        },
        //缓存组
        common: {
          //公共模块
          chunks: 'initial',
          name: 'common',
          minSize: 100, //大小超过100个字节
          minChunks: 3 //最少引入了3次
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  }
}
```