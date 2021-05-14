import React from "react";
import Flag from "react-world-flags";
import { Grid, Typography } from "@material-ui/core";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { useCMSData } from "app/hooks/useCMSData";
import get from "lodash/get";

interface ModuleHeaderProps {
  label: string;
  flagCode?: string;
  countryData?: any;
  crumbs: BreadcrumbLinkModel[];
}

export const DetailModuleHeader = (props: ModuleHeaderProps) => {
  const cmsData = useCMSData({ returnData: true });

  function isPartneredCountry(): boolean {
    const countries = get(cmsData, "regions.partnered_countries", {});
    const country = countries.find((item: any) => {
      return item.code === props.flagCode;
    });

    return country.isPartner;
  }

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Breadcrumbs route={props.crumbs} />
      </Grid>
      <Grid item xs={12} css="display: flex;justify-content: space-between;">
        <div
          css={`
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          <Typography
            variant="h5"
            css={`
              color: #2e4982;
            `}
          >
            {props.label}
          </Typography>
          {props.flagCode && (
            <Flag code={props.flagCode} height={30} css="margin-left: 10px;" />
          )}
        </div>
        {props.countryData && (
          <div
            css={`
              display: flex;
              flex-direction: row;
              align-items: center;

              > div {
                margin-right: 35px;

                > span {
                  position: relative;
                  &:before {
                    top: 5px;
                    left: -15px;
                    content: "";
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    position: absolute;
                    background: #2e4982;
                  }
                }
              }
            `}
          >
            <div>
              <span>Region: </span>
              <b>{props.countryData.region}</b>
            </div>
            <div>
              <span>Partner Country: </span>
              <b>{isPartneredCountry() ? "Yes" : "No"}</b>
            </div>
          </div>
        )}
      </Grid>
    </React.Fragment>
  );
};
