'use client';

import * as React from 'react';

import type {AccordionProps} from '../Accordion';
import type {ActionTooltipProps} from '../ActionTooltip';
import type {ActionsPanelProps} from '../ActionsPanel';
import type {AlertProps} from '../Alert';
import type {ArrowToggleProps} from '../ArrowToggle';
import type {AvatarProps} from '../Avatar';
import type {AvatarStackProps} from '../AvatarStack';
import type {BreadcrumbsProps} from '../Breadcrumbs';
import type {ButtonCommonProps} from '../Button/Button';
import type {CardProps} from '../Card';
import type {CheckboxProps} from '../Checkbox';
import type {ClipboardButtonProps} from '../ClipboardButton';
import type {ClipboardIconProps} from '../ClipboardIcon';
import type {CopyToClipboardProps} from '../CopyToClipboard';
import type {DefinitionListProps} from '../DefinitionList';
import type {DialogProps} from '../Dialog';
import type {DisclosureProps} from '../Disclosure';
import type {DividerProps} from '../Divider';
import type {DrawerProps} from '../Drawer';
import type {DropdownMenuProps} from '../DropdownMenu';
import type {FilePreviewProps} from '../FilePreview';
import type {HelpMarkProps} from '../HelpMark';
import type {HotkeyProps} from '../Hotkey';
import type {IconProps} from '../Icon';
import type {LabelProps} from '../Label';
import type {LinkProps} from '../Link';
import type {LoaderProps} from '../Loader';
import type {MenuProps} from '../Menu';
import type {ModalProps} from '../Modal';
import type {NumberInputProps} from '../NumberInput';
import type {OverlayProps} from '../Overlay';
import type {PaginationProps} from '../Pagination';
import type {PaletteProps} from '../Palette';
import type {PinInputProps} from '../PinInput';
import type {PlaceholderContainerProps} from '../PlaceholderContainer';
import type {PopoverProps} from '../Popover';
import type {PopupProps} from '../Popup';
import type {PortalProps} from '../Portal';
import type {ProgressProps} from '../Progress';
import type {RadioProps} from '../Radio';
import type {RadioGroupProps} from '../RadioGroup';
import type {SegmentedRadioGroupProps} from '../SegmentedRadioGroup';
import type {SelectProps} from '../Select';
import type {SheetProps} from '../Sheet';
import type {SkeletonProps} from '../Skeleton';
import type {SliderProps} from '../Slider';
import type {SpinProps} from '../Spin';
import type {StepperProps} from '../Stepper';
import type {SwitchProps} from '../Switch';
import type {TableColumnSetupProps} from '../TableColumnSetup';
import type {TextProps} from '../Text';
import type {TocProps} from '../Toc';
import type {TooltipProps} from '../Tooltip';
import type {UserProps} from '../User';
import type {UserLabelProps} from '../UserLabel';
import type {TextAreaProps} from '../controls/TextArea';
import type {TextInputProps} from '../controls/TextInput';
import type {TabListProps, TabPanelProps, TabProps, TabProviderProps} from '../tabs';

export interface ComponentDefaultPropsMap {
    Accordion?: Partial<AccordionProps<any>>;
    ActionsPanel?: Partial<ActionsPanelProps>;
    ActionTooltip?: Partial<ActionTooltipProps>;
    Alert?: Partial<AlertProps>;
    ArrowToggle?: Partial<ArrowToggleProps>;
    Avatar?: Partial<AvatarProps>;
    AvatarStack?: Partial<AvatarStackProps>;
    Breadcrumbs?: Partial<BreadcrumbsProps>;
    Button?: Partial<ButtonCommonProps>;
    Card?: Partial<CardProps>;
    Checkbox?: Partial<CheckboxProps>;
    ClipboardButton?: Partial<ClipboardButtonProps>;
    ClipboardIcon?: Partial<ClipboardIconProps>;
    CopyToClipboard?: Partial<CopyToClipboardProps>;
    DefinitionList?: Partial<DefinitionListProps>;
    Dialog?: Partial<DialogProps>;
    Disclosure?: Partial<DisclosureProps>;
    Divider?: Partial<DividerProps>;
    Drawer?: Partial<DrawerProps>;
    DropdownMenu?: Partial<DropdownMenuProps<any>>;
    FilePreview?: Partial<FilePreviewProps>;
    HelpMark?: Partial<HelpMarkProps>;
    Hotkey?: Partial<HotkeyProps>;
    Icon?: Partial<IconProps>;
    Label?: Partial<LabelProps>;
    Link?: Partial<LinkProps>;
    Loader?: Partial<LoaderProps>;
    Menu?: Partial<MenuProps>;
    Modal?: Partial<ModalProps>;
    NumberInput?: Partial<NumberInputProps>;
    Overlay?: Partial<OverlayProps>;
    Pagination?: Partial<PaginationProps>;
    Palette?: Partial<PaletteProps>;
    PinInput?: Partial<PinInputProps>;
    PlaceholderContainer?: Partial<PlaceholderContainerProps>;
    Popover?: Partial<PopoverProps>;
    Popup?: Partial<PopupProps>;
    Portal?: Partial<PortalProps>;
    Progress?: Partial<ProgressProps>;
    Radio?: Partial<RadioProps>;
    RadioGroup?: Partial<RadioGroupProps>;
    SegmentedRadioGroup?: Partial<SegmentedRadioGroupProps<any>>;
    Select?: Partial<SelectProps<any>>;
    Sheet?: Partial<SheetProps>;
    Skeleton?: Partial<SkeletonProps>;
    Slider?: Partial<SliderProps<any>>;
    Spin?: Partial<SpinProps>;
    Stepper?: Partial<StepperProps>;
    Switch?: Partial<SwitchProps>;
    TableColumnSetup?: Partial<TableColumnSetupProps>;
    Tab?: Partial<TabProps>;
    TabList?: Partial<TabListProps>;
    TabPanel?: Partial<TabPanelProps>;
    TabProvider?: Partial<TabProviderProps>;
    Text?: Partial<TextProps<any>>;
    TextArea?: Partial<TextAreaProps>;
    TextInput?: Partial<TextInputProps>;
    Toc?: Partial<TocProps>;
    Tooltip?: Partial<TooltipProps>;
    User?: Partial<UserProps>;
    UserLabel?: Partial<UserLabelProps>;
}

const EMPTY: ComponentDefaultPropsMap = {};

export const PrivateDefaultPropsContext = React.createContext<ComponentDefaultPropsMap>(EMPTY);

export function PrivateDefaultPropsProvider({
    value = EMPTY,
    children,
}: {
    value?: ComponentDefaultPropsMap;
    children: React.ReactNode;
}) {
    return (
        <PrivateDefaultPropsContext.Provider value={value}>
            {children}
        </PrivateDefaultPropsContext.Provider>
    );
}
