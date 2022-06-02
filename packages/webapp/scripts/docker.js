var fs = require("fs-extra");
const path = require("path");

const AdmZip = require('adm-zip');

const { execSync } = require('child_process');

var source = '../../packages/docker/docker-compose.yml';
// var destination = `../../../docker-images/${formatDate(new Date())}_${formatTime(new Date())}`;

var destination = `./dist-docker-images/${formatDate(new Date())}_${formatTime(new Date())}`;

const newYMLFilePath = destination + '/docker-compose.yml'

const clearFolder = `./dist-docker-images/`

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

function emptyDir(dirPath) {
    const dirContents = fs.readdirSync(dirPath); // List dir content
  
    for (const fileOrDirPath of dirContents) {
      try {
        // Get Full path
        const fullPath = path.join(dirPath, fileOrDirPath);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          // It's a sub directory
          if (fs.readdirSync(fullPath).length) emptyDir(fullPath);
          // If the dir is not empty then remove it's contents too(recursively)
          fs.rmdirSync(fullPath);
        } else fs.unlinkSync(fullPath); // It's a file
      } catch (ex) {
        console.error(ex.message);
      }
    }
  }

  emptyDir(clearFolder);


console.log('....................................create docker images first....................................')
execSync(`cd ../webapp/ && cd ../../ && docker-compose -f docker-compose-create-mfe.yml up -d `)
console.log(`.....................................docker images are created. Check with 'docker image ls' command....................................`)


async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: false });

    fs.copyFile(src, newYMLFilePath, (err) => {
        if (err) throw err;
        console.log('.....................................File copied....................................');

        console.log('.....................................Creating .tar file....................................')
        execSync(`docker save -o ${destination}/mfe.tar micronyks/serverapp-prod:1.0.0`)
        console.log('.....................................tar file created....................................')

        console.log('.....................................Creating .zip file....................................');
        zipFile();

    })

}

async function zipFile(){
  try{

    const zip  = new AdmZip();
    const outputDir = destination + '.zip'; // this is the path where zip will be created
    zip.addLocalFolder(destination);
    zip.writeZip(outputDir);
    console.log('..................................... .zip file created !....................................');
  }catch(e){
      console.log(`something went wrong while zipping the tar file ${e}`);
  }
}

copyDir(source, destination);







