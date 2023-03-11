import zod from 'zod'

export const createLeadSchema = zod.object({
    name: zod.string()
})

export const findLeadSchema = zod.object({
    id: zod.string()
})