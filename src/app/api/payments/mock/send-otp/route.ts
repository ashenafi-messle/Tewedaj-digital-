import { NextRequest, NextResponse } from 'next/server';
import { getPaymentProvider } from '../../../../../lib/payments/provider';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerPhone, telebirrAccount, agreementId } = body;
    if (!customerPhone || !telebirrAccount || !agreementId) {
      return NextResponse.json({ success: false, message: 'Customer phone, account, and agreement are required.' }, { status: 400 });
    }

    const result = await getPaymentProvider().sendOtp({ customerPhone, telebirrAccount, agreementId });
    return NextResponse.json(result, { status: result.success ? 200 : 429 });
  } catch {
    return NextResponse.json({ success: false, message: 'Unable to send the sandbox verification code.' }, { status: 400 });
  }
}
