const { execSync } = require('child_process');

console.log('..............................loading tar file..............................');
execSync(`docker load < mfe.tar`)
console.log('..............................images are loaded from tar file..............................')


console.log('..............................spinning up the containers..............................')
execSync(`docker-compose -f docker-compose-run-mfe.yml up -d`)
console.log('..............................containers are up & running..............................')


