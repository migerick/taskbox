import {Provider} from "react-redux";
import {InboxScreen} from "./InboxScreen.tsx";
import {Meta} from "@storybook/react";
import {MockedState} from "./TaskList.stories.tsx";
import {fireEvent, waitFor, waitForElementToBeRemoved, within} from "@storybook/test";
import {rest} from "msw";
import store from "../lib/store.ts";


export default {
    component: InboxScreen,
    title: 'InboxScreen',
    decorators: [(story) => <Provider store={store}>{story()}</Provider>],
    tags: ['autodocs'],
} satisfies Meta<typeof InboxScreen>;

export const Default = {
    parameters: {
        msw: {
            handlers: [
                rest.get(
                    'https://jsonplaceholder.typicode.com/todos?userId=1',
                    (_, res, ctx) => {
                        return res(ctx.json(MockedState.tasks));
                    }
                ),
            ],
        },
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);
        await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
        await waitFor(async () => {
            await fireEvent.click(canvas.getByLabelText('pinTask-1'));
            await fireEvent.click(canvas.getByLabelText('pinTask-3'));
        });
    },
} satisfies Meta<typeof InboxScreen>;

export const Error = {
    parameters: {
        msw: {
            handlers: [
                rest.get(
                    'https://jsonplaceholder.typicode.com/todos?userId=1',
                    (_, res, ctx) => {
                        return res(ctx.status(403));
                    }
                ),
            ],
        },
    },
} satisfies Meta<typeof InboxScreen>;