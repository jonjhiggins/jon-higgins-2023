import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const SiteMetadataContext = React.createContext({});

export const AppProviders = ({ children }) => {
  const data = useStaticQuery<Queries.SiteMetadataQuery>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);
  return (
    <SiteMetadataContext.Provider value={data?.site?.siteMetadata}>
      {children}
    </SiteMetadataContext.Provider>
  );
};

export function useSiteMetadataContext() {
  return React.useContext(SiteMetadataContext);
}
