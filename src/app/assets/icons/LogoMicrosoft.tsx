import * as React from "react";

export function LogoMicrosoft(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg width={27} height={27} viewBox="0 0 27 27" fill="none" {...props}>
      <path d="M12.444 12.854H.087V.5h12.357v12.354z" fill="#F1511B" />
      <path d="M26.087 12.854H13.73V.5h12.357v12.354z" fill="#80CC28" />
      <path d="M12.443 26.5H.087V14.146h12.356V26.5z" fill="#00ADEF" />
      <path d="M26.087 26.5H13.73V14.146h12.357V26.5z" fill="#FBBC09" />
    </svg>
  );
}
