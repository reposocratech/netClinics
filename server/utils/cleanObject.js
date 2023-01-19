const cleanObject = (obj, key) => {
    return [...new Map(obj.map(item => [item[key], item])).values()];
}

module.exports = { cleanObject }