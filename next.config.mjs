/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['127.0.0.1', 'localhost','http://127.0.0.1:8000/'], // Add your local domains here
},
};

export default nextConfig; 