import { createElement, useState } from 'rax';
import Menu from './Menu/index';
import Platforms from './Platforms/index';
import Server from './Server/index';
import './index.css';

export default function Create() {
  // app, component, api
  const [type, setType] = useState('app');

  return (
    <div className="page">
      <div className="header">
        <h1 className="title">创建 Rax 工程</h1>
        <p className="subTitle">使用 Rax 快速创建多端应用，一次开发多端运行，全新体验</p>
      </div>
      <div className="container">
        <Menu
          type={type}
          onChange={(type) => { setType(type) }}
        />
        {type !== 'api' ? (
          <div className="wrap">
            <Platforms />
            <Server />
          </div>
        ) : null}
      </div>
      <div className="footer">
        <a className="btn create">创建工程</a>
      </div>
    </div>
  );
}
