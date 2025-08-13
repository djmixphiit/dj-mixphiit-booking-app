import React from 'react';
import { BookingData } from '../types/form-types';

interface PaymentDetailsSectionProps {
  formData: BookingData;
  onInputChange: (field: keyof BookingData, value: any) => void;
}

export function PaymentDetailsSection({ formData, onInputChange }: PaymentDetailsSectionProps) {
  return (
    <div className="form-section">
      <h3>Payment Details</h3>
      <div className="form-grid">
        <div className="form-field">
          <label className="form-label">Deposit Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">₦</span>
            <input
              type="number"
              className="form-input pl-8"
              value={formData.depositAmount}
              onChange={(e) => onInputChange('depositAmount', e.target.value)}
              placeholder="0.00"
              min="0"
              step="1000"
            />
          </div>
        </div>
        
        <div className="form-field">
          <label className="form-label">Deposit Date Paid</label>
          <input
            type="date"
            className="form-input"
            value={formData.depositDatePaid}
            onChange={(e) => onInputChange('depositDatePaid', e.target.value)}
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Balance Due</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">₦</span>
            <input
              type="number"
              className="form-input pl-8"
              value={formData.balanceDue}
              onChange={(e) => onInputChange('balanceDue', e.target.value)}
              placeholder="0.00"
              min="0"
              step="1000"
            />
          </div>
        </div>
        
        <div className="form-field">
          <label className="form-label">Balance Due Date</label>
          <input
            type="date"
            className="form-input"
            value={formData.balanceDueDate ? formData.balanceDueDate.toISOString().split('T')[0] : ''}
            onChange={(e) => onInputChange('balanceDueDate', e.target.value ? new Date(e.target.value) : undefined)}
          />
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">Payment Terms</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 50% deposit required to secure your booking date</li>
          <li>• Remaining balance due 7 days before the event</li>
          <li>• All payments in Nigerian Naira (₦)</li>
          <li>• Bank transfer or cash payments accepted</li>
        </ul>
      </div>
    </div>
  );
} 