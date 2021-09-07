import {GenericContainer, StartedTestContainer} from 'testcontainers';
import Driver from '../driver';
import {AnonymousAuthService} from '../credentials';

describe('Connection', () => {
    let startedContainer: StartedTestContainer;

    beforeAll(async () => {
        startedContainer = await new GenericContainer('cr.yandex/yc/yandex-docker-local-ydb:latest')
            .withExposedPorts(2135)
            .start();
    });

    afterAll(async () => {
        await startedContainer.stop();
    });

    it('Test connection', async () => {
        const host = startedContainer.getHost();
        const mappedPort = startedContainer.getMappedPort(2135);
        const entryPoint = `grpc://${host}:${mappedPort}`;
        console.log('entryPoint', entryPoint);
        const driver = new Driver(entryPoint, 'local', new AnonymousAuthService());
        await driver.ready(10000);
        await driver.tableClient.withSession(async (session) => {
            await session.executeQuery('SELECT 1');
        });
        await driver.destroy();
    });
});
