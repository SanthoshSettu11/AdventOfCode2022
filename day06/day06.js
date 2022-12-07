const fs = require('fs');

const dataStreamBuffer = fs.readFileSync('day06.txt', { encoding: 'utf-8' });

// PArt One 
const makerLength = 4;

let startOfMaker = 0;

for(let i = 0; i < dataStreamBuffer.length; i++) {
    const subStringArray = dataStreamBuffer.substring(i, (i+makerLength))?.split('');
    let anyRepeatedValues = false;
    console.log(subStringArray);
    subStringArray.forEach(((character, index) => {
        if(subStringArray.filter(x => x === character).length > 1) {
            anyRepeatedValues = true;
        }
    }));
    if(anyRepeatedValues) {
        continue;
    } else {
        startOfMaker = i + makerLength;
        break;
    }
}

const messageMakerLength = 14;

let startOfMessageMaker = 0;

for(let i = 0; i < dataStreamBuffer.length; i++) {
    const subStringArray = dataStreamBuffer.substring(i, (i+messageMakerLength))?.split('');
    let anyRepeatedValues = false;
    console.log(subStringArray);
    subStringArray.forEach(((character, index) => {
        if(subStringArray.filter(x => x === character).length > 1) {
            anyRepeatedValues = true;
        }
    }));
    if(anyRepeatedValues) {
        continue;
    } else {
        startOfMessageMaker = i + messageMakerLength;
        break;
    }
}


console.log(startOfMaker);
console.log(startOfMessageMaker);