export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Email Verify</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #22D172;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Verify your email
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          You are just one step away to verify your account for this email: <span style="color: #4C83EE;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use below OTP to verify your account.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          This OTP is valid for 24 hours.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>

`

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Password Reset</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #22D172;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Forgot your password?
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          We received a password reset request for your account: <span style="color: #4C83EE;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use the OTP below to reset the password.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          The password reset otp is only valid for the next 15 minutes.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`
export const WELCOME_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome to BuyMe</title>
</head>
<body style="margin:0; padding:0; background-color:#f6eee4; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6eee4; padding:30px 0;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0"
          style="background-color:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 8px 25px rgba(0,0,0,0.08);">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding:40px 20px 20px;">
              <img
                src="E:/BUYME_UPDATION/Frontend/src/assets/BUYMELOGO4.png"
                alt="BuyMe Logo"
                width="120"
                style="display:block;"
              />
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" style="padding:10px 40px;">
              <h1 style="margin:0; font-size:28px; color:#4b2e1f; font-weight:700;">
                Welcome to BuyMe 🛍️
              </h1>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td align="center" style="padding:20px 40px;">
              <hr style="border:none; height:1px; background-color:#eee;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:0 50px; color:#444; font-size:15px; line-height:1.8;">

              <p style="margin-top:0;">Hey there 👋</p>

              <p>
                Welcome to <strong>BuyMe</strong> — where fashion meets simplicity.
              </p>

              <p>
                We’re genuinely excited to have you with us. You’re now part of a community
                that believes shopping should be smooth, stylish, and actually enjoyable.
              </p>

              <p style="margin-bottom:5px;">
                ✨ <strong>What you can expect from BuyMe</strong>
              </p>

              <ul style="padding-left:20px; margin-top:8px; margin-bottom:20px;">
                <li>Hand-picked fashion you’ll love</li>
                <li>Clean designs, no clutter</li>
                <li>Easy shopping, fast decisions</li>
                <li>Styles that just feel right</li>
              </ul>

              <p>
                Think of BuyMe as your go-to place when you want something that looks good
                without trying too hard.
              </p>

              <p>
                🛒 <strong>Your next move?</strong><br>
                Take a look around. Explore. Add to cart.<br>
                Your next favorite outfit might already be waiting 😉
              </p>

              <p>
                If you ever face an issue or just want to say hi, we’re always listening.
                Because BuyMe isn’t just a store — it’s built for you.
              </p>

              <p style="margin-bottom:0;">
                Happy shopping 💛<br>
                <strong>Team BuyMe</strong>
              </p>

            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:35px 40px;">
              <a
                href="https://yourdomain.com"
                style="
                  background-color:#7a3e1d;
                  color:#ffffff;
                  text-decoration:none;
                  padding:14px 34px;
                  border-radius:30px;
                  font-size:15px;
                  font-weight:600;
                  display:inline-block;
                "
              >
                Start Shopping
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:20px 40px 35px;">
              <p style="font-size:12px; color:#aaa; margin:0;">
                —<br>
                <strong>BuyMe</strong><br>
                Style it. Buy it. Love it.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
export const ORDER_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>BuyMe Order Update</title>
</head>

<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f6f8;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

<!-- HEADER -->
<tr>
<!-- HEADER -->
<tr>
<td style="background-color:#111827; padding:20px;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>

<!-- Logo -->
<td width="60" align="left" style="vertical-align:middle;">
<img src="E:/BUYME_UPDATION/Frontend/src/assets/BUYMELOGO4.png"
    alt="BuyMe Logo"
    width="50"
    style="display:block;">
</td>

<!-- Website Name + Tagline -->
<td align="left" style="vertical-align:middle;">
<h1 style="color:#ffffff; margin:0; font-size:24px;">BuyMe</h1>
<p style="color:#9ca3af; margin:5px 0 0 0; font-size:14px;">
Your Favorite Shopping Destination
</p>
</td>

</tr>
</table>

</td>
</tr>

<!-- STATUS SECTION -->
<tr>
<td style="padding:30px; text-align:center;">
<h2 style="margin:0; color:#111827;">{{order_status}}</h2>
<p style="color:#6b7280; font-size:16px; margin-top:10px;">
{{status_message}}
</p>
<p style="margin-top:10px; font-size:14px; color:#9ca3af;">
Order ID: <strong>{{order_id}}</strong>
</p>
</td>
</tr>

<!-- ITEMS TABLE -->
<tr>
<td style="padding:0 30px 30px 30px;">

<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">

<tr style="background-color:#f3f4f6;">
<th align="left" style="padding:12px; font-size:14px;">Product</th>
<th align="center" style="padding:12px; font-size:14px;">Qty</th>
<th align="right" style="padding:12px; font-size:14px;">Price</th>
</tr>

<!-- Repeat this row dynamically -->
{{items}}
<!-- Example item row format:
<tr>
<td style="padding:12px; border-bottom:1px solid #e5e7eb;">Product Name</td>
<td align="center" style="padding:12px; border-bottom:1px solid #e5e7eb;">1</td>
<td align="right" style="padding:12px; border-bottom:1px solid #e5e7eb;">₹999</td>
</tr>
-->

<tr>
<td colspan="2" align="right" style="padding:15px; font-weight:bold;">Total:</td>
<td align="right" style="padding:15px; font-weight:bold;">₹{{total_amount}}</td>
</tr>

</table>

</td>
</tr>

<!-- DELIVERY ADDRESS -->
<tr>
<td style="padding:0 30px 20px 30px;">
<h4 style="margin-bottom:5px;">Delivery Address</h4>
<p style="margin:0; color:#6b7280; font-size:14px;">
{{delivery_address}}
</p>
</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="background-color:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
<p style="margin:0;">Thank you for shopping with BuyMe ❤️</p>
<p style="margin:5px 0 0 0;">© {{year}} BuyMe. All rights reserved.</p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`