module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
          },
          region: env('AWS_REGION'),
          params: {
            Bucket: env('AWS_BUCKET_NAME'),
          },
        }
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },

  email: {
    config: {
      provider: "amazon-ses",
      providerOptions: {
        region: env('AWS_SES_REGION'),
        credentials: {
          accessKeyId: env('AWS_SES_KEY'),
          secretAccessKey: env('AWS_SES_SECRET'),
        },
      },
      settings: {
        defaultFrom: env("SES_DEFAULT_EMAIL"),
        defaultReplyTo: env("SES_DEFAULT_EMAIL"),
      },
    },
  },
});
