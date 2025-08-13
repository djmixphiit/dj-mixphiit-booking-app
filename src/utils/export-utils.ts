import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { BookingData } from '../types/form-types';

export const generatePDF = async (data: BookingData): Promise<void> => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('DJ Mixphiit - Professional DJ Booking Contract', 20, 20);
  
  // Add client info
  doc.setFontSize(12);
  doc.text('Client Information:', 20, 40);
  doc.text(`Full Name: ${data.fullName}`, 20, 50);
  doc.text(`Phone: ${data.phoneNumber}`, 20, 60);
  doc.text(`Email: ${data.emailAddress}`, 20, 70);
  
  // Add event details
  doc.text('Event Details:', 20, 90);
  doc.text(`Event Date: ${data.eventDate ? data.eventDate.toLocaleDateString() : 'Not specified'}`, 20, 100);
  doc.text(`Event Time: ${data.eventTime}`, 20, 110);
  doc.text(`Venue: ${data.venueName}`, 20, 120);
  doc.text(`Address: ${data.venueAddress}`, 20, 130);
  doc.text(`Event Type: ${data.eventType}`, 20, 140);
  doc.text(`Estimated Guests: ${data.estimatedGuests}`, 20, 150);
  
  // Add package and services
  doc.text('Package & Services:', 20, 170);
  doc.text(`Package: ${data.packageSelected}`, 20, 180);
  doc.text(`Additional Services: ${data.additionalServices.join(', ')}`, 20, 190);
  
  // Add payment details
  doc.text('Payment Details:', 20, 210);
  doc.text(`Deposit Amount: ₦${data.depositAmount}`, 20, 220);
  doc.text(`Balance Due: ₦${data.balanceDue}`, 20, 230);
  
  // Add signature
  if (data.clientSignature) {
    doc.text('Client Signature:', 20, 250);
    doc.text('✓ Signed', 20, 260);
  }
  
  // Save the PDF
  doc.save(`DJ_Mixphiit_Contract_${data.fullName.replace(/\s+/g, '_')}.pdf`);
};

export const exportToExcel = async (data: BookingData): Promise<void> => {
  const worksheet = XLSX.utils.json_to_sheet([data]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Booking Data');
  
  // Save the Excel file
  XLSX.writeFile(workbook, `DJ_Mixphiit_Booking_${data.fullName.replace(/\s+/g, '_')}.xlsx`);
}; 