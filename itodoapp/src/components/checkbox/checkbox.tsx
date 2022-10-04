/** @format */

import React from "react";

interface Props {
  isChecked?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: Props) => {
  return (
    <div style={{ flex: 1, justifyContent: "center", display: "flex" }}>
      <input type="checkbox" checked={props.isChecked} onChange={props.handleChange} />
    </div>
  );
};
export default Checkbox;
