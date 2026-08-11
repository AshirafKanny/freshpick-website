import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
