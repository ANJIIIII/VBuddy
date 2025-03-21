const Visit = require("../models/Visit");
const agenda = require("../config/agenda");

const nodemailer = require("nodemailer");

agenda.define("send email", async (job) => {
  const details = job.attrs.data?.item;
  var subject = "Reminder for Visit";

  const date = new Date(details?.date);

  var message = `Hii ${
    details?.ownerName
  } This is reminder for the visit scheduled for your pet.Details of the visit are -\n
               Pet name : ${details?.name || ""}\n
               Species :${details?.species || ""}\n
               Breed :${details?.breed || ""}\n
               Date :${details?.date?.substring(0, 10) || ""}\n
               Time :${date?.getHours()}:${date?.getMinutes() || ""}`;

  const auth = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const receiver = {
    from: process.env.GMAIL_ACCOUNT,
    to: details?.ownerEmail,
    subject: subject,
    text: message,
  };

  auth.sendMail(receiver, (err, emailResponse) => {
    if (err) console.log(err);
    console.log(emailResponse);
    job.remove();
  });
});

agenda.define("birthday email", async (job) => {
  const details = job.attrs.data?.item;
  console.log(details);

  var subject = `Happy Birthday to ${details?.name}`;

  var message = `Hii ${details?.owner?.name}\n
   Just wanted to take a moment to wish a very happy birthday to ${details?.name} 🎂🐾 We hope today is filled with all the things ${details?.name}
   loves most — whether it's extra treats, fun playtime, or some special pampering.\n
   Once again a very happy birthday to ${details?.name} 🐾🎉
   `;

  const auth = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const receiver = {
    from: process.env.GMAIL_ACCOUNT,
    to: details?.owner?.email,
    subject: subject,
    text: message,
  };

  auth.sendMail(receiver, (err, emailResponse) => {
    if (err) console.log(err);
    console.log(emailResponse);
    job.remove();
  });
});

agenda.define("send overdue email", async (job) => {
  const details = job.attrs.data?.item;

  var subject = `Missed followup`;
  var message = `
  <html>
    <body style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
      <p>Hii ${details?.ownerName}</p>
      <p>You missed the followup scheduled for your pet ${details?.name} on ${details?.date}.</p>
      <p><strong>Purpose:</strong> ${details?.purpose}</p>
      <p>Please contact the staff for any further communication.</p>
    </body>
  </html>
`;

  const auth = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const receiver = {
    from: process.env.GMAIL_ACCOUNT,
    to: details?.ownerEmail,
    subject: subject,
    html: message,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8' // Ensure it's sent as HTML
    }
  };

  auth.sendMail(receiver, (err, emailResponse) => {
    if (err) console.log(err);
    console.log(emailResponse);
    job.remove();
  });
});

const sendMail = (details) => {
  var subject = "Reminder for Visit";

  const date = new Date(details?.date);

  var message = `Hii ${
    details?.ownerName
  } This is reminder for the visit scheduled for your pet.Details of the visit are -\n
               Pet name : ${details?.name || ""}\n
               Species :${details?.species || ""}\n
               Breed :${details?.breed || ""}\n
               Date :${details?.date?.substring(0, 10) || ""}\n
               Time :${date?.getHours()}:${date?.getMinutes() || ""}`;

  const auth = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const receiver = {
    from: process.env.GMAIL_ACCOUNT,
    to: details?.ownerEmail,
    subject: subject,
    text: message,
  };

  auth.sendMail(receiver, (err, emailResponse) => {
    if (err) console.log(err);
    console.log(emailResponse);
  });
};

exports.sendReminders = async (req, res) => {
  try {
    const { List } = req.body;
    List.forEach((item, index) => {
      agenda.schedule(`in ${index * 5} seconds`, "send email", { item });
    });
    return res.status(200).json({
      success: true,
      message: "Emails will be sent successfully",
    });
  } catch (error) {
    console.log("Error in getVisitController", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.sendBirthdayReminders = async (req, res) => {
  try {
    const { list } = req.body;
    list.forEach((item, index) => {
      agenda.schedule(`in ${index * 5} seconds`, "birthday email", { item });
    });
    return res.status(200).json({
      success: true,
      message: "Emails will be sent successfully",
    });
  } catch (error) {
    console.log("Error in sendBirthdayReminder Controller", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.sendOverdueReminders = async (req, res) => {
  try {
    const { List } = req.body;
    List.forEach((item, index) => {
      agenda.schedule(`in ${index * 5} seconds`, "send overdue email", {
        item,
      });
    });
    return res.status(200).json({
      success: true,
      message: "Emails will be sent successfully",
    });
  } catch (error) {
    console.log("Error in sendBirthdayReminder Controller", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
