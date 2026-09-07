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
  await page.getByRole("button", { name: /Open menu/i }).click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Trust" })).toBeVisible();
});

test("protected dashboard redirects when logged out", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/login/);
});

test("trust and advertise pages render", async ({ page }) => {
  await page.goto("/trust");
  await expect(page.getByRole("heading", { name: /conversations stay yours/i })).toBeVisible();
  await page.goto("/advertise");
  await expect(page.getByRole("heading", { name: /Buy verified AI attention/i })).toBeVisible();
});
