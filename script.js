var nodemailer = require('nodemailer');

// Create a transport instance using Gmail service
var transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
          user: 'jagadeeshwaransp5@gmail.com',
          pass: 'ggfg pcgj rogl pwoh', // Replace with your App Password
     },
});

// HTML content of your email (including custom HTML and CSS)
var customHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Festival Wishes</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #111;
      color: #fff;
      font-family: "Arial", sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      overflow: hidden;
    }

    .festival-wishes {
      text-align: center;
    }

    .festival-wishes h1 {
      font-size: 3rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      background: linear-gradient(90deg, #ff5e5e, #ffa74f, #fffb7a, #3fffa5, #5eb3ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradient 5s linear infinite;
    }

    .festival-wishes p {
      font-size: 1.5rem;
      margin-top: 10px;
      opacity: 0;
      animation: fadeIn 3s ease-out 1s forwards;
    }

    .festival-wishes .sparkle {
      display: inline-block;
      color: #fffae0;
      animation: sparkle 1s infinite alternate;
    }

    @keyframes gradient {
      0% { background-position: 0%; }
      100% { background-position: 100%; }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes sparkle {
      from { text-shadow: 0 0 5px #fff, 0 0 10px #ffe57e, 0 0 15px #ffc107; }
      to { text-shadow: 0 0 10px #fff, 0 0 20px #ffcc80, 0 0 30px #ff9800; }
    }
  </style>
</head>
<body>
  <div class="festival-wishes">
    <h1>✨ Happy Festive Season! ✨</h1>
    <p>
      May your days be filled with <span class="sparkle">joy</span>, 
      <span class="sparkle">peace</span>, and <span class="sparkle">love</span>.
    </p>
  </div>
</body>
</html>
`;

var mailOptions = {
     from: 'jagadeeshwaransp5@gmail.com',
     to: 'sexloveboys56@gmail.com', // Replace with the recipient's email
     subject: '<h1>Custom HTML Email with CSS</h1>',
     html: customHtml, // Here is where you add the HTML content
};

// Send email
transporter.sendMail(mailOptions, function (error, info) {
     if (error) {
          console.log('Error:', error);
     } else {
          console.log('Email sent: ' + info.response);
     }
});
