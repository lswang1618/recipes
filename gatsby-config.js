module.exports = {
    siteMetadata: {
      title: `Recipes`,
      description: `Delicious, easy, and simple Chinese cooking.`,
      author: ``,
      siteUrl: `http://www.almostfun.org`
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `images`,
              path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`, 
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-source-contentful`,
            options: {
              spaceId: `yu3ibkoph9hr`,
              // Learn about environment variables: https://gatsby.dev/env-vars
              accessToken: "pg9L-Gwa9oGeYLIbRfjo9egc2m5a7IrkS2uwAiIVq8o",
              downloadLocal: true,
            },
        },
    ]
}