/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'randomuser.me',
            }
        ]
    },
    devIndicators: {
        buildActivity: false,
        buildActivityPosition: 'bottom-right',
    }
};

export default nextConfig;
