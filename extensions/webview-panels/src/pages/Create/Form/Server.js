import { createElement, forwardRef, useImperativeHandle, useState } from 'rax';

import './Server.css';

const options = [
  {
    type: 'ssr',
    title: 'SSR',
    icon: "https://gw.alicdn.com/tfs/TB1S7n7qbj1gK0jSZFuXXcrHpXa-120-120.png",
    description: (
      <div>
        <p>开启服务器端渲染，为 Web  应用带来更快的首屏呈现时间。</p>
        <a target="_blank" href="http://rax.alibaba-inc.com/docs/guide/ssr">查看文档</a>
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
    )
  }
];

// rax-cli args
let projectFeatures = [];

function Server(props, ref) {

  const [mark, setMark] = useState({
    ssr: false,
    faas: false
  });

  // rax-cli args
  const [projectAliyunId, setProjectAliyunId] = useState('');
  const [projectServerlessRegion, setProjectServerlessRegion] = useState('cn-hangzhou');

  function handleClick(options) {
    const newMark = Object.assign(
      {},
      mark,
      { [options.type]: !mark[options.type] }
    );
    // Update rax-cli args projectFeatures
    projectFeatures = [];
    Object.keys(newMark).forEach((key) => {
      if (newMark[key] === true) {
        projectFeatures.push(key);
      }
    })
    setMark(newMark);
  };

  useImperativeHandle(ref, () => ({
    getData: () => {
      const res = {
        projectFeatures,
        projectAliyunId: '',
        projectServerlessRegion: ''
      };
      // FaaS need projectAliyunId and projectServerlessRegion
      if (projectFeatures.includes('faas')) {
        res.projectAliyunId = projectAliyunId;
        res.projectServerlessRegion = projectServerlessRegion;
      }
      return res;
    }
  }))

  return (
    <div className="server">
      <p className="serverTitle">为 Web 工程开启服务端渲染（可选）</p>
      {options.map((option, index) => {
        return (
          <div
            key={`option_${index}`}
            onClick={() => { handleClick(option) }}
            className={`serverItem${mark[option.type] === true ? " serverSelectedItem" : ""} `}
          >
            <img class="serverItemIcon" title={option.title} src={option.icon} />
            <p className="serverItemTitle">{option.title}</p>
            <img class="serverSelectedItemTag" src="https://gw.alicdn.com/tfs/TB15rQzexD1gK0jSZFsXXbldVXa-200-200.svg" />
            <div className="serverItemDescription">
              {option.description}
            </div>
          </div>
        )
      })}
      {mark.faas === true ? (
        <div className="extraInfo">
          <p className="extraTitle">
            填写阿里云 FaaS 的配置信息。
            <a target="_blank" href="https://rax.js.org/docs/guide/cloud-in-one">[查看文档]</a>
          </p>
          <div className="extraItem">
            <p className="extraItemLabel">阿里云账号 ID</p>
            <input
              value={projectAliyunId}
              onKeyUp={(e) => { setProjectAliyunId(e.target.value) }}
              className="extraItemInput"
              placeholder="可在阿里云控制台右上角->基本资料->安全设置->账号 ID 中查看" />
          </div>
          <div className="extraItem">
            <p className="extraItemLabel">
              云函数部署所在地区 &nbsp;
              <a target="_blank" href="https://help.aliyun.com/document_detail/40654.html">[查看文档]</a>
            </p>
            <input
              value={projectServerlessRegion}
              onKeyUp={(e) => { setProjectServerlessRegion(e.target.value) }}
              className="extraItemInput"
              placeholder="cn-hangzhou" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default forwardRef(Server);