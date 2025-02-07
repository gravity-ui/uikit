import type {StepperItemProps} from '../StepperItem';

export const useRelativeSteps = (
    activeStepId: StepperItemProps['id'],
    steps: StepperItemProps[],
) => {
    const activeStepIndex = steps.findIndex((step) => step.id === activeStepId);

    if (activeStepIndex === -1) {
        return steps;
    }

    return steps.map((step, index) => {
        if (index > activeStepIndex) {
            return {
                ...step,
                disabled: true,
            };
        }

        return step;
    });
};
