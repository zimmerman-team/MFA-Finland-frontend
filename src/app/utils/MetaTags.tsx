import React from "react";
// @ts-ignore
import Tags from "react-meta-tags";
import { getSeoDescription } from "app/utils/getSeoDescription";
import { useRecoilState } from "recoil";
import { languageAtom } from "app/state/recoil/atoms";
import { getAppName } from "app/const/Path";

export function MetaTags() {
  const [currentLanguage] = useRecoilState(languageAtom);

  return (
    <Tags>
      <meta name="description" content={getSeoDescription(currentLanguage)} />
      <meta name="author" content="MFA Finland" />

      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={getAppName(currentLanguage)} />
      <meta
        itemProp="image"
        content={`${window.location.origin}/openaidfi.png`}
      />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content={window.location.origin} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={getAppName(currentLanguage)} />
      <meta property="og:author" content="MFA Finland" />

      <meta
        property="og:description"
        content={getSeoDescription(currentLanguage)}
      />
      <meta
        property="og:image"
        content={`${window.location.origin}/openaidfi.png`}
      />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={getAppName(currentLanguage)} />
      <meta
        name="twitter:description"
        content={getSeoDescription(currentLanguage)}
      />
      <meta name="twitter:author" content="MFA Finland" />

      <meta
        name="twitter:image"
        content={`${window.location.origin}/openaidfi.png`}
      />
    </Tags>
  );
}
