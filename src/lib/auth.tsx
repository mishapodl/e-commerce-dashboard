import { cookies } from "next/headers";

export function isAuthenticated(): void {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cookieStore = cookies();
}
