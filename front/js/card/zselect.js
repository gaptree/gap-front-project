import {Zselect} from 'gap-front-zselect';
import {oneElem} from 'gap-front-web';
import {userRepo} from '../../mock/userRepo.js';

const select = new Zselect({
    required: 'required',
    placeholder: '',
    name: 'userId',
    isMulti: false,
    pattern: {
        content: '#{nick} (#{email})',
        selected: '',
        value: '#{userId}'
    }
});

select.onQuery(query => userRepo.query(query));

select.on('select', item => console.log('select', item));
select.on('change', items => console.log('change', items));

select.update({selectedItems: [{email: 'z@1.com', nick: 'haha', userId: 'fdsafdas'}]});

select.appendTo(oneElem('.zselect-container'));
