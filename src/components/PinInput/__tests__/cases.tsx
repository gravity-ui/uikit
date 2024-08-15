import type {Cases} from '../../../stories/tests-factory/models';
import type {PinInputProps} from '../PinInput';

export const sizeCases: Cases<PinInputProps['size']> = ['s', 'm', 'l', 'xl'];
export const maskCases: Cases<PinInputProps['mask']> = [true];
export const placeholderCases: Cases<PinInputProps['placeholder']> = ['*'];
export const validationStateCases: Cases<PinInputProps['validationState']> = ['invalid'];

// WithNote + note

// disabled
// responsive

// validationState
// errorMessage
