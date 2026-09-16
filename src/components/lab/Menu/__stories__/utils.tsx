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

import {Hotkey} from '../../../Hotkey';
import {Icon} from '../../../Icon';
import {Menu} from '../Menu';
import {MenuItem} from '../MenuItem';

export function getSimpleMenuItems(icon?: boolean) {
    return [
        <MenuItem key="copy" icon={icon ? <Icon data={Copy} /> : undefined}>
            Copy
        </MenuItem>,
        <MenuItem key="move" icon={icon ? <Icon data={ArrowsExpand} /> : undefined}>
            Move
        </MenuItem>,
        <MenuItem key="delete" icon={icon ? <Icon data={TrashBin} /> : undefined} theme="danger">
            Delete
        </MenuItem>,
    ];
}

export function getFullFeaturedMenuItems(inline?: boolean) {
    const items = [
        <Menu.Item
            key="undo"
            icon={<Icon data={ArrowRotateLeft} />}
            arrow={<Hotkey value="mod z" />}
        >
            Undo
        </Menu.Item>,
        <Menu.Item
            key="redo"
            icon={<Icon data={ArrowRotateRight} />}
            arrow={<Hotkey value="mod y" />}
            disabled
        >
            Redo
        </Menu.Item>,
        <Menu.Item key="cut" icon={<Icon data={Scissors} />} arrow={<Hotkey value="mod x" />}>
            Cut
        </Menu.Item>,
        <Menu.Divider key="divider1" />,
        <Menu.Item key="delete" icon={<Icon data={TrashBin} />} theme="danger">
            Delete
        </Menu.Item>,
    ];

    if (!inline) {
        items.push(
            <Menu.Divider key="divider2" />,
            <Menu.Item key="copy">
                Copy as
                <Menu>
                    <Menu.Item icon={<Icon data={Text} />}>Text</Menu.Item>
                    <Menu.Item icon={<Icon data={Video} />}>Video</Menu.Item>
                    <Menu.Item icon={<Icon data={Picture} />}>
                        Image
                        <Menu>
                            <Menu.Item>.png</Menu.Item>
                            <Menu.Item>.jpg</Menu.Item>
                            <Menu.Item>.svg</Menu.Item>
                            <Menu.Item>.gif</Menu.Item>
                        </Menu>
                    </Menu.Item>
                    <Menu.Item icon={<Icon data={MusicNote} />}>Audio</Menu.Item>
                </Menu>
            </Menu.Item>,
            <Menu.Item key="share" icon={<Icon data={ArrowShapeTurnUpRight} />}>
                Share
                <Menu>
                    <Menu.Item icon={<Icon data={Envelope} />}>Mail</Menu.Item>
                    <Menu.Item icon={<Icon data={LogoTelegram} />}>Telegram</Menu.Item>
                </Menu>
            </Menu.Item>,
        );
    }

    return items;
}
