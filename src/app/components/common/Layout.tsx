import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-accent p-4">
        <h1 className="text-2xl font-bold text-white">Developer Search</h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-accent p-4 text-center text-white">
        © {new Date().getFullYear()} Developer Search. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;