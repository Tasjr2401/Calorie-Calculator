import { type } from "os";

export function handleNumber(num: string | number): number {
    if(typeof num === 'number') {
        return num;
    }
    var tempVar: number = parseInt(num);
    if(Number.isNaN(tempVar)) {
        return 0;
    }
    return tempVar;
}

