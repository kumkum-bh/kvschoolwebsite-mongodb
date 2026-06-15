// AdminHomeSecond.jsx
import React, { useEffect, useState } from "react";
import api, { API, showToast, showAlert } from "../api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../admin_styles/AdminHomeSecond.css";


export default function AdminHomeSecond() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await api.get(API.ADMIN_HOMESECOND.GET + "?schoolId=1");
      if (res.data && res.data.success) {
        // Ensure structure exists (defensive)
        showToast("Data fetched successfully");
        const d = res.data.data || {};
        const normalized = {
          welcomeSection: d.welcomeSection || {
            left: { bgImage: "", heading: "", paragraph: "" },
            right: { title: "Classes", classes: [], buttonLink: "/classes" },
          },
          activitySection: d.activitySection || { activities: [] },
          specialMomentsSection: d.specialMomentsSection || { moments: [] },
          principalMessageSection: d.principalMessageSection || { messages: [] },
          vicePrincipalMessageSection: d.vicePrincipalMessageSection || { vicePrincipals: [] },
          ...d,
        };
        setData(normalized);
      } else {
        setData({
          schoolId: 1,
          welcomeSection: {
            left: { bgImage: "", heading: "", paragraph: "" },
            right: { title: "Classes", classes: [], buttonLink: "/classes" },
          },
          activitySection: { activities: [] },
          specialMomentsSection: { moments: [] },
          principalMessageSection: { messages: [] },
          vicePrincipalMessageSection: { vicePrincipals: [] },
        });
        // showToast("Data fetched successfully");
      }
    } catch (err) {
      console.error("Load HomeSecond error", err);
      showAlert("Error fetching data");
    }
  };

  // Generic uploader - expects backend returns { filePath: "/assets/..." }
  const uploadImage = async (file) => {
    if (!file) return "";
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await api.post("/api/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data && (res.data.filePath || res.data.path)) {
        // try common keys
        return res.data.filePath || res.data.path;
      } else if (res.data && res.data.success && res.data.data?.filePath) {
        return res.data.data.filePath;
      } else {
        console.warn("Unexpected upload response:", res.data);
        return "";
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Image upload failed. See console.");
      return "";
    }
  };

  // Save entire document
  const saveChanges = async () => {
    if (!data) return;
    try {
      setSaving(true);
      // const res = await api.put("/api/homesecond/update?schoolId=1", data);
      const res = await api.put(API.ADMIN_HOMESECOND.UPDATE + "?schoolId=1", data);
      if (res.data && res.data.success) {
        showToast("Updated successfully!");
        await loadData();
      } else {
        showAlert("Update failed!");
        console.error("Save response:", res);
      }
    } catch (err) {
      console.error("Save error", err);
      showAlert("Update failed!");
    } finally {
      setSaving(false);
    }
  };

  // Helpers to modify nested arrays
  const addClassItem = () => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const nextId = Date.now();
      copy.welcomeSection.right.classes.push({
        id: nextId,
        classKey: "",
        className: "",
        heading: "",
        subheading: "",
        date: "",
        description: "",
      });
      return copy;
    });
  };

  const removeClassItem = (idx) => {
    if (!window.confirm("Remove this class?")) return;
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.welcomeSection.right.classes.splice(idx, 1);
      return copy;
    });
  };

  const addActivity = () => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.activitySection.activities.push({ icon: "📌", title: "", description: "" });
      return copy;
    });
  };

  const removeActivity = (idx) => {
    if (!window.confirm("Remove this activity?")) return;
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.activitySection.activities.splice(idx, 1);
      return copy;
    });
  };

  const addMoment = () => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.specialMomentsSection.moments.push({ image: "", description: "" });
      return copy;
    });
  };

  const removeMoment = (idx) => {
    if (!window.confirm("Remove this moment?")) return;
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.specialMomentsSection.moments.splice(idx, 1);
      return copy;
    });
  };

  const addPrincipal = () => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.principalMessageSection.messages.push({ image: "", title: "", description: "" });
      return copy;
    });
  };

  const removePrincipal = (idx) => {
    if (!window.confirm("Remove this principal message?")) return;
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.principalMessageSection.messages.splice(idx, 1);
      return copy;
    });
  };

  const addVP = () => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.vicePrincipalMessageSection.vicePrincipals.push({ image: "", subheading: "", description: "" });
      return copy;
    });
  };

  const removeVP = (idx) => {
    if (!window.confirm("Remove this vice principal?")) return;
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.vicePrincipalMessageSection.vicePrincipals.splice(idx, 1);
      return copy;
    });
  };

  // When user picks an image for any path, upload and set
  const handleFileChange = async (e, setPathCallback) => {
    const file = e.target.files[0];
    if (!file) return;
    const path = await uploadImage(file);
    if (path) setPathCallback(path);
  };

  if (!data) return <p>Loading...</p>;

  return (
  <div className="admin-home-second" style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
    <h1>Admin: Manage Home (HomeSecond)</h1>

    <hr />

    {/* -------- Welcome Section -------- */}
    <section style={{ marginBottom: 30 }}>
      <h2>Welcome Section (left)</h2>

      <label>Heading</label>
      <input
        type="text"
        value={data.welcomeSection.left.heading || ""}
        onChange={(e) =>
          setData((p) => ({ ...p, welcomeSection: { ...p.welcomeSection, left: { ...p.welcomeSection.left, heading: e.target.value } } }))
        }
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />

      <label>Paragraph (rich text)</label>
      <ReactQuill
        value={data.welcomeSection.left.paragraph || ""}
        onChange={(val) =>
          setData((p) => ({ ...p, welcomeSection: { ...p.welcomeSection, left: { ...p.welcomeSection.left, paragraph: val } } }))
        }
      />

      <div style={{ marginTop: 8 }}>
        <label>BG Image (current):</label>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
          <div style={{ width: 160, height: 90, background: "#eee", borderRadius: 6, overflow: "hidden" }}>
            {data.welcomeSection.left.bgImage ? (
              <img
                src={`http://localhost:5000${data.welcomeSection.left.bgImage}`}
                alt="bg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ padding: 12 }}>No image</div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleFileChange(e, (path) =>
                setData((p) => ({ ...p, welcomeSection: { ...p.welcomeSection, left: { ...p.welcomeSection.left, bgImage: path } } }))
              )
            }
          />
        </div>
      </div>
    </section>

    <hr />

    {/* -------- Welcome Right Classes (dynamic) -------- */}
    <section style={{ marginBottom: 30 }}>
      <h2>Welcome Section → Classes (dynamic)</h2>
      <div style={{ marginBottom: 8 }}>
        <label>Right Title</label>
        <input
          type="text"
          value={data.welcomeSection.right.title || ""}
          onChange={(e) =>
            setData((p) => ({ ...p, welcomeSection: { ...p.welcomeSection, right: { ...p.welcomeSection.right, title: e.target.value } } }))
          }
          style={{ width: "60%", padding: 8 }}
        />
        <label style={{ marginLeft: 12 }}>Button Link</label>
        <input
          type="text"
          value={data.welcomeSection.right.buttonLink || ""}
          onChange={(e) =>
            setData((p) => ({ ...p, welcomeSection: { ...p.welcomeSection, right: { ...p.welcomeSection.right, buttonLink: e.target.value } } }))
          }
          style={{ width: "30%", padding: 8, marginLeft: 8 }}
        />
      </div>

      <div>
        {data.welcomeSection.right.classes.map((cls, idx) => (
          <div key={cls.id || idx} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>
                Class #{idx + 1} — {cls.className || "(no name)"}
              </strong>
              <div>
                <button onClick={() => removeClassItem(idx)} style={{ marginLeft: 8 }} className="btn-delete">
                  Delete
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
              <input
                placeholder="classKey"
                value={cls.classKey || ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setData((p) => {
                    const copy = JSON.parse(JSON.stringify(p));
                    copy.welcomeSection.right.classes[idx].classKey = v;
                    return copy;
                  });
                }}
              />
              <input
                placeholder="className"
                value={cls.className || ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setData((p) => {
                    const copy = JSON.parse(JSON.stringify(p));
                    copy.welcomeSection.right.classes[idx].className = v;
                    return copy;
                  });
                }}
              />
              <input
                placeholder="heading"
                value={cls.heading || ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setData((p) => {
                    const copy = JSON.parse(JSON.stringify(p));
                    copy.welcomeSection.right.classes[idx].heading = v;
                    return copy;
                  });
                }}
              />
              <input
                placeholder="subheading"
                value={cls.subheading || ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setData((p) => {
                    const copy = JSON.parse(JSON.stringify(p));
                    copy.welcomeSection.right.classes[idx].subheading = v;
                    return copy;
                  });
                }}
              />
              <input
                placeholder="date (YYYY-MM-DD)"
                value={cls.date || ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setData((p) => {
                    const copy = JSON.parse(JSON.stringify(p));
                    copy.welcomeSection.right.classes[idx].date = v;
                    return copy;
                  });
                }}
              />
              <textarea
                placeholder="description"
                value={cls.description || ""}
                onChange={(e) => {
                  const v = e.target.value;
                  setData((p) => {
                    const copy = JSON.parse(JSON.stringify(p));
                    copy.welcomeSection.right.classes[idx].description = v;
                    return copy;
                  });
                }}
              />
            </div>
          </div>
        ))}

        <button onClick={addClassItem} className="btn btn-add">
          + Add Class
        </button>
      </div>
    </section>

    <hr />

    {/* -------- Activity Section (5 boxes dynamic) -------- */}
    <section style={{ marginBottom: 30 }}>
      <h2>Activity Section (dynamic)</h2>
      <div>
        {data.activitySection.activities.map((act, idx) => (
          <div key={idx} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
            <input
              placeholder="icon (emoji)"
              value={act.icon || ""}
              onChange={(e) => {
                const v = e.target.value;
                setData((p) => {
                  const copy = JSON.parse(JSON.stringify(p));
                  copy.activitySection.activities[idx].icon = v;
                  return copy;
                });
              }}
              style={{ width: 80 }}
            />
            <input
              placeholder="title"
              value={act.title || ""}
              onChange={(e) => {
                const v = e.target.value;
                setData((p) => {
                  const copy = JSON.parse(JSON.stringify(p));
                  copy.activitySection.activities[idx].title = v;
                  return copy;
                });
              }}
              style={{ flex: 1 }}
            />
            <input
              placeholder="description"
              value={act.description || ""}
              onChange={(e) => {
                const v = e.target.value;
                setData((p) => {
                  const copy = JSON.parse(JSON.stringify(p));
                  copy.activitySection.activities[idx].description = v;
                  return copy;
                });
              }}
              style={{ flex: 2 }}
            />
            <button onClick={() => removeActivity(idx)} className="btn-delete">
              Delete
            </button>
          </div>
        ))}
        <button onClick={addActivity} className="btn btn-add">
          + Add Activity
        </button>
      </div>
    </section>

    <hr />

    {/* -------- Special Moments -------- */}
    <section style={{ marginBottom: 30 }}>
      <h2>Special Moments (dynamic)</h2>
      <div>
        {data.specialMomentsSection.moments.map((m, idx) => (
          <div key={idx} style={{ border: "1px solid #eee", padding: 10, borderRadius: 8, marginBottom: 8 }}>
            <div className="row-top">
              <div style={{ width: 140, height: 80, background: "#fafafa", borderRadius: 6, overflow: "hidden" }}>
                {m.image ? (
                  <img
                    src={`http://localhost:5000${m.image}`}
                    alt={m.description || ""}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ padding: 8 }}>No image</div>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <input
                  placeholder="description"
                  value={m.description || ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setData((p) => {
                      const copy = JSON.parse(JSON.stringify(p));
                      copy.specialMomentsSection.moments[idx].description = v;
                      return copy;
                    });
                  }}
                  style={{ width: "100%", marginBottom: 6 }}
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(e, (path) =>
                      setData((p) => {
                        const copy = JSON.parse(JSON.stringify(p));
                        copy.specialMomentsSection.moments[idx].image = path;
                        return copy;
                      })
                    )
                  }
                />
              </div>

              <div>
                <button onClick={() => removeMoment(idx)} className="btn-delete">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        <button onClick={addMoment} className="btn btn-add">
          + Add Moment
        </button>
      </div>
    </section>

    <hr />

    {/* -------- Principal Messages -------- */}
    <section style={{ marginBottom: 30 }}>
      <h2>Principal Messages (dynamic)</h2>
      <div>
        {data.principalMessageSection.messages.map((msg, idx) => (
          <div key={idx} style={{ border: "1px solid #eee", padding: 12, borderRadius: 8, marginBottom: 8 }}>
            <div className="row-top">
              <div className="principal-img-box">
                <div style={{ width: 140, height: 100, background: "#fafafa", overflow: "hidden", borderRadius: 8 }}>
                  {msg.image ? (
                    <img
                      src={`http://localhost:5000${msg.image}`}
                      alt={msg.title || ""}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ padding: 10 }}>No image</div>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(e, (path) =>
                      setData((p) => {
                        const copy = JSON.parse(JSON.stringify(p));
                        copy.principalMessageSection.messages[idx].image = path;
                        return copy;
                      })
                    )
                  }
                  style={{ marginTop: 8 }}
                />
              </div>

              <div className="principal-content">
                <input
                  placeholder="title"
                  value={msg.title || ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setData((p) => {
                      const copy = JSON.parse(JSON.stringify(p));
                      copy.principalMessageSection.messages[idx].title = v;
                      return copy;
                    });
                  }}
                  style={{ width: "100%" }}
                />

                <ReactQuill
                  value={msg.description || ""}
                  onChange={(val) =>
                    setData((p) => {
                      const copy = JSON.parse(JSON.stringify(p));
                      copy.principalMessageSection.messages[idx].description = val;
                      return copy;
                    })
                  }
                />
              </div>

              <button onClick={() => removePrincipal(idx)} className="btn-delete">
                Delete
              </button>
            </div>
          </div>
        ))}

        <button onClick={addPrincipal} className="btn btn-add">
          + Add Principal Message
        </button>
      </div>
    </section>

    <hr />

    {/* -------- Vice Principals -------- */}
    <section style={{ marginBottom: 40 }}>
      <h2>Vice Principals (dynamic)</h2>
      <div>
        {data.vicePrincipalMessageSection.vicePrincipals.map((vp, idx) => (
          <div key={idx} style={{ border: "1px solid #eee", padding: 10, borderRadius: 8, marginBottom: 8 }}>
            <div className="row-top">
              <div className="vp-img-box">
                <div style={{ width: 140, height: 100, background: "#fafafa", overflow: "hidden", borderRadius: 8 }}>
                  {vp.image ? (
                    <img
                      src={`http://localhost:5000${vp.image}`}
                      alt={vp.subheading || ""}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ padding: 8 }}>No image</div>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(e, (path) =>
                      setData((p) => {
                        const copy = JSON.parse(JSON.stringify(p));
                        copy.vicePrincipalMessageSection.vicePrincipals[idx].image = path;
                        return copy;
                      })
                    )
                  }
                  style={{ marginTop: 8 }}
                />
              </div>

              <div className="vp-content">
                <input
                  placeholder="subheading"
                  value={vp.subheading || ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setData((p) => {
                      const copy = JSON.parse(JSON.stringify(p));
                      copy.vicePrincipalMessageSection.vicePrincipals[idx].subheading = v;
                      return copy;
                    });
                  }}
                  style={{ width: "100%" }}
                />
                <textarea
                  placeholder="description"
                  value={vp.description || ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setData((p) => {
                      const copy = JSON.parse(JSON.stringify(p));
                      copy.vicePrincipalMessageSection.vicePrincipals[idx].description = v;
                      return copy;
                    });
                  }}
                  style={{ width: "100%", minHeight: 80 }}
                />
              </div>

              <button onClick={() => removeVP(idx)} className="btn-delete">
                Delete
              </button>
            </div>
          </div>
        ))}

        <button onClick={addVP} className="btn btn-add">
          + Add Vice Principal
        </button>
      </div>
    </section>

    <div style={{ display: "flex", gap: 12 }}>
      <button className="btn btn-save" onClick={saveChanges} disabled={saving} style={{ padding: "10px 18px", fontWeight: 700 }}>
        {saving ? "Saving..." : "Save All Changes"}
      </button>
      <button onClick={loadData} style={{ padding: "10px 18px" }} className="btn btn-reload">
        Reload from DB
      </button>
    </div>

    <div style={{ height: 60 }} />
  </div>
);

}
