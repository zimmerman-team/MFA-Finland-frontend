import React from "react";
import Slide from "@material-ui/core/Slide";
import { IconClose } from "app/assets/icons/IconClose";

interface SlideContainerProps {
  vizLevel: number;
  close: () => void;
  selected: string | number | null;
  children: React.ReactNode | React.ReactNode[];
}

export function SlideContainer(props: SlideContainerProps) {
  const [open, setOpen] = React.useState(props.selected !== null);

  React.useEffect(() => {
    const tmp = props.vizLevel === 1 && props.selected !== null;
    if (open !== tmp) {
      setOpen(tmp);
    }
  }, [props.vizLevel, props.selected]);

  return (
    <Slide in={open} mountOnEnter unmountOnExit timeout={500} direction="left">
      <div
        id="zoom-in-level"
        css={`
          top: 0;
          right: 0;
          width: 75%;
          z-index: 2;
          height: 100%;
          display: flex;
          position: absolute;
          justify-content: flex-end;

          @media (max-width: 767px) {
            width: 100%;
          }

          > div {
            width: 100%;
            height: 100%;
            background: #fff;
            margin: 0 !important;
          }
        `}
      >
        <button
          css={`
            top: 15px;
            padding: 0;
            left: -30px;
            height: 24px;
            outline: none;
            cursor: pointer;
            position: absolute;
            border-radius: 5px;
            border-style: none;
            background: #ffffff;

            @media (max-width: 600px) {
              right: 15px;
              left: unset;
            }
          `}
          type="button"
          onClick={props.close}
        >
          <IconClose />
        </button>
        <div>
          {open ? props.children : <div css="width: 100%;height: 100%;" />}
        </div>
      </div>
    </Slide>
  );
}
