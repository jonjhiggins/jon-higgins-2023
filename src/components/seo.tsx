import React from "react";
import { useSiteMetadataContext } from "./app-providers";
import interUI from "~/fonts/inter-ui-regular.woff2";
import interUIBold from "~/fonts/inter-ui-bold.woff2";
import favicon from "~/images/favicon.png";

interface Props {
  description?: string;
  meta?: string[];
  title?: string;
  imageUrl?: string | null;
  pathname: string;
}

function SEO({ description, title, imageUrl, pathname }: Props) {
  const data = useSiteMetadataContext();
  const titleStr = title ? `${title} | ${data.title}` : data.title;
  const metaDescription = description || data.description;
  const canonicalUrl = data.siteUrl + pathname;
  return (
    <>
      <title>{titleStr}</title>
      <html lang="en" />
      <link rel="preload" href={interUI} as="font" type="font/woff2" />
      <link rel="preload" href={interUIBold} as="font" type="font/woff2" />
      <link rel="shortcut icon" type="image/png" href={favicon}></link>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={titleStr} />
      {imageUrl ? (
        <meta property="og:image" content={`${data.siteUrl}${imageUrl}`} />
      ) : null}
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary" />
    </>
  );
}

export default SEO;
