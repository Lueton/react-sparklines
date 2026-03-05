import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SparklinesBand } from "./SparklinesBand.tsx";

describe("Renders SparklinesLine correctly", async () => {
  it("Should not render if no data provided", async () => {
    const { container } = render(<SparklinesBand />)
    expect(container.querySelector("svg")).toBeNull
  })
  it("Should not render with data", async () => {
    const { container } = render(<SparklinesBand data={[1, 2, 1, 2]} />)
    expect(container.querySelector("svg")).toBeNull
  })
})
