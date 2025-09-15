import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login - Ayung Project',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout overrides the parent admin layout by not rendering AdminSidebar
  // We avoid creating HTML structure to prevent hydration mismatch
  return children;
}