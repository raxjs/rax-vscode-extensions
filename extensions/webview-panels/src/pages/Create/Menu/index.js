import { createElement } from 'rax';
import useEn from '../useEn';
import menuOptions from '../configs/menu';

import './index.css';

export default (props) => {
  const { type = 'app', onChange } = props;
  return (
    <div className="menu rightBorder">
      {menuOptions.map((option, index) => {
        return (
          <div
            key={`menu${index}`}
            style={{ marginBottom: index === menuOptions.length - 1 ? 0 : '15px' }}
            className={`card${type === option.type ? ` selectedCard` : ''}`}
            onClick={() => { onChange(option.type) }}
          >
            <img className="selectedCardTag" src="https://img.alicdn.com/tfs/TB1V5LSqkP2gK0jSZPxXXacQpXa-80-80.png" />
            <div className="cardTitle">
              <img className="cardTitleIcon" src={option.icon} />
              <p className="cardTitleTxt">{useEn ? option.title_en : option.title}</p>
            </div>
            <p className="cardDescription">{useEn ? option.description_en : option.description}</p>
          </div>
        );
      })}
    </div>
  );
};
