export async function register() {
  const { assertProductionUrls } = await import("./src/lib/config");
  assertProductionUrls();
}
