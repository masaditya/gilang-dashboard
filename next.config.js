/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    APP_TOKEN_USER : process.env.APP_TOKEN_USER,
    APP_TOKEN_ADMIN : process.env.APP_TOKEN_ADMIN,
    PORT : process.env.PORT
  }
}

module.exports = nextConfig
