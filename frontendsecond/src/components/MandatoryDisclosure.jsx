import React, { useEffect, useState } from "react";
import "../styles/MandatoryDisclosure.css";
import Banner from "./Banner";
import api, { API, showToast, showAlert } from "../api";

const MandatoryDisclosure = () => {
  const [disclosure, setDisclosure] = useState({});

  useEffect(() => {
    const fetchDisclosure = async () => {
      try {
        const res = await api.get(API.MANDATORY_DISCLOSURE.GET, { params: { schoolId: 1 } });
        if (res.data.success) {
          setDisclosure(res.data.data.data || {}); // Note: data inside data
          showToast("Mandatory disclosure data loaded!");
        } else {
          showToast("No disclosure data found!");
        }
      } catch (err) {
        console.error(err);
        showAlert({
          icon: "error",
          title: "Error",
          text: "Failed to load mandatory disclosure data.",
        });
      }
    };
    fetchDisclosure();
  }, []);

  // Helper function to render key-value tables dynamically
  const renderKeyValueTable = (sectionData) => {
    return Object.keys(sectionData || {}).map((key, index) => {
      const item = sectionData[key];
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.info || item.doc}</td>
          <td>
            {item.details || item.link ? (
              item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
              ) : (
                item.details
              )
            ) : "-"}
          </td>
        </tr>
      );
    });
  };

  // Helper function to render results table (class X / XII)
  const renderResultsTable = (resultObj) => {
    return Object.keys(resultObj || {}).map((key, index) => {
      const item = resultObj[key];
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.year}</td>
          <td>{item.registered}</td>
          <td>{item.passed}</td>
          <td>{item.percent}</td>
          <td>{item.remarks}</td>
        </tr>
      );
    });
  };

  return (
    <div className="mandatory-container">
      {/* Banner */}
      <Banner image="/assets/banner-img1.jpg" />

      {/* Page Heading */}
      <h2 className="page-heading">Mandatory Disclosure</h2>

      {/* ================= A : GENERAL INFORMATION ================= */}
      <section className="section">
        <h3>A : GENERAL INFORMATION</h3>
        <table className="disclosure-table">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>INFORMATION</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {renderKeyValueTable(disclosure.generalInformation)}
          </tbody>
        </table>
      </section>

      {/* ================= B : DOCUMENTS AND INFORMATION ================= */}
      <section className="section">
        <h3>B : DOCUMENTS AND INFORMATION</h3>
        <table className="disclosure-table">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>DOCUMENTS / INFORMATION</th>
              <th>LINKS</th>
            </tr>
          </thead>
          <tbody>
            {renderKeyValueTable(disclosure.documents)}
          </tbody>
        </table>
        <p className="note">
          <b>NOTE:</b> The schools need to upload the self-attested copies of above listed documents by Chairman/Manager/Secretary and Principal. If any uploaded document is found non-genuine later, the school shall be liable for action as per norms.
        </p>
      </section>

      {/* ================= C : RESULT AND ACADEMICS ================= */}
      <section className="section">
        <h3>C : RESULT AND ACADEMICS</h3>
        <table className="disclosure-table">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>DOCUMENTS / INFORMATION</th>
              <th>LINKS</th>
            </tr>
          </thead>
          <tbody>
            {renderKeyValueTable(disclosure.resultAcademics)}
          </tbody>
        </table>
      </section>

      {/* ================= D : STAFF (TEACHING) ================= */}
      <section className="section">
        <h3>D : STAFF (TEACHING)</h3>
        <table className="disclosure-table">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>INFORMATION</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {renderKeyValueTable(disclosure.staff)}
          </tbody>
        </table>

        <h4>RESULT CLASS: X</h4>
        <table className="disclosure-table small">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>YEAR</th>
              <th>NO. OF REGISTERED STUDENTS</th>
              <th>NO. OF STUDENTS PASSED</th>
              <th>PASS PERCENTAGE</th>
              <th>REMARKS</th>
            </tr>
          </thead>
          <tbody>
            {renderResultsTable(disclosure.results?.classX)}
          </tbody>
        </table>

        <h4>RESULT CLASS: XII</h4>
        <table className="disclosure-table small">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>YEAR</th>
              <th>NO. OF REGISTERED STUDENTS</th>
              <th>NO. OF STUDENTS PASSED</th>
              <th>PASS PERCENTAGE</th>
              <th>REMARKS</th>
            </tr>
          </thead>
          <tbody>
            {renderResultsTable(disclosure.results?.classXII)}
          </tbody>
        </table>
      </section>

      {/* ================= E : SCHOOL INFRASTRUCTURE ================= */}
      <section className="section">
        <h3>E : SCHOOL INFRASTRUCTURE</h3>
        <table className="disclosure-table">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>INFORMATION</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {renderKeyValueTable(disclosure.infrastructure)}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default MandatoryDisclosure;
