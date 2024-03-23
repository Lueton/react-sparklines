import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SparklinesComposed } from "./index.ts"

describe("Renders SparklinesComposed correctly", async () => {
  it("Should not render if no data provided", async () => {
    const { container } = render(<SparklinesComposed />)
    expect(container.querySelector("svg")).toBeNull
  })
  it("Should not render with data", async () => {
    const { container } = render(<SparklinesComposed data={[1, 2, 1, 2]} />)
    expect(container.querySelector("svg")).toBeNull
  })
})
