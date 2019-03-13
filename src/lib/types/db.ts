export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc'
}

export type LimitOffset = {
    limit: number,
    offset: number
}

export type LimitOffsetOptional = Partial<LimitOffset>
