import {RefObject, useEffect} from 'react'

export const useIntersectionObserver = (
    ref: RefObject<Element>,
    callback: () => void,
    options?: IntersectionObserverInit
) => {
    useEffect(() => {
        const currentRef = ref.current

        const observer = new IntersectionObserver(entries => {
            const [entry] = entries

            if (entry.isIntersecting) {
                callback()
            }
        }, options)

        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [ref, callback, options])
}
