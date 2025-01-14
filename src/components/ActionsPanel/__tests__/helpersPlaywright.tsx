import {ActionsPanel} from '../ActionsPanel';
import type {ActionsPanelProps} from '../types';

export const TestActionsPanelWithNote = (props: ActionsPanelProps) => {
    return <ActionsPanel renderNote={() => 'note'} {...props} />;
};
