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

function SEO({ description, lang, meta, title, home }) {
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
        logo: file(relativePath: { eq: "af.png" }) {
            publicURL
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const logoImgSD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "http://www.almostfun.org",
    // "logo": "http://www.almostfun.org" + logo.publicURL
  }

  const appSD = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Almost Fun SAT",
    "operatingSystem": "iOS",
    "applicationCategory": "https://schema.org/EducationalApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.6",
      "ratingCount": "19"
    },
    "offers": {
      "@type": "Offer",
      "price": "0"
    }
  }

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
      {home && <script type="application/ld+json">{JSON.stringify(appSD)}</script>}
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
