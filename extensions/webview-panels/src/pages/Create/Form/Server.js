import { createElement, forwardRef, useEffect, useImperativeHandle, useState } from 'rax';
import useEn from '../useEn';
import serverOptions from '../configs/server';

import './Server.css';

// rax-cli args
let projectFeatures = [];

function Server(props, ref) {
  const { appType, type } = props;

  const [mark, setMark] = useState({
    ssr: false,
    faas: false
  });

  // rax-cli args
  const [projectAliyunId, setProjectAliyunId] = useState('');
  const [projectAliyunRegion, setProjectAliyunRegion] = useState('cn-hangzhou');

  function setProjectFeatures(currentMark) {
    // Update rax-cli args projectFeatures
    projectFeatures = [];
    Object.keys(currentMark).forEach((key) => {
      if (currentMark[key] === true) {
        projectFeatures.push(key);
      }
    })
  }

  function handleClick(options) {
    const currentMark = Object.assign(
      {},
      mark,
      { [options.type]: !mark[options.type] }
    );
    setProjectFeatures(currentMark);
    setMark(currentMark);
  };

  // Listen appType and type to update projectFeatures
  useEffect(() => {
    let currentMark = mark;
    // Lite-App without SSR 
    if (appType === 'lite' && mark.ssr === true) {
      currentMark = Object.assign(
        {},
        mark,
        { ssr: false }
      );
    }
    setProjectFeatures(currentMark);
    setMark(currentMark);
  }, [appType, type]);

  useImperativeHandle(ref, () => ({
    getData: () => {
      const res = {
        projectFeatures,
        projectAliyunId: '',
        projectAliyunRegion: ''
      };
      // FaaS need projectAliyunId and projectAliyunRegion
      if (projectFeatures.includes('faas')) {
        res.projectAliyunId = projectAliyunId;
        res.projectAliyunRegion = projectAliyunRegion;
      }
      return res;
    }
  }))

  return (
    <div className="server">
      <p className="serverTitle">
        {useEn ?
          'Enable Server-Side Rendering for web projects (optional)' :
          '为 Web 工程开启服务端渲染 (可选)'
        }
      </p>
      {serverOptions.map((option, index) => {
        if (appType === 'lite' && option.type === 'ssr') {
          return null;
        }
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
              {useEn ? option.description_en : option.description}
            </div>
          </div>
        )
      })}
      <div x-if={mark.faas === true} className="extraInfo">
        <p className="extraTitle">
          {useEn ?
            'Fill in the configuration information of Alibaba Cloud FaaS.' :
            '填写阿里云 FaaS 的配置信息。'
          }
          <a target="_blank" href="https://rax.js.org/docs/guide/cloud-in-one">[{useEn ? 'Reference' : '查看文档'}]</a>
        </p>
        <div className="extraItem">
          <p className="extraItemLabel">Alibaba Cloud ID</p>
          <input
            value={projectAliyunId}
            onKeyUp={(e) => { setProjectAliyunId(e.target.value) }}
            className="extraItemInput"
            placeholder={useEn ? 'Console-> Basic Information-> Security Settings-> Account ID' : '可在阿里云控制台右上角->基本资料->安全设置->账号 ID 中查看'} />
        </div>
        <div className="extraItem">
          <p className="extraItemLabel">
            {useEn ? 'Cloud function deployment area' : '云函数部署所在地区'} &nbsp;
              <a target="_blank" href="https://help.aliyun.com/document_detail/40654.html">[{useEn ? 'Reference' : '查看文档'}]</a>
          </p>
          <input
            value={projectAliyunRegion}
            onKeyUp={(e) => { setProjectAliyunRegion(e.target.value) }}
            className="extraItemInput"
            placeholder="cn-hangzhou" />
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Server);