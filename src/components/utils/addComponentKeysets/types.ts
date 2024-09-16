import type {DeepPartial} from '../../../types/utils';
import type {default as AlertKeyset} from '../../Alert/i18n';
import type {default as AvatarStackKeyset} from '../../AvatarStack/i18n';
import type {default as BreadcrumbsKeyset} from '../../Breadcrumbs/i18n';
import type {default as ClipboardButtonKeyset} from '../../ClipboardButton/i18n';
import type {default as DialogKeyset} from '../../Dialog/i18n';
import type {default as PaginationKeyset} from '../../Pagination/i18n';
import type {default as PinInputKeyset} from '../../PinInput/i18n';
import type {default as SelectKeyset} from '../../Select/i18n';
import type {default as WithTableSettingsTableColumnSetupKeyset} from '../../Table/hoc/withTableSettings/TableColumnSetup/i18n';
import type {default as WithTableSettingsKeyset} from '../../Table/hoc/withTableSettings/i18n';
import type {default as TableKeyset} from '../../Table/i18n';
import type {default as TableColumnSetupKeyset} from '../../TableColumnSetup/i18n';
import type {default as ToasterKeyset} from '../../Toaster/i18n';
import type {default as UserLabelKeyset} from '../../UserLabel/i18n';
import type {default as ClearButtonKeyset} from '../../controls/common/ClearButton/i18n';
import type {default as LabBreadcrumbsKeyset} from '../../lab/Breadcrumbs/i18n';

export type Keysets = typeof AlertKeyset.keysetData &
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
    typeof LabBreadcrumbsKeyset.keysetData &
    typeof SelectKeyset.keysetData &
    typeof TableKeyset.keysetData &
    typeof ToasterKeyset.keysetData &
    typeof UserLabelKeyset.keysetData;

export type PartialKeysets = DeepPartial<Keysets, 2>;
