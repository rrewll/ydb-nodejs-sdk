import Driver from '../driver';
import {AnonymousAuthService} from '../credentials';
import {GenericContainer, StartedTestContainer} from "testcontainers";

describe('Connection', () => {
    let startedContainer: StartedTestContainer;

    beforeAll(async () => {
        startedContainer = await new GenericContainer('cr.yandex/yc/yandex-docker-local-ydb:latest')
            .withExposedPorts(2135)
            .start();
    });

    afterAll(async () => {
        await startedContainer.stop();
    })

    it('Test connection', async () => {
        const driver = new Driver('grpc://' + startedContainer.getHost() + ':2135', 'local', new AnonymousAuthService());
        await driver.ready(10000);
        await driver.tableClient.withSession(async (session) => {
            await session.executeQuery('SELECT 1');
        });
        await driver.destroy();
    });
});
