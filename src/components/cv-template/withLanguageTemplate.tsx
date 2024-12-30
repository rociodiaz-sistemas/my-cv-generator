import React from "react";
import CVTemplateSpanish from "./CVTemplateSpanish";
import CVTemplate from "./CVTemplate";

// Higher-Order Component (HOC) to inject the correct template
function withLanguageSwitch(WrappedComponent: React.ComponentType<any>) {
  return function WithLanguageSwitch(props: any) {
    const { selectedCV, ...restProps } = props;

    // Use the isSpanish flag from selectedCV to decide which template to use
    const isSpanish = selectedCV?.isSpanish;

    // Choose the correct template based on the isSpanish flag
    const TemplateComponent = isSpanish ? CVTemplateSpanish : CVTemplate;

    // Pass TemplateComponent to the wrapped component
    return (
      <WrappedComponent
        {...restProps}
        selectedCV={selectedCV}
        TemplateComponent={TemplateComponent} // Pass it as a prop
      />
    );
  };
}

export default withLanguageSwitch;
