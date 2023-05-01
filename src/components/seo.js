/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title, home, recipe, finalImageURL }) {
  const { site, logo } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        logo: file(relativePath: { eq: "logo2.png" }) {
            publicURL
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const logoImgSD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "http://www.88chinesedishes.org"
  }

  const recipeSD = recipe ? {
    "@context": "https://schema.org/",
      "@type": "Recipe",
      "name": recipe.recipeName,
      "image": [
        finalImageURL
      ],
      "author": {
        "@type": "Organization",
        "name": "88 Chinese Dishes"
      },
      // "datePublished": "2018-03-10",
      "description": recipe.description,
      // "prepTime": "PT20M",
      // "cookTime": "PT30M",
      // "totalTime": "PT50M",
      "keywords": recipe.description,
      // "recipeYield": "10",
      "recipeCuisine": "Chinese",
      // "aggregateRating": {
      //   "@type": "AggregateRating",
      //   "ratingValue": "5",
      //   "ratingCount": "18"
      // },
  } : null

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      {home && <script type="application/ld+json">{JSON.stringify(logoImgSD)}</script>}
      {recipe && <script type="application/ld+json">{JSON.stringify(recipeSD)}</script>}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
