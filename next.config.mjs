/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // HTML 파일을 처리하는 로더를 추가합니다.
      config.module.rules.push({
        test: /\.html$/,
        use: 'html-loader'
      });
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
        };
      }
      // 추가적인 커스텀 설정이 필요하다면 여기에 추가합니다.
  
      return config;
    }
  };

export default nextConfig;
