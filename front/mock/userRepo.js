import {UserList} from './UserList.js';
import {Event} from 'gap-front-event';

let querying = false;
let currentKeyword;

const userEvent = new Event();

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
