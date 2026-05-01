export const capitalize = (str: string | null | undefined): string | undefined => {
    if (!str) return undefined;
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};