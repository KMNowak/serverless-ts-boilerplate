export class DBTableBase<T = { [P: string]: string }> {
    public prefixed: T

    constructor(public name: string, public columns: T, prefix?: string) {
        this.prefixed = this.appendPrefixToColumns(prefix)
    }

    private appendPrefixToColumns(prefix: string = this.name) {
        return Object.entries(this.columns)
            .map(([key, value]) => [key, `${prefix}.${value}`])
            .reduce((acc, [key, prefixedValue]) => ({
                ...acc,
                [key]: prefixedValue
            }), {} as T)
    }
}
