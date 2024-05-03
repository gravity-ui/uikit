/* eslint-disable no-bitwise */
export const getHash = (token: string) => {
    let hash = 0;

    for (let index = 0; index < token.length; index++) {
        hash = token.charCodeAt(index) + ((hash << 5) - hash);
    }

    return hash;
};

export const randomIndex = (token: string, max: number) => {
    const hash = getHash(token);

    const number = Math.abs(hash) % max;

    return number;
};
