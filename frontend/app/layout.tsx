// app/layout.tsx
import "../../frontend/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-nude text-gray-900 min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}

