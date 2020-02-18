import { createElement, useState } from 'rax';
import Web from './components/Web/index';
import Weex from './components/Weex/index';

import './index.css';

export default function Home() {
  const [type, setType] = useState('web');
  return (
    <div className="page">
      <div className="header">
        <h1 className="title">调试 Rax 工程</h1>
        <p className="subTitle">说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明</p>
      </div>
      <div className="left">
        <a
          className={`nav${type === 'web' ? ' selectedNav' : ''}`}
          onClick={() => {
            setType('web');
          }}
        >
          调试 Web
        </a>
        <a
          style={{ marginBottom: 0 }}
          className={`nav${type === 'weex' ? ' selectedNav' : ''}`}
          onClick={() => {
            setType('weex');
          }}
        >
          调试 Weex
        </a>
      </div>
      <div className="right">
        <div className="container" style={{ display: type === 'web' ? 'block' : 'none' }}>
          <Web />
        </div>
        <div className="container" style={{ display: type === 'weex' ? 'block' : 'none' }}>
          <Weex />
        </div>
      </div>
    </div>
  );
}
