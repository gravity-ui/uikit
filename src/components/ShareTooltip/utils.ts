export const getShareUrlWithParams = (
    url: string,
    params: Record<string, string | undefined> = {},
) => {
    const result = new URL(url);

    Object.entries(params).forEach(([name, value]) => {
        if (value) {
            result.searchParams.set(name, value);
        }
    });

    return result.toString();
};
