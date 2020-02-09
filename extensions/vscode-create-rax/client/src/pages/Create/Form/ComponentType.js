import { createElement, forwardRef, useEffect, useImperativeHandle, useState } from 'rax';
import isEnLang from '../isEnLang';
import ComponentTypeOptions from '../configs/componentType';

import './ComponentType.css';

function ComponentType(props, ref) {
  const [componentType, setComponentType] = useState('base');

  function handleClick(options) {
    setComponentType(options.type);
  };

  useImperativeHandle(ref, () => ({
    getData: () => {
      const res = { componentType };
      return res;
    }
  }));

  return (
    <div className="componentType">
      <p className="componentTypeTitle">
        {isEnLang ?
          "What's your component type?" :
          '请选择组件类型'
        }
      </p>
      {ComponentTypeOptions.map((option, index) => {
        return (
          <div
            key={`option_${index}`}
            onClick={() => {
              handleClick(option);
            }}
            className={`componentTypeItem${componentType === option.type ? ' componentTypeSelectedItem' : ''} `}
          >
            <p className="componentTypeItemTitle">{isEnLang ? option.title_en : option.title}</p>
            <img className="componentTypeSelectedItemTag" src="https://gw.alicdn.com/tfs/TB15rQzexD1gK0jSZFsXXbldVXa-200-200.svg" />
            <div className="componentTypeItemDescription">
              {isEnLang ? option.description_en : option.description}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default forwardRef(ComponentType);