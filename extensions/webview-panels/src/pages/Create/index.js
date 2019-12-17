import { createElement, useState } from 'rax';
import useEn from './useEn';
import Menu from './Menu/index';
import Form from './Form/index';
import './index.css';

export default function Create() {
  // scaffold, component, api
  const [type, setType] = useState('scaffold');

  return (
    <div className="page">
      <div className="header">
        <h1 className="title">{useEn ? 'Create Rax Project' : '创建 Rax 工程'}</h1>
        <p className="subTitle">
          {useEn ?
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
