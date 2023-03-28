module.exports = ({ env }) => {
  if (env("BASE_URL") === undefined) {
    console.log("Please configure BASE_URL environment variable");
  } else {
    console.log("Admin BASE_URL is configured to " + env("BASE_URL"));
  }

  const finalUrl = `${env("BASE_URL", "http://api.domain/strapi")}/admin`;

  console.log("Admin Final BASE_URL -----", finalUrl);

  return {
    url: finalUrl,
    auth: {
      secret: env("ADMIN_JWT_SECRET"),
    },
    apiToken: {
      salt: env("API_TOKEN_SALT"),
    },
    transfer: {
      token: {
        salt: env("TRANSFER_TOKEN_SALT"),
      },
    },
  };
};
