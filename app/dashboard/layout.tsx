import SideBar from "@/components/dashboard/SideBar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <main className="ml-64 bg-background flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};
export default DashboardLayout;