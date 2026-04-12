afterEach(() => {
  // TODO: can this be a vitest setting so i don't always have to do it? also,
  // can i use vitest.config.ts and extract the other test setting for vite.config.ts?
  vi.restoreAllMocks();
});

// TODO:
test("On load light mode shows sun icon", () => {
  window.ThemeManager = {
    getTheme: vi.fn().mockReturnValue("dark"),
  } as unknown as ThemeManager;

  expect(window.ThemeManager.getTheme()).toBe("dark");
  expect(true).toBe(false);
});

// TODO:
//   2. on click light mode shows sun icon
//   3. on load dark mode shows moon icon
//   4. on click dark mode shows moon icon
//   5. on click system mode shows sun icon when system theme is light
//   6. on click system mode shows moon icon when system theme is dark
//   7. app subscribes to system theme changes and keeps theme in sync
