import React, { useState } from 'react';
import { Button } from "./ui/button";
import { BookingData } from "../types/form-types";
import { ClientInfoSection } from "./ClientInfoSection";
import { EventDetailsSection } from "./EventDetailsSection";
import { SpecialRequestsSection } from "./SpecialRequestsSection";
import { PaymentDetailsSection } from "./PaymentDetailsSection";
import { TermsConditionsSection } from "./TermsConditionsSection";
import { generatePDF, exportToExcel } from "../utils/export-utils";
import { Download, FileSpreadsheet, FileText } from "lucide-react";

// Placeholder logo - you can replace this with your actual logo
const djMixphiitLogo = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZmY2YjM1Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+REogTWl4cGhpCjwvdGV4dD4KPC9zdmc+';

const initialFormData: BookingData = {
  fullName: '',
  phoneNumber: '',
  emailAddress: '',
  eventDate: undefined,
  eventTime: '',
  venueName: '',
  venueAddress: '',
  eventType: '',
  estimatedGuests: '',
  packageSelected: '',
  additionalServices: [],
  musicPreferences: '',
  doNotPlayList: '',
  otherInstructions: '',
  depositAmount: '',
  depositDatePaid: '',
  balanceDue: '',
  balanceDueDate: undefined,
  termsAccepted: false,
  clientSignature: '',
  signatureDate: undefined
};

export function DJBookingForm() {
  const [formData, setFormData] = useState<BookingData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleInputChange = (field: keyof BookingData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
      'fullName', 'phoneNumber', 'emailAddress', 'eventDate', 'eventTime', 
      'venueName', 'venueAddress', 'eventType', 'estimatedGuests', 'packageSelected'
    ];
    
    const missingFields = requiredFields.filter(field => {
      const value = formData[field as keyof BookingData];
      return !value || (typeof value === 'string' && value.trim() === '');
    });
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }
    
    if (!formData.clientSignature) {
      alert('Please provide your signature to complete the booking.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Auto-export to Excel when form is submitted
      await exportToExcel(formData);
      
      // Auto-generate PDF contract
      await generatePDF(formData);
      
      // Show success message
      alert('Booking contract submitted successfully! DJ Mixphiit will contact you within 24 hours to confirm all details. Your contract PDF and booking data Excel file have been downloaded.');
      
      // Reset form
      setFormData(initialFormData);
    } catch (error) {
      alert('There was an error processing your booking. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePDFExport = async () => {
    if (!formData.fullName) {
      alert('Please fill in at least the client name before exporting to PDF.');
      return;
    }
    
    setIsExporting(true);
    try {
      await generatePDF(formData);
    } catch (error) {
      alert('Error generating PDF. Please try again.');
      console.error('PDF export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExcelExport = async () => {
    if (!formData.fullName) {
      alert('Please fill in at least the client name before exporting to Excel.');
      return;
    }
    
    setIsExporting(true);
    try {
      await exportToExcel(formData);
    } catch (error) {
      alert('Error generating Excel file. Please try again.');
      console.error('Excel export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Watermark */}
      <div className="watermark">
        <img 
          src={djMixphiitLogo} 
          alt="DJ Mixphiit Watermark" 
          className="w-96 h-96 object-contain"
        />
      </div>
      
      <div className="max-w-4xl mx-auto p-6 space-y-8 relative z-10">
        {/* Header with Logo and Branding */}
        <div className="flex items-center justify-between">
          {/* Logo on the left */}
          <div className="flex items-center space-x-4">
            <img 
              src={djMixphiitLogo} 
              alt="DJ Mixphiit Logo" 
              className="h-24 w-auto object-contain"
            />
            <div className="space-y-1">
              <h1 className="text-4xl font-bold tracking-tight brand-gradient-text brand-glow">
                DJ MIXPHIIT
              </h1>
              <p className="text-xl font-semibold tracking-wider" style={{ color: '#ff6b35' }}>
                CROWD CONTROLLER
              </p>
            </div>
          </div>
          
          {/* Export buttons */}
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePDFExport}
              disabled={isExporting}
              className="flex items-center gap-2"
            >
              {isExporting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
              ) : (
                <FileText className="h-4 w-4" />
              )}
              Export PDF Contract
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleExcelExport}
              disabled={isExporting}
              className="flex items-center gap-2"
            >
              {isExporting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
              ) : (
                <FileSpreadsheet className="h-4 w-4" />
              )}
              Export Excel Data
            </Button>
          </div>
        </div>
        
        {/* Vibrant decorative line */}
        <div className="h-1 bg-gradient-to-r from-[#ff6b35] via-[#f7931e] to-[#ffd23f] rounded-full"></div>
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Professional DJ Booking Contract</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete this form to book DJ Mixphiit for your event. All fields marked with * are required. 
            This form serves as a binding contract upon completion and signature.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mx-auto max-w-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> You can export a professional PDF contract at any time using the "Export PDF Contract" button above.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <ClientInfoSection formData={formData} onInputChange={handleInputChange} />
          <EventDetailsSection formData={formData} onInputChange={handleInputChange} />
          <SpecialRequestsSection formData={formData} onInputChange={handleInputChange} />
          <PaymentDetailsSection formData={formData} onInputChange={handleInputChange} />
          <TermsConditionsSection formData={formData} onInputChange={handleInputChange} />

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || !formData.termsAccepted || isExporting}
              className="w-full md:w-auto px-12 py-3 text-lg"
              style={{ 
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffd23f 100%)',
                border: 'none'
              }}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Submitting Contract...
                </div>
              ) : (
                'Submit Booking Contract'
              )}
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground border-t pt-6">
            <p>© 2025 DJ Mixphiit - Mixphiit Enterprises</p>
            <p>Contact: +234-90-3697-3816 | djmixphiit@gmail.com</p>
            <p>Instagram: Vdj_mixphiit | TikTok: Vdj_mixphiit</p>
            <p className="text-xs mt-2">All payments in Nigerian Naira (₦) • Lagos, Nigeria</p>
          </div>
        </form>
      </div>
    </div>
  );
} 