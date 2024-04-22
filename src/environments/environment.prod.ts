import aws_exports from '../aws-exports';

export const environment = {
  logging_bypass: false,
  john_doe: { email: '', password: '', credentials: '', license: '' },
  dev_mode: false,
  version: 'P.6.3.0',
  spinner_tempo: 0,
  BucketName: aws_exports.aws_user_files_s3_bucket,
  Region: aws_exports.aws_user_files_s3_bucket_region,
  S3filesDirectory: 'confidential/',
  S3articlesDirectory: 'documents/',
  sanitizer_verbose: false,

};


