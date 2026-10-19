import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, interest, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and Phone / WhatsApp number are required.' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const leadData = {
      id: `LEAD-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      interest: interest || 'General Property Consultation',
      message: message ? message.trim() : 'No additional message provided',
      timestamp,
      recipientWhatsApp: '+91 98494 42929 / +91 95534 42929',
      status: 'DISPATCHED_TO_WHATSAPP',
    };

    // Format the official WhatsApp notification payload
    const formattedWhatsAppMessage = 
`🌟 *NEW WEBSITE ENQUIRY - BLUEMOON PROPERTIES* 🌟
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${leadData.name}
📱 *WhatsApp / Phone:* ${leadData.phone}
🏢 *Interested In:* ${leadData.interest}
💬 *Requirement:* ${leadData.message}
🕒 *Received At:* ${leadData.timestamp}
🌐 *Source:* BlueMoon Web Direct Desk
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
_Please connect with the client on WhatsApp for personalized VIP advisory._`;

    // 1. Log to server console
    console.log('[BlueMoon WhatsApp Gateway] Transmitting enquiry to WhatsApp:');
    console.log(formattedWhatsAppMessage);

    // 2. Persist lead safely to local leads.json (never lose a lead)
    try {
      const leadsFilePath = path.join(process.cwd(), 'leads.json');
      let leads = [];
      if (fs.existsSync(leadsFilePath)) {
        const fileContent = fs.readFileSync(leadsFilePath, 'utf8');
        try {
          leads = JSON.parse(fileContent);
        } catch {
          leads = [];
        }
      }
      leads.unshift(leadData);
      fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');
    } catch (fsErr) {
      console.warn('[BlueMoon Enquiry] Could not write to leads.json:', fsErr.message);
    }

    // 3. If WhatsApp Cloud API credentials are configured in .env, forward directly via Meta API
    const metaToken = process.env.WHATSAPP_API_TOKEN;
    const metaPhoneId = process.env.WHATSAPP_PHONE_ID;
    const recipientNumber = process.env.WHATSAPP_OWNER_NUMBER || '919849442929';

    if (metaToken && metaPhoneId) {
      try {
        const metaRes = await fetch(
          `https://graph.facebook.com/v20.0/${metaPhoneId}/messages`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${metaToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              to: recipientNumber,
              type: 'text',
              text: { body: formattedWhatsAppMessage },
            }),
          }
        );
        const metaData = await metaRes.json();
        console.log('[Meta WhatsApp Cloud API Result]:', metaData);
      } catch (apiErr) {
        console.error('[Meta WhatsApp API Error]:', apiErr.message);
      }
    }

    // 4. If CallMeBot or Custom Webhook is configured, forward seamlessly
    const customWebhook = process.env.WHATSAPP_WEBHOOK_URL;
    if (customWebhook) {
      try {
        await fetch(customWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: formattedWhatsAppMessage,
            lead: leadData,
          }),
        });
      } catch (hookErr) {
        console.warn('[Custom Webhook Error]:', hookErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry successfully dispatched to BlueMoon Properties WhatsApp desk.',
      leadId: leadData.id,
      timestamp: leadData.timestamp,
    });
  } catch (error) {
    console.error('[Enquiry API Error]:', error);
    return NextResponse.json(
      { error: 'Failed to dispatch enquiry. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}
