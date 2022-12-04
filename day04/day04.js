const fs = require('fs');
const pairedElfs = fs.readFileSync('day04.txt', { encoding: 'utf-8' });

const pairList = pairedElfs?.split('\n');
let containedPairs = [];
pairList.forEach(pair => {
    const elfs = pair.split(',');
    const firstElf = elfs[0].split('-').map(x => Number(x));
    const secondElf = elfs[1].split('-').map(x => Number(x));
    if (firstElf && secondElf) {
        if (((firstElf[0] <= secondElf[0]) && (firstElf[1] >= secondElf[1])) ||
            ((firstElf[0] >= secondElf[0]) && (firstElf[1] <= secondElf[1]))) {
                containedPairs.push(elfs);
        }
    }
});

console.log(containedPairs.length);

// Part Two

const overlappedPairs = [];
pairList.forEach(pair => {
    const elfs = pair.split(',');
    const firstElf = elfs[0].split('-').map(x => Number(x));
    const secondElf = elfs[1].split('-').map(x => Number(x));
    if (firstElf && secondElf) {
        const secondElfStart =  secondElf[0];
        const secondElfEnd =  secondElf[1];
        for(let i = secondElfStart; i <= secondElfEnd; i++){
            if ((firstElf[0] <= i) && (firstElf[1] >= i)) {
                overlappedPairs.push(elfs);
                break;
            }
        }
    }
}); 

console.log(overlappedPairs.length);