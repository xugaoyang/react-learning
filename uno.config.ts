import presetWind4 from '@unocss/preset-wind4'
import { defineConfig, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetWind4(),
    // 图标预设配置
    presetIcons({
      // 指定要使用的图标集（此处为 MDI）
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      },
      // 图标前缀（使用方式：i-mdi-<图标名>）
      prefix: 'i-',
      // 其他选项（可选）
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  safelist: [
    'i-mdi-food',
    'i-mdi-beer',
    'i-mdi-currency-cny',
    'i-mdi-plane-train',
    'i-mdi-controller'
  ],
  // 可选：自定义规则
  rules: [
    // 例如定义图标大小快捷类
    [/^icon-(\d+)$/, ([, d]) => ({ 'font-size': `${d}px` })],
  ],
});
