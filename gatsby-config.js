module.exports = {
    siteMetadata: {
      title: `Recipes`,
      description: `Delicious, easy, and simple Chinese cooking.`,
      author: ``,
      siteUrl: `https://main.dulnqs24msz0g.amplifyapp.com/`
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `images`,
              path: `${__dirname}/src/images`,
            },
        },
        {
          resolve: "gatsby-source-filesystem",
          options: {
            name: `fonts`,
            path: `${__dirname}/src/fonts`
         },
        },
        `gatsby-transformer-sharp`, 
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-source-contentful`,
            options: {
              spaceId: `yu3ibkoph9hr`,
              accessToken: "pg9L-Gwa9oGeYLIbRfjo9egc2m5a7IrkS2uwAiIVq8o",
              downloadLocal: true,
            },
        },
        {
          resolve: `gatsby-plugin-manifest`,
          options: {
            icon: `src/images/logo2.png`, // This path is relative to the root of the site.
          },
        },
        {
          resolve: `gatsby-plugin-google-analytics`,
          options: {
            trackingId: "G-TE37X01FGF",
            head: true,
          },
        },
    ]
}