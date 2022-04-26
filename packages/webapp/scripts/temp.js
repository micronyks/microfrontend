var fs = require("fs-extra");
const path = require("path")

const { execSync } = require('child_process');

var source = '../../docker-compose-run-mfe.yml';
var destination = `../../../docker-images/${formatDate(new Date())}_${formatTime(new Date())}`;

const newYMLFilePath = destination + '/docker-compose-run-mfe.yml'

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('-');
}

function formatTime(date) {
    return [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ].join('.');
}

console.log(destination);


async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: false });



    fs.copyFile(src, newYMLFilePath, (err) => {
        if (err) throw err;
        console.log('.....................................File copied');

    })

}



copyDir(source, destination);







