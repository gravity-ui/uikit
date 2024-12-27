import type {Cases} from '../../../stories/tests-factory/models';
import type {PinInputProps} from '../PinInput';

export const sizeCases: Cases<PinInputProps['size']> = ['s', 'm', 'l', 'xl'];
export const maskCases: Cases<PinInputProps['mask']> = [true];
export const placeholderCases: Cases<PinInputProps['placeholder']> = ['*'];
export const validationStateCases: Cases<PinInputProps['validationState']> = ['invalid'];
export const lengthCases: Cases<PinInputProps['length']> = [4, 6];
export const disabledCases: Cases<PinInputProps['disabled']> = [true];
export const responsiveCases: Cases<PinInputProps['responsive']> = [true];
export const noteCases: Cases<PinInputProps['note']> = ['note'];
