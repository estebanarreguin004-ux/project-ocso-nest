import { Injectable } from '@nestjs/common';
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage"; // Importación necesaria

@Injectable()
export class AwsService {
    private s3 = new S3Client({
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.accessKey_bucket,
            secretAccessKey: process.env.secretKeyBucket
        }
    });

    async uploadFile(file: Express.Multer.File) {
        const bucket = "nest-ocso-test31";

        const key = file.originalname.replace(/\s/g, '-');

        const parallelUpload = new Upload({
            client: this.s3,
            params: {
                Bucket: bucket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            },
        });

        const result = await parallelUpload.done();
        return result.Location;
    }
}
