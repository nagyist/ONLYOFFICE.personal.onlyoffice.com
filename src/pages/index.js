import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../../components/layout";

import CreateSection from "../sub-components/main-page/create-section";
import FooterContent from "../sub-components/footer-content";
import Head from "../sub-components/head";
import HeaderContent from "../sub-components/header-content";
import CarouselSection from "../sub-components/main-page/carousel-section";
import ReviewSection from "../sub-components/main-page/review-section";
import CloudsSection from "../sub-components/main-page/clouds-section";
import BlockquoteSection from "../sub-components/main-page/blockquote-section";

const IndexPage = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <Layout>
      <Layout.PageHead>
        <Head
          metaDescription={t("AuthDocsMetaDescription")}
          metaKeywords={t("AuthDocsMetaKeywords")}
          title={t("AuthDocsTitlePage")}
          metaDescriptionOg={t("MetaDescriptionOg")}
        />
      </Layout.PageHead>
      <Layout.PageHeader>
        <HeaderContent
          t={t}
          language={language}
          href="sign-in"
          labelButton={t("AuthDocsLogIn")}
        />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <CreateSection t={t} />
        <CarouselSection t={t} language={language} />
        <CloudsSection textHeading={t("AuthDocsConnect")} />
        <BlockquoteSection text={t("SoftpediaDescription")} />
        <ReviewSection t={t} />
      </Layout.SectionMain>
      <Layout.PageFooter isHomePage>
        <FooterContent t={t} isHomePage />
      </Layout.PageFooter>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { in: [$language, "en"] } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
