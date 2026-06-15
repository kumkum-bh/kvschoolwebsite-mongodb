import React from "react";
import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./admin_components/AdminLayout";

import { AppToaster } from "./api";

// Public Pages
import Home from "./components/Home";
import TheSchool from "./components/TheSchool";
import Academics from "./components/Academics";
import Admissions from "./components/Admissions";
import ExtraCurricular from "./components/ExtraCurricular";
import Notices from "./components/Notices";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import MandatoryDisclosure from "./components/MandatoryDisclosure";
import RegistrationForm from "./components/RegistrationForm";
import PayFee from "./components/PayFee";
import AdminAdmissions from "./admin_components/AdminAdmissions";

// Admin Pages
import AdminLogin from "./admin_components/AdminLogin";
import AdminDashboard from "./admin_components/AdminDashboard";
import AdminRegistration from "./admin_components/AdminRegistration";
import AdminViewRegistration from "./admin_components/AdminViewRegistration";
import AdminClassFeeStructure from "./admin_components/AdminClassFeeStructure";
import AdminHome from "./admin_components/AdminHome";
import AdminAcademics from "./admin_components/AdminAcademics";
import AdminExtraCurricular from "./admin_components/AdminExtraCurricular";
import AdminMandatoryDisclosure from "./admin_components/AdminMandatoryDisclosure";
import AdminGallery from "./admin_components/AdminGallery";
import AdminContact from "./admin_components/AdminContact";
import AdminNotice from "./admin_components/AdminNotice";
import AdminManageHeader from "./admin_components/AdminManageHeader";
import AdminMainSitePopup from "./admin_components/AdminMainSitePopup";
import AdminRegistrarForms from "./admin_components/AdminRegistrarForms";
import AdminTeachers from "./admin_components/AdminTeachers";
import AdminEditTeacher from "./admin_components/AdminEditTeacher";

export default function App() {
  return (
    <>
      <AppToaster />

      <Routes>

        {/* PUBLIC WEBSITE */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="school" element={<TheSchool />} />
          <Route path="academics" element={<Academics />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="extracurricular" element={<ExtraCurricular />} />
          <Route path="notices" element={<Notices />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="mandatory-disclosure" element={<MandatoryDisclosure />} />
          <Route path="/admission-form" element={<RegistrationForm />} />
          <Route path="/fee-payment" element={<PayFee />} />
        </Route>

        {/* ADMIN LOGIN PAGE */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ADMIN AREA WITH SIDEBAR */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* DEFAULT PAGE = DASHBOARD */}
          <Route index element={<AdminDashboard />} />
          <Route path="registrations" element={<AdminRegistration />} />
          <Route path="registrations/:id" element={<AdminViewRegistration />} />
          <Route path="/admin/classes" element={<AdminClassFeeStructure />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/admission" element={<AdminAdmissions />} />
          <Route path="/admin/academics" element={<AdminAcademics />} />
          <Route path="/admin/extracurricular" element={<AdminExtraCurricular />} />
          <Route path="/admin/mandatory-disclosure" element={<AdminMandatoryDisclosure />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/contact" element={<AdminContact />} />
          <Route path="/admin/notices" element={<AdminNotice />} />
          <Route path="/admin/manage-header" element={<AdminManageHeader />} />
          <Route path="/admin/mainsitepopup" element={<AdminMainSitePopup />} />
          <Route path="/admin/registrar-form" element={<AdminRegistrarForms />} />
          <Route path="/admin/manage-teachers" element={<AdminTeachers />} />
          <Route path="/admin/add-teacher" element={<AdminEditTeacher />} />
          <Route path="/admin/edit-teacher/:id" element={<AdminEditTeacher />} />
        </Route>

      </Routes>
    </>
  );
}
