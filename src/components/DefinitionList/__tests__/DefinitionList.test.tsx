import {render, screen} from '../../../../test-utils/utils';
import {DefinitionList} from '../DefinitionList';
import {b} from '../constants';
import type {DefinitionListItemProps, DefinitionListProps} from '../types';

const qaAttribute = 'definition-list';

const defaultItems: DefinitionListItemProps[] = [
    {name: 'test1', children: 'value1'},
    {name: 'test2', children: 2},
    {name: 'test3', children: <div>node value</div>},
];

const getComponent = (
    props?: Partial<DefinitionListProps> & {items?: DefinitionListItemProps[]},
) => {
    const {items = defaultItems} = props ?? {};
    return render(
        <DefinitionList qa={qaAttribute} {...props}>
            {items.map((item, index) => (
                <DefinitionList.Item {...item} key={index} />
            ))}
        </DefinitionList>,
    ).container;
};

describe('DefinitionList', () => {
    it('should render', () => {
        getComponent();
        const component = screen.getByTestId(qaAttribute);
        expect(component).toBeVisible();
    });
    it('should render passed className', () => {
        getComponent({className: 'testClassName'});
        const component = screen.getByTestId(qaAttribute);
        expect(component).toHaveClass('testClassName');
    });
    it('should not render clipboard button by default', () => {
        getComponent();
        const copyButton = screen.queryByRole('button');
        expect(copyButton).toBeNull();
    });
    it('should render clipboard button', () => {
        const items = [{name: 'test1', children: 'value1', copyText: 'value1'}];
        getComponent({items});

        const copyButton = screen.getByRole('button');

        expect(copyButton).toHaveClass(b('copy-button'));
    });
    it('should render in responsive mode', () => {
        const items = [{name: 'test1', children: 'value1', copyText: 'value1'}];
        getComponent({items, responsive: true});

        const component = screen.getByTestId(qaAttribute);
        expect(component).toHaveClass(b({responsive: true}));
    });
    it('should render vertical view', () => {
        getComponent({direction: 'vertical'});
        const component = screen.getByTestId(qaAttribute);
        expect(component).toHaveClass(b({vertical: true}));
    });
});
