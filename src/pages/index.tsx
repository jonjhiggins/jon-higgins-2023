import React from "react";
import PageWrapper from "~/components/page-wrapper";
import HomeAnimation from "~/components/home-animation";
import SEO from "~/components/seo";
import { HeadProps, graphql, useStaticQuery } from "gatsby";

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
      <HomeAnimation titleHTML={siteData.site.siteMetadata.titleHTML} />
    </PageWrapper>
  );
};

export function Head({ location }: HeadProps) {
  return <SEO pathname={location.pathname} />;
}

export default ThisPage;
