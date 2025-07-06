// JobsScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const jobs = [
  // K’ima:w Medical Center jobs
  {
    title: "Complex Care Coordinator",
    department: "K’ima:w Medical Center",
    posted: "05/28/2025",
    closing: "Open Until Filled",
    link: "https://www.kimaw.org/jobs"
  },
  {
    title: "HR Clerk",
    department: "K’ima:w Medical Center",
    posted: "06/10/2025",
    closing: "Open Until Filled",
    link: "https://www.kimaw.org/jobs"
  },
  {
    title: "Licensed Vocational Nurse",
    department: "K’ima:w Medical Center",
    posted: "08/12/2024",
    closing: "Open Until Filled",
    link: "https://www.kimaw.org/jobs"
  },
  {
    title: "Staff Nurse RN",
    department: "K’ima:w Medical Center",
    posted: "10/24/2024",
    closing: "Open Until Filled",
    link: "https://www.kimaw.org/jobs"
  },
  {
    title: "Van Driver",
    department: "K’ima:w Medical Center",
    posted: "05/20/2025",
    closing: "Open Until Filled",
    link: "https://www.kimaw.org/jobs"
  },
  {
    title: "Senior Radiologic Technologist",
    department: "K’ima:w Medical Center",
    posted: "06/05/2023",
    closing: "Open Until Filled",
    link: "https://www.kimaw.org/jobs"
  },

  // Hoopa Valley Tribe jobs
  {
    title: "Heavy Equipment Operator",
    department: "Hoopa Forestry Department",
    posted: "2025",
    closing: "Apply via HR Facebook",
    link: "https://www.facebook.com/Hoopa-Valley-Tribe-Human-Resource-Department-100029157288832/"
  },
  {
    title: "Maintenance/Groundskeeper",
    department: "Hoopa Plant Management",
    posted: "2025",
    closing: "Apply via HR Facebook",
    link: "https://www.facebook.com/Hoopa-Valley-Tribe-Human-Resource-Department-100029157288832/"
  },
  {
    title: "Temporary Weir Worker",
    department: "Hoopa Fisheries Department",
    posted: "2025",
    closing: "Apply via HR Facebook",
    link: "https://www.facebook.com/Hoopa-Valley-Tribe-Human-Resource-Department-100029157288832/"
  },

  // Employment Application PDF
  {
    title: "Employment Application Form",
    department: "Hoopa Valley Tribe",
    posted: "Permanent",
    closing: "N/A",
    link: "https://www.hoopa-nsn.gov/wp-content/uploads/2016/06/Employment-Application.pdf"
  },
];

const JobsScreen = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.header}>Job Opportunities</Text>
    {jobs.map((job, i) => (
      <View key={i} style={styles.card}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.text}>Department: {job.department}</Text>
        <Text style={styles.text}>Posted: {job.posted}</Text>
        <Text style={styles.text}>Closing: {job.closing}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(job.link)}
        >
          <Text style={styles.buttonText}>
            {job.title === "Employment Application Form" ? "View / Download" : "Apply Now"}
          </Text>
        </TouchableOpacity>
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  card: { backgroundColor: '#f3f4f6', padding: 16, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  text: { fontSize: 14, marginBottom: 4, color: '#374151' },
  button: { marginTop: 8, backgroundColor: '#1e40af', paddingVertical: 10, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '500' },
});

export default JobsScreen;
