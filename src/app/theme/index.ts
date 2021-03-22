// @ts-nocheck

import { createMuiTheme } from "@material-ui/core/styles";
import { Palette } from "@material-ui/core/styles/createPalette";

import {
  FontStyle,
  TypographyOptions,
} from "@material-ui/core/styles/createTypography";

interface Icon {
  black: string;
}

interface ProjectPalette extends Palette {
  icon: Icon;
}

export const TextStyle: FontStyle = {
  fontFamily: '"Finlandica", "Helvetica", "Arial", sans-serif',
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
};
export const ProjectTextStyles = {
  explanation: {
    fontFamily: TextStyle.fontFamily,
    fontSize: `${0.8571428571428571}rem`,
    fontWeight: TextStyle.fontWeightLight,
    letterSpacing: "0.42px",
    color: "#185568",
  },
};

export const PrimaryColor = ["#2E4982", "#F8F8F8", "#FFFFFF", "#4F6797"];
export const SecondaryColor = ["#ECF1FA", "#BCC6D6", "#888888", "#E3E3E3"];

export const ProjectPalette: ProjectPalette = {
  tonalOffset: 0.2,
  background: { paper: "#fff", default: "#fafafa" },
  contrastThreshold: 3,
  grey: {
    "50": "#fafafa",
    "100": "#f5f5f5",
    "200": "#eeeeee",
    "300": "#e0e0e0",
    "400": "#bdbdbd",
    "500": "#9e9e9e",
    "600": "#757575",
    "700": "#616161",
    "800": "#424242",
    "900": "#a1a3a6",
    A700: "#616161",
    A100: "#d5d5d5",
    A400: "#303030",
    A200: "#aaaaaa",
  },
  text: {
    primary: "#2E4982",
    // secondary: '#fff',
    secondary: "#6f7173",
    disabled: "rgba(0, 0, 0, 0.38)",
    hint: "rgba(0, 0, 0, 0.38)",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  primary: {
    main: "#2E4982",
    light: "#2f3b52",
    dark: "rgb(25, 32, 46)",
    contrastText: "#fff",
  },
  secondary: {
    main: "#25baa4",
    light: "rgb(80,199,182)",
    dark: "rgb(25, 130, 114)",
    contrastText: "#ffffff",
  },
  common: { black: "#000", white: "#fff" },
  error: {
    light: "#e57373",
    main: "#f44336",
    dark: "#d32f2f",
    contrastText: "#fff",
  },
  type: "light",
  action: {
    hoverOpacity: 0.08,
    hover: "rgba(0, 0, 0, 0.08)",
    selected: "rgba(0, 0, 0, 0.14)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabled: "rgba(0, 0, 0, 0.26)",
    active: "rgba(0, 0, 0, 0.54)",
  },
};

interface ExtendedTypography extends TypographyOptions {
  accordionSummary: FontStyle;
  accordionDetail: FontStyle;
  body3: FontStyle;
}

export const ProjectTypography: ExtendedTypography = {
  h1: {
    fontFamily: TextStyle.fontFamily,
    fontWeight: TextStyle.fontWeightRegular,
    lineHeight: `1`,
    fontSize: `64px`,
  },
  h2: {
    fontFamily: TextStyle.fontFamily,
    fontWeight: TextStyle.fontWeightRegular,
    lineHeight: `1`,
    fontSize: `48px`,
  },
  h3: {
    fontFamily: TextStyle.fontFamily,
    fontWeight: TextStyle.fontWeightRegular,
    lineHeight: `1`,
    fontSize: `36px`,
  },
  h4: {
    fontFamily: TextStyle.fontFamily,
    fontWeight: TextStyle.fontWeightRegular,
    lineHeight: `1`,
    fontSize: `32px`,
  },
  h5: {
    fontFamily: TextStyle.fontFamily,
    fontWeight: TextStyle.fontWeightBold,
    lineHeight: `1`,
    fontSize: `24px`,
  },
  h6: {
    fontFamily: TextStyle.fontFamily,
    fontWeight: TextStyle.fontWeightBold,
    lineHeight: `1`,
    fontSize: `18px`,
  },
  subtitle1: {
    fontFamily: TextStyle.fontFamily,
    fontWeight: TextStyle.fontWeightBold,
    lineHeight: `1`,
    fontSize: `16px`,
  },
  subtitle2: {
    fontFamily: TextStyle.fontFamily,
    fontWeight: TextStyle.fontWeightBold,
    lineHeight: `1`,
    fontSize: `14px`,
  },
  button: {
    fontFamily: TextStyle.fontFamily,
    fontWeight: TextStyle.fontWeightBold,
    color: ProjectPalette.text.primary,
    textTransform: "uppercase",
    lineHeight: `1`,
    fontSize: `14px`,
  },
  caption: {
    fontFamily: TextStyle.fontFamily,
    fontWeight: TextStyle.fontWeightBold,
    color: ProjectPalette.primary.light,
    lineHeight: `1`,
    fontSize: `${0.6}rem`,
  },
  body1: {
    fontFamily: TextStyle.fontFamily,
    fontWeight: TextStyle.fontWeightRegular,
    color: ProjectPalette.text.primary,
    lineHeight: `1`,
    fontSize: `16px`,
  },
  body2: {
    fontFamily: TextStyle.fontFamily,
    fontWeight: TextStyle.fontWeightRegular,
    color: ProjectPalette.text.primary,
    lineHeight: `1`,
    fontSize: `14px`,
  },
  accordionSummary: {
    color: ProjectPalette.text.primary,
    fontFamily: TextStyle.fontFamily,
    lineHeight: `${1.71429}em`,
    fontSize: `${1}rem`,
    fontWeight: 500,
  },
  accordionDetail: {
    color: ProjectPalette.text.primary,
    fontFamily: TextStyle.fontFamily,
    lineHeight: `${1.71429}em`,
    fontSize: `${14}px`,
    fontWeight: 300,
    letterSpacing: "0.5px",
  },
};

export const Overline1Type = {
  fontFamily: TextStyle.fontFamily,
  fontWeight: TextStyle.fontWeightRegular,
  color: ProjectPalette.text.primary,
  lineHeight: `1`,
  fontSize: `12px`,
};

export const Overline2Type = {
  fontFamily: TextStyle.fontFamily,
  fontWeight: TextStyle.fontWeightRegular,
  color: ProjectPalette.text.primary,
  lineHeight: `1`,
  fontSize: `10px`,
};

export default createMuiTheme({
  overrides: {
    // Name of the component ⚛️
    MuiCssBaseline: {
      // Name of the rule
      "@global": {
        "*, *::before, *::after": {
          // transition: "none !important",
          // animation: "none !important",
        },
      },
    },
    MuiTabs: {
      indicator: {
        height: "4px",
      },
    },
    MuiTab: {
      wrapper: {
        color: ProjectPalette.common.black,
        fontWeight: 600,
        fontSize: "14px",
      },
    },
    MuiCardHeader: {
      root: {
        paddingBottom: 0,
      },
    },
    MuiCard: {
      root: {
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
      },
    },
    MuiAccordion: {
      root: {
        backgroundColor: "#f7f7f7",
        width: "100%",
        marginTop: "16px!important",
        marginBottom: "16px!important",
        // boxShadow: 'initial',
        "&:before": {
          display: "none",
        },

        // note: use this snippet if you want to customize the expanded state of the accordion component
        /* '&$expanded': {
          marginTop: '0!important',
          marginBottom: '0!important',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
        }, */
      },
    },
    MuiDrawer: {
      paperAnchorTop: {
        height: "100vh",
      },
    },
  },
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: { xs: 0, lg: 1440, sm: 600, xl: 1920, md: 960 },
  },
  mixins: {
    toolbar: {
      minHeight: 56,
      "@media (min-width:0px) and (orientation: landscape)": { minHeight: 48 },
      "@media (min-width:600px)": { minHeight: 64 },
    },
  },
  shadows: [
    "none",
    "0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
    "0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    "0px 1px 8px 0px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 3px 3px -2px rgba(0, 0, 0, 0.12)",
    "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    "0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0, 0, 0, 0.12)",
    "0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
    "0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0, 0, 0, 0.12)",
    "0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)",
    "0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0, 0, 0, 0.12)",
    "0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0, 0, 0, 0.12)",
    "0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0, 0, 0, 0.12)",
    "0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0, 0, 0, 0.12)",
    "0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0, 0, 0, 0.12)",
    "0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
  ],
  direction: "ltr",
  /* transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      standard: 300,
      short: 250,
      enteringScreen: 225,
      shorter: 200,
      leavingScreen: 195,
      shortest: 150,
      complex: 375,
    },
  }, */
  typography: ProjectTypography,
  zIndex: {
    modal: 1300,
    snackbar: 1400,
    drawer: 1200,
    appBar: 1100,
    mobileStepper: 1000,
    tooltip: 1500,
  },
  shape: { borderRadius: 4 },
  spacing: 8,
  palette: ProjectPalette,
});
