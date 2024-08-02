import React from 'react';

import {render, screen} from '../../../../test-utils/utils';
import {DefinitionList} from '../DefinitionList';
import {b} from '../utils';

const qaAttribute = 'definition-list';

const getComponent = (props = {}) =>
    render(
        <DefinitionList
            qa={qaAttribute}
            items={[
                {name: 'test1', content: 'value1'},
                {name: 'test2', content: 2},
                {name: 'test3', content: <div>node value</div>},
            ]}
            {...props}
        />,
    ).container;

describe('components: DefinitionList', () => {
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

    it('should render passed content title', () => {
        const items = [{name: 'test1', content: 'value1', contentTitle: 'contentTitle1'}];
        getComponent({items});
        const component = screen.getByText('value1');
        expect(component).toHaveAttribute('title', 'contentTitle1');
    });
    it('should render passed name title', () => {
        const items = [{name: 'test1', nameTitle: 'nameTitle1'}];
        getComponent({items});
        const component = screen.getByText('test1');
        expect(component).toHaveAttribute('title', 'nameTitle1');
    });
    it('should not render clipboard button by default', () => {
        getComponent();
        const copyButton = screen.queryByRole('button');
        expect(copyButton).toBeNull();
    });
    it('should render clipboard button', () => {
        const items = [{name: 'test1', content: 'value1', copyText: 'value1'}];
        getComponent({items});

        const copyButton = screen.getByRole('button');

        expect(copyButton).toHaveClass(b('copy-button'));
    });
    it('should render in responsive mode', () => {
        const items = [{name: 'test1', content: 'value1', copyText: 'value1'}];
        getComponent({items, responsive: true});

        const component = screen.getByTestId(qaAttribute);
        expect(component).toHaveClass(b({responsive: true}));
    });
    it('should render with multiline term', () => {
        const items = [{name: 'test1', content: 'value1', copyText: 'value1', multilineName: true}];
        getComponent({items});

        const component = screen.getByRole('term');
        expect(component).toHaveClass(b('term-container', {multiline: true}));
    });
    it('should render group label', () => {
        const items = [
            {
                label: 'Test group',
                items: [{name: 'test1', content: 'value1'}],
            },
        ];
        getComponent({items});

        const component = screen.getByText('Test group');
        expect(component).toBeVisible();
    });
    it('should render grouped items', () => {
        const items = [
            {
                label: 'Test group',
                items: [{name: 'test1', content: 'value1'}],
            },
        ];
        getComponent({items});

        const component = screen.getByText('value1');
        expect(component).toBeVisible();
        expect(component).toHaveClass(b('definition'));
    });
    it('should render vertical view', () => {
        getComponent({direction: 'vertical'});
        const component = screen.getByTestId(qaAttribute);
        expect(component).toHaveClass(b({vertical: true}));
    });
});
