import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SparklinesLine } from "./index.ts"

describe("Renders SparklinesLine correctly", async () => {
  it("Should not render if no data provided", async () => {
    const { container } = render(<SparklinesLine />)
    expect(container.querySelector("svg")).toBeNull
  })
  it("Should not render with data", async () => {
    const { container } = render(<SparklinesLine data={[1, 2, 1, 2]} />)
    expect(container.querySelector("svg")).toBeNull
  })
})
