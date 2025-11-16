import SideBar from "@/components/dashboard/SideBar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex">
      <SideBar />
      <main className="bg-background flex-1">{children}</main>
    </div>
  );
};
export default DashboardLayout;
