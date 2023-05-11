
export function median(arr: number[]): number {
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedArr.length / 2);

    if (sortedArr.length % 2 !== 0) {
        return sortedArr[middleIndex];
    }

    const middleValue1 = sortedArr[middleIndex - 1];
    const middleValue2 = sortedArr[middleIndex];
    return (middleValue1 + middleValue2) / 2;
}