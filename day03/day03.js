const fs = require('fs');

const lowerAlpha = Array.from(Array(26)).map((e, i) => i + 97);
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const allAlpha = lowerAlpha.concat(alpha);
const alphabet = allAlpha.map((x) => String.fromCharCode(x));

const ruckackBagContent = fs.readFileSync('day03.txt', { encoding: 'utf-8'} );
let priorityOfItems = [];

const eachRuckSackBagContents = ruckackBagContent.split('\n');
eachRuckSackBagContents?.forEach(eachRucksackItems => {
    const firstCompartmentItems = eachRucksackItems?.substring(0, (eachRucksackItems?.length/2))?.split('');
    const secondCompartmentItems = eachRucksackItems?.substring(eachRucksackItems?.length/2)?.split('');
    if (firstCompartmentItems && secondCompartmentItems) {
        const matchingItems = [];
        firstCompartmentItems.forEach(x => {
            if (secondCompartmentItems.includes(x) && !matchingItems.includes(alphabet.indexOf(x) + 1)) {
                matchingItems.push(alphabet.indexOf(x) + 1);
            }
        });
        if(matchingItems.length > 1) {
            console.log(`${eachRucksackItems}`)
        }
        priorityOfItems = priorityOfItems.concat(matchingItems);
    }
});

const sumOfPriority = priorityOfItems?.reduce((a, b) => a+b);
console.log(sumOfPriority);

const groupSize = 3;
const groups = [];

while (eachRuckSackBagContents.length > 0) {
    groups.push(eachRuckSackBagContents.splice(0, groupSize));
}

let groupPriorities = [];
groups?.forEach(eachGroup => {
    if (eachGroup) {
        let matchingItems = eachGroup[0].split('')?.map(x => { return (alphabet.indexOf(x) + 1) } );
        matchingItems = matchingItems.filter((v, i, a) => a.indexOf(v) === i)
        eachGroup.forEach((eachElf, index) => {
            if(index > 0) {
                
                const elfAlpha = eachElf.split('')?.map(x => { return (alphabet.indexOf(x) + 1) } );
                for(let i = matchingItems.length; i >=0 ; i--) {
                    if (!elfAlpha?.includes(matchingItems[i])) {
                        matchingItems.splice(i, 1);
                    }
                }
            }
        });
        groupPriorities = groupPriorities.concat(matchingItems);
    }
});

const sumOfGroupPriorities = groupPriorities.reduce((a, b) => a+b);

console.log(sumOfGroupPriorities);

