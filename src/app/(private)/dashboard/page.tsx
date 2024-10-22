import { Header } from "@/components/header";
import { ContentPageFormatter } from "@/components/wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | G-Hair",
  description: "Pagina de dashboard da G-Hair",
};

export default function Page() {
  return (
    <ContentPageFormatter>
      <Header title="Dashboard" />
      <p> Dashboard </p>
    </ContentPageFormatter>
  );
}
