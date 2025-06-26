import { Providers } from "../../provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
        {children}  {/* No AppBar here */}
        </Providers>
      </body>
    </html>
  );
}
