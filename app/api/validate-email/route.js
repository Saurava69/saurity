import { NextResponse } from 'next/server'

// Allowed email domains - same as client-side validation
const ALLOWED_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'yahoo.com',
  'ymail.com',
  'icloud.com',
  'me.com',
  'protonmail.com',
  'proton.me',
  'zoho.com',
  'aol.com',
  'mail.com',
  'gmx.com',
  'fastmail.com'
]

/**
 * Validates if an email domain is in the allowed list
 */
function isValidEmailDomain(email) {
  if (!email || typeof email !== 'string') {
    return false
  }
  
  const domain = email.split('@')[1]?.toLowerCase()
  return ALLOWED_DOMAINS.includes(domain)
}

/**
 * POST /api/validate-email
 * Validates email domain on the server-side
 */
export async function POST(request) {
  try {
    const { email } = await request.json()
    
    // Validate input
    if (!email) {
      return NextResponse.json(
        { 
          valid: false, 
          message: 'Email is required' 
        },
        { status: 400 }
      )
    }
    
    // Check if email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          valid: false, 
          message: 'Invalid email format' 
        },
        { status: 400 }
      )
    }
    
    // Validate domain
    const isValid = isValidEmailDomain(email)
    
    return NextResponse.json({
      valid: isValid,
      message: isValid 
        ? 'Email domain is valid' 
        : 'Please use a trusted email provider (Gmail, Hotmail, Outlook, Yahoo, iCloud, ProtonMail, etc.)'
    })
    
  } catch (error) {
    console.error('Email validation error:', error)
    return NextResponse.json(
      { 
        valid: false, 
        message: 'Validation error occurred' 
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/validate-email
 * Returns list of allowed domains
 */
export async function GET() {
  return NextResponse.json({
    allowedDomains: ALLOWED_DOMAINS,
    count: ALLOWED_DOMAINS.length
  })
}
