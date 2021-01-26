/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { ReactNode } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import {
  AccordionContentStyle,
  AccordionHeaderStyle,
  AccordionStyle,
} from "app/components/Accordion/style";
import { useToggle } from "react-use";
import { Anchor } from "app/components/InPageNavigation";

export interface AccordionProps {
  label: string;
  content: string;
  id?: string;
  children?: ReactNode;
}

interface AccordionHeaderProps {
  label?: string;
}

interface AccordionContentProps {
  content?: string;
}

export const AccordionAtom = atom({
  key: "accordionAtom",
  default: false,
});

export const Accordion = (props: AccordionProps) => {
  // todo: refactor to use recoil state
  // const accordionState = useRecoilValue(AccordionAtom);
  const [accordionState, setAccordionState] = useToggle(false);

  return (
    <>
      <Anchor id={props.id} positionRelativeToTop={64} />
      <div css={AccordionStyle(accordionState)}>
        <div
          onClick={() => setAccordionState(!accordionState)}
          css={AccordionHeaderStyle}
        >
          {props.label}
          {accordionState ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
        <div css={AccordionContentStyle}>{props.content}</div>

        {/* <AccordionHeader label={props.label} /> */}
        {/* <AccordionContent content={props.content} /> */}
      </div>
    </>
  );
};
// todo: refactor to use recoil state
// export const AccordionHeader = (props: AccordionHeaderProps) => {
//   const [accordionState, setAccordionState] = useRecoilState(AccordionAtom);
//   return (
//     <div
//       onClick={() => setAccordionState(!accordionState)}
//       css={AccordionHeaderStyle}
//     >
//       {props.label}
//       {accordionState ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//     </div>
//   );
// };

// export const AccordionContent = (props: AccordionContentProps) => {
//   return <div css={AccordionContentStyle}>{props.content}</div>;
// };
