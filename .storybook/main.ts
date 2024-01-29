import type {StorybookConfig} from "@storybook/react-vite";

const config: StorybookConfig = {
    // stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    stories: ["../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    staticDirs: ['../public'],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
};
export default config;

export const framework = {
    name: "@storybook/react-vite",
    options: {}
};

export const docs = {
    autodocs: true
};
