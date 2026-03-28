<!--GITHUB_BLOCK-->

# ActionsPanel

<!--/GITHUB_BLOCK-->

Use an `ActionsPanel` to render multiple buttons in a row.
When there is not enough space, buttons that don't fit will be added to an overflow menu.

## Example

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<ActionsPanel actions={[
    {
        id: 'action_1',
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 1'),
                text: 'Action 1',
            },
        },
    },
    {
        id: 'action_2',
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 2'),
                text: 'Action 2',
            },
        },
    },
]} />
`}
>
    <UIKit.ActionsPanel actions={[
    {
        id: 'action_1',
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 1'),
                text: 'Action 1',
            },
        },
    },
    {
        id: 'action_2',
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 2'),
                text: 'Action 2',
            },
        },
    },
]} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
const actions: ActionsPanelProps['actions'] = [
    {
        id: 'action_1',
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 1'),
                text: 'Action 1',
            },
        },
    },
    {
        id: 'action_2',
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 2'),
                text: 'Action 2',
            },
        },
    },
];

<ActionsPanel {...args} actions={actions} />
```

<!-- Storybook example -->

<ActionsPanelExample />

<!--/GITHUB_BLOCK-->

## Action icons

Use `Button` or `DropdownMenu` properties to set icons.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<ActionsPanel actions={[
    {
        id: 'edit',
        button: {
            props: {
                children: [<UIKit.Icon key="icon"
                data={() => (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.169 6.331a3 3 0 0 0-.833 1.6l-.338 1.912a1 1 0 0 0 1.159 1.159l1.912-.338a3 3 0 0 0 1.6-.833l3.07-3.07 2-2A.9.9 0 0 0 15 4.13 3.13 3.13 0 0 0 11.87 1a.9.9 0 0 0-.632.262l-2 2zm3.936-1.814L7.229 7.392a1.5 1.5 0 0 0-.416.8L6.6 9.4l1.208-.213.057-.01a1.5 1.5 0 0 0 .743-.406l2.875-2.876a1.63 1.63 0 0 0-1.378-1.378m2.558.199a3.14 3.14 0 0 0-1.379-1.38l.82-.82a1.63 1.63 0 0 1 1.38 1.38zM8 2.25a.75.75 0 0 0-.75-.75H4.5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3V8.75a.75.75 0 0 0-1.5 0v2.75a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3h2.75A.75.75 0 0 0 8 2.25" clip-rule="evenodd"/></svg>
                )}
                size={16}
                />, 'Edit'],
                onClick: () => console.log('Edit'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('Edit'),
                text: (
                    <UIKit.Flex alignItems="center" gap={1}>
                        <UIKit.Icon
                            data={() => (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.169 6.331a3 3 0 0 0-.833 1.6l-.338 1.912a1 1 0 0 0 1.159 1.159l1.912-.338a3 3 0 0 0 1.6-.833l3.07-3.07 2-2A.9.9 0 0 0 15 4.13 3.13 3.13 0 0 0 11.87 1a.9.9 0 0 0-.632.262l-2 2zm3.936-1.814L7.229 7.392a1.5 1.5 0 0 0-.416.8L6.6 9.4l1.208-.213.057-.01a1.5 1.5 0 0 0 .743-.406l2.875-2.876a1.63 1.63 0 0 0-1.378-1.378m2.558.199a3.14 3.14 0 0 0-1.379-1.38l.82-.82a1.63 1.63 0 0 1 1.38 1.38zM8 2.25a.75.75 0 0 0-.75-.75H4.5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3V8.75a.75.75 0 0 0-1.5 0v2.75a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3h2.75A.75.75 0 0 0 8 2.25" clip-rule="evenodd"/></svg>
                            )}
                            size={16}
                        />
                        Edit
                    </UIKit.Flex>
                ),
            },
        },
    },
    {
        id: 'copy',
        button: {
            props: {
                children: [<UIKit.Icon key="icon"
                data={() => (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8 10.5h4A1.5 1.5 0 0 0 13.5 9V7H12a3 3 0 0 1-3-3V2.5H8A1.5 1.5 0 0 0 6.5 4v5A1.5 1.5 0 0 0 8 10.5m5.06-5.318q.145.145.243.318H12A1.5 1.5 0 0 1 10.5 4V2.697q.174.098.318.242zM15 6.242a3 3 0 0 0-.879-2.12L11.88 1.878A3 3 0 0 0 9.757 1H8a3 3 0 0 0-3 3H4a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3h1a3 3 0 0 0 3-3zM9.5 12H8a3 3 0 0 1-3-3V5.5H4A1.5 1.5 0 0 0 2.5 7v5A1.5 1.5 0 0 0 4 13.5h4A1.5 1.5 0 0 0 9.5 12" clip-rule="evenodd"/></svg>
                )}
                size={16}
                />, 'Copy'],
                onClick: () => console.log('Copy'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('Copy'),
                text: (
                    <UIKit.Flex alignItems="center" gap={1}>
                        <UIKit.Icon
                            data={() => (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8 10.5h4A1.5 1.5 0 0 0 13.5 9V7H12a3 3 0 0 1-3-3V2.5H8A1.5 1.5 0 0 0 6.5 4v5A1.5 1.5 0 0 0 8 10.5m5.06-5.318q.145.145.243.318H12A1.5 1.5 0 0 1 10.5 4V2.697q.174.098.318.242zM15 6.242a3 3 0 0 0-.879-2.12L11.88 1.878A3 3 0 0 0 9.757 1H8a3 3 0 0 0-3 3H4a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3h1a3 3 0 0 0 3-3zM9.5 12H8a3 3 0 0 1-3-3V5.5H4A1.5 1.5 0 0 0 2.5 7v5A1.5 1.5 0 0 0 4 13.5h4A1.5 1.5 0 0 0 9.5 12" clip-rule="evenodd"/></svg>
                            )}
                            size={16}
                        />
                        Copy
                    </UIKit.Flex>
                ),
            },
        },
    },
    {
        id: 'delete',
        collapsed: true,
        button: {
            props: {
                children: [<UIKit.Icon key="icon"
                data={() => (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M9 2H7a.5.5 0 0 0-.5.5V3h3v-.5A.5.5 0 0 0 9 2m2 1v-.5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2V3H2.251a.75.75 0 0 0 0 1.5h.312l.317 7.625A3 3 0 0 0 5.878 15h4.245a3 3 0 0 0 2.997-2.875l.318-7.625h.312a.75.75 0 0 0 0-1.5zm.936 1.5H4.064l.315 7.562A1.5 1.5 0 0 0 5.878 13.5h4.245a1.5 1.5 0 0 0 1.498-1.438zm-6.186 2v5a.75.75 0 0 0 1.5 0v-5a.75.75 0 0 0-1.5 0m3.75-.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75" clip-rule="evenodd"/></svg>
                )}
                size={16} />, 'Delete'],
                onClick: () => console.log('Delete'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('Delete'),
                text: (
                    <UIKit.Flex alignItems="center" gap={1}>
                        <UIKit.Icon
                            data={() => (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M9 2H7a.5.5 0 0 0-.5.5V3h3v-.5A.5.5 0 0 0 9 2m2 1v-.5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2V3H2.251a.75.75 0 0 0 0 1.5h.312l.317 7.625A3 3 0 0 0 5.878 15h4.245a3 3 0 0 0 2.997-2.875l.318-7.625h.312a.75.75 0 0 0 0-1.5zm.936 1.5H4.064l.315 7.562A1.5 1.5 0 0 0 5.878 13.5h4.245a1.5 1.5 0 0 0 1.498-1.438zm-6.186 2v5a.75.75 0 0 0 1.5 0v-5a.75.75 0 0 0-1.5 0m3.75-.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75" clip-rule="evenodd"/></svg>
                            )}
                            size={16}
                        />
                        Delete
                    </UIKit.Flex>
                ),
            },
        },
    },
]} />
`}
>
    <UIKit.ActionsPanel actions={[
        {
            id: 'edit',
            button: {
                props: {
                    children: [<UIKit.Icon key="icon"
                    data={() => (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.169 6.331a3 3 0 0 0-.833 1.6l-.338 1.912a1 1 0 0 0 1.159 1.159l1.912-.338a3 3 0 0 0 1.6-.833l3.07-3.07 2-2A.9.9 0 0 0 15 4.13 3.13 3.13 0 0 0 11.87 1a.9.9 0 0 0-.632.262l-2 2zm3.936-1.814L7.229 7.392a1.5 1.5 0 0 0-.416.8L6.6 9.4l1.208-.213.057-.01a1.5 1.5 0 0 0 .743-.406l2.875-2.876a1.63 1.63 0 0 0-1.378-1.378m2.558.199a3.14 3.14 0 0 0-1.379-1.38l.82-.82a1.63 1.63 0 0 1 1.38 1.38zM8 2.25a.75.75 0 0 0-.75-.75H4.5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3V8.75a.75.75 0 0 0-1.5 0v2.75a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3h2.75A.75.75 0 0 0 8 2.25" clip-rule="evenodd"/></svg>
                    )}
                    size={16} />, 'Edit'],
                    onClick: () => console.log('Edit'),
                },
            },
            dropdown: {
                item: {
                    action: () => console.log('Edit'),
                    text: (
                        <UIKit.Flex alignItems="center" gap={1}>
                            <UIKit.Icon
                                data={() => (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.169 6.331a3 3 0 0 0-.833 1.6l-.338 1.912a1 1 0 0 0 1.159 1.159l1.912-.338a3 3 0 0 0 1.6-.833l3.07-3.07 2-2A.9.9 0 0 0 15 4.13 3.13 3.13 0 0 0 11.87 1a.9.9 0 0 0-.632.262l-2 2zm3.936-1.814L7.229 7.392a1.5 1.5 0 0 0-.416.8L6.6 9.4l1.208-.213.057-.01a1.5 1.5 0 0 0 .743-.406l2.875-2.876a1.63 1.63 0 0 0-1.378-1.378m2.558.199a3.14 3.14 0 0 0-1.379-1.38l.82-.82a1.63 1.63 0 0 1 1.38 1.38zM8 2.25a.75.75 0 0 0-.75-.75H4.5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3V8.75a.75.75 0 0 0-1.5 0v2.75a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3h2.75A.75.75 0 0 0 8 2.25" clip-rule="evenodd"/></svg>
                                )}
                                size={16} />
                            Edit
                        </UIKit.Flex>
                    ),
                },
            },
        },
        {
            id: 'copy',
            button: {
                props: {
                    children: [<UIKit.Icon key="icon" data={() => (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8 10.5h4A1.5 1.5 0 0 0 13.5 9V7H12a3 3 0 0 1-3-3V2.5H8A1.5 1.5 0 0 0 6.5 4v5A1.5 1.5 0 0 0 8 10.5m5.06-5.318q.145.145.243.318H12A1.5 1.5 0 0 1 10.5 4V2.697q.174.098.318.242zM15 6.242a3 3 0 0 0-.879-2.12L11.88 1.878A3 3 0 0 0 9.757 1H8a3 3 0 0 0-3 3H4a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3h1a3 3 0 0 0 3-3zM9.5 12H8a3 3 0 0 1-3-3V5.5H4A1.5 1.5 0 0 0 2.5 7v5A1.5 1.5 0 0 0 4 13.5h4A1.5 1.5 0 0 0 9.5 12" clip-rule="evenodd"/></svg>
                    )}
                    size={16} />, 'Copy'],
                    onClick: () => console.log('Copy'),
                },
            },
            dropdown: {
                item: {
                    action: () => console.log('Copy'),
                    text: (
                        <UIKit.Flex alignItems="center" gap={1}>
                            <UIKit.Icon
                                data={() => (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8 10.5h4A1.5 1.5 0 0 0 13.5 9V7H12a3 3 0 0 1-3-3V2.5H8A1.5 1.5 0 0 0 6.5 4v5A1.5 1.5 0 0 0 8 10.5m5.06-5.318q.145.145.243.318H12A1.5 1.5 0 0 1 10.5 4V2.697q.174.098.318.242zM15 6.242a3 3 0 0 0-.879-2.12L11.88 1.878A3 3 0 0 0 9.757 1H8a3 3 0 0 0-3 3H4a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3h1a3 3 0 0 0 3-3zM9.5 12H8a3 3 0 0 1-3-3V5.5H4A1.5 1.5 0 0 0 2.5 7v5A1.5 1.5 0 0 0 4 13.5h4A1.5 1.5 0 0 0 9.5 12" clip-rule="evenodd"/></svg>
                                )}
                                size={16} />
                            Copy
                        </UIKit.Flex>
                    ),
                },
            },
        },
        {
            id: 'delete',
            collapsed: true,
            button: {
                props: {
                    children: [<UIKit.Icon key="icon"
                    data={() => (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M9 2H7a.5.5 0 0 0-.5.5V3h3v-.5A.5.5 0 0 0 9 2m2 1v-.5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2V3H2.251a.75.75 0 0 0 0 1.5h.312l.317 7.625A3 3 0 0 0 5.878 15h4.245a3 3 0 0 0 2.997-2.875l.318-7.625h.312a.75.75 0 0 0 0-1.5zm.936 1.5H4.064l.315 7.562A1.5 1.5 0 0 0 5.878 13.5h4.245a1.5 1.5 0 0 0 1.498-1.438zm-6.186 2v5a.75.75 0 0 0 1.5 0v-5a.75.75 0 0 0-1.5 0m3.75-.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 0-1.5 0v-5a.75.75 0 0 1 .75-.75" clip-rule="evenodd"/></svg>
                    )}
                    size={16} />, 'Delete'],
                    onClick: () => console.log('Delete'),
                },
            },
            dropdown: {
                item: {
                    action: () => console.log('Delete'),
                    text: (
                        <UIKit.Flex alignItems="center" gap={1}>
                            <UIKit.Icon
                                data={() => (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M9 2H7a.5.5 0 0 0-.5.5V3h3v-.5A.5.5 0 0 0 9 2m2 1v-.5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2V3H2.251a.75.75 0 0 0 0 1.5h.312l.317 7.625A3 3 0 0 0 5.878 15h4.245a3 3 0 0 0 2.997-2.875l.318-7.625h.312a.75.75 0 0 0 0-1.5zm.936 1.5H4.064l.315 7.562A1.5 1.5 0 0 0 5.878 13.5h4.245a1.5 1.5 0 0 0 1.498-1.438zm-6.186 2v5a.75.75 0 0 0 1.5 0v-5a.75.75 0 0 0-1.5 0m3.75-.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 0-1.5 0v-5a.75.75 0 0 1 .75-.75" clip-rule="evenodd"/></svg>
                                )}
                                size={16} />
                            Delete
                        </UIKit.Flex>
                    ),
                },
            },
        },
    ]} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
const actions: ActionsPanelProps['actions'] = [
    {
        id: 'edit',
        button: {
            props: {
                children: [<Icon key="icon" data={PencilToSquare} />, 'Edit'],
                onClick: () => console.log('Edit'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('Edit'),
                text: (
                    <Flex alignItems="center" gap={1}>
                        <Icon data={PencilToSquare} />
                        Edit
                    </Flex>
                ),
            },
        },
    },
    {
        id: 'copy',
        button: {
            props: {
                children: [<Icon key="icon" data={Files} />, 'Copy'],
                onClick: () => console.log('Copy'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('Copy'),
                text: (
                    <Flex alignItems="center" gap={1}>
                        <Icon data={Files} />
                        Copy
                    </Flex>
                ),
            },
        },
    },
    {
        id: 'delete',
        collapsed: true,
        button: {
            props: {
                children: [<Icon key="icon" data={TrashBin} />, 'Delete'],
                onClick: () => console.log('Delete'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('Delete'),
                text: (
                    <Flex alignItems="center" gap={1}>
                        <Icon data={TrashBin} />
                        Delete
                    </Flex>
                ),
            },
        },
    },
];

<ActionsPanel actions={actions} />
```

<!-- Storybook example -->

<ActionsPanelWithIcons />

<!--/GITHUB_BLOCK-->

## Note

Use the `renderNote` property to render a note.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<ActionsPanel actions={[
    {
        id: 'action_1',
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
                view: 'normal-contrast',
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 1'),
                text: 'Action 1',
            },
        },
    },
    {
        id: 'action_2',
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 2'),
                text: 'Action 2',
            },
        },
    },
    {
        id: 'action_3',
        button: {
            props: {
                children: 'Action 3',
                onClick: () => console.log('click button action 3'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 3'),
                text: 'Action 3',
            },
        },
    },
    {
        id: 'action_4',
        button: {
            props: {
                children: 'Action 4',
                onClick: () => console.log('click button action 4'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 4'),
                text: 'Action 4',
            },
        },
    },
]}
renderNote={() => '10 items'}
maxRowActions={2} />
`}
>
    <UIKit.ActionsPanel actions={[
    {
        id: 'action_1',
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
                view: 'normal-contrast',
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 1'),
                text: 'Action 1',
            },
        },
    },
    {
        id: 'action_2',
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 2'),
                text: 'Action 2',
            },
        },
    },
    {
        id: 'action_3',
        button: {
            props: {
                children: 'Action 3',
                onClick: () => console.log('click button action 3'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 3'),
                text: 'Action 3',
            },
        },
    },
    {
        id: 'action_4',
        button: {
            props: {
                children: 'Action 4',
                onClick: () => console.log('click button action 4'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 4'),
                text: 'Action 4',
            },
        },
    },
]}
renderNote={() => '10 items'}
maxRowActions={2} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
const actions: ActionsPanelProps['actions'] = [
    {
        id: 'action_1',
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
                view: 'normal-contrast',
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 1'),
                text: 'Action 1',
            },
        },
    },
    {
        id: 'action_2',
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 2'),
                text: 'Action 2',
            },
        },
    },
    {
        id: 'action_3',
        button: {
            props: {
                children: 'Action 3',
                onClick: () => console.log('click button action 3'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 3'),
                text: 'Action 3',
            },
        },
    },
    {
        id: 'action_4',
        button: {
            props: {
                children: 'Action 4',
                onClick: () => console.log('click button action 4'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 4'),
                text: 'Action 4',
            },
        },
    },
];

<ActionsPanel
  actions={actions}
  onClose={() => console.log('click close handle')}
  renderNote={() => '10 items'}
  maxRowActions={2}
/>
```

<!-- Storybook example -->

<ActionsPanelWithNote />

<!--/GITHUB_BLOCK-->

## Groups in dropdown menu

Use `action.dropdown.group` for groping actions in dropdown menu.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<ActionsPanel actions={[
    {
        id: 'action_1',
        collapsed: true,
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 1'),
                text: 'Action 1',
            },
            group: '1',
        },
    },
    {
        id: 'action_2',
        collapsed: true,
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 2'),
                text: 'Action 2',
            },
            group: '2',
        },
    },
    {
        id: 'action_3',
        collapsed: true,
        button: {
            props: {
                children: 'Action 3',
                onClick: () => console.log('click button action 3'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 3'),
                text: 'Action 3',
            },
            group: '1',
        },
    },
]} />
`}
>
    <UIKit.ActionsPanel actions={[
    {
        id: 'action_1',
        collapsed: true,
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 1'),
                text: 'Action 1',
            },
            group: '1',
        },
    },
    {
        id: 'action_2',
        collapsed: true,
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 2'),
                text: 'Action 2',
            },
            group: '2',
        },
    },
    {
        id: 'action_3',
        collapsed: true,
        button: {
            props: {
                children: 'Action 3',
                onClick: () => console.log('click button action 3'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 3'),
                text: 'Action 3',
            },
            group: '1',
        },
    },
]} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
const actions: ActionsPanelProps['actions'] = [
    {
        id: 'action_1',
        collapsed: true,
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 1'),
                text: 'Action 1',
            },
            group: '1',
        },
    },
    {
        id: 'action_2',
        collapsed: true,
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 2'),
                text: 'Action 2',
            },
            group: '2',
        },
    },
    {
        id: 'action_3',
        collapsed: true,
        button: {
            props: {
                children: 'Action 3',
                onClick: () => console.log('click button action 3'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 3'),
                text: 'Action 3',
            },
            group: '1',
        },
    },
];

<ActionsPanel actions={actions} />
```

<!-- Storybook example -->

<ActionsPanelGroups />

<!--/GITHUB_BLOCK-->

## Action sub-menu and nested dropdown menu

See `actions` example below and documentation about the `DropdownMenu` component.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<ActionsPanel actions={[
    {
        id: 'button-with-sub-menu',
        button: {
            props: {
                children: ['Sub-menu', <UIKit.Icon key="icon"
                data={() => (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06" clip-rule="evenodd"/></svg>
                )}
                size={16} />],
                view: 'outlined-contrast',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                text: 'Sub-menu',
                items: [
                    {
                        action: () => console.log('Edit'),
                        text: 'Edit',
                    },
                    {
                        action: () => console.log('Delete'),
                        text: 'Delete',
                        theme: 'danger',
                    },
                ],
            },
        },
    },
    {
        id: 'nested-menu',
        collapsed: true,
        button: {
            props: {
                children: 'Nested',
                onClick: () => console.log('click button nested'),
            },
        },
        dropdown: {
            item: {
                text: 'Other',
                items: [
                    {
                        text: 'Select',
                        items: [
                            {
                                action: () => console.log('Select One'),
                                text: 'One',
                            },
                            {
                                action: () => console.log('Select All'),
                                text: 'All',
                            },
                        ],
                    },
                    {
                        action: () => console.log('Copy'),
                        text: 'Copy',
                    },
                    {
                        text: 'Move to',
                        items: [
                            {
                                action: () => console.log('Move to folder 1'),
                                text: 'Folder 1',
                            },
                            {
                                action: () => console.log('Move to folder 2'),
                                text: 'Folder 2',
                            },
                        ],
                    },
                ],
            },
        },
    },
]} />
`}
>
    <UIKit.ActionsPanel actions={[
    {
        id: 'button-with-sub-menu',
        button: {
            props: {
                children: ['Sub-menu', <UIKit.Icon key="icon"
                data={() => (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06" clip-rule="evenodd"/></svg>
                )}
                size={16} />],
                view: 'outlined-contrast',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                text: 'Sub-menu',
                items: [
                    {
                        action: () => console.log('Edit'),
                        text: 'Edit',
                    },
                    {
                        action: () => console.log('Delete'),
                        text: 'Delete',
                        theme: 'danger',
                    },
                ],
            },
        },
    },
    {
        id: 'nested-menu',
        collapsed: true,
        button: {
            props: {
                children: 'Nested',
                onClick: () => console.log('click button nested'),
            },
        },
        dropdown: {
            item: {
                text: 'Other',
                items: [
                    {
                        text: 'Select',
                        items: [
                            {
                                action: () => console.log('Select One'),
                                text: 'One',
                            },
                            {
                                action: () => console.log('Select All'),
                                text: 'All',
                            },
                        ],
                    },
                    {
                        action: () => console.log('Copy'),
                        text: 'Copy',
                    },
                    {
                        text: 'Move to',
                        items: [
                            {
                                action: () => console.log('Move to folder 1'),
                                text: 'Folder 1',
                            },
                            {
                                action: () => console.log('Move to folder 2'),
                                text: 'Folder 2',
                            },
                        ],
                    },
                ],
            },
        },
    },
]} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
const actions: ActionsPanelProps['actions'] = [
    {
        id: 'button-with-sub-menu',
        button: {
            props: {
                children: ['Sub-menu', <Icon key="icon" data={ChevronDown} />],
                view: 'outlined-contrast',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                text: 'Sub-menu',
                items: [
                    {
                        action: () => console.log('Edit'),
                        text: 'Edit',
                    },
                    {
                        action: () => console.log('Delete'),
                        text: 'Delete',
                        theme: 'danger',
                    },
                ],
            },
        },
    },
    {
        id: 'nested-menu',
        collapsed: true,
        button: {
            props: {
                children: 'Nested',
                onClick: () => console.log('click button nested'),
            },
        },
        dropdown: {
            item: {
                text: 'Other',
                items: [
                    {
                        text: 'Select',
                        items: [
                            {
                                action: () => console.log('Select One'),
                                text: 'One',
                            },
                            {
                                action: () => console.log('Select All'),
                                text: 'All',
                            },
                        ],
                    },
                    {
                        action: () => console.log('Copy'),
                        text: 'Copy',
                    },
                    {
                        text: 'Move to',
                        items: [
                            {
                                action: () => console.log('Move to folder 1'),
                                text: 'Folder 1',
                            },
                            {
                                action: () => console.log('Move to folder 2'),
                                text: 'Folder 2',
                            },
                        ],
                    },
                ],
            },
        },
    },
];

<ActionsPanel actions={actions} />
```

<!-- Storybook example -->

<ActionsPanelSubmenu />

<!--/GITHUB_BLOCK-->

## Properties

| Name          | Description                                               |          Type           | Default |
| :------------ | :-------------------------------------------------------- | :---------------------: | :-----: |
| actions       | Array of actions                                          |  `ActionsPanelItem[]`   |         |
| onClose       | Optional close button click handler                       |      `() => void`       |         |
| renderNote    | Optional render-prop for displaying the content of a note | `() => React.ReactNode` |         |
| className     | Optional HTML `class` attribute                           |        `string`         |         |
| noteClassName | Optional HTML `class` attribute                           |        `string`         |         |
| maxRowActions | Maximum number of actions in a row                        |        `number`         |   `4`   |

## ActionsPanelItem:

| Name      | Description                                   |                    Type                    | Default |
| :-------- | :-------------------------------------------- | :----------------------------------------: | :-----: |
| id        | Unique action id                              |                  `string`                  |         |
| dropdown  | Settings for dropdown action in overflow menu | `{item: DropdownMenuItem; group?: string}` |         |
| button    | Settings for button action                    |           `{props: ButtonProps}`           |         |
| collapsed | If true, then item always inside the dropdown |                 `boolean`                  |         |
