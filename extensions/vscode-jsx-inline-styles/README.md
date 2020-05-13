# JSX Inline Styles

The JSX style attribute accepts a JavaScript object with camelCased properties rather than a CSS string. like:

```jsx
const divStyle = {
  color: 'blue'
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```

This VS Code extension adds support for [Rax](https://rax.js.org/) and React write inline styles.

![img](https://img.alicdn.com/tfs/TB1oyRBF1H2gK0jSZFEXXcqMpXa-1000-586.gif)

