module.exports = ({ env }) => {
  if (env("BASE_URL") === undefined) {
    console.log("Please configure BASE_URL environment variable");
  } else {
    console.log("BASE_URL is configured to " + env("BASE_URL"));
  }

  return {
    host: env("HOST", "0.0.0.0"),
    port: env.int("PORT", 1337),
    url: env("BASE_URL", "http://api.domain/strapi"),
    app: {
      keys: env.array("APP_KEYS"),
    },
    webhooks: {
      populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
    },
  };
};
