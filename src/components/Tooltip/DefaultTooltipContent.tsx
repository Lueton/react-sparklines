import { isNil, isNumber, isString } from "lodash"
import { isValidElement, ReactNode } from "react"

import { TooltipProps } from "./Tooltip.tsx"

const isNumOrStr = (value: unknown): value is number | string =>
  isNumber(value as number) || isString(value)

export const DefaultTooltipContent = (props: TooltipProps) => {
  const { payload, label, separator = " : ", contentStyle, itemStyle, labelStyle } = props

  const hasLabel = !isNil(label)
  const finalLabel: string | number | ReactNode = hasLabel ? label : ""

  const finalContentStyle = {
    margin: 0,
    padding: 10,
    backgroundColor: "white",
    border: "1px solid slategray",
    whiteSpace: "nowrap",
    borderRadius: 5,
    fontSize: 12,
    ...contentStyle,
  }

  const finalLabelStyle = {
    margin: 0,
    ...labelStyle,
  }

  const renderContent = () => {
    if (payload && payload.length) {
      const listStyle = { padding: 0, margin: 0 }

      const items = payload.map((entry, i) => {
        const finalItemStyle = {
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: entry.color || "#000",
          ...itemStyle,
        }

        const { value, name } = entry
        const finalValue: ReactNode = value
        const finalName: ReactNode = name

        return (
          <li
            className="react-tooltip-tooltip-item"
            key={`tooltip-item-${i}`}
            style={finalItemStyle}
          >
            {isNumOrStr(finalName) ? (
              <span className="react-tooltip-tooltip-item-name">{finalName}</span>
            ) : null}
            {isNumOrStr(finalName) ? (
              <span className="react-tooltip-tooltip-item-separator">{separator}</span>
            ) : null}
            <span className="react-tooltip-tooltip-item-value">{finalValue}</span>
          </li>
        )
      })

      return (
        <ul className="react-tooltip-tooltip-item-list" style={listStyle}>
          {items}
        </ul>
      )
    }

    return null
  }

  return (
    <div className="react-sparklines-default-tooltip-content" style={finalContentStyle}>
      <p style={finalLabelStyle}>{isValidElement(finalLabel) ? finalLabel : `${finalLabel}`}</p>
      {renderContent()}
    </div>
  )
}
