import { createElement } from 'rax';

function Document(props) {
  const {
    publicPath,
    styles,
    scripts
  } = props;

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover" />
        <title>vscode-webview-panels</title>
        {styles.map((src, index) => <link rel="stylesheet" href={`${publicPath}${src}`} key={`style_${index}`} />)}
      </head>
      <body>
        {/* root container */}
        <div id="root" />
        <script dangerouslySetInnerHTML={{ __html: 'window.__VSCODE__ = (window.acquireVsCodeApi && window.acquireVsCodeApi()) || {};' }} />
        {scripts.map(
          (src, index) => <script src={`${publicPath}${src}`} key={`script_${index}`}>
            {/* self-closing script element will not work in HTML */}
          </script>
        )}
      </body>
    </html>
  );
}

export default Document;
