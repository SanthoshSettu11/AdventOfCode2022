const fs = require('fs');

const cratesAndALignmentFile = fs.readFileSync('day05.txt', {encoding: 'utf-8'});

const cratesandInitialArrangements = cratesAndALignmentFile?.split('\n\n');
const cratesArrangement = cratesandInitialArrangements[0];
const stepsToChange = cratesandInitialArrangements[1];
const eachRow = cratesArrangement.split(`\n`);
const lastRow = eachRow?.splice([eachRow?.length -1], 1);
let groupCrates = [];
let indexOfColumn = 0;
lastRow[0]?.split('')?.forEach((indexElement, index) => {
    if(indexElement && indexElement.trim().length > 0) {
        groupCrates[indexOfColumn] = []; 
        eachRow.forEach(row => {
            if (row[index] && row[index].trim().length > 0) {
                groupCrates[indexOfColumn]?.unshift(row[index]); 
            }
        });
        indexOfColumn++;
    }
});

stepsToChange.split(`\n`).forEach(x => {
    const splittedText = x.split(' ');
    const splittedNumber = splittedText.filter(x => Number(x));
    let movingNumber = Number(splittedNumber[0]);
    const fromColumn = Number(splittedNumber[1]);
    const toColumn = Number(splittedNumber[2]);
    // while(movingNumber >= 1) {
    //     groupCrates[toColumn - 1].push(groupCrates[fromColumn -1].pop());
    //     movingNumber--;
    // }
    
    const pickedCrates = groupCrates[fromColumn -1].splice(groupCrates[fromColumn -1].length - (movingNumber), movingNumber);
    
    groupCrates[toColumn - 1] = groupCrates[toColumn - 1].concat(pickedCrates);
});


const topCrates = [];
groupCrates.forEach(x => {
    topCrates.push(x[x.length-1]);
});
console.log(topCrates.join(''));
