import uuid from 'uuid/v4'
import knex from 'knex'
import mockDB from 'mock-knex'
import { testUtils } from 'lib/utils'
import { withDB } from 'lib/hof'
import { lambda } from '../sampleGet'

const dbClient = knex({
    client: 'mysql'
})

mockDB.mock(dbClient)

describe('sampleGet logic', () => {
    it('implement tests here', () => {
        const queryStringParameters = {
            sampleUUID: uuid()
        }
        const sampleEvent = testUtils.proxyIntegrationEventGenerator<typeof queryStringParameters>({
            httpMethod: 'GET',
            queryStringParameters,
            Authorization: 'mock',
            dbClient
        })

        return withDB(lambda)(sampleEvent)
            .then(response => {
                console.log('[DEBUG] response:', response) // tslint:disable-line no-console

                expect(response).toBeDefined()
            })
    })
})
