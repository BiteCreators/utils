export const removeParam = (
    query: Record<string, string | string[] | undefined>,
    keysToRemove: string[]
): URLSearchParams => {
    const params = new URLSearchParams(query as Record<string, string>)
    keysToRemove.forEach(key => params.delete(key))
    return params
}
