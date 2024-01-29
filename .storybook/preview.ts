import '../src/index.css';
import {initialize, mswLoader} from 'msw-storybook-addon';
import {Preview} from "@storybook/react";

initialize();

const preview: Preview = {
    parameters: {
        actions: {argTypesRegex: "^on[A-Z].*"},
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    loaders: [mswLoader],
};

export const parameters = preview.parameters;

