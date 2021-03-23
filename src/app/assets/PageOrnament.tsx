import * as React from "react";
import { useLocation, matchPath } from "react-router-dom";

export function PageOrnament(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  const location = useLocation();
  const [shouldRender, setShouldRender] = React.useState(true);
  const nonRenderLocations = ["/viz/projects", "/project/:id"];

  React.useEffect(() => {
    if (location.pathname) {
      const render = nonRenderLocations.some((loc) => {
        return matchPath(location.pathname, {
          path: loc,
          exact: true,
          strict: true,
        });
      });
      setShouldRender(!render);
    }
  }, [location]);

  return (
    <div
      id="page-ornament"
      css={`
        position: fixed;
        right: 0;
        bottom: -10px;
        z-index: 0;
        display: ${shouldRender ? "initial" : "none"};
      `}
    >
      <svg
        width={552}
        height={491}
        viewBox="0 0 552 491"
        fill="none"
        {...props}
      >
        <g opacity={0.2}>
          <circle cx={337.5} cy={337.5} r={337.5} fill="#ECF1FA" />
          <mask
            id="a"
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={675}
            height={675}
          >
            <circle cx={337.5} cy={337.5} r={337.5} fill="#ECF1FA" />
          </mask>
          <g mask="url(#a)">
            <g
              style={{
                mixBlendMode: "multiply",
              }}
            >
              <ellipse
                cx={458.738}
                cy={334.877}
                rx={214.861}
                ry={251.697}
                fill="#E7C3CD"
              />
              <ellipse
                cx={475.924}
                cy={334.88}
                rx={182.775}
                ry={211.835}
                fill="#DFB0BD"
              />
              <ellipse
                cx={489.102}
                cy={335.45}
                rx={147.825}
                ry={164.571}
                fill="#D495A7"
              />
              <ellipse
                cx={499.985}
                cy={337.16}
                rx={101.415}
                ry={113.89}
                fill="#C57289"
              />
              <ellipse
                cx={510.87}
                cy={334.881}
                rx={52.7127}
                ry={60.3616}
                fill="#AE4764"
              />
            </g>
            <g
              style={{
                mixBlendMode: "multiply",
              }}
            >
              <ellipse
                rx={126.401}
                ry={146.64}
                transform="matrix(.89031 -.45535 .4598 .88802 277.462 525.276)"
                fill="#F2FAFE"
              />
              <ellipse
                opacity={0.8}
                rx={105.944}
                ry={122.908}
                transform="matrix(.89031 -.45535 .4598 .88802 278.453 529.089)"
                fill="#D2DEE4"
              />
              <ellipse
                rx={80.0968}
                ry={91.5978}
                transform="matrix(.89031 -.45535 .4598 .88802 271.157 530.138)"
                fill="#B0C4CD"
              />
              <ellipse
                rx={51.6937}
                ry={59.2888}
                transform="matrix(.89031 -.45535 .4598 .88802 271.88 529.13)"
                fill="#99B1BC"
              />
            </g>
            <g
              style={{
                mixBlendMode: "multiply",
              }}
            >
              <ellipse
                opacity={0.7}
                cx={294.335}
                cy={215.754}
                rx={208.085}
                ry={208.254}
                fill="#BFCCC2"
              />
              <ellipse
                cx={298.158}
                cy={210.916}
                rx={182.802}
                ry={183.169}
                fill="#AABCAE"
              />
              <ellipse
                cx={293.664}
                cy={207.448}
                rx={138.35}
                ry={137.998}
                fill="#8EA593"
              />
              <ellipse
                cx={290.164}
                cy={206.447}
                rx={89.9025}
                ry={89.351}
                fill="#6A8570"
              />
              <ellipse
                cx={289.667}
                cy={201.982}
                rx={37.4594}
                ry={37.2296}
                fill="#425346"
              />
            </g>
            <g
              style={{
                mixBlendMode: "multiply",
              }}
            >
              <ellipse
                rx={110.391}
                ry={146.473}
                transform="rotate(-4.302 4953.032 -1332.223) skewX(.128)"
                fill="#F3DBCF"
              />
              <ellipse
                rx={93.1413}
                ry={123.585}
                transform="rotate(-4.34 4855.843 -1250.336) skewX(.054)"
                fill="#EFCFBF"
              />
              <ellipse
                rx={68.1272}
                ry={89.4338}
                transform="rotate(-4.34 4869.365 -1040.475) skewX(.054)"
                fill="#EABFAA"
              />
              <ellipse
                rx={42.6357}
                ry={51.8824}
                transform="rotate(-4.34 4865.042 -946.306) skewX(.054)"
                fill="#E3AA8E"
              />
              <ellipse
                rx={12.1751}
                ry={16.2334}
                transform="rotate(-4.34 4872.314 -821.728) skewX(.054)"
                fill="#DA8E68"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
