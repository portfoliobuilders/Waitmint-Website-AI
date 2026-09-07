import { expect, test } from "@playwright/test";

test("homepage explains WaitMint in the hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Your AI thinks/i })).toBeVisible();
  await expect(page.getByText("Demo")).toBeVisible();
  await expect(page.getByRole("link", { name: /Advertise with WaitMint/i })).toBeVisible();
});

test("mobile menu opens", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const toggle = page.getByLabel("Open menu");
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await expect(page.locator("#mobile-nav").getByRole("link", { name: "Trust" })).toBeVisible();
});

test("protected dashboard requires sign-in when Auth is configured", async ({ page }) => {
  await page.goto("/dashboard");
  const onLogin = /login/.test(page.url());
  const unconfigured = await page.getByText(/Connect the Exchange|Authentication is not configured|Sign in/i).first().isVisible().catch(() => false);
  expect(onLogin || unconfigured).toBeTruthy();
});

test("trust and advertise pages render", async ({ page }) => {
  await page.goto("/trust");
  await expect(page.getByRole("heading", { name: /conversations stay yours/i })).toBeVisible();
  await page.goto("/advertise");
  await expect(page.getByRole("heading", { name: /Buy verified AI attention/i })).toBeVisible();
});
