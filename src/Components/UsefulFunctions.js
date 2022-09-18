export function handleNumber(num) {
    if(typeof num === 'number') {
        return num;
    }
    var tempVar = parseInt(num);
    if(Number.isNaN(tempVar)) {
        return 0;
    }
    return tempVar;
}

