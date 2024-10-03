import { expect, test } from 'vitest'
import { FeedFramer } from '.'


test('adds 1 + 2 to equal 3', async () => {
    const feedFramer = new FeedFramer({
        apiToken: '1|7SHdPPaddND3VZ0g31kalO40aBlGwlaPZmI4BGmCd022fd51',
    })
    const data = await feedFramer.getData({
        accountId: '8285642884889120',
        numberOfPosts: 10,
    });

    expect(data.data).toBeDefined()

})

test('should render a template with the provided data', () => {

    const feedFramer = new FeedFramer({
        apiToken: '1|7SHdPPaddND3VZ0g31kalO40aBlGwlaPZmI4BGmCd022fd51',
    })
    // Act
    const output = feedFramer.renderer({
        accountId: '8285642884889120',
        numberOfPosts: 10,
    });

    // Assert
    expect(output).toBeDefined();
});
