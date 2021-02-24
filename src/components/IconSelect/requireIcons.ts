/* eslint-disable @typescript-eslint/consistent-type-assertions */

const req = require.context('@/icon/svg', false, /\.svg$/)
const requireAll = (requireContext: typeof req) => requireContext.keys()

const re = /\.\/(.*)\.svg/

const icons = requireAll(req).map((i: string) => {
    return (i.match(re) as Array<string>)[1]
})

export default icons