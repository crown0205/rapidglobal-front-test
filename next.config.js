/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // NOTE: 이미지 CDN 도메인 추가
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.heyseller.kr",
      },
    ],
  },
  // NOTE: SVG 파일을 컴포넌트로 사용하기 위한 설정
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
