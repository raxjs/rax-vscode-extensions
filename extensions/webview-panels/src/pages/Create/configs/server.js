import { createElement } from 'rax';

export default [
  {
    type: 'ssr',
    title: 'SSR',
    icon: "https://gw.alicdn.com/tfs/TB1S7n7qbj1gK0jSZFuXXcrHpXa-120-120.png",
    description: (
      <div>
        <p>开启服务器端渲染，为 Web  应用带来更快的首屏呈现时间。</p>
        <a target="_blank" href="http://rax.alibaba-inc.com/docs/guide/ssr">查看文档</a>
      </div>
    ),
    description_en: (
      <div>
        <p>Turn on the SSR(Server-Side Rendering) for faster first-screen rendering time for web applications.</p>
        <a target="_blank" href="http://rax.alibaba-inc.com/docs/guide/ssr">Reference</a>
      </div>
    )
  },
  {
    type: 'faas',
    title: 'FaaS',
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
  }
];