import * as React from "react";

export function IconBackToTop(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg width={48} height={48} viewBox="0 0 48 48" fill="none" {...props}>
      <circle cx="24" cy="24" r="24" fill="#F8F8F8" />
      <path
        d="M16.12 30.1201L24 22.2401L31.88 30.1201L34 28.0001L24 18.0001L14 28.0001L16.12 30.1201Z"
        fill="#013B82"
      />
    </svg>
  );
}
