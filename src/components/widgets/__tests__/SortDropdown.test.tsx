import { Mock, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";

import SortDropdown from "../SortDropdown";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: () => "/dashboard",
  useSearchParams: vi.fn(),
}));

describe("SortDropdown", () => {
  it("updates the URL when a new sort option is selected", () => {
    const pushMock = vi.fn();

    (useRouter as Mock).mockReturnValue({
      push: pushMock,
      replace: vi.fn(),
    });

    (useSearchParams as Mock).mockReturnValue(
      new URLSearchParams("sort=brand_asc"),
    );

    const mockGroups = [
      {
        groupLabel: "Value",
        options: [{ label: "Price: High to Low", value: "price_desc" }],
      },
    ];

    render(<SortDropdown groups={mockGroups} defaultKey="brand_asc" />);

    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "price_desc" } });

    expect(pushMock).toHaveBeenCalled();
    const lastCall = pushMock.mock.calls[0][0];
    expect(lastCall).toContain("sort=price_desc");
  });
});
