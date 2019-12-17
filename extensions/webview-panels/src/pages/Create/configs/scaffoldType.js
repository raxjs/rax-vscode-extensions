import { createElement } from 'rax';

export default [
  {
    type: 'spa-standard',
    title: '单页应用',
    title_en: 'SPA',
    icon: "https://gw.alicdn.com/tfs/TB1S7n7qbj1gK0jSZFuXXcrHpXa-120-120.png",
    description: (
      <div>
        <p>单页应用(Single Page Application)，相比多页应用它具有更好的页面切换体验和更一致的状态管理模式。</p>
        <a target="_blank" href="http://rax.alibaba-inc.com/docs/guide/routes">查看文档</a>
      </div>
    ),
    description_en: (
      <div>
        <p>SPA(Single Page Application), which has a better Page switching experience and a more consistent state management mode than a Multi-page Application.</p>
        <a target="_blank" href="http://rax.alibaba-inc.com/docs/en-guide/routes">Reference</a>
      </div>
    )
  },
  {
    type: 'mpa-standard',
    title: '多页应用',
    title_en: 'MPA',
    icon: "https://gw.alicdn.com/tfs/TB1j4z7qkT2gK0jSZFkXXcIQFXa-120-120.png",
    description: (
      <div>
        <p>将 App 工程变成多页面工程，每个页面会构建出独立的资源文件。</p>
        <a target="_blank" href="http://rax.alibaba-inc.com/docs/guide/rax-plugin-multi-pages">查看文档</a>
      </div>
    ),
    description_en: (
      <div>
        <p>Turn the project into a multi-page application, each page will build an independent resource file</p>
        <a target="_blank" href="http://rax.alibaba-inc.com/docs/guide/rax-plugin-multi-pages">Reference</a>
      </div>
    )
  },
  {
    type: 'lite',
    title: 'Lite App',
    title_en: 'Lite App',
    icon: "https://gw.alicdn.com/tfs/TB1j4z7qkT2gK0jSZFkXXcIQFXa-120-120.png",
    description: (
      <p>生成最简设置的项目</p>
    ),
    description_en: (
      <p>The simplest possible setup</p>
    )
  }
]