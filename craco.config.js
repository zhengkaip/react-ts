const CracoAntDesignPlugin = require('craco-antd');
const path = require('path')
const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
    webpack: {
        alias: {
            '@@': pathResolve('.'),
            '@': pathResolve('src'),
            '@assets': pathResolve('src/assets'),
            '@common': pathResolve('src/common'),
            '@components': pathResolve('src/components'),
            '@hooks': pathResolve('src/hooks'),
            '@pages': pathResolve('src/pages'),
            '@store': pathResolve('src/store'),
            '@utils': pathResolve('src/utils')
            // 此处是一个示例，实际可根据各自需求配置
        },
        // configure: (config, { env, paths }) => {
        //     const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
        //     if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/;
        //     config.module.rules.push({
        //         test: /\.svg$/,
        //         issuer: {
        //             // Strict these svg as component only for svgs that are imported from js / ts files.
        //             // It allows to configure other behaviour for svgs that are imported from other file types (such as .css)
        //             test: /\.(js|ts)x?$/,
        //         },
        //         use: [
        //             // {
        //             //     loader: 'babel-loader',
        //             // },
        //             {
        //                 loader: '@svgr/webpack',
        //                 options: {
        //                     icon: true,
        //                     native: true,
        //                     replaceAttrValues: { old: 'new' }
        //                 },
        //             },
        //         ],
        //     });
        //     return config;
        // }
    },
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeTheme: {
                    '@primary-color': '#1DA57A',
                },
            },
        },
    ]
};