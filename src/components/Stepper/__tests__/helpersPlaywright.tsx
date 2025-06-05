import {composeStories} from '@storybook/react-webpack5';

import * as DefaultStepperStories from '../__stories__/Stepper.stories';

export const StepperStories = composeStories(DefaultStepperStories);
