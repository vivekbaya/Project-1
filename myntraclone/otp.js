
export function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtpEmail(userEmail) {
    const otp = generateOTP();
    const expiryTime = new Date(Date.now() + 15 * 60 * 1000).toLocaleString(); 

    const templateParams = {
        passcode: otp,    
        time: expiryTime, 
        email: userEmail  
    };

    try {
        const response = await emailjs.send('service_v4a9l4x', 'template_v29bfff', templateParams);
        console.log('SUCCESS!', response.status, response.text);
        return otp; 
    } catch (error) {
        console.error('FAILED...', error);
        throw new Error('Failed to send OTP.');
    }
}

