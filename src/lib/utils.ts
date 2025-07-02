export const setStorage = (key: string, value: any = undefined) => {
    return value === undefined ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(value));
}