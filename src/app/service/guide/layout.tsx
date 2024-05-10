import Sidebar from '@/app/ui/layout';
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <Sidebar>{children}</Sidebar>
    );
  }