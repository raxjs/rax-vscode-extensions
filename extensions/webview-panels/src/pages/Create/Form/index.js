import { Fragment, createElement, useRef, useEffect, useState } from 'rax';
import useEn from '../useEn';
import Platforms from './Platforms';
import ScaffoldType from './ScaffoldType';
import Server from './Server';

import './index.css';

const defaultScaffoldType = 'spa-standard';

export default function Form(props) {
  const { type } = props;

  const [showServerOption, setShowServerOption] = useState(true);

  // rax-cli args
  const [scaffoldType, setScaffoldType] = useState(defaultScaffoldType);

  const platformsRef = useRef(null);
  const serverRef = useRef(null);

  // when type is scaffold and contains web platform, show ssr options
  function serverOptionToggle() {
    if (type === 'scaffold' && scaffoldType !== 'lite') {
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
      case 'scaffold':
        res.scaffoldType = scaffoldType;
      case 'component':
        if (scaffoldType !== 'lite') {
          const platformsData = platformsRef.current.getData();
          if (platformsData === null) return null;
          Object.assign(
            res,
            platformsData,
            showServerOption ? serverRef.current.getData() : {}
          );
        }
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
    setScaffoldType(defaultScaffoldType);
  }, [type]);

  return (
    <div className="formWrap">
      <ScaffoldType
        x-if={type === 'scaffold'}
        scaffoldType={scaffoldType}
        onChange={setScaffoldType}
      />
      {type !== 'api' && scaffoldType !== 'lite' ? (
        <>
          <Platforms
            ref={platformsRef}
            onChange={serverOptionToggle}
          />
          <Server
            x-if={showServerOption}
            ref={serverRef}
          />
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