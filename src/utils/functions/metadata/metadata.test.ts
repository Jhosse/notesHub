import { getUrlMetadata } from ".";
import { IUrlMetadata } from "../../../@types/custom/utils";

const METADATA_MOCK: IUrlMetadata = {
  ogImage: "image-url",
  ogTitle: "Sample Title",
  ogDescription: "Sample Description",
};

describe("metadata", () => {
  describe("getUrlMetadata", () => {
    let consoleError: any;

    beforeAll(() => {
      consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

      // Mock the cheerio load function to return an object with an 'attr' method
      let cheerioMock: any = jest.fn();
      jest.mock("cheerio", () => cheerioMock);

      cheerioMock.load = jest.fn().mockImplementation(() => {
        return {
          attr: jest.fn().mockImplementation((property) => {
            if (property === "content") {
              return "Sample Content";
            }
            return null;
          }),
        };
      });
    });

    afterAll(() => {
      consoleError.mockReset();
    });

    it("fetches metadata from a URL", async () => {
      const url = "https://example.com";

      global.fetch = jest.fn(() =>
        Promise.resolve({
          text: () =>
            Promise.resolve(`
              <meta property="og:image" content="${METADATA_MOCK.ogImage}" />
              <meta property="og:title" content="${METADATA_MOCK.ogTitle}" />
              <meta property="og:description" content="${METADATA_MOCK.ogDescription}" />
            `),
        } as Response)
      );

      const metadata = await getUrlMetadata(url);

      expect(metadata).toEqual(METADATA_MOCK);
    });

    it("handles errors gracefully", async () => {
      const url = "invalid-url";

      global.fetch = jest.fn(() => Promise.reject(new Error("Network Error")));
      const metadata = await getUrlMetadata(url);
      expect(metadata).toBeNull();

      // Check if console.error was called with the expected message
      // (`Error:` is part of the message from the function console)
      expect(consoleError).toHaveBeenCalled();
      expect(consoleError).toHaveBeenCalledWith(
        "Error:",
        new Error("Network Error")
      );
    });
  });
});
