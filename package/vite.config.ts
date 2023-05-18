import { resolve } from 'path'
import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'
import progress from 'vite-plugin-progress'
import EslintPlugin from 'vite-plugin-eslint'
import { ViteEjsPlugin } from "vite-plugin-ejs"
import { viteMockServe } from 'vite-plugin-mock'
import PurgeIcons from 'vite-plugin-purge-icons'
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import DefineOptions from "unplugin-vue-define-options/vite"
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
const root = process.cwd()

function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env = {} as any
  const isBuild = command === 'build'
  if (!isBuild) {
    env = loadEnv((process.argv[3] === '--mode' ? process.argv[4] : process.argv[3]), root)
  } else {
    env = loadEnv(mode, root)
  }
  return {
    base: env.VITE_BASE_PATH,
    plugins: [
      Vue(),
      VueJsx(),
      WindiCSS(),
      progress(),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [{
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/es/components/${name.substring(3)}/style/css`
          }
        }]
      }),
      EslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
      }),
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__dirname, 'src/locales/**')]
      }),
      createSvgIconsPlugin({
        iconDirs: [pathResolve('src/assets/svgs')],
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: true
      }),
      PurgeIcons(),
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        injectCode: `
          import { setupProdMockServer } from '../mock/_createProductionServer'

          setupProdMockServer()
          `
      }),
      DefineOptions(),
      ViteEjsPlugin({
        title: env.VITE_APP_TITLE
      })
    ],

    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/variables.module.less";',
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
        },
        {
          find: /\@\//,
          replacement: `${pathResolve('src')}/`
        }
      ]
    },
    build: {
      outDir: 'dist',
      minify: 'esbuild',
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
      // brotliSize: false,
      terserOptions: {
        compress: {
          drop_debugger: env.VITE_DROP_DEBUGGER === 'true',
          drop_console: env.VITE_DROP_CONSOLE === 'true'
        }
      },
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, '/src/package/index.ts'),
        name: 'package',
        // the proper extensions will be added
        formats: ['es', 'cjs'],
        fileName: (format) => {
            switch (format) {
            // ES Module 格式的文件名
            case 'es':
                return 'index.mjs'
                // CommonJS 格式的文件名
            case 'cjs':
                return 'index.cjs'
                // UMD 格式的文件名
            default:
                return 'index.min.js'
            }
        }
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
              vue: 'Vue'
          }
        }
      }
    },
    server: {
      port: 4000,
      proxy: {
        // 选项写法
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      },
      hmr: {
        overlay: false
      },
      host: '0.0.0.0'
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'vue-types',
        'element-plus/es/locale/lang/zh-cn',
        'element-plus/es/locale/lang/en',
        '@iconify/iconify',
        '@vueuse/core',
        'axios',
        'qs',
        'echarts',
        'echarts-wordcloud',
        'intro.js',
        'qrcode',
        '@wangeditor/editor',
        '@wangeditor/editor-for-vue'
      ]
    }
  }
}
