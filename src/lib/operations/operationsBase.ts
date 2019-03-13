import { QueryBuilder, Transaction } from 'knex'
import { R } from 'lib/utils'
import { SQL_CONSTANTS } from 'lib/common'
import { IQueryFilters } from 'lib/types'

export class OperationsBase {
    constructor(public transaction: Transaction) {}

    public applyQueryFilters(queryBuilder: QueryBuilder, props: IQueryFilters) {
        const { query, queryBy, orderBy, order } = props
        const shouldSearchByQueryAndOrderItems = !R.isNil(queryBy) && !R.isNil(orderBy)

        if (shouldSearchByQueryAndOrderItems) {
            return queryBuilder
                .where(queryBy, SQL_CONSTANTS.LIKE, `%${query}%`)
                .orderBy(orderBy, order)
        }

        const shouldOrderItems = !R.isNil(orderBy)

        if (shouldOrderItems) {
            return queryBuilder.orderBy(orderBy, order)
        }

        const shouldSearchByQuery = !R.isNil(queryBy)

        if (shouldSearchByQuery) {
            return queryBuilder.where(queryBy, SQL_CONSTANTS.LIKE, `%${query}%`)
        }

        return queryBuilder
    }
}
