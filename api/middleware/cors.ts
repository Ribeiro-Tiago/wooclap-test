import corsConfig from "restify-cors-middleware";

export default corsConfig({
  origins: ["http://localhost:3000"],
  allowHeaders: ["*"],
  exposeHeaders: ["*"],
});
