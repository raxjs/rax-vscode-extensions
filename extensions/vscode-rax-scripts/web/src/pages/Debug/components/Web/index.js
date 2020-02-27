import { createElement } from 'rax';
import isEnLang from '../../isEnLang';

export default () => {
  return (
    <div>
      <h2 className="title">{isEnLang ? 'Debugging Web' : '调试 Web 工程'}</h2>
      <p className="text">
        {
          isEnLang ?
            'Perform debugging by the extension: Debugger for Chrome' :
            '通过扩展 Debugger for Chrome 进行调试'
        }
      </p>
      <ul className="description">
        <li>
          {isEnLang ?
            'Step 1: Add debugging configuration;' :
            '第一步：添加调试配置；'
          }
        </li>
        <img src="https://img.alicdn.com/tfs/TB1StO_v.Y1gK0jSZFCXXcwqXXa-2874-1658.jpg" />
        <li>
          {isEnLang ?
            'Step 2: Select Chrome configuration;' :
            '第二步：选择添加 Chrome 配置；'
          }
        </li>
        <img src="https://gw.alicdn.com/tfs/TB108e.vYj1gK0jSZFuXXcrHpXa-2870-1668.jpg" />
        <li>
          {isEnLang ?
            'Step 3: Change the url to the dev server url (after this, the above steps can be skipped), and click the run button to start debugging;' :
            '第三步：修改 url 为对应项目的开发地址（配置后，上述步骤可跳过），点击调试按钮开始调试；'
          }
        </li>
        <img src="https://img.alicdn.com/tfs/TB1fmC6v8v0gK0jSZKbXXbK2FXa-2556-1584.png" />
        <li>
          {isEnLang ?
            'You can preview the page in the new browser window and debug it in VSCode at the same time;' :
            '可在新开启的浏览器窗口中预览页面，同时在 VSCode 中进行调试；'
          }
        </li>
        <img src="https://img.alicdn.com/tfs/TB1mBy.vYj1gK0jSZFuXXcrHpXa-2878-1664.jpg" />
      </ul>
    </div>
  );
};
