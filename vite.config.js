import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

export default defineConfig({
	// 编译后的baseurl
	base : '/',
	server: {
		// 端口
		port : 3000,
		host: '0.0.0.0',    // 为了能在局域网上用
		// 解决烦人的跨域
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:9090/api/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	plugins: [
		vue(),
		// 按需引入vant
		Components({
			resolvers: [VantResolver()]
		}),
	]
})
