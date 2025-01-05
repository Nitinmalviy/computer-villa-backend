export const generateOTPEmailTemplate = (otp: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Trip Planner - OTP Verification</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a202c; margin: 0; padding: 0; background-color: #f7fafc;">
    <div style="max-width: 600px; margin: 20px auto; background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tr>
                <td style="padding: 40px 30px;">
                    <h1 style="color: #ffffff; text-align: center; font-size: 28px; font-weight: 700; margin-bottom: 20px; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">AI Trip Planner</h1>
                    <div style="background-color: rgba(255, 255, 255, 0.9); border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <p style="font-size: 18px; text-align: center; color: #4a5568; margin-bottom: 20px;">Your OTP for verification is:</p>
                        <p style="font-size: 36px; font-weight: bold; text-align: center; color: #4c51bf; letter-spacing: 5px; margin: 30px 0; background-color: #edf2f7; padding: 15px; border-radius: 5px;">${otp}</p>
                        <p style="font-size: 16px; text-align: center; color: #718096; margin-bottom: 30px;">This OTP will expire in 2 minutes.</p>
                        <div style="text-align: center;">
                            <a href="#" style="background-color: #4c51bf; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 18px; font-weight: 600; display: inline-block; transition: background-color 0.3s ease;">Verify Email</a>
                        </div>
                    </div>
                    <p style="font-size: 14px; text-align: center; margin-top: 30px; color: #e2e8f0;">If you didn't request this OTP, please ignore this email.</p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
`;
