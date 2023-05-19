type NonNullable<T> = T extends null | undefined ? never : T;

type NonNullableBlogPostMarkdown = NonNullable<
  Queries.BlogPostQuery["markdownRemark"]
>;
type NonNullableFrontMatter = NonNullable<
  NonNullableBlogPostMarkdown["frontmatter"]
>;
type HeroImages = NonNullableFrontMatter["heroImages"];
type NonNullableHeroImages = NonNullable<HeroImages>;
