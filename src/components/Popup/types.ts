import type {OffsetOptions, Placement, VirtualElement} from '@floating-ui/react';

import type {AUTO_PLACEMENTS} from './constants';

export type PopupPlacement = (typeof AUTO_PLACEMENTS)[number] | Placement | Placement[];

export type PopupAnchorEl = Element | VirtualElement;

export type PopupAnchorRef = React.RefObject<PopupAnchorEl>;

type RemoveFunction<T> = T extends Function ? never : T;

// floating-ui not exports `OffsetValue` type, so use this workarround
export type PopupOffset = RemoveFunction<OffsetOptions>;
