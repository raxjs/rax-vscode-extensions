import { createElement } from 'rax';

export default [
  {
    type: 'ssr',
    title: 'SSR',
    title_en: 'SSR',
    icon: "https://gw.alicdn.com/tfs/TB1S7n7qbj1gK0jSZFuXXcrHpXa-120-120.png",
    disabled: (config) => {
      // Only enable in SPA MPA and Web App
      return config.appType === 'lite' || !config.projectTargets.includes('web');
    },
    description: (
      <div>
        <p>开启服务器端渲染，为 Web 应用带来更快的首屏呈现时间。</p>
        <a target="_blank" href="https://rax.js.org/docs/guide/ssr">查看文档</a>
      </div>
    ),
    description_en: (
      <div>
        <p>Turn on the SSR(Server-Side Rendering) for faster first-screen rendering time for web applications.</p>
        <a target="_blank" href="https://rax.js.org/docs/guide/ssr">Reference</a>
      </div>
    )
  },
  {
    type: 'faas',
    title: 'FaaS',
    title_en: 'FaaS',
    icon: "https://gw.alicdn.com/tfs/TB1j4z7qkT2gK0jSZFkXXcIQFXa-120-120.png",
    description: (
      <div>
        <p>前后端一体化开发体验，在 Rax 工程中，同时完成 API 开发。</p>
        <a target="_blank" href="https://rax.js.org/docs/guide/cloud-in-one">查看文档</a>
      </div>
    ),
    description_en: (
      <div>
        <p>Use FaaS(Function as a Service) to develop UI and data interfaces at the same time.</p>
        <a target="_blank" href="https://rax.js.org/docs/guide/cloud-in-one">Reference</a>
      </div>
    )
  },
  {
    type: 'react',
    title: '兼容 React',
    title_en: 'Compatibility with React',
    icon: "https://gw.alicdn.com/tfs/TB1rddGtmf2gK0jSZFPXXXsopXa-120-120.png",
    description: (
      <div>
        <p>在 Rax 应用中使用 React 的组件，开启此功能可快速兼容并复用 React 工程的代码。</p>
        <a target="_blank" href="http://rax.js.org/docs/guide/rax-plugin-compat-react">查看文档</a>
      </div>
    ),
    description_en: (
      <div>
        <p>Use React components in Rax projects, Turn on this feature to quickly Compatibility with React code.</p>
        <a target="_blank" href="http://rax.js.org/docs/guide/rax-plugin-compat-react">Reference</a>
      </div>
    )
  }
];