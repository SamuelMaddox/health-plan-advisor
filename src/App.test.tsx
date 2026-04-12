import { render, screen } from "@testing-library/react";

import App from "./App";

test("renders the welcome heading", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { level: 1, name: "Hello, world!" }),
  ).toBeInTheDocument();
});
