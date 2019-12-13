import { createElement, useState } from 'rax';

import './index.css';

export default function Weex(props) {
  const [isRunning, setIsRunning] = useState(false);
  const handleClick = () => {
    const newState = !isRunning
    if (window.__VSCODE__) {
      window.__VSCODE__.postMessage({
        key: 'weex-debugger',
        run: newState
      })
    }
    setIsRunning(newState)
  }
  return (
    <div>
      <h2 className="title">调试 Weex 工程</h2>
      <p className="text">说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明</p>

      <a className="btn" onClick={handleClick}>
        {isRunning ?
          <img className="btnIcon" src="https://img.alicdn.com/tfs/TB1.q8TpKbviK0jSZFNXXaApXXa-48-48.png" /> :
          <img className="btnIcon" src="https://img.alicdn.com/tfs/TB1Y5ZpqeH2gK0jSZFEXXcqMpXa-48-48.png" />
        }
      </a>
    </div>
  );
};
