/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
    ],
  },
  env: {
    GOOGLE_APP_CLIENT_ID: '51237689048-id9ol31avh1itdo3pmma472jgela1o93.apps.googleusercontent.com/',
    GOOGLE_APP_CLIENT_SECRET: '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',
    NEXTAUTH_SECRET: 'e8207abc4709c5fdca1ca18c28bda3eb',
    GOOGLE_AUTH_URL:'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle&client_id=51237689048-id9ol31avh1itdo3pmma472jgela1o93.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email',
    SERVER_URL:'http://localhost:8000'
  },
};

export default nextConfig;
