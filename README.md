
# **ManoSarthi: Extending Mental Health Care to Homes**

## **Overview**

The ManoSarthi app empowers field health workers to extend mental health services to patients in rural and remote areas, connecting them to doctors and the healthcare system. It focuses on simplifying mental health screening, referral, and follow-up processes. By offering offline capabilities and multilingual support, the app ensures healthcare access, even in areas with limited connectivity.

## **Key Features**

- **Offline Functionality**: Data can be collected offline and synced later, ensuring uninterrupted service delivery.
- **Multilingual Support**: The app supports multiple languages to cater to diverse user groups.
- **Standardized Screening**: The app includes standardized mental health questionnaires to simplify screenings and diagnoses.
- **Referral & Follow-Up**: The app manages patient referrals and follow-up appointments efficiently with alerts and reminders.
- **Dashboard Integration**: Data integrates with state-level dashboards to allow for monitoring and program evaluation.

## **Functionality by Role**

### **1. Health Worker**
- Register patients, conduct mental health screenings, and manage follow-ups.
- Offline mode to work without internet, with auto-sync for updating data.
- Multilingual functionality to support workers in diverse areas.
- Alerts for missed follow-ups and wrong location during follow-ups.

### **2. Doctor**
- View patient data, medical history, and health trends.
- Use ICD10 codes to record diagnoses and prescribe treatments.
- Schedule follow-ups and manage patient lists.
  
### **3. Supervisor**
- Assign and manage health workers.
- Monitor worker activity and alert for missed follow-ups.
  
### **4. Admin**
- Manage doctor and supervisor assignments.
- Maintain data integrity across the system.
- Monitor healthcare programs via state-level dashboards.

## **Security & Privacy**

- **JWT for Authentication**: Secure transmission of data between app components using JSON Web Tokens (JWT).
- **AES Encryption**: Sensitive data, such as the patient’s AABHA ID, is encrypted using AES encryption standards.
- **Role-Based Access**: Only authorized personnel (health workers, doctors, supervisors) can access relevant data.
- **Data Retention**: Patient data is retained for ongoing use but accounts can be deactivated to ensure privacy.
