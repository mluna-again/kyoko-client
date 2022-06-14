import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    headless: false,
  },
};

export default config;
