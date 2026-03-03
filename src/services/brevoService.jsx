// Brevo API Base URL
const BREVO_API_URL = 'https://api.brevo.com/v3';

// Vite environment variables (import.meta.env instead of process.env)
const getEnv = (key) => {
  // Try VITE_ prefix first, then fallback to REACT_APP_ prefix
  return import.meta.env[`VITE_${key}`] || import.meta.env[`REACT_APP_${key}`];
};

// Helper function to call Brevo API
const callBrevoAPI = async (endpoint, method = 'POST', body = null) => {
  const apiKey = getEnv('BREVO_API_KEY');
  
  if (!apiKey) {
    console.error('❌ Brevo API key not found in environment variables');
    throw new Error('Brevo API key not configured');
  }

  const options = {
    method,
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  console.log('🔵 Calling Brevo API:', endpoint);

  const response = await fetch(`${BREVO_API_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const error = await response.json();
    console.error('❌ Brevo API Error:', error);
    console.error('❌ Status:', response.status);
    console.error('❌ Endpoint:', endpoint);
    throw new Error(error.message || 'Brevo API request failed');
  }

  const result = await response.json();
  console.log('✅ Brevo API Success:', result);
  return result;
};

// ============================================
// CONTACT SUPPORT EMAILS
// ============================================
export const sendSupportEmails = async ({ name, email, subject, message }) => {
  try {
    const currentDate = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || name;
    const lastName = nameParts.slice(1).join(' ') || '';

    // Create/update contact
    try {
      await callBrevoAPI('/contacts', 'POST', {
        email: email,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName
        },
        updateEnabled: true
      });
    } catch (error) {
      console.log('Contact already exists');
    }

    // 1. Send auto-reply to user
    await callBrevoAPI('/smtp/email', 'POST', {
      to: [{ email: email, name: name }],
      templateId: parseInt(getEnv('BREVO_TEMPLATE_SUPPORT_USER')),
      params: {
        user_message: message,
        submission_date: currentDate,
        support_subject: subject
      }
    });

    // 2. Send notification to admin
    await callBrevoAPI('/smtp/email', 'POST', {
      to: [{ email: getEnv('ADMIN_EMAIL'), name: 'PTDT Admin' }],
      templateId: parseInt(getEnv('BREVO_TEMPLATE_SUPPORT_ADMIN')),
      params: {
        user_name: name,
        user_message: message,
        submission_date: currentDate,
        support_subject: subject
      },
      sender: {
        email: getEnv('SENDER_EMAIL_SUPPORT'),
        name: 'PTDT Support System'
      },
      replyTo: { email: email, name: name }
    });

    return { success: true, message: 'Support email sent successfully!' };
  } catch (error) {
    console.error('Brevo Support Email Error:', error);
    throw new Error('Failed to send support emails');
  }
};

// ============================================
// NEWSLETTER SUBSCRIPTION EMAILS
// ============================================
export const sendNewsletterEmails = async ({ email }) => {
  try {
    const currentDate = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Create/update contact
    try {
      await callBrevoAPI('/contacts', 'POST', {
        email: email,
        attributes: {
          NEWSLETTER_SUBSCRIBED: true,
          SUBSCRIPTION_DATE: currentDate
        },
        updateEnabled: true
      });
    } catch (error) {
      console.log('Contact already exists');
    }

    // 1. Send confirmation to subscriber
    await callBrevoAPI('/smtp/email', 'POST', {
      to: [{ email: email }],
      templateId: parseInt(getEnv('BREVO_TEMPLATE_NEWSLETTER_USER')),
      params: {
        subscription_date: currentDate
      }
    });

    // 2. Send notification to admin
    await callBrevoAPI('/smtp/email', 'POST', {
      to: [{ email: getEnv('ADMIN_EMAIL'), name: 'PTDT Admin' }],
      templateId: parseInt(getEnv('BREVO_TEMPLATE_NEWSLETTER_ADMIN')),
      params: {
        subscription_date: currentDate
      }
    });

    return { success: true, message: 'Newsletter subscription successful!' };
  } catch (error) {
    console.error('Brevo Newsletter Email Error:', error);
    throw new Error('Failed to subscribe to newsletter');
  }
};

// ============================================
// SIGNUP WELCOME EMAILS (SUPABASE VERSION)
// ============================================
export const sendSignupEmails = async ({ fullName, email, country, wallet }) => {
  try {
    const currentDate = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || fullName;
    const lastName = nameParts.slice(1).join(' ') || '';

    // NOTE: User data is now stored in Supabase, not localStorage!
    // The Signup.jsx component handles Supabase insertion

    // Create/update contact in Brevo
    try {
      await callBrevoAPI('/contacts', 'POST', {
        email: email,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
          COUNTRY: country,
          WALLET_ADDRESS: wallet,
          SIGNUP_DATE: currentDate,
          TOKEN_SALE_REGISTERED: true
        },
        updateEnabled: true
      });
    } catch (error) {
      console.log('Contact already exists in Brevo');
    }

    // 1. Send welcome email to user
    // Note: No login token needed - user is already authenticated via Supabase
    await callBrevoAPI('/smtp/email', 'POST', {
      to: [{ email: email, name: fullName }],
      templateId: parseInt(getEnv('BREVO_TEMPLATE_SIGNUP_USER')),
      params: {
        full_name: fullName,
        first_name: firstName,
        country: country,
        wallet: wallet,
        signup_date: currentDate,
        dashboard_url: 'https://ptdt.taxi/#participate',
        dapp_url: 'https://dapp.ptdt.taxi'
      }
    });

    // 2. Send notification to admin
    await callBrevoAPI('/smtp/email', 'POST', {
      to: [{ email: getEnv('ADMIN_EMAIL'), name: 'PTDT Admin' }],
      templateId: parseInt(getEnv('BREVO_TEMPLATE_SIGNUP_ADMIN')),
      params: {
        full_name: fullName,
        user_email: email,
        country: country,
        wallet: wallet,
        signup_date: currentDate
      }
    });

    console.log('✅ Signup welcome emails sent successfully to:', email);
    return { success: true, message: 'Signup emails sent successfully!' };
  } catch (error) {
    console.error('Brevo Signup Email Error:', error);
    throw new Error('Failed to send signup emails');
  }
};

// ============================================
// SIGN IN NOTIFICATION (OPTIONAL - Supabase handles auth)
// ============================================
export const sendSignInNotification = async ({ email, fullName }) => {
  try {
    const currentDate = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    // Optional: Send admin notification on sign-in
    await callBrevoAPI('/smtp/email', 'POST', {
      to: [{ email: getEnv('ADMIN_EMAIL'), name: 'PTDT Admin' }],
      templateId: parseInt(getEnv('BREVO_TEMPLATE_SIGNIN_ADMIN')),
      params: {
        user_name: fullName,
        user_email: email,
        signin_date: currentDate
      }
    });

    console.log('✅ Sign-in notification sent to admin');
    return { success: true };
  } catch (error) {
    console.error('Brevo Sign-In Notification Error:', error);
    // Don't throw - this is optional
    return { success: false };
  }
};

// ============================================
// DEPRECATED - Supabase now handles authentication
// Keeping for backward compatibility but not used
// ============================================
export const sendSignInCode = async ({ email, fullName, verificationCode }) => {
  console.warn('⚠️ sendSignInCode is deprecated. Supabase handles authentication now.');
  
  // This function is no longer needed since we use Supabase password auth
  // But keeping it to prevent import errors in case it's called somewhere
  
  return { 
    success: true, 
    message: 'Using Supabase authentication instead of email codes.' 
  };
};

export default {
  sendSupportEmails,
  sendNewsletterEmails,
  sendSignupEmails,
  sendSignInNotification,
  sendSignInCode // Deprecated but kept for compatibility
};