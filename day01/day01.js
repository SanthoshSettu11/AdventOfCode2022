const fs = require('fs');

const caloriesOfAllElf = fs.readFileSync('day01.txt', { encoding: 'utf-8'} );
let largestCollectedCalories = 0;
caloriesOfAllElf?.split('\n\n')?.forEach(
    caloriesOfAElf => {
        const caloriesSum = caloriesOfAElf?.split('\n')?.reduce((a, b) => a + Number(b), 0);
        largestCollectedCalories = largestCollectedCalories > caloriesSum ? largestCollectedCalories : caloriesSum;
    }
);
console.log(largestCollectedCalories);