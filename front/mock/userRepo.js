import {UserList} from './UserList.js';

const query = (keyword) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                UserList.filter(
                    user => user.nick.match(keyword)
                        || user.email.match(keyword)
                )
            );
        }, 200);
    });
};

export const userRepo = {
    query
};
/*
import {UserList} from './UserList.js';
import {GapEvent} from 'gap-front-event';

let querying = false;
let currentKeyword;

const userEvent = new GapEvent();

const query = (keyword) => {
    currentKeyword = keyword;

    if (querying) {
        return;
    }

    querying = true;
    setTimeout(() => {
        userEvent.trigger(
            'load',
            UserList.filter(
                user => user.nick.match(currentKeyword)
                    || user.email.match(currentKeyword)
            )
        );
        querying = false;
    }, 200);
};

const onLoad = (handler) => {
    userEvent.on('load', handler);
};

export const userRepo = {
    query: query,
    onLoad: onLoad
};
*/
