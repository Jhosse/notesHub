import { ISocialIconEntryFields } from "../../@types/generated/contentful";

const ICON_URL = "https://picsum.photos/32/32";

const GitHubMockMedia: ISocialIconEntryFields = {
  title: "Github",
  url: "https://github.com/",
  icon: {
    metadata: { tags: [] },
    sys: {
      space: { sys: { type: "Link", linkType: "Space", id: "12345" } },
      id: "123456",
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
      title: "Github Icon",
      description: "This is the Github svg icon",
      file: {
        url: ICON_URL,
        details: { size: 305, image: { width: 32, height: 32 } },
        fileName: "github.svg",
        contentType: "image/svg+xml",
      },
    },
  },
};

export default GitHubMockMedia;
