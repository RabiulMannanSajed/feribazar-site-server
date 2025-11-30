// utils/emailTemplates.js

export const orderConfirmationEmail = (orderData, products) => {
  // ✅ Now products is passed as parameter
  console.log("product here");
  // Calculate totals
  const subtotal = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + orderData.deliveryCharge;

  const productRows = products
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        <div style="display: flex; align-items: center;">
          ${
            item.image
              ? `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; margin-right: 12px;">`
              : ""
          }
          <div>
            <div style="font-weight: 500; color: #1f2937;">${item.name}</div>
          </div>
        </div>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
        ৳${item.price.toLocaleString()}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 500;">
        ৳${(item.price * item.quantity).toLocaleString()}
      </td>
    </tr>
  `
    )
    .join("");

  const subject = `Order Confirmation - feriBazar #${orderData._id
    .toString()
    .slice(-8)
    .toUpperCase()}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #67B96E 0%, #58a760 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">✅ Order Confirmed!</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px;">Thank you for shopping with feriBazar</p>
            </td>
          </tr>

          <!-- Order Info -->
          <tr>
            <td style="padding: 30px;">
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 18px;">Order Details</h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order ID:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-weight: 500; text-align: right;">#${orderData._id
                      .toString()
                      .slice(-8)
                      .toUpperCase()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order Date:</td>
                    <td style="padding: 8px 0; color: #1f2937; font-weight: 500; text-align: right;">${new Date(
                      orderData.orderDate
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Status:</td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500;">Processing</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Products Table -->
              <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 18px;">Products</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Product</th>
                    <th style="padding: 12px; text-align: center; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Price</th>
                    <th style="padding: 12px; text-align: center; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Qty</th>
                    <th style="padding: 12px; text-align: right; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${productRows}
                </tbody>
              </table>

              <!-- Price Summary -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 24px;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Subtotal:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 500; text-align: right;">৳${subtotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Delivery Charge:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 500; text-align: right;">৳${orderData.deliveryCharge.toLocaleString()}</td>
                </tr>
                <tr style="border-top: 2px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #1f2937; font-size: 16px; font-weight: 600;">Total:</td>
                  <td style="padding: 12px 0; color: #67B96E; font-size: 18px; font-weight: 700; text-align: right;">৳${total.toLocaleString()}</td>
                </tr>
              </table>

              <!-- Shipping Address -->
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin-top: 24px;">
                <h3 style="margin: 0 0 12px 0; color: #1f2937; font-size: 16px;">📦 Shipping Address</h3>
                <p style="margin: 0; color: #1f2937; line-height: 1.6;">
                  <strong>${orderData.name}</strong><br>
                  ${orderData.phone}<br>
                  ${orderData.email}<br>
                  ${orderData.streetAddress}<br>
                  ${orderData.city}, ${orderData.district}
                </p>
                ${
                  orderData.orderNotes
                    ? `
                  <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 12px;">Order Notes:</strong>
                    <p style="margin: 4px 0 0 0; color: #1f2937; font-size: 14px;">${orderData.orderNotes}</p>
                  </div>
                `
                    : ""
                }
              </div>

              <!-- Call to Action -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.FRONTEND_URL}/orders/${orderData._id}" 
                   style="display: inline-block; background-color: #67B96E; color: #ffffff; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                  Track Your Order
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">
                Questions? Contact us at <a href="mailto:support@feribazar.com" style="color: #67B96E; text-decoration: none;">support@feribazar.com</a>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 11px;">
                © ${new Date().getFullYear()} feriBazar. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
Order Confirmation - feriBazar

Order ID: #${orderData._id.toString().slice(-8).toUpperCase()}
Order Date: ${new Date(orderData.orderDate).toLocaleDateString()}

Products:
${products
  .map(
    (item) =>
      `- ${item.name} x${item.quantity} = ৳${(
        item.price * item.quantity
      ).toLocaleString()}`
  )
  .join("\n")}

Subtotal: ৳${subtotal.toLocaleString()}
Delivery Charge: ৳${orderData.deliveryCharge.toLocaleString()}
Total: ৳${total.toLocaleString()}

Shipping Address:
${orderData.name}
${orderData.phone}
${orderData.email}
${orderData.streetAddress}
${orderData.city}, ${orderData.district}

${orderData.orderNotes ? `Notes: ${orderData.orderNotes}` : ""}

Thank you for shopping with feriBazar!
  `;

  return { subject, html, text };
};
