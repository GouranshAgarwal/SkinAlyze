// PatientDetails.jsx
import React from 'react';

const PatientDetails = ({ patient }) => {
  // This component would show a side panel with patient details
  // The actual implementation would depend on your design
  return (
    <div className="patient-details-panel">
      {patient && (
        <div>
          {/* Patient details would go here */}
          <h3>{patient.patientName}</h3>
          {/* Other details */}
        </div>
      )}
    </div>
  );
};

export default PatientDetails;