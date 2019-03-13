import { regexes } from 'lib/common'

export const hideDBIds = (objs: Array<{}>) => objs.map(obj => {
    const keys = Object.keys(obj)

    return keys.reduce((acc, key) => !regexes.isKeyDBId.test(key)
        ? { ...acc, [key]: obj[key] }
        : acc, {})
})
