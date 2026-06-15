import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

// export const SERVER_URL =
//   process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
export const SERVER_URL =
  process.env.REACT_APP_SERVER_URL;


const api = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
});


export const AppToaster = () => <Toaster position="top-right" reverseOrder={false} />;


export const API = {
  MAIN_POPUP: {
    GET: "/api/main-site-popup",
  },
  HOME: {
    GET: "/api/home",
  },
  ADMISSIONS_PAGE: {
    GET: "/api/admissions/admissions-page",
  },
  ADMISSIONS: {
    CREATE: "/api/registrations/create",
  },

  ACADEMICS: {
    GET: "/api/academics",
  },
  GALLERY: {
    GET_ALL: "/api/gallery",
  },
  CONTACT: {
    GET: "/api/contact",
  },
  EXTRACURRICULAR: {
    GET: "/api/extracurricular",
  },
  MANDATORY_DISCLOSURE: {
    GET: "/api/mandatory-disclosure",
  },
  Notices: {
    GET: "/api/download",
  },

  FEES: {
    GET_BY_ADMISSION: "/api/fees/",   
    PAY: "/api/fees/pay",
  },



  ADMIN: {
    LOGIN: "/api/admin/login",
    SECURE: "/api/admin/secure-data",
  },

  ADMIN_REGISTRATIONS: {
    GET_ALL: "/api/adminregistrations/all",
    GET_ONE: "/api/adminregistrations/view/", 
  },

  ADMIN_CLASS_LIST: {
    CLASSES: "/api/admin-classlist/classes",
  },

  
  ADMIN_CLASS_DETAIL: {
    FEE: (className) => `/api/admin-classdetail/fees/${className}`,
    UPDATE_FEE: (className) => `/api/admin-classdetail/fees/update/${className}`,
    UPDATED_FEE: (className) => `/api/admin-classdetail/fees/admin/${className}`, 
  },

  ADMIN_ADMISSION: {
    GET: "/api/admissions-page",
    UPDATE: (schoolId) => `/api/admin/admissions/update/${schoolId}`,
  },


  ADMIN_ACADEMICS: {
    GET: "/api/academics",
    UPDATE: "/api/academics/update"
  },

  ADMIN_EXTRACURRICULAR: {
    GET: "/api/extracurricular",
    UPDATE: "/api/extracurricular/update",
  },

  ADMIN_MANDATORY_DISCLOSURE: {
    GET: "/api/mandatory-disclosure",
    UPDATE: "/api/mandatory-disclosure/update",
  },

  ADMIN_GALLERY: {
    GET_ALL: "/api/gallery",
    ADD: "/api/gallery/add",
    DELETE: "/api/gallery/delete",
  },

  ADMIN_CONTACT: {
    GET: "/api/contact",
    UPDATE: "/api/contact/update",
  },

  ADMIN_HOME: {
    GET: (schoolId) => `/api/home/${schoolId}`, // GET home page data
    UPDATE: (schoolId) => `/api/admin/home/update/${schoolId}`, // POST update home page
  },

  ADMIN_MANAGE_HEADER: {
    // Header content
    GET_CONTENT: "/api/admin-header/content",
    UPDATE_CONTENT: "/api/admin-header/content/update",

    // Navigation menu
    GET_MENU: "/api/admin-header/menu",
    ADD_MENU: "/api/admin-header/menu/add",
    // UPDATE_MENU: (id) => `/api/admin-header/menu/update/${id}`,
    DELETE_MENU: (id) => `/api/admin-header/menu/delete/${id}`,
  },

  // TEACHERS MODULE
  ADMIN_TEACHERS: {
    GET_ALL: (schoolId) => `/api/teachers?schoolId=${schoolId}`,
    DELETE: (id) => `/api/teachers/${id}`,
  },

  ADMIN_EDIT_TEACHERS: {
    GET: (id) => `/api/teachers/${id}`,
    ADD: `/api/teachers/add`,
    UPDATE: (id) => `/api/teachers/${id}`,
    UPLOAD_IMAGE: `/api/teachers/upload`,
  },

  ADMIN_NOTICE: {
    ADD: "/api/admin-notices/add",
    UPDATE: (id) => `/api/admin-notices/update/${id}`,
    DELETE: (id) => `/api/admin-notices/delete/${id}`,
    GET_ALL: "/api/admin-notices/all",
  },

  ADMIN_MAINSITEPOPUP: {
    GET: (schoolId) => `/api/admin-main-popup/get/${schoolId}`,
    UPDATE: (id) => `/api/admin-main-popup/update/${id}`,
  },









};


export const showToast = (msg, type = "success") => {
  if (type === "success") toast.success(msg);
  else if (type === "error") toast.error(msg);
  else toast(msg);
};


export const showAlert = async (options) => {
  return await Swal.fire(options);
};

export default api;


