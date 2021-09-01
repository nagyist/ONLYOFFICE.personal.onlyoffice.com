import React, { useState, useEffect } from "react";
import { graphql, navigate } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../../../components/layout";
import FooterContent from "../../sub-components/footer-content";
import HeaderContent from "../../sub-components/header-content";
import Head from "../../sub-components/head";
import StyledSection from "../../sub-components/section";
import FormDescription from "../../sub-components/form-description";
import Form from "../../../components/form";
import toastr from "../../../components/toast/toastr";

import { getSettings, createUser, login, logout } from "../../api";
import {
  parseQueryParams,
  createPasswordHash,
  getConfirmHeader,
  checkingConfirmLink,
} from "../../helpers";

const EmpInvitePage = ({ location }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isPwdValid, setIsPwdValid] = useState(true);
  const [hashSettings, setHashSettings] = useState();

  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [firstNameIsSuccess, setFirstNameIsSuccess] = useState(false);
  const [lastNameIsSuccess, setLastNameIsSuccess] = useState(false);

  const [isEmptyFirstName, setIsEmptyFirstName] = useState(null);
  const [isEmptyLastName, setIsEmptyLastName] = useState(null);
  const [isEmptyPassword, setIsEmptyPassword] = useState(null);

  useEffect(() => {
    getSettings()
      .then((res) => {
        setHashSettings(res.passwordHash);
      })
      .catch((e) => console.error(e));
  }, []);

  const {
    t,
    i18n: { language },
  } = useTranslation();

  useEffect(() => {
    checkingConfirmLink(location, t).then((res) => {
      if (!res.isValidLink) {
        navigate("/", {
          state: {
            toastr: {
              error: true,
              text: res.errorValidationLink || t("UnknownError"),
            },
          },
        });
      }
    });
  }, []);

  const onChangeFirstName = (e) => {
    if (!firstNameValid) setFirstNameValid(true);
    setFirstName(e.target.value);
    setIsEmptyFirstName(false);
  };

  const onChangeLastName = (e) => {
    if (!lastNameValid) setLastNameValid(true);
    setLastName(e.target.value);
    setIsEmptyLastName(false);
  };

  const onPasswordChange = (e, isValid) => {
    setPassword(e.target.value);
    setIsPwdValid(isValid);
    setIsEmptyPassword(false);
  };

  const createConfirmUser = async (registerData, loginData, key) => {
    const data = Object.assign(
      { fromInviteLink: true },
      registerData,
      loginData
    );

    const user = await createUser(data, key);

    console.log("Created user", user);

    const { userName, passwordHash } = loginData;

    const response = await login(userName, passwordHash);

    console.log("Login", response);

    return user;
  };

  const firstNameOnBlurHandler = () => {
    if (!!firstName.trim()) {
      setFirstNameIsSuccess(true);
    } else {
      setFirstNameIsSuccess(false);
    }
  };

  const lastNameOnBlurHandler = () => {
    if (!!lastName.trim()) {
      setLastNameIsSuccess(true);
    } else {
      setLastNameIsSuccess(false);
    }
  };

  const onSubmitHandler = () => {
    let hasError = false;

    if (!firstName.trim()) {
      hasError = true;
      setFirstNameValid(false);
      setIsEmptyFirstName(true);
    }

    if (!lastName.trim()) {
      hasError = true;
      setLastNameValid(false);
      setIsEmptyLastName(true);
    }

    if (!password.trim()) {
      hasError = true;
      setIsPwdValid(false);
      setIsEmptyPassword(true);
    }

    if (hasError) {
      return false;
    }

    const params = parseQueryParams(location.search);
    const confirmHeader = getConfirmHeader(location);
    const hash = createPasswordHash(password, hashSettings);

    const loginData = {
      userName: params.email,
      passwordHash: hash,
    };

    const personalData = {
      firstname: firstName,
      lastname: lastName,
      email: params.email,
    };
    logout();

    createConfirmUser(personalData, loginData, confirmHeader)
      .then(() => window.location.replace("/"))
      .catch((error) => {
        toastr.error(`${error}`);
      });
  };

  const formData = [
    { type: "heading", headingText: t("Join"), isHeader: true },
    {
      type: "other",
      element: (
        <FormDescription
          key="create-account"
          label={t("ConfirmJoinDescription")}
        />
      ),
    },
    {
      type: "input",
      inputType: "text",
      placeholder: t("FirstName"),
      callback: onChangeFirstName,
      value: firstName,
      tabIndexProp: 1,
      autoComplete: "given-name",
      isError: !firstNameValid,
      onBlur: firstNameOnBlurHandler,
      isSuccess: firstNameIsSuccess,
      errorText: isEmptyFirstName ? t("AuthErrorIndicationText") : null,
    },
    {
      type: "input",
      inputType: "text",
      placeholder: t("LastName"),
      callback: onChangeLastName,
      value: lastName,
      tabIndexProp: 2,
      autoComplete: "family-name",
      isError: !lastNameValid,
      onBlur: lastNameOnBlurHandler,
      isSuccess: lastNameIsSuccess,
      errorText: isEmptyLastName ? t("AuthErrorIndicationText") : null,
    },
    {
      type: "input",
      inputType: "password",
      placeholder: t("Password"),
      callback: onPasswordChange,
      value: password,
      autoComplete: "new-password",
      tabIndexProp: 3,
      isError: !isPwdValid,
      errorText: isEmptyPassword ? t("AuthErrorIndicationText") : null,
    },
    {
      type: "button",
      callback: onSubmitHandler,
      isSubmit: true,
      typeButton: "primary",
      label: t("Join"),
      tabIndexProp: 4,
    },
  ];

  return (
    <Layout t={t}>
      <Layout.PageHead>
        <Head
          metaDescription={t("AuthDocsMetaDescription")}
          metaKeywords={t("AuthDocsMetaKeywords")}
          title={t("AuthDocsTitlePage")}
          metaDescriptionOg={t("MetaDescriptionOg")}
        />
      </Layout.PageHead>
      <Layout.PageHeader>
        <HeaderContent t={t} language={language} withoutButton />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <StyledSection>
          <Form formData={formData} className="login-form" />
        </StyledSection>
      </Layout.SectionMain>
      <Layout.PageFooter>
        <FooterContent t={t} />
      </Layout.PageFooter>
    </Layout>
  );
};

export default EmpInvitePage;

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
