import { createElement, useState } from 'rax';
import isEnLang from './isEnLang';
import Menu from './Menu/index';
import Form from './Form/index';
import './index.css';

export default function Create() {
  // app, component, api
  const [type, setType] = useState('app');

  return (
    <div className="page">
      <div className="header" x-memo>
        <h1 className="title">{isEnLang ? 'Create Rax Project' : '创建 Rax 工程'}</h1>
        <p className="subTitle">
          {isEnLang ?
            'With Rax you can write your application once，and run it in multi-end. Enjoy!' :
            '使用 Rax 快速创建多端应用，一次开发多端运行，全新体验'
          }
        </p>
      </div>
      <div className="container">
        <Menu type={type} onChange={(type) => { setType(type) }} />
        <Form type={type} />
      </div>
    </div>
  );
}
