import { createElement } from 'rax';
import useEn from '../useEn';
import appTypeOptions from '../configs/appType';

import './appType.css';

console.log(appTypeOptions);

export default function AppType(props) {
  const { appType, onChange } = props;
  
  return (
    <div className="appType">
      <p className="appTypeTitle">{useEn ? 'App Type' : '应用类型'}</p>
      {appTypeOptions.map((option, index) => {
        return (
          <div
            key={`appType${index}`}
            onClick={() => { onChange && onChange(option.type) }}
            className={`appTypeItem ${appType === option.type ? 'selectedAppTypeItem' : ''} `}
          >
            <img className="selectedAppTypeTag" src="https://img.alicdn.com/tfs/TB1V5LSqkP2gK0jSZPxXXacQpXa-80-80.png" />
            <p className="appTypeItemName">{useEn ? option.title_en : option.title}</p>
            <div className="appTypeItemDescription">
              {useEn ? option.description_en : option.description}
            </div>
          </div>
        )
      })}
    </div>
  );
};

