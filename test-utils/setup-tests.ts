import {configure} from '@testing-library/dom';

import {Lang, configure as libConfigure} from '../src';

libConfigure({
    lang: Lang.En,
});
configure({testIdAttribute: 'data-qa'});
