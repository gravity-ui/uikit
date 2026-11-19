import {act, renderHook} from '../../../../test-utils/utils';
import {configure} from '../../../utils/configure';
import {useLang} from '../useLang';

afterEach(() => configure({lang: 'en', fallbackLang: 'en'}));

test('updates language after configure', () => {
    const {result} = renderHook(useLang);
    expect(result.current.lang).toBe('en');

    act(() => configure({lang: 'ru'}));
    expect(result.current.lang).toBe('ru');
});
