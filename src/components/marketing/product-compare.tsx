import { WAITMINT_PRODUCTS } from "@/lib/content/products";

const ROWS = [
  {
    label: "Wait detection",
    values: ["Live on Chrome", "Opens with Exchange", "Does not detect waits"],
  },
  {
    label: "Wallet",
    values: ["Same Exchange wallet", "Same Exchange wallet", "Same Exchange wallet"],
  },
  {
    label: "Sign-in",
    values: ["Link code maps omniUserId", "Same WaitMint Auth", "Same WaitMint Auth"],
  },
  {
    label: "Who it is for",
    values: ["People who wait on AI", "Product and partner teams", "Checking the same ledger on the go"],
  },
] as const;

export function ProductCompare() {
  return (
    <div className="overflow-x-auto rounded-3xl border border-[var(--wm-line)]">
      <table className="min-w-[40rem] w-full text-left text-sm">
        <thead className="bg-[#0a0c11] text-xs uppercase tracking-[0.12em] text-[var(--wm-muted)]">
          <tr>
            <th className="px-4 py-4 sm:px-6">One identity</th>
            {WAITMINT_PRODUCTS.map((product) => (
              <th key={product.id} className="px-4 py-4 sm:px-6">
                {product.shortName}
                <span className="mt-1 block font-normal normal-case tracking-normal">{product.statusLabel}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className="border-t border-[var(--wm-line)]">
              <th className="px-4 py-4 font-medium sm:px-6">{row.label}</th>
              {row.values.map((value, index) => (
                <td key={WAITMINT_PRODUCTS[index].id} className="px-4 py-4 text-[var(--wm-muted)] sm:px-6">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
