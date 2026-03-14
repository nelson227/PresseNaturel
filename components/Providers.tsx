'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { DataProvider } from '@/contexts/DataContext';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <DataProvider>
      <AuthProvider>
        <AdminProvider>
          {children}
        </AdminProvider>
      </AuthProvider>
    </DataProvider>
  );
}
