import axios from "axios";

const sendEmail = async (to, subject, htmlContent) =>
{
    try
    {
        const res = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: { email: process.env.SENDER_EMAIL },
                to: [{ email: to }],
                subject,
                htmlContent
            },
            {
                headers:
                {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("✅ Email sent:", res.data);
    }
    catch (error)
    {
        console.log("❌ Email error:", error.response?.data || error.message);
    }
};

export default sendEmail;