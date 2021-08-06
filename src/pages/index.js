import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../../components/layout";
import Button from "../../components/button";

import CreateSection from "../sub-components/create-section";
import FooterContent from "../sub-components/footer-content";
import Head from "../sub-components/head";
import HeaderContent from "../sub-components/header-content";
import Toast from "../../components/toast";
import toastr from "../../components/toast/toastr";

const IndexPage = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  console.log(useTranslation());

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
        <Toast/>
      </Layout.PageHeader>
      <Layout.SectionMain>
        <Button
          label="go toast!"
          onClick = {() => toastr.success(t("MetaDescriptionOg"))}
        ></Button>
      </Layout.SectionMain>
      <Layout.PageFooter>
        <FooterContent footerHomePage={true} t={t} />
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
