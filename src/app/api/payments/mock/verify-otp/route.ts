import { NextRequest, NextResponse } from 'next/server';
import { getPaymentProvider } from '../../../../../lib/payments/provider';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { verificationId, otp } = body;
    if (!verificationId || !otp) {
      return NextResponse.json({ success: false, message: 'Verification ID and code are required.' }, { status: 400 });
    }

    const result = await getPaymentProvider().verifyOtp(verificationId, otp);
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch {
    return NextResponse.json({ success: false, message: 'Unable to verify the sandbox code.' }, { status: 400 });
  }
}
