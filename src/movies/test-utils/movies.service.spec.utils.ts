export const where = jest.fn().mockName('whereMock').mockReturnThis()
export const getMany = jest.fn().mockName('getMany')
export const getCount = jest.fn().mockName('getCount')
export const save = jest.fn().mockName('save')

export const moviesRepository = {
  createQueryBuilder: jest
    .fn()
    .mockImplementation(() => ({
      getCount,
      getMany,
      where
    }))
    .mockName('createQueryBuilder'),
  save
}
