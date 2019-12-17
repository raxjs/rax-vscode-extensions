import { Fragment, createElement, useRef, useEffect, useState } from 'rax';
import Platforms from './Platforms';
import Server from './Server';

import './index.css';

export default function Form(props) {
  const { type } = props;
  // en-US, en-en-GB, en ...
  const useEn = (window.__VSCODE__.env || '').indexOf('en') === 0;
  const [showServerOption, setShowServerOption] = useState(true);

  const platformsRef = useRef(null);
  const serverRef = useRef(null);

  // when type is scaffold and contains web platform, show ssr options
  function serverOptionToggle() {
    if (type === 'scaffold') {
      const platformsData = platformsRef.current.getData();
      if (
        platformsData &&
        Array.isArray(platformsData.projectTargets) &&
        platformsData.projectTargets.includes('web')
      ) {
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
      case 'scaffold':
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
  }, [type]);

  return (
    <div className="formWrap">
      {type !== 'api' ? (
        <>
          <Platforms
            ref={platformsRef}
            onChange={serverOptionToggle}
          />
          {showServerOption ? (
            <Server
              ref={serverRef}
            />
          ) : null}
        </>
      ) : null}
      <div className="footer">
        <a
          className="btn create"
          onClick={create}
        >
          {useEn ? 'Create' : '创建工程'}
        </a>
      </div>
    </div>
  );
};