import { createElement } from 'rax';

import './index.css';

export default function Platforms(props) {

  const platforms = [
    {
      platform: 'web',
      title: 'Web',
      icon: "https://gw.alicdn.com/tfs/TB1Qx3Feq61gK0jSZFlXXXDKFXa-200-200.svg",
      description: (
        <div>
          <p>Web App 是指运行于浏览器上的应用，具有开发成本低、开发及更新速度快，维护比较简单的优势。</p>
          <a target="_blank" href="http://rax.alibaba-inc.com/docs/guide/about-web">查看文档</a>
        </div>
      )
    },
    {
      platform: 'weex',
      title: 'Weex',
      icon: "https://gw.alicdn.com/tfs/TB1bN.FerY1gK0jSZTEXXXDQVXa-213-200.svg",
      description: (
        <div>
          <p>Weex 致力于使开发者能基于通用跨平台的 Web 开发语言和开发经验，来构建 Android、iOS 和 Web 应用。</p>
          <a target="_blank" href="http://rax.alibaba-inc.com/docs/guide/about-weex">查看文档</a>
        </div>
      )
    },
    {
      platform: 'aliMiniApp',
      title: 'Alibaba MiniApp',
      icon: "https://gw.alicdn.com/tfs/TB1Y9.zeuL2gK0jSZPhXXahvXXa-200-200.svg",
      description: (
        <div>
          <p>将 Rax 作为 DSL 极速开发阿里巴巴集团旗下系列小程序，使前端开发者更容易地使用他们熟悉的方式进行小程序开发。</p>
          <a target="_blank" href="http://rax.alibaba-inc.com/docs/guide/about-miniapp">查看文档</a>
        </div>
      )
    },
    {
      platform: 'wxMiniApp',
      title: 'WeChat MiniProgram',
      icon: "https://gw.alicdn.com/tfs/TB1HwgzepY7gK0jSZKzXXaikpXa-200-200.svg",
      description: (
        <p>将 Rax 作为 DSL 极速开发微信小程序，使前端开发者更容易地使用他们熟悉的方式进行小程序开发。</p>
      )
    },
    {
      platform: 'kraken',
      title: 'Kraken (Flutter)',
      icon: "https://gw.alicdn.com/tfs/TB1T.AEeET1gK0jSZFhXXaAtVXa-200-200.svg",
      description: (
        <p>Kraken 是一个面向 IoT 场景的渲染引擎，依托可靠高效的 Flutter 底层构建面向 W3C 标准的接口。对接 Rax 作为上层 DSL，使前端开发者更容易地使用他们熟悉的方式进行跨容器应用的开发。</p>
      )
    }
  ];
  
  return (
    <div className="platform">
      <p className="platformTitle">选择支持的平台（<b style={{ color: "red" }}>* </b>至少选择一个）</p>
      {platforms.map((platform, index) => {
        return (
          <div
            key={`platform_${index}`}
            className="platformItem platformSelectedItem"
          >
            <img class="platformItemIcon" title={platform.title} src={platform.icon} />
            <p className="platformItemTitle">{platform.title}</p>
            <img class="platformSelectedItemTag" src="https://gw.alicdn.com/tfs/TB15rQzexD1gK0jSZFsXXbldVXa-200-200.svg" />
            <div className="platformItemDescription">
              {platform.description}
            </div>
          </div>
        )
      })}
    </div>
  );
};

