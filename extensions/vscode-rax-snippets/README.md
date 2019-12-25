[![Version](https://vsmarketplacebadge.apphb.com/version/Rax.vscode-rax-snippets.svg)](https://marketplace.visualstudio.com/items?itemName=Rax.vscode-rax-snippets)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/Rax.vscode-rax-snippets.svg)](https://marketplace.visualstudio.com/items?itemName=Rax.vscode-rax-snippets)

# Rax Snippets

This VS Code extension adds support for [Rax](https://rax.js.org/) snippets.

## Usage

1. Input snippets
2. Use `tab` change cursor position

![img](https://img.alicdn.com/tfs/TB1Xlqjq8v0gK0jSZKbXXbK2FXa-480-327.gif)

## Snippets

| Snippet | Renders                     |
| ------- | --------------------------- |
| `ir`    | Import Rax                  |
| `irc`   | Import Rax / Component      |
| `irh`   | Import Rax / Hooks          |
| `cc`    | Class Component             |
| `fc`    | Function Component          |
| `ush`   | Use State Hook              |
| `ueh`   | Use Effect Hook             |
| `umh`   | Use Memo Hook               |

## Full Expansions

### ir - Import Rax

```javascript
import { createElement } from 'rax';
```

### irc - Import rax, Component

```javascript
import { createElement, Component } from 'rax';
```

### irh - Import rax, Hooks

```javascript
import { createElement, useState, useEffect } from 'rax';
```

### cc - Class Component

```javascript
class | extends Component {
  state = { | },
  render() {
    return ( | );
  }
}

export default |;
```

### fc - Function Component

```javascript
function |(props) => {
  return ( | );
}

export default |;
```

### ush - Use State Hook
```javascript
const [|, set|] = useState(|);
```

### ueh - Use Effect Hook
```javascript
useEffect(() => {
  // componentDidMount()
  |
  return () => {
    // componentWillUnmount()
    |
  }
  // effect dependency array
  }, [|]);
```

### umh - Use Memo Hook
```javascript
const memoizedValue| = useMemo(() => computeExpensiveValue|(a|, b|), [a|, b|]);
```

