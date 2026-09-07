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

test("products page lists extension, sdk, and app", async ({ page }) => {
  await page.goto("/products");
  await expect(page.getByRole("heading", { name: /Extension. SDK. App./i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "WaitMint Extension" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "WaitMint SDK" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "WaitMint App" }).first()).toBeVisible();
});

test("pricing calculator accepts intensity presets", async ({ page }) => {
  await page.goto("/pricing");
  await expect(page.getByRole("heading", { name: /No subscription theatre/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /See a qualifying month/i })).toBeVisible();
  await page.getByRole("button", { name: "Heavy" }).click();
  await expect(page.getByRole("button", { name: "Heavy" })).toBeVisible();
  await page.getByRole("button", { name: /SDK/ }).click();
  await expect(page.getByText(/same 60\/40 split/i)).toBeVisible();
});

test("login shows one identity and the sign-in form", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: /Sign in once/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Welcome back/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
});

const WIDTHS = [360, 375, 390, 430, 768, 1024, 1280, 1440, 1920];

for (const width of WIDTHS) {
  test(`header stays usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("link", { name: "WaitMint" }).first()).toBeVisible();
    if (width < 768) {
      await page.getByLabel("Open menu").click();
      await expect(page.locator("#mobile-nav").getByRole("link", { name: "Earn" })).toBeVisible();
      await expect(page.locator("#mobile-nav").getByRole("link", { name: "Products" })).toBeVisible();
    } else {
      await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
      await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Products" })).toBeVisible();
    }
  });
}
