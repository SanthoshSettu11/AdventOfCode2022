const fs = require('fs');

const caloriesOfAllElf = fs.readFileSync('day01.txt', { encoding: 'utf-8'} );
let sumOfCaloriesOfEachElf = [];
caloriesOfAllElf?.split('\n\n')?.forEach(
    caloriesOfAElf => {
        sumOfCaloriesOfEachElf.push(caloriesOfAElf?.split('\n')?.reduce((a, b) => a + Number(b), 0));
    }
);
const sumOFThreeLargest = sumOfCaloriesOfEachElf?.sort((a,b) => { return b-a })?.slice(0, 3)?.reduce((a, b) => a + b, 0);

console.log(sumOFThreeLargest);