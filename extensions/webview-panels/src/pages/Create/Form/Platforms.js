import { createElement, forwardRef, useImperativeHandle, useEffect, useState } from 'rax';
import platformOptions from '../configs/platforms';

import './Platforms.css';

// rax-cli args
let projectTargets = [];

function Platforms(props, ref) {

  const { onChange } = props;
  // en-US, en-en-GB, en ...
  const useEn = (window.__VSCODE__.env || '').indexOf('en') === 0;
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
        {useEn ? 'Select platform' : '选择支持的平台'}
        (<b style={{ color: "red" }}>* </b><span className="platformTitleExplain">{useEn ? 'Select at least one' : '至少选择一个'}</span>)
      </p>
      {platformOptions.map((platform, index) => {
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
              {useEn ? platform.description_en : platform.description}
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default forwardRef(Platforms)