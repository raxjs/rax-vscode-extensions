import { createElement, useRef, useState } from 'rax';
import Menu from './Menu/index';
import Form from './Form/index';
import './index.css';

export default function Create() {
  // scaffold, component, api
  const [type, setType] = useState('scaffold');

  const formRef = useRef(null);

  function create() {
    console.log(formRef.current.getData());
  };

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
        <Form
          type={type}
          ref={formRef}
        />
      </div>
      <div className="footer">
        <a
          className="btn create"
          onClick={create}
        >创建工程</a>
      </div>
    </div>
  );
}
