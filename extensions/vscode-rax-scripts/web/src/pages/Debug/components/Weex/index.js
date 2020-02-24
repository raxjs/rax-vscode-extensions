import { createElement, useState } from 'rax';
import isEnLang from '../../isEnLang';

export default () => {
  const [isRunning, setIsRunning] = useState(false);
  const handleClick = () => {
    const newState = !isRunning;
    if (window.__VSCODE__) {
      window.__VSCODE__.postMessage({
        key: 'weex-debugger',
        run: newState
      });
    }
    setIsRunning(newState);
  };
  return (
    <div>
      <h2 className="title">{isEnLang ? 'Debugging Weex' : '调试 Weex 工程'}</h2>
      <p className="text">
        {
          isEnLang ?
            'Perform debugging through the Weex Decoder, see: ' :
            '通过 Weex Debugger 进行调试，参考文档：'
        }
        <a
          target="_blank"
          href="https://github.com/weexteam/debugger-tool-for-Apache-Weex">
          https://github.com/weexteam/debugger-tool-for-Apache-Weex
        </a>
      </p>

      <a
        className={`btn ${isRunning ? 'btn-off' : 'btn-on'}`}
        onClick={handleClick}
      >
        {isRunning ?
          isEnLang ? 'Turn off' : '关闭' :
          isEnLang ? 'Run' : '启动'
        }
        &nbsp;Weex Debugger
      </a>
    </div>
  );
};
