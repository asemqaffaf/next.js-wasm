import type { Configuration as WebpackConfig } from 'webpack';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
// experimental: {
//     serverActions: true,
// },
webpack: (config: WebpackConfig, { isServer }): WebpackConfig => {
    config.experiments = {
    ...config.experiments,
    asyncWebAssembly: true,
    layers: true,
    };

    if (!config.output) {
    config.output = {};
    }

    config.output.webassemblyModuleFilename = isServer
    ? './../static/wasm/[modulehash].wasm'
    : 'static/wasm/[modulehash].wasm';

    return config;
},
};

export default nextConfig;
