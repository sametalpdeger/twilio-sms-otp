import twilio from 'twilio'
import type { Request, Response, NextFunction } from 'express'

const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env

const client = twilio(
    TWILIO_ACCOUNT_SID, 
    TWILIO_AUTH_TOKEN,
    {
        lazyLoading: true
    }
) 

export const sendOTP = async (req: Request, res: Response, next: NextFunction) => {  
    const countryCode = '90'
    const phoneNumber = '5358253164'
    
    // Validate required fields
    if (!countryCode || !phoneNumber) {
        return res.status(400).send('Country code and phone number are required')
    }

    try {
        const otpResponse = await client.verify
            ?.services(TWILIO_SERVICE_SID!)
            .verifications.create({
                to: `+${countryCode}${phoneNumber}`,
                channel: 'sms'
            })
        res.status(200).send(`OTP sent successfully!: ${JSON.stringify(otpResponse)}`)
    } catch (error: any) {
        res.status(error?.status || 400).send(error?.message || 'Something went wrong')
    }
}