# Bootstrap 4 Module

## Install

```bash
npm install --save @ribajs/bs4
```

## Regist

To regist the module include `import bs4Module from '@ribajs/bs4';` in your `main.ts` file and regist the module with `riba.module.regist(bs4Module);`:

```ts
import { Riba, Utils } from '@ribajs/core';
import bs4Module from '@ribajs/bs4';
const riba = new Riba();
const model = {};
riba.module.regist(bs4Module);
Utils.domIsReady(() => {
  riba.bind(document.body, model);
});
```
