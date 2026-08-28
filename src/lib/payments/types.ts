export interface SendOtpInput {
  customerPhone: string;
  telebirrAccount: string;
  agreementId: string;
}

export interface SendOtpResult {
  success: boolean;
  verificationId?: string;
  message?: string;
}

export interface VerifyOtpResult {
  success: boolean;
  mandateId?: string;
  authorizationStatus?: 'AUTHORIZED' | 'FAILED';
  message?: string;
}

export interface PaymentProvider {
  sendOtp(input: SendOtpInput): Promise<SendOtpResult>;
  verifyOtp(verificationId: string, otp: string): Promise<VerifyOtpResult>;
}
