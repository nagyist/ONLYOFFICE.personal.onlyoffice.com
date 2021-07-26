import React from "react";
import Checkbox from "../../checkbox";

const FormCheckbox = (props) => {
  const { item } = props;
  const { callback, isChecked, label } = item;

  return (
    <Checkbox
      className="form-checkbox"
      onChange={callback}
      isChecked={isChecked}
      label={label}
    />
  );
};

export default FormCheckbox;
