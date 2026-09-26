import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    
    output: 'standalone',
    
    transpilePackages: [
        "@react-three/drei",
        "@react-three/fiber",
        "@react-three/postprocessing"
    ],
    
    serverExternalPackages: [],
    
    poweredByHeader: false,
};

export default nextConfig;
