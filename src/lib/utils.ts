export const setStorage = (key: string, value: any = undefined) => {
    return value === undefined ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(value));
}

export const getStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}