import React from "react";
// @ts-ignore
import { MapInteractionCSS } from "react-map-interaction";

export interface TransitionContainerProps {
  vizScale: number;
  vizLevel: number;
  children: React.ReactNode;
  vizTranslation: { x: number; y: number };
}

export function TransitionContainer(props: TransitionContainerProps) {
  return (
    <div
      css={`
        > div:first-of-type {
          z-index: 2;
          > div {
            cursor: default !important;
            > div {
              display: flex !important;
              transition: transform 0.5s ease !important;
            }
          }
        }
        svg {
          z-index: 2;
        }
      `}
    >
      <MapInteractionCSS
        disablePan
        disableZoom
        value={{
          scale: props.vizScale,
          translation: props.vizTranslation,
        }}
      >
        {props.children}
      </MapInteractionCSS>
      <div
        css={`
          top: 0;
          right: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          display: flex;
          position: absolute;
          transition: background 0.5s ease-in-out;
          background: rgba(0, 0, 0, ${props.vizLevel === 1 ? 0.6 : 0});
        `}
      />
    </div>
  );
}
