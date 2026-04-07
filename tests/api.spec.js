import { test } from '../utils/fixtures';
import { expect } from '@playwright/test';
import { apiDataPost, apiDataPatch } from '../data/apiData';

test.describe('Api project', () => {
    test('GET playsholder', async ({ request }) => {
        const getResponse = await request.get('posts/1');
        expect(getResponse.status()).toBe(200)

        const body = await getResponse.json()
    })

    test('POST playsholder', async ({ request }) => {
        const postResponse = await request.post('posts/',
            {
                data: apiDataPost,
            }
        );
        expect(postResponse.status()).toBe(201)

        const body = await postResponse.json()
    })

    test('PATCH playsholder', async ({ request }) => {
        const patchResponse = await request.patch('posts/1',
            {
                data: apiDataPatch
            }
        );

        const body = await patchResponse.json();
        expect(patchResponse.status()).toBe(200);

        expect(body.title).toBe(apiDataPatch.title);
    })
})