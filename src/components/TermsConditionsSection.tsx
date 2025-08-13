import React, { useState, useRef } from 'react';
import { BookingData } from '../types/form-types';

interface TermsConditionsSectionProps {
  formData: BookingData;
  onInputChange: (field: keyof BookingData, value: any) => void;
}

export function TermsConditionsSection({ formData, onInputChange }: TermsConditionsSectionProps) {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSignatureStart = () => {
    setIsDrawing(true);
  };

  const handleSignatureMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#ff6b35';
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleSignatureEnd = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL();
      onInputChange('clientSignature', dataURL);
      onInputChange('signatureDate', new Date());
    }
  };

  const clearSignature = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onInputChange('clientSignature', '');
        onInputChange('signatureDate', undefined);
      }
    }
  };

  return (
    <div className="form-section">
      <h3>Terms & Conditions</h3>
      
      <div className="space-y-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Terms and Conditions</h4>
          <div className="text-sm text-gray-700 space-y-2 max-h-40 overflow-y-auto">
            <p><strong>1. Booking Confirmation:</strong> A 50% deposit is required to secure your booking date. The remaining balance is due 7 days before the event.</p>
            <p><strong>2. Cancellation Policy:</strong> Cancellations made 14+ days before the event receive a 50% refund. Cancellations within 7-13 days receive a 25% refund. No refunds for cancellations within 7 days of the event.</p>
            <p><strong>3. Equipment & Setup:</strong> DJ Mixphiit will arrive 1 hour before the scheduled start time to set up equipment. Setup time is included in your package.</p>
            <p><strong>4. Music Selection:</strong> While we accommodate your music preferences, DJ Mixphiit reserves the right to play appropriate music for the event atmosphere and audience.</p>
            <p><strong>5. Venue Requirements:</strong> The venue must provide adequate power outlets and a safe, dry area for equipment setup.</p>
            <p><strong>6. Liability:</strong> DJ Mixphiit is not responsible for any damage to venue property or injury to guests during the event.</p>
            <p><strong>7. Weather Conditions:</strong> For outdoor events, a backup indoor location must be available in case of inclement weather.</p>
            <p><strong>8. Payment Terms:</strong> All payments must be made in Nigerian Naira (₦). Bank transfers and cash payments are accepted.</p>
            <p><strong>9. Service Hours:</strong> Standard packages include 4 hours of DJ service. Extended hours are available at additional cost.</p>
            <p><strong>10. Agreement:</strong> By signing below, you agree to these terms and conditions and confirm your booking with DJ Mixphiit.</p>
          </div>
        </div>

        <div className="form-field">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={(e) => onInputChange('termsAccepted', e.target.checked)}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              required
            />
            <span className="text-sm font-medium text-gray-700">
              I have read and agree to the terms and conditions above *
            </span>
          </label>
        </div>

        <div className="form-field">
          <label className="form-label required-field">Client Signature</label>
          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <canvas
              ref={canvasRef}
              width={400}
              height={150}
              className="border border-gray-300 rounded cursor-crosshair"
              onMouseDown={handleSignatureStart}
              onMouseMove={handleSignatureMove}
              onMouseUp={handleSignatureEnd}
              onMouseLeave={handleSignatureEnd}
            />
            <div className="mt-2 flex space-x-2">
              <button
                type="button"
                onClick={clearSignature}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Clear Signature
              </button>
              <span className="text-xs text-gray-500">
                Click and drag to sign above
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>Important:</strong> Your signature confirms that you have read, understood, and agree to all terms and conditions. 
            This form serves as a legally binding contract between you and DJ Mixphiit.
          </p>
        </div>
      </div>
    </div>
  );
} 