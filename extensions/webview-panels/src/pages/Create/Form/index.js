import { Fragment, createElement, forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'rax';
import Platforms from './Platforms';
import Server from './Server';

import './index.css';

function Form(props, ref) {
  const { type } = props;

  const [showServerOption, setShowServerOption] = useState(true);

  const platformsRef = useRef(null);
  const serverRef = useRef(null);

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

  useEffect(() => {
    serverOptionToggle();
  }, [type]);

  useImperativeHandle(ref, () => ({
    getData: () => {
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
  }));

  return (
    <>
      {type !== 'api' ? (
        <div className="formWrap">
          <Platforms
            ref={platformsRef}
            onChange={serverOptionToggle}
          />
          {showServerOption ? (
            <Server
              ref={serverRef}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default forwardRef(Form)