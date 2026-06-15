import React, { useState } from "react";
import api, { API, showToast } from "../api";
import "../styles/RegistrationForm.css";

export default function AdmissionForm() {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({});
  const [photoPreview, setPhotoPreview] = useState({
    studentPhoto: null,
    fatherPhoto: null,
    motherPhoto: null,
  });
  const [admissionNo, setAdmissionNo] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file" && files[0]) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      setPhotoPreview((prev) => ({ ...prev, [name]: URL.createObjectURL(files[0]) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const goNextFromInstructions = () => {
    if (!agreed) {
      showToast("You must agree to proceed", "error");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in form) {
        if (form[key] !== undefined && form[key] !== null) formData.append(key, form[key]);
      }
      const res = await api.post(API.ADMISSIONS.CREATE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAdmissionNo(res.data.admission.admissionNo);
      showToast("Registration Successful!");
      setStep(3);
    } catch (err) {
      console.error(err);
      showToast("Failed to submit registration!", "error");
    }
  };

  return (
    <div className="admission-form-container">
      <h2>Registration Form</h2>

      {/* Stepper */}
      <div className="stepper">
        <div className={`step-item ${step === 1 ? "active" : step > 1 ? "done" : ""}`}>
          <div className="step-icon">1</div>
          <div className="step-label">Instructions</div>
        </div>
        <div className={`step-item ${step === 2 ? "active" : step > 2 ? "done" : ""}`}>
          <div className="step-icon">2</div>
          <div className="step-label">Student & Parent Details</div>
        </div>
        <div className={`step-item ${step === 3 ? "active" : ""}`}>
          <div className="step-icon">3</div>
          <div className="step-label">Complete</div>
        </div>
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div className="step-content">
          <h3>General Instructions</h3>
          <p>Please read all instructions carefully before filling the Online Registration Form.</p>
          <p>We recommend using Chrome or Firefox. Filling this form does not guarantee admission; admission is strictly as per MERIT and no donation is accepted.</p>
          <p>You would be required to upload certain documents before starting.</p>
          <p>The intimation for assessment/interaction/admission confirmation will be notified via Email/SMS.</p>

          <h3>Documents Required During the Admission Process</h3>
          <p>Applicants: Passport size picture, Birth certificate, Transfer certificate & Report card.</p>
          <p>Parents: Passport size picture, PAN card and Aadhaar Card.</p>
          <p>All files &lt; 1MB and PDF/JPEG/JPG. Birth certificate issued by Govt accepted. Late/incomplete forms not considered.</p>

          <h3>Online Registration Process</h3>
          <p>You need Debit/Credit card or Net Banking. An acknowledgement Email with “Registration No” will be sent. Admission Fee link will be sent via Email/SMS.</p>

          <div className="agree-checkbox">
            <input type="checkbox" id="agree" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <label htmlFor="agree">I have read and agree to abide by the instructions</label>
          </div>

          <button onClick={goNextFromInstructions} className="btn-next">Proceed</button>
        </div>
      )}

      {step === 2 && (
        <div className="step-content form-step2-wrapper">
          <div className="form-step2-inner">
            <form className="step-content" onSubmit={handleSubmit}>
              <h3>Student & Parent Details</h3>
              <div className="checkbox-line">
                <label htmlFor="enquiryFilled">Have you filled enquiry form?</label>
                <input type="checkbox" id="enquiryFilled" name="enquiryFilled" onChange={handleChange} />
              </div>

              {/* Student Details */}
              <table className="details-table">
                <thead><tr><th>Student Details</th><th></th><th></th></tr></thead>
                <tbody>
                  <tr>
                    <td>Sibling (Real Brother/Sister) only studying in same school</td>
                    <td><input type="checkbox" name="siblingSameSchool" onChange={handleChange} /></td><td></td>
                  </tr>
                  <tr><td>Academic Year *</td><td><input name="academicYear" required onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Hostel (Boys) Required</td><td><input type="checkbox" name="hostelRequired" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Class *</td><td><input name="classApplied" required onChange={handleChange} /></td><td></td></tr>
                  <tr><td>First Name *</td><td><input name="studentFirstName" required onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Middle Name</td><td><input name="studentMiddleName" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Last Name *</td><td><input name="studentLastName" required onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Date of Birth *</td><td><input type="date" name="dob" required onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Aadhaar No.</td><td><input name="aadhaarNo" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Gender *</td><td><input name="gender" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Primary Mobile No. *</td><td><input name="primaryMobile" required onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Email Id</td><td><input name="studentEmail" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Category</td><td><input name="category" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Religion</td><td><input name="religion" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Blood Group</td><td><input name="bloodGroup" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Nationality</td><td><input name="nationality" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Birth Place</td><td><input name="birthPlace" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Mother Tongue</td><td><input name="motherTongue" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Previous School</td><td><input name="previousSchool" onChange={handleChange} /></td><td></td></tr>
                  <tr>
                    <td>School Transport Required</td>
                    <td><input type="checkbox" name="transportRequired" onChange={handleChange} /></td><td></td>
                  </tr>
                  <tr>
                    <td>Choose Student Photo</td>
                    <td>
                      <input type="file" name="studentPhoto" accept="image/*" onChange={handleChange} />
                      {photoPreview.studentPhoto && (
                        <img src={photoPreview.studentPhoto} alt="Student Preview" className="photo-preview" />
                      )}
                    </td>
                    <td>File size should not be more than 1 MB</td>
                  </tr>
                </tbody>
              </table>

              {/* Father Details */}
              <table className="details-table">
                <thead><tr><th>Father Details</th><th></th><th></th></tr></thead>
                <tbody>
                  <tr><td>First Name *</td><td><input name="fatherFirstName" required onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Middle Name</td><td><input name="fatherMiddleName" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Last Name *</td><td><input name="fatherLastName" required onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Mobile No. *</td><td><input name="fatherMobile" required onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Email Id</td><td><input name="fatherEmail" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Qualification</td><td><input name="fatherQualification" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Profession</td><td><input name="fatherProfession" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Designation</td><td><input name="fatherDesignation" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Organization Name</td><td><input name="fatherOrgName" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Organization Address</td><td><input name="fatherOrgAddress" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Annual Income</td><td><input name="fatherIncome" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Choose Father Photo</td>
                    <td>
                      <input type="file" name="fatherPhoto" accept="image/*" onChange={handleChange} />
                      {photoPreview.fatherPhoto && (
                        <img src={photoPreview.fatherPhoto} alt="Father Preview" className="photo-preview" />
                      )}
                    </td>
                    <td>File size should not be more than 1 MB</td>
                  </tr>
                </tbody>
              </table>

              {/* Mother Details */}
              <table className="details-table">
                <thead><tr><th>Mother Details</th><th></th><th></th></tr></thead>
                <tbody>
                  <tr><td>First Name *</td><td><input name="motherFirstName" required onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Middle Name</td><td><input name="motherMiddleName" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Last Name *</td><td><input name="motherLastName" required onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Mobile No. *</td><td><input name="motherMobile" required onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Email Id</td><td><input name="motherEmail" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Qualification</td><td><input name="motherQualification" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Profession</td><td><input name="motherProfession" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Designation</td><td><input name="motherDesignation" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Organization Name</td><td><input name="motherOrgName" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Organization Address</td><td><input name="motherOrgAddress" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Annual Income</td><td><input name="motherIncome" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Choose Mother Photo</td>
                    <td>
                      <input type="file" name="motherPhoto" accept="image/*" onChange={handleChange} />
                      {photoPreview.motherPhoto && (
                        <img src={photoPreview.motherPhoto} alt="Mother Preview" className="photo-preview" />
                      )}
                    </td>
                    <td>File size should not be more than 1 MB</td>
                  </tr>
                </tbody>
              </table>

              {/* Guardian Details */}
              <table className="details-table">
                <thead><tr><th>Guardian Detail If Any</th><th></th><th></th></tr></thead>
                <tbody>
                  <tr><td>First Name *</td><td><input name="guardianFirstName" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Middle Name *</td><td><input name="guardianMiddleName" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Last Name *</td><td><input name="guardianLastName" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Mobile No *</td><td><input name="guardianMobile" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Email Id</td><td><input name="guardianEmail" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Relation *</td><td><input name="guardianRelation" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Address *</td><td><input name="guardianAddress" onChange={handleChange} /></td><td></td></tr>
                </tbody>
              </table>

              {/* Corresponding Address */}
              <table className="details-table">
                <thead><tr><th>Corresponding Address</th><th></th><th></th></tr></thead>
                <tbody>
                  <tr><td>Address *</td><td><input name="correspondingAddress" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Country</td><td><input name="correspondingCountry" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>State</td><td><input name="correspondingState" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>City</td><td><input name="correspondingCity" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Pin Code</td><td><input name="correspondingPin" onChange={handleChange} /></td><td></td></tr>
                </tbody>
              </table>

              {/* Permanent Address */}
              <table className="details-table">
                <thead><tr><th>Permanent Address</th><th></th><th></th></tr></thead>
                <tbody>
                  <tr>
                    <td>Is Corresponding & Permanent Address same?</td>
                    <td><input type="checkbox" name="sameAddress" onChange={handleChange} /></td><td></td>
                  </tr>
                  <tr><td>Country</td><td><input name="permanentCountry" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>State</td><td><input name="permanentState" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>City</td><td><input name="permanentCity" onChange={handleChange} /></td><td></td></tr>
                  <tr><td>Pin Code</td><td><input name="permanentPin" onChange={handleChange} /></td><td></td></tr>
                </tbody>
              </table>

              <h3>Are you interested for Registration?</h3>
              <select name="interestedForRegistration" onChange={handleChange} required className="interested-select">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <div className="agree-checkbox">
                <input type="checkbox" id="declaration" required />
                <label htmlFor="declaration">I understand that incomplete application form will not be considered and details are correct</label>
              </div>

              <button type="submit" className="btn-next">Submit Registration</button>
            </form>
          </div>
        </div>
        
      )}

      {step === 3 && (
        <div className="step-content">
          <h3>Registration Complete</h3>
          <p>Admission No: <b>{admissionNo}</b></p>
        </div>
      )}
    </div>
  );
}

