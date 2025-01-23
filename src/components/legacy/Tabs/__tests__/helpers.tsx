import type {TabsItemProps, TabsProps} from '../Tabs';
import {Tabs} from '../Tabs';
import {getTabsMock} from '../__stories__/getTabsMock';

export const TestTabs = (props: Partial<TabsProps>) => {
    const items = getTabsMock({});

    return <Tabs items={items} {...props} />;
};

export const TestTabsWithCustomTabs = (props: Partial<TabsProps>) => {
    const items = getTabsMock({});

    return (
        <Tabs
            items={items}
            wrapTo={(item: TabsItemProps) => {
                return (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a key={item.id} href="#" style={{textDecoration: 'none'}} data-qa={item.qa}>
                        {item.title}
                    </a>
                );
            }}
            {...props}
        />
    );
};
