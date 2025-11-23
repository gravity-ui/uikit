import type {default as ActionsPanelKeyset} from '../components/ActionsPanel/i18n';
import type {default as AlertKeyset} from '../components/Alert/i18n';
import type {default as AvatarStackKeyset} from '../components/AvatarStack/i18n';
import type {default as BreadcrumbsKeyset} from '../components/Breadcrumbs/i18n';
import type {default as ClipboardButtonKeyset} from '../components/ClipboardButton/i18n';
import type {default as DialogKeyset} from '../components/Dialog/i18n';
import type {default as PaginationKeyset} from '../components/Pagination/i18n';
import type {default as PinInputKeyset} from '../components/PinInput/i18n';
import type {default as SelectKeyset} from '../components/Select/i18n';
import type {default as WithTableSettingsTableColumnSetupKeyset} from '../components/Table/hoc/withTableSettings/TableColumnSetup/i18n';
import type {default as WithTableSettingsKeyset} from '../components/Table/hoc/withTableSettings/i18n';
import type {default as TableKeyset} from '../components/Table/i18n';
import type {default as TableColumnSetupKeyset} from '../components/TableColumnSetup/i18n';
import type {default as ToasterKeyset} from '../components/Toaster/i18n';
import type {default as UserLabelKeyset} from '../components/UserLabel/i18n';
import type {default as ClearButtonKeyset} from '../components/controls/common/ClearButton/i18n';
import type {default as LegacyBreadcrumbsKeyset} from '../components/legacy/Breadcrumbs/i18n';
import type {DeepPartial} from '../utils/types';

export type Keysets = typeof ActionsPanelKeyset.keysetData &
    typeof AlertKeyset.keysetData &
    typeof AvatarStackKeyset.keysetData &
    typeof BreadcrumbsKeyset.keysetData &
    typeof ClipboardButtonKeyset.keysetData &
    typeof DialogKeyset.keysetData &
    typeof PaginationKeyset.keysetData &
    typeof PinInputKeyset.keysetData &
    typeof WithTableSettingsTableColumnSetupKeyset.keysetData &
    typeof WithTableSettingsKeyset.keysetData &
    typeof TableColumnSetupKeyset.keysetData &
    typeof ClearButtonKeyset.keysetData &
    typeof LegacyBreadcrumbsKeyset.keysetData &
    typeof SelectKeyset.keysetData &
    typeof TableKeyset.keysetData &
    typeof ToasterKeyset.keysetData &
    typeof UserLabelKeyset.keysetData;

export type PartialKeysets = DeepPartial<Keysets, 2>;
