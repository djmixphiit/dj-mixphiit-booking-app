import React from 'react';
import { BookingData } from '../types/form-types';

interface ClientInfoSectionProps {
  formData: BookingData;
  onInputChange: (field: keyof BookingData, value: any) => void;
}

export function ClientInfoSection({ formData, onInputChange }: ClientInfoSectionProps) {
  return (
    <div className="form-section">
      <h3>Client Information</h3>
      <div className="form-grid">
        <div className="form-field">
          <label className="form-label required-field">Full Name</label>
          <input
            type="text"
            className="form-input"
            value={formData.fullName}
            onChange={(e) => onInputChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="form-field">
          <label className="form-label required-field">Phone Number</label>
          <input
            type="tel"
            className="form-input"
            value={formData.phoneNumber}
            onChange={(e) => onInputChange('phoneNumber', e.target.value)}
            placeholder="+234-90-3697-3816"
            required
          />
        </div>
        
        <div className="form-field">
          <label className="form-label required-field">Email Address</label>
          <input
            type="email"
            className="form-input"
            value={formData.emailAddress}
            onChange={(e) => onInputChange('emailAddress', e.target.value)}
            placeholder="your.email@example.com"
            required
          />
        </div>
      </div>
    </div>
  );
} 