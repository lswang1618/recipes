import { graphql } from "gatsby";

export const largeImage = graphql`
    fragment largeImage on File {
        childImageSharp {
            fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
            }
        }
    }
`