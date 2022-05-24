const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId:'AKIATSLJ5PV3D6U4VBAB',
    secretAccessKey:'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',
    region:'ap-south-1'

});

const S3 = new AWS.S3();

module.exports = {
    getFileFromS3:()=>{
        return new Promise((resolve, reject)=>{
            try{
                const bucketName = 'micronyks-mfe';
                const objectKey ='mock/i.json';
                S3.getObject({
                    Bucket: bucketName,
                    Key: objectKey
                }, (err, data)=>{
                    if(err){
                        reject(err)
                    }else{
                        
                        console.log('Unparsed fetched object data', JSON.parse(data.Body.toString('utf-8')));
                        resolve(JSON.parse(data.Body.toString('utf-8')));
                    }
                });
            }catch(e){
                reject(e);
            }
        });
    }
};