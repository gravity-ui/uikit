import {parseKeyGroups} from '../parse';

describe('Hotkey parse', () => {
    it('should parse keys by plus separator', () => {
        const res = parseKeyGroups({NormalizeMap: {}, Priority: {}, DisplayName: {}}, 'A+B');
        expect(res).toStrictEqual([['A', 'B']]);
    });

    it('should parse key-groups by space separator', () => {
        const res = parseKeyGroups({NormalizeMap: {}, Priority: {}, DisplayName: {}}, 'A+B C+D');
        expect(res).toStrictEqual([
            ['A', 'B'],
            ['C', 'D'],
        ]);
    });

    it('should normalize keyIds', () => {
        const res = parseKeyGroups(
            {NormalizeMap: {cmd: 'command', opt: 'option'}, Priority: {}, DisplayName: {}},
            'cmd+opt',
        );
        expect(res).toStrictEqual([['Command', 'Option']]);
    });

    it('should sort keys by priority: from high to low', () => {
        const res = parseKeyGroups(
            {NormalizeMap: {}, Priority: {a: 10, b: 5, c: 3}, DisplayName: {}},
            'D+C+B+A',
        );
        expect(res).toStrictEqual([['A', 'B', 'C', 'D']]);
    });

    it('should render keys with its displayName from defs', () => {
        const res = parseKeyGroups(
            {NormalizeMap: {}, Priority: {}, DisplayName: {cmd: 'cMd', opt: 'oPt'}},
            'cmd+opt',
        );
        expect(res).toStrictEqual([['cMd', 'oPt']]);
    });

    it('should capitalize keyId if displayName not found', () => {
        const res = parseKeyGroups({NormalizeMap: {}, Priority: {}, DisplayName: {}}, 'cmd+opt');
        expect(res).toStrictEqual([['Cmd', 'Opt']]);
    });

    it('should translate to lower case before normalizing', () => {
        const res = parseKeyGroups(
            {NormalizeMap: {cmd: 'Command', opt: 'Option'}, Priority: {}, DisplayName: {}},
            'CmD+oPt',
        );
        expect(res).toStrictEqual([['Command', 'Option']]);
    });

    it('should ignore empty groups', () => {
        const res = parseKeyGroups({NormalizeMap: {}, Priority: {}, DisplayName: {}}, ' a+b  c+d ');
        expect(res).toStrictEqual([
            ['A', 'B'],
            ['C', 'D'],
        ]);
    });

    it('should ignore missing keys', () => {
        const res = parseKeyGroups({NormalizeMap: {}, Priority: {}, DisplayName: {}}, '+a++b+');
        expect(res).toStrictEqual([['A', 'B']]);
    });

    it('should remove duplicated keyIds', () => {
        const res = parseKeyGroups(
            {NormalizeMap: {}, Priority: {}, DisplayName: {}},
            'cmd+cMd+CMD+c cmd+v',
        );
        expect(res).toStrictEqual([
            ['Cmd', 'C'],
            ['Cmd', 'V'],
        ]);
    });
});
