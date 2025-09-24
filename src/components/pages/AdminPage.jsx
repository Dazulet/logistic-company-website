import React from 'react';
import Navbar from '../Navbar';
import AdminPanel from '../AdminPanel';

const AdminPage = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-20"> 
        <AdminPanel />
      </div>
    </div>
  );
};

export default AdminPage;