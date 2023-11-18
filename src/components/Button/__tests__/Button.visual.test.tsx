import React from 'react';

import {Gear} from '@gravity-ui/icons';
import {expect, test} from '@playwright/experimental-ct-react';

import {Button} from '../Button';
import {ButtonViewShowcase} from '../__stories__/ButtonViewShowcase';

import {ButtonIcon, ButtonWitchIcon} from './helpers';

test.describe('Button', () => {
    test('render buttom by default', async ({mount}) => {
        const component = await mount(<Button>Button</Button>);

        await expect(component).toHaveScreenshot();
    });

    test('should render icon', async ({mount}) => {
        const component = await mount(
            <Button>
                <Gear width={20} height={20} />
                Left
            </Button>,
        );

        await expect(component).toHaveScreenshot();
    });

    test('should render icon in Button-Icon', async ({mount}) => {
        const component = await mount(<ButtonIcon />);

        await expect(component).toHaveScreenshot();
    });

    test('selected when selected=true prop is given', async ({mount}) => {
        const component = await mount(<Button selected>Button</Button>);

        await expect(component).toHaveScreenshot();
    });

    test('loading when loading=true prop is given', async ({mount}) => {
        const component = await mount(<Button loading>Button</Button>);

        await expect(component).toHaveScreenshot();
    });

    test('should render <a /> tag', async ({mount}) => {
        const href = 'https://yandex.ru';
        const target = '_blank';

        const component = await mount(
            <Button href={href} target={target}>
                Button
            </Button>,
        );

        await expect(component).toHaveScreenshot();
    });

    test('render with given submit type', async ({mount}) => {
        const component = await mount(<Button type="submit">Button</Button>);

        await expect(component).toHaveScreenshot();
    });

    test('render with given reset type', async ({mount}) => {
        const component = await mount(<Button type="reset">Button</Button>);

        await expect(component).toHaveScreenshot();
    });

    test('show given content', async ({mount}) => {
        const content = 'Some content';

        const component = await mount(<Button>{content}</Button>);

        await expect(component).toHaveScreenshot();
    });

    test('show given children', async ({mount}) => {
        const childrenText = 'Children content';

        const component = await mount(
            <Button>
                <span>{childrenText}</span>
            </Button>,
        );

        await expect(component).toHaveScreenshot();
    });

    test('add style', async ({mount}) => {
        const style = {color: 'red'};

        const component = await mount(<Button style={style}>Button</Button>);

        await expect(component).toHaveScreenshot();
    });

    test('should render Icon component', async ({mount}) => {
        const component = await mount(<ButtonWitchIcon />);

        await expect(component).toHaveScreenshot();
    });

    test('ButtonViewShowcase', async ({mount}) => {
        const component = await mount(<ButtonViewShowcase />);

        await expect(component).toHaveScreenshot();
    });
});
