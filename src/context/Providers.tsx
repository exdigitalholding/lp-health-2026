import { CookiesProvider } from "next-client-cookies/server";

import { ApiContextProvider } from "./ApiContext";

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CookiesProvider>
      <ApiContextProvider>{children}</ApiContextProvider>
    </CookiesProvider>
  );
}
