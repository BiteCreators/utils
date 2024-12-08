import { act, renderHook } from '@testing-library/react'

import { useShowMore } from '../useShowMore'

describe('useShowMore', () => {
  let consoleErrorSpy: jest.SpyInstance

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation((...args) => {
      if (
        args[0] instanceof Error &&
        args[0].message === 'Default length should not be negative, please provide a correct value'
      ) {
        return
      }
      console.error(...args)
    })
  })

  afterAll(() => {
    consoleErrorSpy.mockRestore()
  })

  it('should not be collapsble if provided text is less than defaultVisibleLength', () => {
    const text = 'asdf'
    const { result } = renderHook(() => useShowMore({ defaultVisibleLength: 10, text }))

    expect(result.current.collapsable).toBe(false)
  })
  it('should be collapsble if provided text is greater than defaultVisibleLength', () => {
    const text = '1234567891011'
    const { result } = renderHook(() => useShowMore({ defaultVisibleLength: 10, text }))

    expect(result.current.collapsable).toBe(true)
  })
  it('should be able to toggle show more', () => {
    const text = '1234567891011'
    const { result } = renderHook(() => useShowMore({ defaultVisibleLength: 10, text }))

    expect(result.current.textToShow).toBe('1234567891...')

    act(() => {
      result.current.toggleShowMore()
    })

    expect(result.current.textToShow).toBe('1234567891011')
  })
  it('should be able to set show more state explicitly', () => {
    const text = '1234567891011'
    const { result } = renderHook(() => useShowMore({ defaultVisibleLength: 10, text }))

    expect(result.current.textToShow).toBe('1234567891...')

    act(() => {
      result.current.showMore()
    })

    expect(result.current.textToShow).toBe('1234567891011')

    act(() => {
      result.current.collapse()
    })

    expect(result.current.textToShow).toBe('1234567891...')
  })
  it('should not throw errors if is already collapsed', () => {
    const text = '1234567891011'
    const { result } = renderHook(() => useShowMore({ defaultVisibleLength: 10, text }))

    expect(result.current.textToShow).toBe('1234567891...')

    act(() => {
      result.current.collapse()
    })

    expect(result.current.textToShow).toBe('1234567891...')
  })
  it('should throw an error if defaultVisibleLength is negative', () => {
    const text = '1234567891011'

    expect(() => renderHook(() => useShowMore({ defaultVisibleLength: -1, text }))).toThrow()
  })

  it('should be able to pass defaultCollapsed', () => {
    const text = '1234567891011'

    const { result } = renderHook(() =>
      useShowMore({ defaultVisibleLength: 10, isDefaultCollapsed: false, text })
    )

    expect(result.current.isCollapsed).toBe(false)
  })
})
