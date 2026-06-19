import React from 'react'
import Header from '../header';
import { Outlet } from 'react-router';
import Footer from '../footer';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className=" w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout