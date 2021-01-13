import React from "react";
import { Paper } from "app/components/Paper";

interface CardProps {
  children: React.ReactNode;
  alignItems?: "center" | "";
}

export function Card(props: CardProps) {
  return (
    <Paper>
      <div
        // todo: cleanup
        css={`
          height: 225px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 16px;
        `}
      >
        <div
          // todo: cleanup
          css={`
              display: flex;
              width: 60%;
              flex-direction: column;
              align-items: center; };
            `}
        >
          {props.children}
        </div>
      </div>
    </Paper>
  );
}
