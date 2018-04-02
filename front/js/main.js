import {Loader} from 'gap-front-web';

(new Loader()).onLoad(elem => {
    import(`./${elem.getAttribute('gap-load')}.js`);
});
