import { ISocialIconEntryFields } from "../../@types/generated/contentful";

const ICON_URL = "https://picsum.photos/32/32";

const LinkedInMockMedia: ISocialIconEntryFields = {
  title: "LinkedIn",
  url: "https://www.linkedin.com/in/joseterrones/",
  icon: {
    metadata: { tags: [] },
    sys: {
      space: { sys: { type: "Link", linkType: "Space", id: "56789" } },
      id: "567890",
      type: "Asset",
      createdAt: "2023-02-08T10:38:29.592Z",
      updatedAt: "2023-02-08T10:38:29.592Z",
      environment: {
        sys: { id: "master", type: "Link", linkType: "Environment" },
      },
      revision: 1,
      locale: "en-US",
    },
    fields: {
      title: "LinkedIn Icon",
      description: "This is the LinkedIn svg icon",
      file: {
        url: ICON_URL,
        details: { size: 305, image: { width: 32, height: 32 } },
        fileName: "linkedin.svg",
        contentType: "image/svg+xml",
      },
    },
  },
};

export default LinkedInMockMedia;
