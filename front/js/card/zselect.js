import {Zselect} from 'gap-front-zselect';
import {oneElem} from 'gap-front-web';
import {userRepo} from '../../mock/userRepo.js';

const select = new Zselect({
    required: 'required',
    placeholder: '',
    name: 'userId',
    isMulti: true,
    pattern: {
        content: '#{nick} (#{email})',
        selected: '',
        value: '#{userId}'
    }
});

select.onQuery(query => userRepo.query(query));

select.appendTo(oneElem('.zselect-container'));
