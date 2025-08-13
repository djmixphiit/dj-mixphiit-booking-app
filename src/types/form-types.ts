export interface BookingData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  eventDate: Date | undefined;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  eventType: string;
  estimatedGuests: string;
  packageSelected: string;
  additionalServices: string[];
  musicPreferences: string;
  doNotPlayList: string;
  otherInstructions: string;
  depositAmount: string;
  depositDatePaid: string;
  balanceDue: string;
  balanceDueDate: Date | undefined;
  termsAccepted: boolean;
  clientSignature: string;
  signatureDate: Date | undefined;
} 