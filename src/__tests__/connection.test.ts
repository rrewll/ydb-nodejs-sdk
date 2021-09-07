import {AnonymousAuthService, Driver} from '..';

describe('Connection', () => {
    it('Test connection', async () => {
        const driver = new Driver('grpc://localhost:2135', 'local', new AnonymousAuthService());
        await driver.ready(10000);
        await driver.tableClient.withSession(async (session) => {
            await session.executeQuery('SELECT 1');
        });
        await driver.destroy();
    });
});
