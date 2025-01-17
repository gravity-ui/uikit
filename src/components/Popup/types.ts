import type {OffsetOptions, Placement, VirtualElement} from '@floating-ui/react';

import type {AUTO_PLACEMENTS} from './constants';

export type AutoPlacement = (typeof AUTO_PLACEMENTS)[number];

export type PopupPlacement = AutoPlacement | Placement | Placement[];

export type PopupAnchorElement = Element | VirtualElement;

export type PopupAnchorRef = React.RefObject<PopupAnchorElement>;

type RemoveFunction<T> = T extends Function ? never : T;

// floating-ui not exports `OffsetValue` type, so use this workarround
export type PopupOffset = RemoveFunction<OffsetOptions>;
