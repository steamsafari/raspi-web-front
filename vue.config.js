module.exports = {
    // 基本路径
    publicPath: "/",

    // 输出文件目录
    outputDir: "../back/public",

    // 生成的静态资源在它们的文件名中包含hash 
    filenameHashing: true,

    // 在 multi-page 模式下构建应用
    pages: {
        main: {
            entry: 'src/main.js',
            template: 'public/main.html',
            filename: 'main.html',
            title: '树莓派Web控制台',
            chunks: ['chunk-vendors', 'chunk-common', 'main']
        },
        camera: {
            entry: 'src/camera.js',
            template: 'public/camera.html',
            filename: 'camera.html',
            title: '树莓派Web控制台_摄像头',
            chunks: ['chunk-vendors', 'chunk-common', 'camera']
        },
        wedo2: {
            entry: 'src/wedo2.js',
            template: 'public/wedo2.html',
            filename: 'wedo2.html',
            title: '树莓派Web控制台_Wedo 2.0',
            chunks: ['chunk-vendors', 'chunk-common', 'wedo2']
        }
    },
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,

    // 配置js、css等文件夹的二级目录位置，不设置则会在outputDir下生成4个文件夹
    //assetsDir: "static",

    // use the full build with in-browser compiler?

    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: true,

    // webpack配置

    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},

    configureWebpack: () => {},

    // vue-loader 配置项

    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},

    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,

    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,

        // 开启 CSS source maps?
        sourceMap: false,

        // css预设器配置项
        loaderOptions: {},

        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },

    // use thread-loader for babel & TS in production build

    // enabled by default if the machine has more than 1 cores
    parallel: require("os").cpus().length > 1
};