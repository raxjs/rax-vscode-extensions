import { createElement } from 'rax';

import './index.css';

export default function Server(props) {
  const options = [
    {
      type: 'ssr',
      title: 'SSR',
      icon: "https://gw.alicdn.com/tfs/TB1S7n7qbj1gK0jSZFuXXcrHpXa-120-120.png",
      description: (
        <div>
          <p>开启服务器端渲染，为 Web  应用带来更快的首屏呈现时间。</p>
          <a target="_blank" href="http://rax.alibaba-inc.com/docs/guide/ssr">查看文档</a>
        </div>
      )
    },
    {
      type: 'faas',
      title: 'FaaS',
      icon: "https://gw.alicdn.com/tfs/TB1j4z7qkT2gK0jSZFkXXcIQFXa-120-120.png",
      description: (
        <div>
          <p>前后端一体化开发体验，在 Rax 工程中，同时完成 API 开发。</p>
          <a target="_blank" href="http://rax.alibaba-inc.com/docs/guide/integrate-with-now">查看文档</a>
        </div>
      )
    }
  ];

  return (
    <div className="server">
      <p className="serverTitle">为 Web 工程开启服务端渲染（可选）</p>
      {options.map((option, index) => {
        return (
          <div
            key={`option_${index}`}
            className="serverItem serverSelectedItem"
          >
            <img class="serverItemIcon" title={option.title} src={option.icon} />
            <p className="serverItemTitle">{option.title}</p>
            <img class="serverSelectedItemTag" src="https://gw.alicdn.com/tfs/TB15rQzexD1gK0jSZFsXXbldVXa-200-200.svg" />
            <div className="serverItemDescription">
              {option.description}
            </div>
          </div>
        )
      })}
    </div>
  );
};
