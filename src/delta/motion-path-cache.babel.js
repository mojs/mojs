
const cache = new Map();

const createId = (path = '', n) => {
    return `${n}___${path.trim()}`;
};

const save = (path, n, obj) => {
    cache.set(createId(path, n), obj);
};

const get = (path, n) => {
    return cache.get(createId(path, n));
};

export const motionPathCache = {
    createId,
    save,
    get,
};