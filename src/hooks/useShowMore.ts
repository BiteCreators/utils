import { useState } from 'react'

/**
 * @param {string} text - text to transform
 * @param {number} defaultVisibleLength - the length of a not "showed more" text (defaults to 100)
 * @param {boolean} isDefaultCollapsed - whether the text is collapsed by default or not (defaults to true)
 * @returns collapsable flag that shows whether is it needed to add show more functionality or not, functions to show more collpse and toggle, isCollapsed flag and text to show
 */
export const useShowMore = ({
  defaultVisibleLength = 100,
  isDefaultCollapsed = true,
  text,
}: {
  defaultVisibleLength?: number
  isDefaultCollapsed?: boolean
  text: string
}) => {
  if (defaultVisibleLength < 0) {
    throw new Error('Default length should not be negative, please provide a correct value')
  }
  const collapsable = text.length > defaultVisibleLength
  const defautlVisible: string = collapsable ? text.slice(0, defaultVisibleLength) + '...' : text
  const [textToShow, setTextToShow] = useState<string>(() =>
    isDefaultCollapsed ? defautlVisible : text
  )
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isDefaultCollapsed)
  const showMore = () => {
    setTextToShow(text)
    setIsCollapsed(false)
  }
  const collapse = () => {
    setTextToShow(defautlVisible)
    setIsCollapsed(true)
  }
  const toggleShowMore = () => {
    setTextToShow(isCollapsed ? text : defautlVisible)
    setIsCollapsed(prev => !prev)
  }

  return {
    collapsable,
    collapse,
    isCollapsed,
    showMore,
    textToShow,
    toggleShowMore,
  }
}
