# Gap Front Project

## Init Project

```shell
$ yarn init
```

Reuse packages

```shell
$ yarn link jest eslint sass-lint express webpack node-sass babel-core babel-jest babel-preset-env regenerator-runtime webpack-dev-middleware
```

Install dependecies

```shell
$ yarn install
```


```
yarn init
yarn global add jest
yarn add babel-core babel-jest babel-preset-env regenerator-runtime --dev
```


package.json
```
{

  "scripts": {
    "test": "npm run jest && npm run eslint",
    "jest": "jest",
    "eslint": "eslint ."
  }

}
```

