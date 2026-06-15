import React, { useEffect, useState } from "react";
import api, { API, showToast, showAlert } from "../api";
import { useParams } from "react-router-dom";

export default function AdminMandatoryDisclosure() {
  const { schoolId } = useParams();
  const finalSchoolId = schoolId || 1;

  const [disclosure, setDisclosure] = useState(null);
  const [loading, setLoading] = useState(true);

  // Convert object {1:{},2:{}} → array [{id:1, ...}]
  const convertToArray = (obj) => {
    if (!obj || typeof obj !== "object") return [];
    return Object.keys(obj)
      .filter((key) => obj[key] && typeof obj[key] === "object")
      .map((key) => ({
        _id: key,
        ...obj[key],
      }));
  };

  // Fetch disclosure data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`${API.ADMIN_MANDATORY_DISCLOSURE.GET}/${finalSchoolId}`);
        setDisclosure(res.data.data);
      } catch (err) {
        console.error("Error fetching:", err);
        showAlert({ icon: "error", title: "Error", text: "Failed to load data" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [finalSchoolId]);

  if (loading) return <p>Loading...</p>;
  if (!disclosure) return <p>No data found</p>;

  // Convert sections
  const sections = ["generalInformation", "documents", "staff", "infrastructure", "resultAcademics"];
  const sectionLabels = {
    generalInformation: "General Information",
    documents: "Documents",
    staff: "Staff Details",
    infrastructure: "Infrastructure",
    resultAcademics: "Result (Academics)",
  };

  // Handle input changes dynamically
  const handleChange = (section, idx, field, value) => {
    setDisclosure((prev) => {
      const updatedSection = { ...prev[section] };
      updatedSection[idx][field] = value;
      return { ...prev, [section]: updatedSection };
    });
  };

  // Save updates to MongoDB
  const handleSave = async () => {
    try {
      await api.post(`${API.ADMIN_MANDATORY_DISCLOSURE.UPDATE}/${finalSchoolId}`, disclosure);
      showToast("Updated successfully!");
    } catch (err) {
      console.error(err);
      showAlert({ icon: "error", title: "Error", text: "Failed to update" });
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin: Mandatory Disclosure</h2>

      {sections.map((section) => {
        const items = convertToArray(disclosure[section]);
        return (
          <div key={section} style={{ marginBottom: "20px" }}>
            <h3>{sectionLabels[section]}</h3>
            {items.map((item, idx) => (
              <div key={item._id} style={{ marginBottom: "10px" }}>
                {section === "documents" || section === "resultAcademics" ? (
                  <>
                    <input
                      type="text"
                      value={item.doc || item.title || ""}
                      onChange={(e) => handleChange(section, item._id, "title", e.target.value)}
                      placeholder="Document / Title"
                      style={{ width: "40%", marginRight: "10px" }}
                    />
                    <input
                      type="text"
                      value={item.link || item.file || ""}
                      onChange={(e) => handleChange(section, item._id, "file", e.target.value)}
                      placeholder="Link"
                      style={{ width: "50%" }}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={item.info || ""}
                      onChange={(e) => handleChange(section, item._id, "info", e.target.value)}
                      placeholder="Information"
                      style={{ width: "30%", marginRight: "10px" }}
                    />
                    <input
                      type="text"
                      value={item.details || ""}
                      onChange={(e) => handleChange(section, item._id, "details", e.target.value)}
                      placeholder="Details"
                      style={{ width: "60%" }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        );
      })}

      <button
        onClick={handleSave}
        style={{ padding: "10px 20px", background: "#1d4ed8", color: "#000", border: "none", borderRadius: "5px" }}
      >
        Save Changes
      </button>
    </div>
  );
}
























