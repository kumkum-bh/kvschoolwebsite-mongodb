// import React, { useState, useEffect } from "react";
// import api, {API, showAlert, showToast} from "../api";
// import "../admin_styles/AdminManageHeader.css";

// export default function AdminHeader() {
//   const [content, setContent] = useState({
//     logo: "",
//     schoolName: "",    // heading → schoolName
//     subHeading: "",    // paragraph → subHeading
//     buttons: [],
//   });


//   const [navItems, setNavItems] = useState([]);

//   // Fields for adding new things
//   const [newButton, setNewButton] = useState({ text: "", link: "" });
//   const [newMenu, setNewMenu] = useState({ name: "", path: "", order: "" });

//   useEffect(() => {
//     fetchHeaderContent();
//     fetchMenu();
//   }, []);

//   const fetchHeaderContent = async () => {
//     try {
//       const res = await api.get(API.ADMIN_MANAGE_HEADER.GET_CONTENT);
//       if (res.data.success) showToast("Header content loaded successfully!");
//     } catch (err) {
//       showAlert({ icon: "error", title: "Error", text: "Failed to load header content." });
//     }
//   };

//   const fetchMenu = async () => {
//     try {
//       const res = await api.get(API.ADMIN_MANAGE_HEADER.GET_MENU);
//       if (res.data.success) showToast("Menu loaded successfully!");
//     } catch (err) {
//       showAlert({ icon: "error", title: "Error", text: "Failed to load menu." });
//     } 

//   };

//   const updateContent = async () => {
//     try {
//       await api.put(API.ADMIN_MANAGE_HEADER.UPDATE_CONTENT, content);
//       showToast("Header content updated successfully!");
//     } catch (err) {
//       showAlert({ icon: "error", title: "Update Failed", text: "Could not update header content." });
//     }
//   };

//   const addButton = () => {
//     if (!newButton.text) return;
//     setContent({
//       ...content,
//       buttons: [...content.buttons, newButton],
//     });
//     setNewButton({ text: "", link: "" });
//   };

//   const deleteButton = (i) => {
//     const arr = [...content.buttons];
//     arr.splice(i, 1);
//     setContent({ ...content, buttons: arr });
//   };

//   const addMenu = async () => {
//     if (!newMenu.name || !newMenu.path || !newMenu.order) return;
//     try{
//       // Convert order to number
//       await api.post(API.ADMIN_MANAGE_HEADER.ADD_MENU, newMenu, {
//         name: newMenu.name,
//         path: newMenu.path,
//         order: Number(newMenu.order)
//       });
//       showToast("Menu item added!");

//       setNewMenu({ name: "", path: "", order: "" });
//       fetchMenu();
//     } catch (err){
//       showAlert({ icon: "error", title: "Add Failed", text: "Could not add menu item." });
//     }
    
//   };


//   const deleteMenu = async (id) => {
//     try {
//       await api.delete(API.ADMIN_MANAGE_HEADER.DELETE_MENU(menuId));
//       showToast("Menu item deleted!");
//     } catch (err) {
//       showAlert({ icon: "error", title: "Delete Failed", text: "Could not delete menu item." });
//     }
//     fetchMenu();
//   };

//   return (
//     <div className="admin-header-wrapper">
//       <h2 className="page-title">Header Management</h2>

//       {/* --- Header Content Card --- */}
//       <div className="header-card">
//         <h3>Header Main Content</h3>

//         <label>School Name</label>
//         <input
//           value={content.schoolName}
//           onChange={(e) =>
//             setContent({ ...content, schoolName: e.target.value })
//           }
//         />

//         <label>Sub Heading</label>
//         <textarea
//           value={content.subHeading}
//           onChange={(e) =>
//             setContent({ ...content, subHeading: e.target.value })
//           }
//         />

//         <label>Logo URL</label>
//         <input
//           value={content.logo}
//           onChange={(e) => setContent({ ...content, logo: e.target.value })}
//         />

//         {/* Buttons Section */}
//         <div className="section-divider"></div>
//         <h4>Buttons</h4>

//         <div className="button-list">
//           {content.buttons?.map((btn, i) => (
//             <div className="button-item" key={i}>
//               <span>
//                 {btn.text} → {btn.link}
//               </span>

//               <button
//                 className="delete-btn"
//                 onClick={() => deleteButton(i)}
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="add-form">
//           <input
//             placeholder="Button Text"
//             value={newButton.text}
//             onChange={(e) =>
//               setNewButton({ ...newButton, text: e.target.value })
//             }
//           />
//           <input
//             placeholder="Button Link"
//             value={newButton.link}
//             onChange={(e) =>
//               setNewButton({ ...newButton, link: e.target.value })
//             }
//           />

//           <button className="add-btn" onClick={addButton}>
//             Add Button
//           </button>
//         </div>

//         <button className="save-btn" onClick={updateContent}>
//           Save Header
//         </button>
//       </div>

//       {/* --- Menu Items --- */}
//       <div className="header-card">
//         <h3>Navigation Menu</h3>

//         {navItems.map((m) => (
//           <div className="menu-item" key={m._id}>
//             <span>
//               {m.order}. {m.name} → {m.path}
//             </span>

//             <button
//               className="delete-btn"
//               onClick={() => deleteMenu(m._id)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}

//         <div className="add-form">
//           <input
//             placeholder="Menu Name"
//             value={newMenu.name}
//             onChange={(e) =>
//               setNewMenu({ ...newMenu, name: e.target.value })
//             }
//           />
//           <input
//             placeholder="Path (/page)"
//             value={newMenu.path}
//             onChange={(e) =>
//               setNewMenu({ ...newMenu, path: e.target.value })
//             }
//           />
//           <input
//             placeholder="Order"
//             type="number"
//             value={newMenu.order}
//             onChange={(e) =>
//               setNewMenu({ ...newMenu, order: e.target.value })
//             }
//           />

//           <button className="add-btn" onClick={addMenu}>
//             Add Menu
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import api, { API, showAlert, showToast } from "../api";
import "../admin_styles/AdminManageHeader.css";

export default function AdminHeader() {
  const [content, setContent] = useState({
    logo: "",
    schoolName: "",
    subHeading: "",
    buttons: [],
  });

  const [navItems, setNavItems] = useState([]);

  const [newButton, setNewButton] = useState({ text: "", link: "" });
  const [newMenu, setNewMenu] = useState({ name: "", path: "", order: "" });

  useEffect(() => {
    fetchHeaderContent();
    fetchMenu();
  }, []);

  const fetchHeaderContent = async () => {
    try {
      const res = await api.get(API.ADMIN_MANAGE_HEADER.GET_CONTENT);
      if (res.data.success) {
        setContent(res.data.content || {});
        showToast("Header content loaded successfully!");
      }
    } catch (err) {
      showAlert({
        icon: "error",
        title: "Error",
        text: "Failed to load header content.",
      });
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await api.get(API.ADMIN_MANAGE_HEADER.GET_MENU);
      if (res.data.success) {
        setNavItems(res.data.menu);
        showToast("Menu loaded successfully!");
      }
    } catch (err) {
      showAlert({
        icon: "error",
        title: "Error",
        text: "Failed to load menu.",
      });
    }
  };

  const updateContent = async () => {
    try {
      await api.put(API.ADMIN_MANAGE_HEADER.UPDATE_CONTENT, content);
      showToast("Header content updated successfully!");
    } catch (err) {
      showAlert({
        icon: "error",
        title: "Update Failed",
        text: "Could not update header content.",
      });
    }
  };

  const addButton = () => {
    if (!newButton.text) return;
    setContent({
      ...content,
      buttons: [...content.buttons, newButton],
    });
    setNewButton({ text: "", link: "" });
  };

  const deleteButton = (i) => {
    const arr = [...content.buttons];
    arr.splice(i, 1);
    setContent({ ...content, buttons: arr });
  };

  const addMenu = async () => {
    if (!newMenu.name || !newMenu.path || !newMenu.order) return;

    try {
      await api.post(API.ADMIN_MANAGE_HEADER.ADD_MENU, {
        name: newMenu.name,
        path: newMenu.path,
        order: Number(newMenu.order),
      });

      showToast("Menu item added!");
      setNewMenu({ name: "", path: "", order: "" });
      fetchMenu();
    } catch (err) {
      showAlert({
        icon: "error",
        title: "Add Failed",
        text: "Could not add menu item.",
      });
    }
  };

  const deleteMenu = async (id) => {
    try {
      await api.delete(API.ADMIN_MANAGE_HEADER.DELETE_MENU(id));
      showToast("Menu item deleted!");
      fetchMenu();
    } catch (err) {
      showAlert({
        icon: "error",
        title: "Delete Failed",
        text: "Could not delete menu item.",
      });
    }
  };

  return (
    <div className="admin-header-wrapper">
      <h2 className="page-title">Header Management</h2>

      {/* Header Content */}
      <div className="header-card">
        <h3>Header Main Content</h3>

        <label>School Name</label>
        <input
          value={content.schoolName}
          onChange={(e) =>
            setContent({ ...content, schoolName: e.target.value })
          }
        />

        <label>Sub Heading</label>
        <textarea
          value={content.subHeading}
          onChange={(e) =>
            setContent({ ...content, subHeading: e.target.value })
          }
        />

        <label>Logo URL</label>
        <input
          value={content.logo}
          onChange={(e) =>
            setContent({ ...content, logo: e.target.value })
          }
        />

        <div className="section-divider"></div>
        <h4>Buttons</h4>

        <div className="button-list">
          {content.buttons?.map((btn, i) => (
            <div className="button-item" key={i}>
              <span>
                {btn.text} → {btn.link}
              </span>

              <button className="delete-btn" onClick={() => deleteButton(i)}>
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="add-form">
          <input
            placeholder="Button Text"
            value={newButton.text}
            onChange={(e) =>
              setNewButton({ ...newButton, text: e.target.value })
            }
          />
          <input
            placeholder="Button Link"
            value={newButton.link}
            onChange={(e) =>
              setNewButton({ ...newButton, link: e.target.value })
            }
          />

          <button className="add-btn" onClick={addButton}>
            Add Button
          </button>
        </div>

        <button className="save-btn" onClick={updateContent}>
          Save Header
        </button>
      </div>

      {/* Menu Items */}
      <div className="header-card">
        <h3>Navigation Menu</h3>

        {navItems.map((m) => (
          <div className="menu-item" key={m._id}>
            <span>
              {m.order}. {m.name} → {m.path}
            </span>

            <button className="delete-btn" onClick={() => deleteMenu(m._id)}>
              Delete
            </button>
          </div>
        ))}

        <div className="add-form">
          <input
            placeholder="Menu Name"
            value={newMenu.name}
            onChange={(e) =>
              setNewMenu({ ...newMenu, name: e.target.value })
            }
          />
          <input
            placeholder="Path (/page)"
            value={newMenu.path}
            onChange={(e) =>
              setNewMenu({ ...newMenu, path: e.target.value })
            }
          />
          <input
            placeholder="Order"
            type="number"
            value={newMenu.order}
            onChange={(e) =>
              setNewMenu({ ...newMenu, order: e.target.value })
            }
          />

          <button className="add-btn" onClick={addMenu}>
            Add Menu
          </button>
        </div>
      </div>
    </div>
  );
}














































