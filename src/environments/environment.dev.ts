import aws_exports from '../aws-exports';


export const environment = {
  logging_bypass: false,
  john_doe: { email: 'chrrenoux@yahoo.fr', password: 'Bogomol2024!!', credentials: 'Admin', license: '02439752' },
  dev_mode: true,
  version: 'dev 6.1.0',
  spinner_tempo: 500,
  // BucketName: 'bcstoapp0ee6a242edb74c79a78263aa5cb1473e113936-dev',
  // Region: 'eu-west-3',
  BucketName: aws_exports.aws_user_files_s3_bucket,
  Region: aws_exports.aws_user_files_s3_bucket_region,
  S3filesDirectory: 'confidential/',
  S3articlesDirectory: 'documents/',
  sanitizer_verbose: true,

};


