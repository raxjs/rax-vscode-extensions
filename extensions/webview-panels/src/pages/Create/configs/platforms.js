import { createElement } from 'rax';

export default [
  {
    type: 'web',
    title: 'Web',
    icon: "https://gw.alicdn.com/tfs/TB1Qx3Feq61gK0jSZFlXXXDKFXa-200-200.svg",
    description: (
      <div>
        <p>Web App 是指运行于浏览器上的应用，具有开发成本低、开发及更新速度快，维护比较简单的优势。</p>
        <a target="_blank" href="http://rax.alibaba-inc.com/docs/guide/about-web">查看文档</a>
      </div>
    ),
    description_en: (
      <div>
        <p>Web App is an app that running in the browser. It has the advantages of low development cost,  fast develop and update project speed.</p>
        <a target="_blank" href="http://rax.alibaba-inc.com/docs/en-guide/about-web">Reference</a>
      </div>
    )
  },
  {
    type: 'weex',
    title: 'Weex',
    icon: "https://gw.alicdn.com/tfs/TB1bN.FerY1gK0jSZTEXXXDQVXa-213-200.svg",
    description: (
      <div>
        <p>Weex 致力于使开发者能基于通用跨平台的 Web 开发语言和开发经验，来构建 Android、iOS 和 Web 应用。</p>
        <a target="_blank" href="http://rax.alibaba-inc.com/docs/guide/about-weex">查看文档</a>
      </div>
    ),
    description_en: (
      <div>
        <p>Weex is dedicated to enabling developers to build Android, iOS and Web applications based on common cross-platform Web development languages and experience.</p>
        <a target="_blank" href="http://rax.alibaba-inc.com/docs/en-guide/about-weex">Reference</a>
      </div>
    )
  },
  {
    type: 'miniapp',
    title: 'Alibaba MiniApp',
    icon: "https://gw.alicdn.com/tfs/TB1Y9.zeuL2gK0jSZPhXXahvXXa-200-200.svg",
    description: (
      <div>
        <p>将 Rax 作为 DSL 极速开发阿里巴巴集团旗下系列小程序，使前端开发者更容易地使用他们熟悉的方式进行小程序开发。</p>
        <a target="_blank" href="http://rax.alibaba-inc.com/docs/guide/about-miniapp">查看文档</a>
      </div>
    ),
    description_en: (
      <div>
        <p>Using Rax as a DSL to quickly develop an Alibaba MiniApp, making it easier for front-end developers to use their familiar ways for applet development.</p>
        <a target="_blank" href="http://rax.alibaba-inc.com/docs/en-guide/about-miniapp">Reference</a>
      </div>
    )
  },
  {
    type: 'wechat-miniprogram',
    title: 'WeChat MiniProgram',
    icon: "https://gw.alicdn.com/tfs/TB1HwgzepY7gK0jSZKzXXaikpXa-200-200.svg",
    description: (
      <p>将 Rax 作为 DSL 极速开发微信小程序，使前端开发者更容易地使用他们熟悉的方式进行小程序开发。</p>
    ),
    description_en: (
      <p>Using Rax as a DSL to quickly develop an WeChat MiniProgram, making it easier for front-end developers to use their familiar ways for applet development.</p>
    )
  },
  {
    type: 'kraken',
    title: 'Kraken (Flutter)',
    icon: "https://gw.alicdn.com/tfs/TB1T.AEeET1gK0jSZFhXXaAtVXa-200-200.svg",
    description: (
      <p>Kraken 是一个面向 IoT 场景的渲染引擎，依托可靠高效的 Flutter 底层构建面向 W3C 标准的接口。对接 Rax 作为上层 DSL，使前端开发者更容易地使用他们熟悉的方式进行跨容器应用的开发。</p>
    ),
    description_en: (
      <p>Kraken is a rendering engine for IoT, relying on the Flutter to build W3C standard interfaces. Use Rax as an DSL makes it easier for front-end developers to develop cross-container app.</p>
    )
  }
];