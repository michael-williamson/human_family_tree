import React from "react";

export const HookWrapper = (props) => {
  const WrappedComponent = props.component;
  return (
    <>
      <WrappedComponent {...props} />
    </>
  );
};
