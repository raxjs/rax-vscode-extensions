import { createElement } from 'rax';
import useEn from '../useEn';
import scaffoldTypeOptions from '../configs/scaffoldType';

import './ScaffoldType.css';

console.log(scaffoldTypeOptions);

export default function ScaffoldType(props) {
  const { scaffoldType, onChange } = props;

  return (
    <div className="scaffoldType">
      <p className="scaffoldTypeTitle">
        应用类型
      </p>
      {scaffoldTypeOptions.map((option, index) => {
        return (
          <div
            key={`scaffoldType${index}`}
            onClick={() => { onChange && onChange(option.type) }}
            className={`scaffoldTypeItem ${scaffoldType === option.type ? 'selectedScaffoldTypeItem' : ''} `}
          >
            <img className="selectedScaffoldTypeTag" src="https://img.alicdn.com/tfs/TB1V5LSqkP2gK0jSZPxXXacQpXa-80-80.png" />
            <p className="scaffoldTypeItemName">{useEn ? option.title_en : option.title}</p>
            <div className="scaffoldTypeItemDescription">
              {useEn ? option.description_en : option.description}
            </div>
          </div>
        )
      })}
    </div>
  );
};

