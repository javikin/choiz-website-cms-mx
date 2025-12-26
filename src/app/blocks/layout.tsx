import "@/app/globals.css";

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-neutral-950 text-white min-h-screen">{children}</div>;
}
