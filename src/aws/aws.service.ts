import { Injectable } from '@nestjs/common';
import * as AWS from "@aws-sdk/client-s3";

@Injectable()
export class AwsService {
    private s3 = new AWS.S3Client({
        region:"us-east-2",
        credentials: {
            accessKeyId: process.env.accessKey_bucket,
            secretAccessKey: process.env.secretKeyBucket
        }
    });

    async uploadFile(file: Express.Multer.File) {
        const key = file.originalname
        const url = `https://nest-ocso-test31.s3.us-east-2.amazonaws.com/${key}`
        const bucket = "nest-ocso-test31"
        //https://nest-ocso-test31.s3.us-east-2.amazonaws.com/foto2.jpeg
        const command =new AWS.PutObjectCommand({
            Key: key,
            Body: file.buffer,
            "Bucket": bucket

        })

        await this.s3.send(command);
        return url;
        

    }
}
