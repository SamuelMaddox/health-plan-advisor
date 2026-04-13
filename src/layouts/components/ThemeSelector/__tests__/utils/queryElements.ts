import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export function queryTriggerButton() {
  const triggerButton = screen.getByRole("button", {
    name: /Open theme menu/,
  });
  const themeIcon = triggerButton.querySelector("svg");

  return { triggerButton, themeIcon };
}

export async function clickMenuItem(name: string) {
  const { triggerButton } = queryTriggerButton();
  await userEvent.click(triggerButton);
  const menuItem = await screen.findByRole("menuitem", { name });
  await userEvent.click(menuItem);
}
