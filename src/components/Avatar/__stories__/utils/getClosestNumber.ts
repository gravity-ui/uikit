export const getClosestNumber = (targetNumber: number, availableNumbers: number[]) => {
    const stack = [...availableNumbers];
    let previousNumber: number | undefined;

    while (stack.length) {
        const currentNumber = stack.pop() as number;
        const isBigger = targetNumber > currentNumber;
        const isSame = targetNumber === currentNumber;

        if (isSame) {
            return currentNumber;
        }

        if (isBigger) {
            if (previousNumber) {
                return previousNumber;
            }

            return currentNumber;
        }

        previousNumber = currentNumber;
    }

    return previousNumber as number;
};
