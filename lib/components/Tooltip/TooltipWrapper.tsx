import { CSSProperties, PropsWithChildren } from "react"

interface TooltipWrapperProps extends PropsWithChildren {
  style: CSSProperties
  coords: { x: number; y: number }
}

export const TooltipWrapper = (props: TooltipWrapperProps) => {
  const { style, coords, children } = props

  const wrapperStyle: CSSProperties = {
    pointerEvents: "none",
    zIndex: 9999,
    position: "absolute",
    top: 0,
    left: 0,
    transform: `translate(${coords.x + 20}px,${coords.y + 1}px)`,
    ...style,
  }

  return (
    <span tabIndex={-1} className="react-sparklines-tooltip-wrapper" style={wrapperStyle}>
      {children}
    </span>
  )
}
