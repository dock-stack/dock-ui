import { css } from "@emotion/react";
import { ComponentProps } from "./types";

/** todo: css in  */
export const Component = (props: ComponentProps) => {
  return (
    <div
      css={css`
        color: #646cff;
      `}
    >
      Hello {props.name}!
    </div>
  );
};
