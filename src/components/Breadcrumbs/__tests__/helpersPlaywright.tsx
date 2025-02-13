import {ChevronRight, Flame, House, Rocket} from '@gravity-ui/icons';

import {Box} from '../../layout/Box/Box';
import {Flex} from '../../layout/Flex/Flex';
import type {BreadcrumbsProps} from '../Breadcrumbs';
import {Breadcrumbs} from '../Breadcrumbs';

export const TestBreadcrumbsWithTextItems = (props: Omit<BreadcrumbsProps, 'children'>) => {
    return (
        <Breadcrumbs {...props}>
            <Breadcrumbs.Item>Region</Breadcrumbs.Item>
            <Breadcrumbs.Item>Country</Breadcrumbs.Item>
            <Breadcrumbs.Item>City</Breadcrumbs.Item>
            <Breadcrumbs.Item>District</Breadcrumbs.Item>
            <Breadcrumbs.Item>Street</Breadcrumbs.Item>
        </Breadcrumbs>
    );
};

export const TestBreadcrumbsWithLinkItems = (props: Omit<BreadcrumbsProps, 'children'>) => {
    return (
        <Breadcrumbs {...props}>
            <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/components">Components</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/components/uikit/breadcrumbs">Breadcrumbs</Breadcrumbs.Item>
        </Breadcrumbs>
    );
};

export const TestBreadcrumbsCollapsed = (props: Omit<BreadcrumbsProps, 'children'>) => {
    return (
        <Box overflow="hidden" width={200}>
            <Breadcrumbs showRoot {...props}>
                <Breadcrumbs.Item key="home">Home</Breadcrumbs.Item>
                <Breadcrumbs.Item key="trendy">Trendy</Breadcrumbs.Item>
                <Breadcrumbs.Item key="2020 assets">March 2020 Assets</Breadcrumbs.Item>
                <Breadcrumbs.Item key="winter">Winter</Breadcrumbs.Item>
                <Breadcrumbs.Item key="holiday">Holiday</Breadcrumbs.Item>
            </Breadcrumbs>
        </Box>
    );
};

export const TestBreadcrumbsWithCustomSeparator = (props: Omit<BreadcrumbsProps, 'children'>) => {
    return (
        <Breadcrumbs separator={<ChevronRight />} {...props}>
            <Breadcrumbs.Item>Region</Breadcrumbs.Item>
            <Breadcrumbs.Item>Country</Breadcrumbs.Item>
            <Breadcrumbs.Item>City</Breadcrumbs.Item>
            <Breadcrumbs.Item>District</Breadcrumbs.Item>
            <Breadcrumbs.Item>Street</Breadcrumbs.Item>
        </Breadcrumbs>
    );
};

export const TestBreadcrumbsWithCustomIcons = (props: Omit<BreadcrumbsProps, 'children'>) => {
    return (
        <Breadcrumbs {...props}>
            <Breadcrumbs.Item>
                <Flex alignItems="center" gap={1}>
                    <House /> uikit
                </Flex>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
                <Flex alignItems="center" gap={1}>
                    <Flame /> components
                </Flex>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
                <Flex alignItems="center" gap={1}>
                    <Rocket style={{minWidth: 16}} /> Breadcrumbs
                </Flex>
            </Breadcrumbs.Item>
        </Breadcrumbs>
    );
};
