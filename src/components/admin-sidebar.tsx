import { Job } from "@prisma/client";

interface AdminSidebarProps {
  jobId: number;
}

const AdminSidebar = ({ jobId }: AdminSidebarProps) => {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      Admin Sidebar
    </aside>
  );
};

export default AdminSidebar;
