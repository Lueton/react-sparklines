import { render } from "@testing-library/react"
import { afterEach,beforeEach, describe, expect, it, vi } from "vitest"

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

describe("Responsive mode", () => {
  let mockObserve: ReturnType<typeof vi.fn>;
  let mockDisconnect: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockObserve = vi.fn();
    mockDisconnect = vi.fn();

    global.ResizeObserver = vi.fn(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
      unobserve: vi.fn(),
    })) as unknown as typeof ResizeObserver;

    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 0;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("responsive={true} renders wrapper with width: 100%", () => {
    const { container } = render(
      <SparklinesComposed data={[1, 2, 3]} responsive />,
    );
    const wrapper = container.querySelector(".react-sparklines-wrapper") as HTMLElement;
    expect(wrapper).not.toBeNull();
    expect(wrapper.style.width).toBe("100%");
  });

  it("responsive={false} renders wrapper with fixed pixel width", () => {
    const { container } = render(
      <SparklinesComposed data={[1, 2, 3]} width={200} />,
    );
    const wrapper = container.querySelector(".react-sparklines-wrapper") as HTMLElement;
    expect(wrapper).not.toBeNull();
    expect(wrapper.style.width).toBe("200px");
  });
})
