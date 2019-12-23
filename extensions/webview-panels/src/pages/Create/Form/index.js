import { Fragment, createElement, useRef, useEffect, useState } from 'rax';
import isEnLang from '../isEnLang';
import Platforms from './Platforms';
import AppType from './appType';
import Server from './Server';

import './index.css';

const defaultAppType = 'spa';

export default function Form(props) {
  const { type } = props;

  const [showServerOption, setShowServerOption] = useState(true);

  // rax-cli args
  const [appType, setAppType] = useState(defaultAppType);

  const platformsRef = useRef(null);
  const serverRef = useRef(null);

  // when type is app and contains web platform, show ssr options
  function serverOptionToggle() {
    if (type === 'app') {
      const platformsData = platformsRef.current.getData();
      if (platformsData && platformsData.projectTargets.includes('web')) {
        setShowServerOption(true);
      } else {
        setShowServerOption(false);
      }
    } else {
      setShowServerOption(false);
    }
  }

  // Get form data
  function getData() {
    let res = { projectType: type };
    switch (type) {
      case 'app':
        res.appType = appType;
      case 'api':
      case 'component':
        const platformsData = platformsRef.current.getData();
        if (platformsData === null) return null;
        Object.assign(
          res,
          platformsData,
          showServerOption ? serverRef.current.getData() : {}
        );
        break;
      default:
    }
    return res;
  }

  function create() {
    const data = getData();
    console.log("create -> data", data)

    if (data && window.__VSCODE__ && window.__VSCODE__.postMessage) {
      window.__VSCODE__.postMessage({
        key: 'new-project',
        data
      })
    }
  };

  useEffect(() => {
    serverOptionToggle();
    setAppType(defaultAppType);
  }, [type]);

  return (
    <div className="formWrap">
      <AppType
        x-if={type === 'app'}
        appType={appType}
        onChange={setAppType}
      />
      <Platforms
        ref={platformsRef}
        onChange={serverOptionToggle}
      />
      <Server
        x-if={showServerOption}
        type={type}
        appType={appType}
        ref={serverRef}
      />
      <div className="footer">
        <a
          className="btn create"
          onClick={create}
        >
          {isEnLang ? 'Create' : '创建工程'}
        </a>
      </div>
    </div>
  );
};