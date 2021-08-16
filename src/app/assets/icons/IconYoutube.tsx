import * as React from "react";

export function IconYoutube(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg width={38} height={38} viewBox="0 0 38 38" fill="none" {...props}>
      <mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={38}
        height={38}
      >
        <circle cx={19} cy={19} r={19} fill="#F8F8F8" />
      </mask>
      <g mask="url(#a)">
        <path fill="url(#pattern0)" d="M-2 -3H40V42H-2z" />
      </g>
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use
            xlinkHref="#image0"
            transform="matrix(.00467 0 0 .00436 0 -.01)"
          />
        </pattern>
        <image
          id="image0"
          width={214}
          height={234}
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}