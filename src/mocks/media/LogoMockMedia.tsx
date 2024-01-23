import { Asset } from "contentful";

const LOGO_URL = "/mt-logo.svg";

const LogoMockMedia: Asset = {
  metadata: { tags: [] },
  sys: {
    space: { sys: { type: "Link", linkType: "Space", id: "w4dj63bepksa" } },
    id: "7tzaBotySnHsyYG4jH6rZt",
    type: "Asset",
    createdAt: "2023-01-11T08:21:20.342Z",
    updatedAt: "2023-01-11T08:21:20.342Z",
    environment: {
      sys: { id: "master", type: "Link", linkType: "Environment" },
    },
    revision: 1,
    locale: "en-US",
  },
  fields: {
    title: "Logo",
    description: "This is the logo of the application",
    file: {
      url: LOGO_URL,
      details: { size: 3246, image: { width: 1324, height: 1316 } },
      fileName: "mt-logo.svg",
      contentType: "image/svg+xml",
    },
  }
};
export default LogoMockMedia;
