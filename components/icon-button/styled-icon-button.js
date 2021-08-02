import { styled } from "linaria/react";
import Base from "../themes/base";

const StyledIconButton = styled.div`
  width: ${(props) =>
    props.size
      ? Math.abs(parseInt(props.size)) + "px"
      : props.theme.iconButton.width};
  cursor: ${(props) =>
    props.isDisabled || !props.isClickable ? "default" : "pointer"};
  line-height: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background: ${(props) => props.background || "none"};

  &:active .user-click-color {
    path {
      fill: ${(props) => props.clickColor} !important;
    }
  }

  &:hover:not(:active) {
    cursor: ${(props) =>
      !props.isDisabled || props.isClickable ? "pointer" : "default"};
    .user-hover-color {
      path {
        fill: ${(props) => props.hoverColor} !important;
      }
    }
  }

  .user-color {
    path {
      fill: ${(props) => props.color} !important;
    }
  }

  filter: ${(props) => (props.grayed ? "grayscale(1)" : "grayscale(0)")};
  &:hover {
    filter: ${(props) => (props.grayed ? "grayscale(0)" : "none")};
  }
`;

StyledIconButton.defaultProps = { theme: Base };

export default StyledIconButton;
