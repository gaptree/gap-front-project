# Gap Front Project

This is an example to show that how to build front server and create web application.

## Create Web Application

### gap-front-view

<https://github.com/gaptree/gap-front-view>

```sh
yarn add gap-front-view
```

#### Example 1

```javascript
import {View} from 'gap-front-view';

class UserView extends View {
    template() {
        return this.tpl`
        <form action="javascript:;" on-submit=${(form, e) => this.onSubmit(form, e)}>
            <input
                name="userId"
                bind-value="userId"
                bind-id="userId"
                on-change=${(input) => this.showUserId(input.value)}>
            <input
                name="name"
                bind-value="name"
                cb-change=${(input) => this.showName(input.value)}>
            <button>
                submit
            </button>
        </form>
        <div id="res">
            $${'userId'}
            -
            $${'name'}
        </div>
        `;
    }

    onSubmit(form, e) {
        console.log(form);
        console.log(e);
    }

    showUserId(userId) {
        console.log(userId);
    }

    showName(name) {
        console.log(name);
    }
}
```

```javascript
const userView = new UserView([
    userId: 'id1',
    name: 'Mike'
]);

userView.appendTo(document.body);
```

Expected Html

```html
 <form action="javascript:;">
    <input name="userId" value="id1" id="id1">
    <input name="name" value="Mike">
    <button>submit</button>
</form>
<div id="res"> id1 - Mike </div>
```

```javascript
userView.update([
    userId: 'id2',
    name: 'Tom'
])
```

Expected Html

```html
 <form action="javascript:;">
    <input name="userId" value="id2" id="id2">
    <input name="name" value="Tom">
    <button>submit</button>
</form>
<div id="res"> id2 - Tom </div>
```

#### Example 2

```javascript
import {View} from 'gap-front-view';

class UserListView extends View {
    template() {
        return this.tpl`
        <div id="user-list" bind-arr="users" arr-key=${user => user.userId}>
            ${() => this.tpl`
                <span bind-id="userId">
                    $${'name'}
                </span>
            `}
        </div>
        `;
    }
}
```

```javascript
const userListView = new UserListView({
    users: [
        {
            userId: 'userId1',
            name: 'Mike'
        },
        {
            userId: 'userid2',
            name: 'Tom'
        }
    ]
});
userListView.appendTo(document.body);
```

Expected Html

```html
<div id="user-list">
    <span id="userId1">Mike</span>
    <span id="userid2">Tom</span>
</div>
```

```javascript
userListView.update({
    users: [
        {
            userId: 'userId1',
            name: 'Mike changed'
        },
        {
            userId: 'userId3',
            name: 'Rose'
        }
    ]
});
```

Expected Html

```html
<div id="user-list">
    <span id="userId1">Mike changed</span>
    <span id="userid3">Rose</span>
</div>
```

```javascript
userListView.arrPush('users', {
    userId: 'userId4',
    name: 'Jack'
});
```

Expected Html

```html
<div id="user-list">
    <span id="userId1">Mike changed</span>
    <span id="userid3">Rose</span>
    <span id="userid4">Jack</span>
</div>
```

```javascript
userListView.arrPop('users');
```

Expected Html

```html
<div id="user-list">
    <span id="userId1">Mike changed</span>
    <span id="userid3">Rose</span>
</div>
```

```javascript
userListView.arrPush('users', {
    userId: 'userId6',
    name: 'cat'
});

userListView.arrPush('users', {
    userId: 'userId7',
    name: 'dog'
});

userListView.arrFilter('users', user => user.name.indexOf('dog') >= 0);
```

```html
<div id="user-list">
    <span id="userId7">dog</span>
</div>
```

### gap-front-web

<https://github.com/gaptree/gap-front-web>

```
yarn add gap-front-web
```

#### selector

```html
<div class="elem1">elem1</div>

<div class="elems">e1</div>
<div class="elems">e2</div>
<div class="elems">e3</div>

<ul>
    <li>1</li>
    <li>2</li>
</ul>
```

```javascript
import {oneElem, allElem} from 'gap-front-web';

const elem1 = oneElem('.elem1');
const elems = allElem('.elems');

console.log(elem1.innerHTML); // elem1
elems.forEach(elem => console.log(elem.innerHTML)); // e1, e2, ...

oneElem('ul').allElem('li').map(elem => elem.innerHTML); // [1, 2]
```

#### handle event

```
const elem = oneElem('#elem-id');
elem.on('click', (evt) => {
    if (evt.target.getAttribute('key') === 'someValue') {
        // coding here
    }

    elem.hide();
});
```

#### Functions add to Element.prototype

- Element.prototype
    - remove()
    - replace(elem)
    - show()
    - hide()
    - on(eventTypes, handler, useCapture)
    - setVal(val)
    - getVal()
    - hasClass(className)
    - removeClass(className)
    - addClass(className)
    - toggleClass(className)
    - require <https://daneden.github.io/animate.css/>
        - fadeOut()
        - animateCss(animationName)

```javascript
oneElem('#to-remove').remove();
oneElem('#to-replace').replace(document.createElement('div'));
oneElem('#to-show').show();
oneElem('#to-hide').hide();

oneElem('#some-input').setVal('hello'); // <input value="hello">
oneElem('.some-textarea').setVal('hello world'); // <textarea>hello world</textarea>
oneElem('.some-select').setVal('v1'); // <select><option value="v1" selected="selected">text1</option> <option></option></select>
oneElem('.some-div').setVal('this is div'); // <div>this is div</div>

oneElem('.some-elem').addClass('c1 c2 c3');
oneElem('.some-elem').removeClass('c1 c2 c3');
```

#### Functions add to HTMLElement.prototype

- HTMLElement.prototype
    - html(strs, ...items)

```javascript
import {oneElem, createElem} from 'gap-front-web';

const newElem = createElem('div');
newElem.html`
    <ul>
        <li>1</li><li>2</li>
    </ul>
`;

const someElem = oneElem('#some-elem');

someElem.html`
    <div>
        ${newElem}
    </div>
    <ul class="map">
        ${[1, 3, 5, 7].map(item => `<li>${item}</li>`)}
    </ul>
`;

console.log(someElem.innerHTML);
/*
<div>
    <ul>
        <li>1</li><li>2</li>
    </ul>
</div>
<ul class="map">
    <li>1</li><li>3</li><li>5</li><li>7</li>
</ul>
*/
```

#### Functions add to Event.prototype

- Event.prototype
    - stop()
    - cancel()

## Build Front Server

To run front-server for this project

```
$ yarn run front-server
```

Check the script `script/front-server.js` for more info;

### gap-node-scss

<https://github.com/gaptree/gap-node-scss>

```
$ yarn add gap-node-scss --dev
```

```javascript
const express = require('express');
const path = require('path');
const scss = require('gap-node-scss');

const app = express();
const port = '8007';
const publicSlug = 'css';

app.use('/' + publicSlug, scss.middleware({
    inputDir: path.resolve(__dirname, 'src/scss'),
    outputDir: path.resolve(__dirname, 'dev/css'),
    includePaths: [
        path.resolve(__dirname, 'module/scss/normalize-scss/')
    ],
    sourceMap: true,
    outputStyle: 'expanded'
}));

app.listen(port, function () {
    console.log('Front server listening on port ' + port + '!');
});
```

### gap-node-webpack

<https://github.com/gaptree/gap-node-webpack>

```sh
yarn add gap-node-webpack --dev
```

```javascript
'use strict';

const express = require('express');
const path = require('path');
const middleware = require('gap-node-webpack').middleware;

const app = express();
const port = '8007';
const publicSlug = 'js';

app.use(middleware({
    contextDir: path.resolve(__dirname, 'src/js'),
    outputDir: path.resolve(__dirname, 'dev/js'),
    modules: [
        path.resolve(__dirname, 'module/js/')
    ],
    sourceMap: true,
    publicSlug: publicSlug,
    entry: {
        main: './main.js'
    }
}));

app.listen(port, function () {
    console.log('Front server listening on port ' + port + '!');
});
```

### gap-node-mock

<https://github.com/gaptree/gap-node-mock>

```sh
yarn add gap-node-mock --dev
```

```javascript
const mock = require('gap-node-mock');
const express = require('express');

const app = express();
app.use('/', mock({mockDir: xxx});

app.listen(port);
```

