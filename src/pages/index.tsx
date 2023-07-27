import React from "react";
import PageWrapper from "~/components/page-wrapper";
import HomeAnimation from "~/components/home-animation";
import SEO from "~/components/seo";
import { graphql, useStaticQuery } from "gatsby";

const ThisPage = () => {
  const siteData = useStaticQuery(graphql`
    query HomepageSiteTitleQuery {
      site {
        siteMetadata {
          titleHTML
        }
      }
    }
  `);
  return (
    <PageWrapper>
      <SEO title="Home" />
      <HomeAnimation titleHTML={siteData.site.siteMetadata.titleHTML} />
    </PageWrapper>
  );
};

export default ThisPage;
