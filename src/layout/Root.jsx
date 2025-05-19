import React from 'react';
import { Outlet } from 'react-router';

const Root = () => {
  return (
    <>
      <header>

      </header>
      <main className='container mx-auto px-4 md:px-6 lg:px-8'>
        <Outlet />
      </main>
      <footer>

      </footer>
    </>
  );
};

export default Root;