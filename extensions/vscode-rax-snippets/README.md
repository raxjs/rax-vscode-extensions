# Rax Snippets

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
  // componentDidMount(), componentDidUpdate()
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

