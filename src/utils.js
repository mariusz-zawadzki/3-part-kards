module.exports = {

    getIndexOrDefault: (array, index, defaultValue) => {
        if (array && array.length > index) {
            const arrayElement = array[index];
            return {arrayElement}
        }
        return defaultValue;
    },
    resize: (arr, size, defval) => {
        var delta = arr.length - size;

        while (delta-- > 0) {
            arr.pop();
        }
        while (delta++ < 0) {
            arr.push(defval);
        }
    }
};

