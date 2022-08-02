import {configure as libConfigure, Lang} from '../src';
import {configure} from '@testing-library/dom';

libConfigure({
    lang: Lang.En,
});
configure({testIdAttribute: 'data-qa'});
