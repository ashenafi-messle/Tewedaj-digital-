import { randomInt, randomUUID } from 'crypto';
import { PaymentProvider, SendOtpInput, SendOtpResult, VerifyOtpResult } from './types';

type OtpSession = {
  otp: string;
  customerPhone: string;
  telebirrAccount: string;
  agreementId: string;
  createdAt: number;
  lastSentAt: number;
  attempts: number;
};

const OTP_TTL_MS = 5 * 60 * 1000;
const RESEND_COOLDOWN_MS = 45 * 1000;
const MAX_ATTEMPTS = 5;
const sessions = new Map<string, OtpSession>();

export class MockTelebirrProvider implements PaymentProvider {
  async sendOtp(input: SendOtpInput): Promise<SendOtpResult> {
    const now = Date.now();
    const existing = [...sessions.entries()].find(([, session]) =>
      session.customerPhone === input.customerPhone && session.agreementId === input.agreementId
    );

    if (existing && now - existing[1].lastSentAt < RESEND_COOLDOWN_MS) {
      return { success: false, message: 'Please wait before requesting another verification code.' };
    }

    const verificationId = randomUUID();
    const otp = String(randomInt(100000, 1000000));
    sessions.set(verificationId, {
      ...input,
      otp,
      createdAt: now,
      lastSentAt: now,
      attempts: 0
    });

    // The OTP stays server-side; a future protected development panel can expose it safely.
    return { success: true, verificationId };
  }

  async verifyOtp(verificationId: string, otp: string): Promise<VerifyOtpResult> {
    const session = sessions.get(verificationId);
    if (!session || Date.now() - session.createdAt > OTP_TTL_MS) {
      sessions.delete(verificationId);
      return { success: false, message: 'This verification code has expired. Request a new code.' };
    }

    if (session.attempts >= MAX_ATTEMPTS) {
      return { success: false, message: 'Too many attempts. Please request a new verification code.' };
    }

    session.attempts += 1;
    if (session.otp !== otp.replace(/\D/g, '')) {
      return { success: false, message: 'Incorrect verification code. Please try again.' };
    }

    sessions.delete(verificationId);
    return {
      success: true,
      mandateId: `MND-${randomInt(100000, 1000000)}`,
      authorizationStatus: 'AUTHORIZED'
    };
  }
}
