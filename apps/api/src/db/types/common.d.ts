export type OmitForInsert<T> = Omit<T, 'updatedAt' | 'createdAt'>
export type OmitForUpdate<T> = Omit<Partial<T>, 'id' | 'createdAt' | 'updatedAt'>
