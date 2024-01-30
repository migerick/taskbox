import store from '../lib/store';
import {rest} from 'msw';
import {MockedState} from './TaskList.stories';
import {Provider} from 'react-redux';

import {
    fireEvent,
    waitFor,
    within,
    waitForElementToBeRemoved
} from '@storybook/test';
import {Meta} from "@storybook/react";
import {InboxScreen} from "./InboxScreen.tsx";

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
        // Waits for the component to transition from the loading state
        await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
        // Waits for the component to be updated based on the store
        await waitFor(async () => {
            // Simulates pinning the first task
            await fireEvent.click(canvas.getByLabelText('pinTask-1'));
            // Simulates pinning the third task
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