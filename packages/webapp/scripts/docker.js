var fs = require("fs-extra");
const path = require("path")

const { execSync } = require('child_process');

var source = '../../docker-compose-run-mfe.yml';
// var destination = `../../../docker-images/${formatDate(new Date())}_${formatTime(new Date())}`;

var destination = `./dist-docker-images/${formatDate(new Date())}_${formatTime(new Date())}`;

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

console.log('....................................create docker images first...')
execSync(`cd ../webapp/ && npm run docker:create-mfe `)
console.log(`.....................................docker images are created. Check with 'docker image ls' command`)


async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: false });



    fs.copyFile(src, newYMLFilePath, (err) => {
        if (err) throw err;
        console.log('.....................................File copied');

        console.log('.....................................Creating .tar file')
        execSync(`docker save -o ${destination}/mfe.tar micronyks/authapp-prod:1.0.0 micronyks/commonapp-prod:1.0.0 micronyks/dashboardapp-prod:1.0.0 micronyks/headerapp-prod:1.0.0 micronyks/webapp-prod:1.0.0 micronyks/serverapp-prod:1.0.0`)
        console.log('.....................................tar file created !')

    })

}

copyDir(source, destination);







