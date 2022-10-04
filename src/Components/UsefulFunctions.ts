export function handleNumber(num: any): number {
    if(typeof num === 'number') {
        return num;
    }
    var tempVar = parseInt(num);
    if(Number.isNaN(tempVar)) {
        return 0;
    }
    return tempVar;
}

export function generateID(): number {
    const idFromDate: number = Date.now();
    return idFromDate;
}