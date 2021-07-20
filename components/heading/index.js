import React from "react";
import PropTypes from "prop-types";
import StyledHeading from "./styled-heading";

const Heading = ({ hLevel, children, ...rest }) => {
  return (
    <StyledHeading as={`h${hLevel}`} hLevel={hLevel} {...rest}>
      {children}
    </StyledHeading>
  );
};

Heading.propTypes = {
  /** The heading level */
  hLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /**   text color */
  color: PropTypes.string,
  /**   text font-size */
  fontSize: PropTypes.string,
  /**   text font-weight */
  fontWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**   text line height */
  lineHeight: PropTypes.string,
  /**   text-transform*/
  textTransform: PropTypes.string,
  /**  text decoration */
  textDecoration: PropTypes.string,
  /** text align */
  textAlign: PropTypes.string,
  /** Accepts CSS style */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /**   tab index */
  tabIndex: PropTypes.number,
  /** Accepts id */
  id: PropTypes.string,
  /** Accepts class */
  className: PropTypes.string,
};

Heading.defaultProps = {
  hLevel: 1,
  tabIndex: -1,
};

export default Heading;