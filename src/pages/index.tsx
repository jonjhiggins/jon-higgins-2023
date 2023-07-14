import React from "react";
import PageWrapper from "~/components/page-wrapper";
import HomeAnimation from "~/components/home-animation";
import SEO from "~/components/seo";

const ThisPage = () => {
  return (
    <PageWrapper>
      <SEO title="Home" />
      <HomeAnimation />
    </PageWrapper>
  );
};

export default ThisPage;
