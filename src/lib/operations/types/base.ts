import { Tuple, Order } from 'lib/types'

export type WhereLikeFilters = Array<Tuple>
export type OrderFilter = Order

export type Filter = {
    orderFilter?: OrderFilter,
    whereLikeFilters?: WhereLikeFilters
}

export type Filters = {
    queryFilters?: Filter,
    defaultFilters: Filter
}
