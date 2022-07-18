import {configure as libConfigure, Lang} from '../src/components/utils/configure';
import {configure} from '@testing-library/dom';

libConfigure({
    lang: Lang.En,
});
configure({testIdAttribute: 'data-qa'});
