import React from "react";
import Button from "../../button";

const FormButton = (props) => {
  const { item } = props;
  const { callback, label, isSubmit, toHideButton, typeButton } = item;

  let classNameItem = "form-button";

  if (toHideButton) {
    classNameItem = classNameItem + " to-hide-button";
  }

  return (
    <Button
      className={classNameItem}
      onClick={callback}
      isSubmit={isSubmit}
      label={label}
      typeButton={typeButton}
    />
  );
};

export default FormButton;
