import {
    always,
    compose,
    cond as rcond,
    fromPairs,
    isNil,
    isEmpty,
    merge,
    map,
    reject,
    toPairs,
    values,
    T
} from 'ramda'
import { Nullable, ObjectWithNullableProps, ObjectWithNonNullableProps } from 'lib/types'

// tslint:disable no-any

const cond = <T = {}>(fns: Array<[(p: T) => boolean, (p: T) => any]>) => (props: T) => rcond(fns)(props)

const isUndefined = element => typeof element === 'undefined'

const isNilOrEmpty = (toCheck: any) => isNil(toCheck) || isEmpty(toCheck)

const hasElements = (arr: any) => Array.isArray(arr) && arr.length > 0

const replaceNil = <T = any>(defaultValue: T, valueToCheck?: Nullable<T>) => isNil(valueToCheck)
    ? defaultValue
    : valueToCheck

const normalizeAllProps = <O extends {}, T = ObjectWithNullableProps<O>>(propsToNormalize: O, defaultValue: any = '') => compose(
    fromPairs,
    // @ts-ignore
    map(([key, value]) => [key, replaceNil(defaultValue, value)]),
    toPairs
)(propsToNormalize) as unknown as ObjectWithNonNullableProps<T>

const mergeDefaultProps = <T = {}>(props: object = {}, defaultProps: object = {}) => merge(defaultProps, reject(isUndefined, props)) as T
// tslint:enable no-any

export {
    always,
    compose,
    cond,
    fromPairs,
    isEmpty,
    isNil,
    isNilOrEmpty,
    isUndefined,
    hasElements,
    map,
    merge,
    mergeDefaultProps,
    normalizeAllProps,
    reject,
    replaceNil,
    toPairs,
    values,
    T
}
