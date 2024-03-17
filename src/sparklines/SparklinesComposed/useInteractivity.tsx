import { RefObject, useCallback, useEffect, useState } from "react"
import { EventData, Point } from "react-sparklines"

export interface UseInteractivityProps {
  ref: RefObject<SVGRectElement>
  data: Point[]
  onMouseMove?: (event: MouseEvent, data: EventData) => void
  onMouseLeave?: (event: MouseEvent, data: EventData) => void
  onMouseEnter?: (event: MouseEvent, data: EventData) => void
  onClick?: (event: MouseEvent, data: EventData) => void
}

export const useInteractivity = ({
  ref,
  data,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  onClick,
}: UseInteractivityProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeEntry, setActiveEntry] = useState<any>(null)
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const calculateCoords = useCallback(
    (event: MouseEvent) => {
      if (!data.length) return

      const mouseX = event.offsetX
      const lastItemIndex = data.length - 1

      let nextDataPoint = data.find((entry) => {
        return entry.x >= mouseX
      })

      if (!nextDataPoint) {
        nextDataPoint = data[lastItemIndex]
      }

      const previousDataPoint = data[data.indexOf(nextDataPoint) - 1]
      let currentDataPoint: Point
      let halfway

      if (previousDataPoint) {
        halfway = previousDataPoint.x + (nextDataPoint.x - previousDataPoint.x) / 2
        currentDataPoint = mouseX >= halfway ? nextDataPoint : previousDataPoint
      } else {
        currentDataPoint = nextDataPoint
      }

      const index = data.indexOf(currentDataPoint)
      setActiveIndex(index)
      setActiveEntry(currentDataPoint)
      setCoords({ x: event.offsetX, y: event.offsetY })
    },
    [data],
  )

  const resetCoords = useCallback(() => {
    setActiveIndex(null)
    setCoords({ x: 0, y: 0 })
  }, [])

  const mouseMove = useCallback(
    (event: MouseEvent) => {
      if (onMouseMove) onMouseMove(event, { activeIndex, activeEntry })
    },
    [onMouseMove],
  )

  const mouseEnter = useCallback(
    (event: MouseEvent) => {
      if (onMouseEnter) onMouseEnter(event, { activeIndex, activeEntry })
    },
    [onMouseEnter],
  )

  const mouseLeave = useCallback(
    (event: MouseEvent) => {
      if (onMouseLeave) onMouseLeave(event, { activeIndex, activeEntry })
    },
    [onMouseLeave],
  )

  const click = useCallback(
    (event: MouseEvent) => {
      if (onClick) onClick(event, { activeIndex, activeEntry })
    },
    [onClick],
  )

  useEffect(() => {
    ref.current?.addEventListener("mousemove", calculateCoords)
    return () => {
      ref.current?.removeEventListener("mousemove", calculateCoords)
    }
  }, [ref, calculateCoords])

  useEffect(() => {
    ref.current?.addEventListener("mouseleave", resetCoords)
    return () => ref.current?.removeEventListener("mouseleave", resetCoords)
  }, [ref])

  useEffect(() => {
    if (onMouseMove) {
      ref.current?.addEventListener("mousemove", mouseMove)
      return ref.current?.removeEventListener("mousemove", mouseMove)
    }
  }, [ref, mouseMove])

  useEffect(() => {
    if (onMouseEnter) {
      ref.current?.addEventListener("mouseenter", mouseEnter)
      return ref.current?.removeEventListener("mouseenter", mouseEnter)
    }
  }, [ref, mouseEnter])

  useEffect(() => {
    if (onMouseLeave) {
      ref.current?.addEventListener("mouseleave", mouseLeave)
      return ref.current?.removeEventListener("mouseleave", mouseLeave)
    }
  }, [ref, mouseLeave])

  useEffect(() => {
    if (onClick) {
      ref.current?.addEventListener("click", click)
      return ref.current?.removeEventListener("click", click)
    }
  }, [ref, click])

  return {
    coords,
    activeIndex,
    activeEntry,
  }
}
