import { createElement } from 'rax';

import './index.css';

export default (props) => {
  // en-US, en-en-GB, en ...
  const useEn = (window.__VSCODE__.env || '').indexOf('en') === 0;

  const { type = 'scaffold', onChange } = props;
  return (
    <div className="menu rightBorder">
      <div
        className={`card${type === 'scaffold' ? ` selectedCart` : ''}`}
        onClick={() => { onChange('scaffold') }}
      >
        <img className="selectedCartTag" src="https://img.alicdn.com/tfs/TB1V5LSqkP2gK0jSZPxXXacQpXa-80-80.png" />
        <div className="cardTitle">
          <img className="cardTitleIcon" src="https://img.alicdn.com/tfs/TB1MxTSqXT7gK0jSZFpXXaTkpXa-48-48.png" />
          <p className="cardTitleTxt">{useEn ? 'Rax App' : 'Rax 应用'}</p>
        </div>
        <p className="cardDescription">
          {useEn ?
            'Build application that works multi-platform, such as Web, Weex, MiniApp and so on.' :
            '生成 Rax 多端应用。一次开发，便可同时被投放于 Web、Weex、小程序等多个容器。'
          }
        </p>
      </div>
      <div
        className={`card${type === 'component' ? ` selectedCart` : ''}`}
        onClick={() => { onChange('component') }}
      >
        <img className="selectedCartTag" src="https://img.alicdn.com/tfs/TB1V5LSqkP2gK0jSZPxXXacQpXa-80-80.png" />
        <div className="cardTitle">
          <img className="cardTitleIcon" src="https://img.alicdn.com/tfs/TB1ME2SqkL0gK0jSZFtXXXQCXXa-48-48.png" />
          <p className="cardTitleTxt">{useEn ? 'Rax Component' : 'Rax 组件'}</p>
        </div>
        <p className="cardDescription">
          {useEn ?
            'Build component for rax application.' :
            '生成 Rax 多端组件。发布组件后开发者可以通过组合这些多端组件快速开发多端应用。'
          }
        </p>
      </div>
      <div
        className={`card${type === 'api' ? ` selectedCart` : ''}`}
        onClick={() => { onChange('api') }}
        style={{ marginBottom: 0 }}
      >
        <img className="selectedCartTag" src="https://img.alicdn.com/tfs/TB1V5LSqkP2gK0jSZPxXXacQpXa-80-80.png" />
        <div className="cardTitle">
          <img className="cardTitleIcon" src="https://img.alicdn.com/tfs/TB1emHVqhv1gK0jSZFFXXb0sXXa-56-56.png" />
          <p className="cardTitleTxt">Universal API</p>
        </div>
        <p className="cardDescription">
          {useEn ?
            'Build universal API library.' :
            '生成 Rax 多端 API 。发布 API 后开发者可以通过调用这些 API 快速开发多端应用。'
          }
        </p>
      </div>
    </div>
  );
};
