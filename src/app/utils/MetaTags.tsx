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
      <meta name="author" content="Zimmerman B.V." />

      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={getAppName(currentLanguage)} />
      <meta
        itemProp="image"
        content="https://app.mfa.test.nyuki.io/openaidfi.png"
      />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content="https://app.mfa.test.nyuki.io/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={getAppName(currentLanguage)} />
      <meta property="og:author" content="Zimmerman B.V." />

      <meta
        property="og:description"
        content={getSeoDescription(currentLanguage)}
      />
      <meta
        property="og:image"
        content="https://app.mfa.test.nyuki.io/openaidfi.png"
      />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={getAppName(currentLanguage)} />
      <meta
        name="twitter:description"
        content={getSeoDescription(currentLanguage)}
      />
      <meta name="twitter:author" content="Zimmerman B.V." />

      <meta
        name="twitter:image"
        content="https://app.mfa.test.nyuki.io/openaidfi.png"
      />
    </Tags>
  );
}
