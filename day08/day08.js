const fs = require('fs');

const treeArrayFile = fs.readFileSync('day08.txt', { encoding: 'utf-8' });

const treeArray = treeArrayFile.split('\n');
const checkRowStartIndex = 1;
const checkColumnStartIndex = 1;
const rowsLength = treeArray[0].length;
const columnsLength = treeArray.length;

const checkLeft = (currentRowIndex, currentColumnIndex) => {
    let isNotVisible = false;
    let viewingDistance = 0;
    for(let i = currentRowIndex-1; i >= 0; i--) {
        viewingDistance++;
        if(treeArray[i][currentColumnIndex] >= treeArray[currentRowIndex][currentColumnIndex]) {
            isNotVisible = true;
            break;
        }
    }
    return {isNotVisible, viewingDistance};
}


const checkBottom = (currentRowIndex, currentColumnIndex) => {
    let isNotVisible = false;
    let viewingDistance = 0;
    for(let i = currentRowIndex + 1; i < rowsLength; i++) {
        viewingDistance++;
        if(treeArray[i][currentColumnIndex] >= treeArray[currentRowIndex][currentColumnIndex]) {
            isNotVisible = true;
            break;
        }
    }
    return {isNotVisible, viewingDistance};
}


const checkTop = (currentRowIndex, currentColumnIndex) => {
    let isNotVisible = false;
    let viewingDistance = 0;
    for(let i = currentColumnIndex-1; i >= 0; i--) {
        viewingDistance++;
        if(treeArray[currentRowIndex][i] >= treeArray[currentRowIndex][currentColumnIndex]) {
            isNotVisible = true;
            break;
        }
    }
    return {isNotVisible, viewingDistance};
}

const checkRight = (currentRowIndex, currentColumnIndex) => {
    let isNotVisible = false;
    let viewingDistance = 0;
    for(let i = currentColumnIndex + 1; i < columnsLength; i++) {
        viewingDistance++;
        console.log(treeArray[currentRowIndex][currentColumnIndex], treeArray[currentRowIndex][i]);
        if(treeArray[currentRowIndex][i] >= treeArray[currentRowIndex][currentColumnIndex]) {
            isNotVisible = true;
            break;
        }
    }
    return {isNotVisible, viewingDistance};
}

const notVisibleTrees = [];
let largestScenicScore = 0;
const checkNotVisibleTrees = () => {
    for (let rowIndex = checkRowStartIndex; rowIndex < rowsLength - 1; rowIndex++) {
        for (let columnIndex = checkColumnStartIndex; columnIndex < columnsLength - 1; columnIndex++) {
            const isLeftNotVisible = checkLeft(rowIndex, columnIndex);
            const isRightNotVisible = checkRight(rowIndex, columnIndex);
            const isTopNotVisible = checkTop(rowIndex, columnIndex);
            const isBottomNotVisible = checkBottom(rowIndex, columnIndex);
            if (isLeftNotVisible.isNotVisible && isRightNotVisible.isNotVisible && isTopNotVisible.isNotVisible && isBottomNotVisible.isNotVisible) {
                notVisibleTrees.push(Number(treeArray[rowIndex][columnIndex]));
            }
            console.log(isTopNotVisible.viewingDistance, isLeftNotVisible.viewingDistance, isBottomNotVisible.viewingDistance, isRightNotVisible.viewingDistance, rowIndex, columnIndex,Number(treeArray[rowIndex][columnIndex]));
            const scenicScore = isLeftNotVisible.viewingDistance * isRightNotVisible.viewingDistance * isTopNotVisible.viewingDistance * isBottomNotVisible.viewingDistance;
            if (largestScenicScore <= scenicScore && (columnIndex + 1 !== rowsLength && rowIndex + 1 !== columnsLength))  {
                largestScenicScore = scenicScore;
            }
        }
    }
} 

checkNotVisibleTrees();

const visibleTreesCount = (columnsLength*rowsLength) - notVisibleTrees.length;
console.log(visibleTreesCount);
console.log(largestScenicScore);