const AWS=require('aws-sdk')
require('dotenv').config();

const uploadToS3=(data,fileName)=>{
    const BUCKET_NAME="exptracking1app"
   
    let s3bucket=new AWS.S3({
        accessKeyId:'AKIAR3MHFYEC2QFC2JZO',
        secretAccessKey:'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'
               
    })
    
        let params={
            Bucket: BUCKET_NAME,
            Key:fileName,
            Body:data,
            ACL:'public-read'

        }
       return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,response)=>{
            if(err){
                reject('something went wrong',err)
            }
            else{
                resolve(response.Location) 

            }
    }) 

       })    
}
module.exports={
    uploadToS3
}




