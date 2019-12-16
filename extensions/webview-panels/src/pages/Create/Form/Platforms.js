import { createElement, forwardRef, useImperativeHandle, useEffect, useState } from 'rax';

import './Platforms.css';

const platforms = [
  {
    type: 'web',
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
    type: 'weex',
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
    type: 'miniapp',
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
    type: 'wechat-miniprogram',
    title: 'WeChat MiniProgram',
    icon: "https://gw.alicdn.com/tfs/TB1HwgzepY7gK0jSZKzXXaikpXa-200-200.svg",
    description: (
      <p>将 Rax 作为 DSL 极速开发微信小程序，使前端开发者更容易地使用他们熟悉的方式进行小程序开发。</p>
    )
  },
  {
    type: 'kraken',
    title: 'Kraken (Flutter)',
    icon: "https://gw.alicdn.com/tfs/TB1T.AEeET1gK0jSZFhXXaAtVXa-200-200.svg",
    description: (
      <p>Kraken 是一个面向 IoT 场景的渲染引擎，依托可靠高效的 Flutter 底层构建面向 W3C 标准的接口。对接 Rax 作为上层 DSL，使前端开发者更容易地使用他们熟悉的方式进行跨容器应用的开发。</p>
    )
  }
];

// rax-cli args
let projectTargets = [];

function Platforms(props, ref) {

  const { onChange } = props;

  const [mark, setMark] = useState({});
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Set default platform
    projectTargets = ['web'];
    setMark({
      web: true,
      weex: false,
      aliMiniApp: false,
      wxMiniApp: false,
      kraken: false
    })
  }, []);

  function checkValid(targets) {
    // You must choose at least one platform to be created.
    let valid = !!(targets || projectTargets).length;
    if (valid) {
      setShowError(false);
    } else {
      setShowError(true);
    }
    return valid;
  }

  function handleClick(platform) {
    const newMark = Object.assign(
      {},
      mark,
      { [platform.type]: !mark[platform.type] }
    );
    // Update rax-cli args projectTargets
    projectTargets = [];
    Object.keys(newMark).forEach((key) => {
      if (newMark[key] === true) {
        projectTargets.push(key);
      }
    })
    checkValid(projectTargets);
    onChange && onChange(projectTargets);

    setMark(newMark);
  };

  // export getData method
  useImperativeHandle(ref, () => ({
    getData: () => {
      if (checkValid()) {
        const res = {
          projectTargets
        };
        return res;
      }
      return null;
    }
  }))

  return (
    <div className={`platform${showError ? " platformError" : ""}`}>
      <p className="platformTitle">
        选择支持的平台（<b style={{ color: "red" }}>* </b><span className="platformTitleExplain">至少选择一个</span>）
      </p>
      {platforms.map((platform, index) => {
        return (
          <div
            key={`platform_${index}`}
            onClick={() => { handleClick(platform) }}
            className={`platformItem${mark[platform.type] === true ? " platformSelectedItem" : ""} `}
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

export default forwardRef(Platforms)