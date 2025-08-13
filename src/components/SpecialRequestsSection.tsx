import React from 'react';
import { BookingData } from '../types/form-types';

interface SpecialRequestsSectionProps {
  formData: BookingData;
  onInputChange: (field: keyof BookingData, value: any) => void;
}

export function SpecialRequestsSection({ formData, onInputChange }: SpecialRequestsSectionProps) {
  const additionalServices = [
    'Lighting Effects',
    'Fog Machine',
    'Photo Booth',
    'Video Recording',
    'Custom Playlist',
    'MC Services',
    'Equipment Setup',
    'Extended Hours'
  ];

  const handleServiceToggle = (service: string) => {
    const currentServices = formData.additionalServices;
    if (currentServices.includes(service)) {
      onInputChange('additionalServices', currentServices.filter(s => s !== service));
    } else {
      onInputChange('additionalServices', [...currentServices, service]);
    }
  };

  return (
    <div className="form-section">
      <h3>Special Requests & Preferences</h3>
      <div className="space-y-6">
        <div className="form-field">
          <label className="form-label required-field">Package Selected</label>
          <select
            className="form-select"
            value={formData.packageSelected}
            onChange={(e) => onInputChange('packageSelected', e.target.value)}
            required
          >
            <option value="">Select a package</option>
            <option value="Basic Package">Basic Package - ₦50,000</option>
            <option value="Standard Package">Standard Package - ₦75,000</option>
            <option value="Premium Package">Premium Package - ₦100,000</option>
            <option value="VIP Package">VIP Package - ₦150,000</option>
            <option value="Custom Package">Custom Package - Contact for pricing</option>
          </select>
        </div>

        <div className="form-field">
          <label className="form-label">Additional Services</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {additionalServices.map((service) => (
              <label key={service} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.additionalServices.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">{service}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">Music Preferences</label>
          <textarea
            className="form-textarea"
            value={formData.musicPreferences}
            onChange={(e) => onInputChange('musicPreferences', e.target.value)}
            placeholder="What type of music do you prefer? (e.g., Afrobeat, Hip-hop, R&B, Pop, etc.)"
            rows={3}
          />
        </div>

        <div className="form-field">
          <label className="form-label">Do Not Play List</label>
          <textarea
            className="form-textarea"
            value={formData.doNotPlayList}
            onChange={(e) => onInputChange('doNotPlayList', e.target.value)}
            placeholder="Any songs or genres you don't want played?"
            rows={3}
          />
        </div>

        <div className="form-field">
          <label className="form-label">Other Instructions</label>
          <textarea
            className="form-textarea"
            value={formData.otherInstructions}
            onChange={(e) => onInputChange('otherInstructions', e.target.value)}
            placeholder="Any other special requests or instructions for your event?"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
} 