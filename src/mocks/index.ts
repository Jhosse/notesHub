import { NextRouter } from "next/router";
import { Session } from "next-auth";
import { Document } from "@contentful/rich-text-types";

const USEROUTER_MOCKIMPLEMENTATION: NextRouter = {
  route: "",
  basePath: "",
  pathname: "",
  query: {},
  asPath: "",
  push: async () => true,
  replace: async () => true,
  reload: () => null,
  back: () => null,
  forward: () => null,
  prefetch: async () => undefined,
  beforePopState: () => null,
  isLocaleDomain: false,
  isFallback: false,
  isPreview: false,
  isReady: true,
  locale: undefined,
  domainLocales: undefined,
  defaultLocale: undefined,
  locales: undefined,
  events: {
    on: () => null,
    off: () => null,
    emit: () => null,
  },
};

const SESSION_MOCK: Session = {
  user: {
    name: "test",
    email: "testo@hotmail.com",
    image: "https://avatars.githubusercontent.com/u/1?v=4",
  },
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
};

const DESCRIPTION_MOCK: string = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis tincidunt facilisis. Etiam non massa ut purus ultrices ultrices id vel erat. Donec dolor risus, malesuada eget ligula et, porta finibus mi. Praesent hendrerit egestas nunc eu viverra. Nulla facilisi. Fusce malesuada eleifend ex at sodales. Nullam enim risus, vehicula at vehicula eget, fringilla ac enim. Proin at ex tellus. Sed a accumsan libero, sit amet tempor turpis. Praesent rhoncus augue a laoreet posuere. Pellentesque dapibus posuere porta.

Ut eu leo ex. Ut convallis non nisl vitae lobortis. Sed id congue ex, non varius nulla. Vestibulum placerat diam mollis venenatis sollicitudin. Morbi sem ipsum, fringilla eu risus aliquet, faucibus condimentum felis. Praesent vulputate nulla est, eget egestas tellus aliquet sit amet. Aenean at rhoncus ipsum, in vulputate lectus. Curabitur ac tortor varius, pretium est et, molestie sapien. Cras aliquam sem vel nunc rutrum convallis. Morbi venenatis felis id nunc condimentum, commodo placerat enim tincidunt. Vivamus a finibus tellus. Curabitur id hendrerit magna, at semper ipsum. Aliquam eu mi libero.
`;

const RICH_TEXT_MOCK: Document = JSON.parse(
  `{"nodeType":"document","data":{},"content":[{"nodeType":"heading-1","data":{},"content":[{"nodeType":"text","value":"this is heading 1","marks":[],"data":{}}]},{"nodeType":"heading-2","data":{},"content":[{"nodeType":"text","value":"this is heading 2","marks":[],"data":{}}]},{"nodeType":"heading-3","data":{},"content":[{"nodeType":"text","value":"this is heading 3","marks":[],"data":{}}]},{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"this is normal test","marks":[],"data":{}}]},{"nodeType":"ordered-list","data":{},"content":[{"nodeType":"list-item","data":{},"content":[{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"order list one","marks":[],"data":{}}]}]},{"nodeType":"list-item","data":{},"content":[{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"order list two","marks":[],"data":{}}]}]}]},{"nodeType":"unordered-list","data":{},"content":[{"nodeType":"list-item","data":{},"content":[{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"unorder list one","marks":[],"data":{}}]}]},{"nodeType":"list-item","data":{},"content":[{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"unorder list two","marks":[],"data":{}}]}]}]},{"nodeType":"embedded-asset-block","data":{"target":{"metadata":{"tags":[]},"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"w4dj63bepksa"}},"id":"1ZFEnS8JEVQEPRESa7wO2y","type":"Asset","createdAt":"2023-11-29T12:41:21.537Z","updatedAt":"2023-11-29T12:41:21.537Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"revision":1,"locale":"en-US"},"fields":{"title":"V8 Engine","description":"This is a diagram that represents the v8 engine.","file":{"url":"//images.ctfassets.net/w4dj63bepksa/1ZFEnS8JEVQEPRESa7wO2y/eec6eaf4f986079718a9ed94401ee195/v8-engine.png","details":{"size":317367,"image":{"width":1422,"height":902}},"fileName":"v8-engine.png","contentType":"image/png"}}}},"content":[]},{"nodeType":"paragraph","data":{},"content":[{"nodeType":"text","value":"","marks":[],"data":{}},{"nodeType":"hyperlink","data":{"uri":"https://google.com"},"content":[{"nodeType":"text","value":"test link","marks":[],"data":{}}]},{"nodeType":"text","value":"","marks":[],"data":{}}]}]}`
);

export {
  USEROUTER_MOCKIMPLEMENTATION,
  SESSION_MOCK,
  DESCRIPTION_MOCK,
  RICH_TEXT_MOCK,
};
