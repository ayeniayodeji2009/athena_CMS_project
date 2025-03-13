import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePublic from './pages/public/HomePublic/HomePublic';
// import AdminNav from './components/admin_components/AdminNav';
// import AdminContentList from './components/admin_components/AdminContentList';
import AdminCreateContent from './components/admin_components/AdminCreateContent';
import AdminUpdate from './components/admin_components/AdminUpdate';
// import Delete from './components/Delete';
import NotFound from './components/UI_General/NotFound';
import './App.css';


import DashboardAdmin from './pages/admin/DashboardAdmin/DashboardAdmin';
// import CreateContentAdmin from './pages/admin/CreateContentAdmin/CreateContentAdmin';
import ListContentsAdmin from './pages/admin/ListContentsAdmin/ListContentsAdmin';
// import UpdateContentAdmin from './pages/admin/UpdateContentAdmin/UpdateContentAdmin';



import ViewIndividualContent from './components/UI_General/ViewIndividualContent';
import PreviewUpdateContent from './components/UI_General/PreviewUpdateContent';
// import AdminCreateContent from './components/admin_components/AdminCreateContent';
import PreviewCreateContent from './components/UI_General/PreviewCreateContent';
// import Test from './components/UI_General/Test'

const App = () => {
    return (
      <div className="App">
        <Routes>
            {/**Public */}
            <Route path="/" element={<HomePublic />} /> {/**page */}

            {/**Admin */}
            <Route path="/admin/dashboard" element={<DashboardAdmin />} /> {/**page */}
            <Route path="/admin/contents" element={<ListContentsAdmin />} /> {/**page */}
            {/*<Route path="/admin/createcontent" element={<CreateContentAdmin />} /> *page */}
            <Route path="/admin/createcontent" element={<AdminCreateContent />} /> {/**component */}
            <Route path="/admin/updatecontent" element={<AdminUpdate />} /> {/**component */}


            {/**UI_General */}
            <Route path="/viewcontent" element={<ViewIndividualContent />} /> {/**component */}
            <Route path="/previewupdatecontent" element={<PreviewUpdateContent />} /> {/**component */}
            <Route path="/previewcreatecontent" element={<PreviewCreateContent />} /> {/**component */}

            {/* Test page */}
            {/* <Route path="/test" element={<Test />} /> */}
            {/* <Route path="/admincontentlist" element={<AdminContentList />} /> */}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
};

export default App;






