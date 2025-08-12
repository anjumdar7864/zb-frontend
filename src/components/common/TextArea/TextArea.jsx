import React from "react";
import { Textarea } from "./styles";

const StyledTextarea = ({ value, onChange, ...rest }) => {
  return <Textarea value={value} onChange={onChange} {...rest} />;
};

export default StyledTextarea;