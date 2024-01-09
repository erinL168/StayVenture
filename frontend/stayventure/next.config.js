/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [process.env.IMAGES],
    },
}

module.exports = nextConfig
