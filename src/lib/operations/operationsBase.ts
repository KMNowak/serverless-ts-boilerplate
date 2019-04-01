import { QueryBuilder, Transaction } from 'knex'
import { R } from 'lib/utils'
import { SQL_CONSTANTS } from 'lib/common'
import { KeyValuePair } from 'lib/types'
import { Base as Types } from './types'

export class OperationsBase {
    constructor(public transaction: Transaction) {
    }

    public withFiltersApplied(props: Types.Filters) {
        return (queryBuilder: QueryBuilder) => {
            const { orderFilter, whereLikeFilters } = this.prepareFilters(props)
            const queryBuilderWithWhereLike = this.whereLikeQueryBuilder(queryBuilder, whereLikeFilters)

            return this.orderByQueryBuilder(queryBuilderWithWhereLike, orderFilter)
        }
    }

    public prepareWhereLikeProps(queryByProps: KeyValuePair): Types.WhereLikeFilters {
        return R.compose(
            // @ts-ignore
            R.toPairs,
            R.reject(R.isNil))
        (queryByProps)
    }

    private prepareFilters(props: Types.Filters) {
        const { defaultFilters, queryFilters } = props

        return {
            ...defaultFilters,
            ...(queryFilters || {})
        }
    }

    private whereLikeQueryBuilder(queryBuilder: QueryBuilder, wheres?: Types.WhereLikeFilters): QueryBuilder {
        if (!wheres) {
            return queryBuilder
        }

        return wheres.reduce((builderWithWheres, queryBy) => {
            const [field, value] = queryBy

            return builderWithWheres.where(field, SQL_CONSTANTS.LIKE, `%${value}%`)
        }, queryBuilder)
    }

    private orderByQueryBuilder(queryBuilder: QueryBuilder, orderFilter?: Types.OrderFilter): QueryBuilder {
        if (!orderFilter) {
            return queryBuilder
        }

        const { orderBy, orderWay } = orderFilter

        if (orderBy && orderWay) {
            return queryBuilder.orderBy(orderBy, orderWay)
        }

        return queryBuilder
    }
}
