import {parseConnectionString} from "../parse-connection-string";

describe('Connection string', () => {
    it('Test parseConnectionString', () => {
        const tests = [
            {
                connectionString: 'grpc://ydb-ru.yandex.net:2135/?database=/ru/home/service/db',
                endpoint: 'grpc://ydb-ru.yandex.net:2135',
                database: '/ru/home/service/db',
            },
            {
                connectionString: "grpcs://ydb.serverless.yandexcloud.net:2135/?database=/ru-central1/b1g8skpblkos03malf3s/etn02qso4v3isjb00te1",
                endpoint: "grpcs://ydb.serverless.yandexcloud.net:2135",
                database: "/ru-central1/b1g8skpblkos03malf3s/etn02qso4v3isjb00te1"
            }
        ];

        tests.forEach((test) => {
            const parsedString = parseConnectionString(test.connectionString);
            expect(parsedString).toEqual(test);
        });
    });
});
