import {
    ArrowRotateLeft,
    ArrowRotateRight,
    ArrowShapeTurnUpRight,
    ArrowsExpand,
    Copy,
    Envelope,
    LogoTelegram,
    MusicNote,
    Picture,
    Scissors,
    Text,
    TrashBin,
    Video,
} from '@gravity-ui/icons';

import {BUTTON_ICON_SIZE_MAP} from '../../../Button/constants';
import {Hotkey} from '../../../Hotkey';
import {Icon} from '../../../Icon';
import {Menu} from '../Menu';
import {MenuItem} from '../MenuItem';
import type {MenuProps} from '../types';

export function getSimpleMenuItems(args: MenuProps, icon?: boolean) {
    const iconSize = BUTTON_ICON_SIZE_MAP[args.size ?? 'm'];

    return [
        <MenuItem key="copy" icon={icon ? <Icon data={Copy} size={iconSize} /> : undefined}>
            Copy
        </MenuItem>,
        <MenuItem key="move" icon={icon ? <Icon data={ArrowsExpand} size={iconSize} /> : undefined}>
            Move
        </MenuItem>,
        <MenuItem
            key="delete"
            icon={icon ? <Icon data={TrashBin} size={iconSize} /> : undefined}
            theme="danger"
        >
            Delete
        </MenuItem>,
    ];
}

export function getFullFeaturedMenuItems(args: MenuProps, inline?: boolean) {
    const iconSize = BUTTON_ICON_SIZE_MAP[args.size ?? 'm'];

    const items = [
        <Menu.Item
            key="undo"
            icon={<Icon data={ArrowRotateLeft} size={iconSize} />}
            arrow={<Hotkey value="mod z" />}
        >
            Undo
        </Menu.Item>,
        <Menu.Item
            key="redo"
            icon={<Icon data={ArrowRotateRight} size={iconSize} />}
            arrow={<Hotkey value="mod y" />}
            disabled
        >
            Redo
        </Menu.Item>,
        <Menu.Item
            key="cut"
            icon={<Icon data={Scissors} size={iconSize} />}
            arrow={<Hotkey value="mod x" />}
        >
            Cut
        </Menu.Item>,
        <Menu.Divider key="divider1" />,
        <Menu.Item key="delete" icon={<Icon data={TrashBin} size={iconSize} />} theme="danger">
            Delete
        </Menu.Item>,
    ];

    if (!inline) {
        items.push(
            <Menu.Divider key="divider2" />,
            <Menu.Item key="copy">
                Copy as
                <Menu>
                    <Menu.Item icon={<Icon data={Text} size={iconSize} />}>Text</Menu.Item>
                    <Menu.Item icon={<Icon data={Video} size={iconSize} />}>Video</Menu.Item>
                    <Menu.Item icon={<Icon data={Picture} size={iconSize} />}>
                        Image
                        <Menu>
                            <Menu.Item>.png</Menu.Item>
                            <Menu.Item>.jpg</Menu.Item>
                            <Menu.Item>.svg</Menu.Item>
                            <Menu.Item>.gif</Menu.Item>
                        </Menu>
                    </Menu.Item>
                    <Menu.Item icon={<Icon data={MusicNote} size={iconSize} />}>Audio</Menu.Item>
                </Menu>
            </Menu.Item>,
            <Menu.Item key="share" icon={<Icon data={ArrowShapeTurnUpRight} size={iconSize} />}>
                Share
                <Menu>
                    <Menu.Item icon={<Icon data={Envelope} size={iconSize} />}>Mail</Menu.Item>
                    <Menu.Item icon={<Icon data={LogoTelegram} size={iconSize} />}>
                        Telegram
                    </Menu.Item>
                </Menu>
            </Menu.Item>,
        );
    }

    return items;
}
