import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Banner } from "./banner";

const BANNER_TEXT =
  "Click to place the robot, use the buttons or arrows to move";

test("renders banner text", async () => {
  const { getByText } = await render(<Banner>{BANNER_TEXT}</Banner>);

  await expect.element(getByText(BANNER_TEXT)).toBeInTheDocument();
});
