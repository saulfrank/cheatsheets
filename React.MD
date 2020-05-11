#### Get started with React

* Good getting started article: 
* https://www.taniarascia.com/getting-started-with-react/

1. brew update && brew install node
    * To fix node on Mac where npm wasnt available 
    ```
   sudo sudo rm -rf /usr/local/lib/node_modules
   brew update
   brew uninstall node
   brew install node
    ```
2. npm i -g npx
3. npx create-react-app my-app <br/>
   cd my-app <br/>
   npm start
   

### Style guides
* https://react-styleguidist.js.org/
* https://storybook.js.org/
   
   
### Get started with React

1. https://reactjs.org/docs/hello-world.html
2. https://reacttraining.com/react-router/web/example/basic
3. https://www.typescriptlang.org/docs/handbook/basic-types.html
```shell script
npx create-react-app my-app --template typescript
yarn add bootstrap
yarn add node-sass
```

### Declaring types
```typescript jsx
import React from 'react';
const name:string = 'Josh Perez';
```

### Managing environments
https://dev.to/jam3/managing-env-variables-for-provisional-builds-h37
```javascript
console.log(process.env);

```

```shell script
yarn add env-cmd
```