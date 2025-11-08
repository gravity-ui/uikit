import type {Cases} from '../../../stories/tests-factory/models';
import type {TableColumnSetupProps} from '../TableColumnSetup';

export const disabledCases: Cases<TableColumnSetupProps['disabled']> = [true];
export const showStatusCases: Cases<TableColumnSetupProps['showStatus']> = [true];
