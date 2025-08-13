import React from 'react';
import { BookingData } from '../types/form-types';

interface EventDetailsSectionProps {
  formData: BookingData;
  onInputChange: (field: keyof BookingData, value: any) => void;
}

export function EventDetailsSection({ formData, onInputChange }: EventDetailsSectionProps) {
  return (
    <div className="form-section">
      <h3>Event Details</h3>
      <div className="form-grid">
        <div className="form-field">
          <label className="form-label required-field">Event Date</label>
          <input
            type="date"
            className="form-input"
            value={formData.eventDate ? formData.eventDate.toISOString().split('T')[0] : ''}
            onChange={(e) => onInputChange('eventDate', e.target.value ? new Date(e.target.value) : undefined)}
            required
          />
        </div>
        
        <div className="form-field">
          <label className="form-label required-field">Event Time</label>
          <input
            type="time"
            className="form-input"
            value={formData.eventTime}
            onChange={(e) => onInputChange('eventTime', e.target.value)}
            required
          />
        </div>
        
        <div className="form-field">
          <label className="form-label required-field">Venue Name</label>
          <input
            type="text"
            className="form-input"
            value={formData.venueName}
            onChange={(e) => onInputChange('venueName', e.target.value)}
            placeholder="Enter venue name"
            required
          />
        </div>
        
        <div className="form-field">
          <label className="form-label required-field">Venue Address</label>
          <input
            type="text"
            className="form-input"
            value={formData.venueAddress}
            onChange={(e) => onInputChange('venueAddress', e.target.value)}
            placeholder="Enter full venue address"
            required
          />
        </div>
        
        <div className="form-field">
          <label className="form-label required-field">Event Type</label>
          <select
            className="form-select"
            value={formData.eventType}
            onChange={(e) => onInputChange('eventType', e.target.value)}
            required
          >
            <option value="">Select event type</option>
            <option value="Wedding">Wedding</option>
            <option value="Birthday Party">Birthday Party</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Graduation">Graduation</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Club Night">Club Night</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-field">
          <label className="form-label required-field">Estimated Guests</label>
          <input
            type="number"
            className="form-input"
            value={formData.estimatedGuests}
            onChange={(e) => onInputChange('estimatedGuests', e.target.value)}
            placeholder="Number of guests"
            min="1"
            required
          />
        </div>
      </div>
    </div>
  );
} 