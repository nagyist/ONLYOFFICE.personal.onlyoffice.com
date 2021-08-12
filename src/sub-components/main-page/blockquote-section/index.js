import React from "react";
import Link from "../../../../components/link";
import Text from "../../../../components/text";
import StyledBlockquote from "./styled-blockquote";

const Blockquote = (props) => {
  const { text } = props;

  return (
    <StyledBlockquote>
      <Text
        className="blockquote-description"
        fontSize="24px"
        color="#333333"
        fontWeight="400"
        lineHeight="160%"
        fontStyle="italic"
      >
        {text}
      </Text>
      <Link
        className="blockquote-link"
        href="https://webapps.softpedia.com/app/OnlyOffice-Personal/"
        type="external"
      >
        Softpedia
      </Link>
    </StyledBlockquote>
  );
};

export default Blockquote;
