
export function handleNumber(num) {
    var tempVar = parseInt(num);
    if(Number.isNaN(tempVar)) {
        return 0;
    }
    return tempVar;
}
