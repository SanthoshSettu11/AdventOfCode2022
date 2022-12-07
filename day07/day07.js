const fs = require('fs');

const commandLines = fs.readFileSync('day07.txt', { encoding: 'utf-8' });

const directories = {
    '/': {
        size: 0,
    }
};

let currentSubDirectory = '/';
let isListed = true;

let listedElements = [];


const splittedCommandLines = commandLines?.split('\n')

const foldersTree = [];
listedElements = [];

isListed = false;

const directoriesChange = () => {  
    let currentFolder = directories;
    foldersTree.forEach(x => {
        currentFolder =  currentFolder[x];
    });
    listedElements.forEach(listedElement => {
        if(listedElement[0] === 'dir') {
            currentFolder[listedElement[1]] = {
                size: 0,
            };
        } else {
            currentFolder[listedElement[1]] = Number(listedElement[0]);
        }
    });
};

splittedCommandLines?.forEach((eachLine, index) => {
    if (eachLine) {
        const lineSplitted = eachLine.split(' ');
        if(lineSplitted.includes('$')) {
            if(isListed) {
                directoriesChange();
            }
            listedElements = [];
            isListed = false;
            if (lineSplitted[1] === 'cd') {
                if (lineSplitted[2] === '..') {
                    foldersTree.pop();
                } else {
                    foldersTree.push(lineSplitted[2]);
                }
            } else if (lineSplitted[1] === 'ls') {
                isListed = true;
            }
        } else if (isListed) {
            listedElements.push(lineSplitted);
        }
    }
    if(index === splittedCommandLines.length - 1 && isListed) {
        console.log(currentSubDirectory);
        directoriesChange();
    }
});

const foldersLessThanSpecifiedSize = [];
const specifiedSize = 100000;
const directoriesSize = [];
function sumTheFolder(obj) {
    Object.keys(obj).forEach(x => {
        if (typeof obj[x] === 'object') {
            obj['size'] = obj['size'] + sumTheFolder(obj[x]);
        } else if(x != 'size') {
            obj['size'] = obj['size'] + obj[x];
        }
    });
    if (obj['size'] <= specifiedSize) {
        foldersLessThanSpecifiedSize.push(obj['size']);
    }
    directoriesSize.push(obj['size']);
    return obj['size'];
}

sumTheFolder(directories);

const sumOfFoldersLessThanSpecifiedSize = foldersLessThanSpecifiedSize.reduce((a,b) => a+b);
console.log(sumOfFoldersLessThanSpecifiedSize);
console.log(directories['/'].size);

const totalDiskSize = 70000000;
const needSpace = 30000000;
const neededDiskSpace = needSpace - (totalDiskSize - directories['/'].size);
let sortedDirectoriesSize = directoriesSize?.filter(x => x >= neededDiskSpace)?.sort((a, b) => a-b);
console.log(sortedDirectoriesSize[0]);