import React, { useEffect, useState } from "react";
import api, { API } from "../api";
import "../admin_styles/AdminClassFeeStructure.css";

export default function AdminClassesWithFee() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [feeData, setFeeData] = useState({ items: [], total: 0 });

  // Load all classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get(API.ADMIN_CLASS_LIST.CLASSES);
        if (res.data.success) {
          setClasses(res.data.classes);
          if (res.data.classes.length > 0) loadFeeStructure(res.data.classes[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchClasses();
  }, []);

  // Load fee structure (original + check for admin updates)
  const loadFeeStructure = async (cls) => {
    try {
      setSelectedClass(cls);

      // Original fee structure
      const resOriginal = await api.get(API.ADMIN_CLASS_DETAIL.FEE(cls.className));
      let originalFee = resOriginal.data.feeStructure || { items: [], total: 0 };

      // Admin updated fee structure (override if exists)
      const resUpdated = await api.get(API.ADMIN_CLASS_DETAIL.UPDATED_FEE(cls.className));
      let updatedFee = resUpdated.data.feeStructure;
      if (updatedFee && updatedFee.items.length > 0) {
        originalFee = updatedFee; // override originalFee with admin updates
      }

      setFeeData(originalFee);

    } catch (err) {
      console.log(err);
    }
  };

  // Handle amount change
  const updateAmount = (index, value) => {
    const updated = [...feeData.items];
    updated[index].amount = Number(value);
    const total = updated.reduce((s, i) => s + Number(i.amount), 0);
    setFeeData({ ...feeData, items: updated, total });
  };

  // Add new item
  const addItem = () => {
    setFeeData({
      ...feeData,
      items: [...feeData.items, { itemName: "New Item", amount: 0 }],
    });
  };

  // Delete item
  const deleteItem = (index) => {
    const updated = feeData.items.filter((_, i) => i !== index);
    const total = updated.reduce((s, i) => s + Number(i.amount), 0);
    setFeeData({ ...feeData, items: updated, total });
  };

  // Save changes permanently to AdminFeeStructure
  const saveChanges = async () => {
    if (!selectedClass) return;

    try {
      await api.post(API.ADMIN_CLASS_DETAIL.UPDATE_FEE(selectedClass.className), {
        items: feeData.items,
      });

      // Refetch updated data from AdminFeeStructure after save
      const resUpdated = await api.get(API.ADMIN_CLASS_DETAIL.UPDATED_FEE(selectedClass.className));
      if (resUpdated.data.feeStructure && resUpdated.data.feeStructure.items.length > 0) {
        setFeeData(resUpdated.data.feeStructure);
      }

      alert("Fee structure updated permanently!");
    } catch (err) {
      console.error("Error updating fee", err);
      alert("Failed to update fee. Check console.");
    }
  };

  return (
    <div className="classes-fee-layout">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <h3>All Classes</h3>
        <ul className="class-list">
          {classes.map((cls) => (
            <li
              key={cls._id}
              className={selectedClass?.className === cls.className ? "active" : ""}
              onClick={() => loadFeeStructure(cls)}
            >
              Class {cls.className}
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        {selectedClass ? (
          <>
            <h2>Fee Structure - Class {selectedClass.className}</h2>

            <div className="fee-card">
              <table className="fee-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Amount (₹)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {feeData.items.length > 0 ? (
                    feeData.items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            value={item.itemName}
                            onChange={(e) => {
                              const updated = [...feeData.items];
                              updated[index].itemName = e.target.value;
                              setFeeData({ ...feeData, items: updated });
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={item.amount}
                            onChange={(e) => updateAmount(index, e.target.value)}
                          />
                        </td>
                        <td>
                          <button className="delete-btn" onClick={() => deleteItem(index)}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>No Items Found</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <button className="add-btn" onClick={addItem}>+ Add Item</button>
              <h3 className="total-text">Total: ₹{feeData.total}</h3>
              <button className="save-btn" onClick={saveChanges}>Save Changes</button>
            </div>
          </>
        ) : (
          <h3 className="select-class-text">Select a class from the left.</h3>
        )}
      </div>
    </div>
  );
}
