import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SparklinesBar } from "./index.ts"

describe("Renders SparklinesBar correctly", async () => {
  it("Should not render if no data provided", async () => {
    const { container } = render(<SparklinesBar />)
    expect(container.querySelector("svg")).toBeNull
  })
  it("Should not render with data", async () => {
    const { container } = render(<SparklinesBar data={[1, 2, 1, 2]} />)
    expect(container.querySelector("svg")).toBeNull
  })
})
