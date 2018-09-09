module.exports = {

    getIndexOrDefault : (array, index, defaultValue) => {
        if(array && array.length > index){
            return array[index]
        }
        return defaultValue;
    }
};