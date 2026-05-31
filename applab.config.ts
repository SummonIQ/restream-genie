export default {
  name: "restream-genie",
  description: "AppLab managed project",
  type: "unknown",
  apps: [
    {
      build: {
        command: "bun build"
      },
      dependencies: [],
      description: "restream-genie desktop application",
      dev: {
        command: "bun dev",
        port: 10000
      },
      features: [],
      name: "desktop",
      path: "apps/desktop",
      type: "desktop-app"
    }
  ]
};
