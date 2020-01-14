import { Fragment, createElement, useRef, useEffect, useState } from 'rax';
import isEnLang from '../isEnLang';
import Platforms from './Platforms';
import AppType from './appType';
import Features from './Features';

import './index.css';

const defaultAppType = 'spa';

export default function Form(props) {
  const { type } = props;

  const [showFeaturesOption, setShowFeaturesOption] = useState(true);

  // rax-cli args
  const [appType, setAppType] = useState(defaultAppType);
  const [projectTargets, setProjectTargets] = useState([]);

  const platformsRef = useRef(null);
  const featuresRef = useRef(null);

  // when type is app, show project features
  function featuresOptionToggle(targets) {
    setProjectTargets(targets);
    if (type === 'app') {
      setShowFeaturesOption(true);
    } else {
      setShowFeaturesOption(false);
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
          showFeaturesOption ? featuresRef.current.getData() : {}
        );
        break;
      default:
    }
    return res;
  }

  function create() {
    const data = getData();
    console.log("create -> data", data);
    if (data && window.__VSCODE__ && window.__VSCODE__.postMessage) {
      window.__VSCODE__.postMessage({
        key: 'new-project',
        data
      });
    }
  };

  useEffect(() => {
    featuresOptionToggle(platformsRef.current.getData().projectTargets);
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
        onChange={featuresOptionToggle}
      />
      <Features
        x-if={showFeaturesOption}
        type={type}
        appType={appType}
        projectTargets={projectTargets}
        ref={featuresRef}
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