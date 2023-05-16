import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config()

export default class AwsS3Service {

  private S3_ACCESSKEYID = '';
  private S3_SECRETACCESSKEY = '';
  private S3_BUCKET = '';

  constructor() {
    const {
      S3_ACCESSKEYID = '',
      S3_SECRETACCESSKEY = '',
      S3_BUCKET = ''
    } = process.env;

    this.S3_ACCESSKEYID = S3_ACCESSKEYID;
    this.S3_SECRETACCESSKEY = S3_SECRETACCESSKEY;
    this.S3_BUCKET = S3_BUCKET;
  }

  async saveFile(name: string, filePath: string, destination: string, extraOptions: object = {}) {
    const s3 = new AWS.S3({
      accessKeyId: this.S3_ACCESSKEYID,
      secretAccessKey: this.S3_SECRETACCESSKEY,
    });

    const params = {
      Bucket: `${this.S3_BUCKET}/${destination}`,
      Key: name,
      Body: fs.readFileSync(filePath),
      ...extraOptions
    };

    const { Location } = await s3.upload(params).promise();
    return Location
  }

  async listObjects() {
    const s3 = new AWS.S3({
      accessKeyId: this.S3_ACCESSKEYID,
      secretAccessKey: this.S3_SECRETACCESSKEY,
    });

    const { Contents } = await s3.listObjects({ Bucket: this.S3_BUCKET }).promise();
    return Contents
  }

  async putObject(object: string, extraParams: object = {}) {
    const s3 = new AWS.S3({
      accessKeyId: this.S3_ACCESSKEYID,
      secretAccessKey: this.S3_SECRETACCESSKEY,
    });

    var params = {
      Bucket: this.S3_BUCKET,
      Key: object,
      ...extraParams
    };

    return s3.putObject(params).promise();
  }

}