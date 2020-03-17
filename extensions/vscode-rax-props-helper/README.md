# Rax Props Helper

This VS Code extension adds support for [Rax](https://rax.js.org/) write component's props.

# Auto complete

* Rax Component

![img01](https://img.alicdn.com/tfs/TB1pNj5x7Y2gK0jSZFgXXc5OFXa-1688-780.gif)

* Component File

When you write Rax it will show props keys related to your component file.

If you have these component:

```
// component/Logo/index.jsx
import { createElement } from 'rax';
import Image from 'rax-image';
import PropTypes from 'prop-types';

import './index.css';

export default function Logo(props) {
  const { uri, AProps } = props;

  console.log(props.BProps);
  return (
    <Image
      className="logo"
      source={{ uri }}
    />
  );
};

Logo.propTypes = {
  CProps: PropTypes.string
};
```
It works with props property in `propTypes` , `const { xxx } = props` and `props.xxx`;

![img02](https://img.alicdn.com/tfs/TB1mtz5x7L0gK0jSZFAXXcA9pXa-1688-780.gif)


