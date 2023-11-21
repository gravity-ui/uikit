import React from 'react';

import {Gear} from '@gravity-ui/icons';
import {expect} from '@playwright/experimental-ct-react';

import {Button} from '../Button';
import {ButtonViewShowcase} from '../__stories__/ButtonViewShowcase';

import {ButtonIcon, ButtonWitchIcon} from './helpers';

import {test} from '~playwright/core';

test.describe('Button', () => {
    test('render buttom by default', async ({mountWithWrapper}) => {
        const component = await mountWithWrapper(<Button>Button</Button>);

        await expect(component).toHaveScreenshot();
    });

    test('should render icon', async ({mountWithWrapper}) => {
        const component = await mountWithWrapper(
            <Button>
                <Gear width={20} height={20} />
                Left
            </Button>,
        );

        await expect(component).toHaveScreenshot();
    });

    test('should render icon in Button-Icon', async ({mountWithWrapper}) => {
        const component = await mountWithWrapper(<ButtonIcon />);

        await expect(component).toHaveScreenshot();
    });

    test('selected when selected=true prop is given', async ({mountWithWrapper}) => {
        const component = await mountWithWrapper(<Button selected>Button</Button>);

        await expect(component).toHaveScreenshot();
    });

    test('loading when loading=true prop is given', async ({mountWithWrapper}) => {
        const component = await mountWithWrapper(<Button loading>Button</Button>);

        await expect(component).toHaveScreenshot();
    });

    test('should render <a /> tag', async ({mountWithWrapper}) => {
        const href = 'https://yandex.ru';
        const target = '_blank';

        const component = await mountWithWrapper(
            <Button href={href} target={target}>
                Button
            </Button>,
        );

        await expect(component).toHaveScreenshot();
    });

    test('render with given submit type', async ({mountWithWrapper}) => {
        const component = await mountWithWrapper(<Button type="submit">Button</Button>);

        await expect(component).toHaveScreenshot();
    });

    test('render with given reset type', async ({mountWithWrapper}) => {
        const component = await mountWithWrapper(<Button type="reset">Button</Button>);

        await expect(component).toHaveScreenshot();
    });

    test('show given content', async ({mountWithWrapper}) => {
        const content = 'Some content';

        const component = await mountWithWrapper(<Button>{content}</Button>);

        await expect(component).toHaveScreenshot();
    });

    test('show given children', async ({mountWithWrapper}) => {
        const childrenText = 'Children content';

        const component = await mountWithWrapper(
            <Button>
                <span>{childrenText}</span>
            </Button>,
        );

        await expect(component).toHaveScreenshot();
    });

    test('add style', async ({mountWithWrapper}) => {
        const style = {color: 'red'};

        const component = await mountWithWrapper(<Button style={style}>Button</Button>);

        await expect(component).toHaveScreenshot();
    });

    test('should render Icon component', async ({mountWithWrapper}) => {
        const component = await mountWithWrapper(<ButtonWitchIcon />);

        await expect(component).toHaveScreenshot();
    });

    test('ButtonViewShowcase', async ({mountWithWrapper}) => {
        const component = await mountWithWrapper(<ButtonViewShowcase />);

        await expect(component).toHaveScreenshot();
    });
});
