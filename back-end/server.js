const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors

const app = express();
const port = 3000;

app.use(bodyParser.json());
// Set up CORS to allow requests from your frontend domain
const allowedOrigins = ['https://spectacular-churros-469187.netlify.app/'];  // Replace with your frontend URL

app.use(cors({
  origin: allowedOrigins,  // Allow only frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Define allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization']  // Define allowed headers
}));

// OTP Verification Endpoint
app.post('/verify-otp', (req, res) => {
  const otp = req.body.otp;

   // Null Byte Injection Check
   if (otp && otp.includes('%00')) {
    return res.status(500).json({ error: 'Invalid access, bad request with Null Byte' });
  }


  // OTP Validation
  
  if(!otp){
    return res.status(400).json({message: 'Invalid OTP'})
  }

  if(!otp.startsWith('1')){
    return res.status(400).json({message: 'OTP must start with 1'})
  }
  if(otp.length !== 4){
    return res.status(400).json({message: 'OTP must be of 4 digit.'})
  }gi

  

  res.status(200).json({ message: 'OTP Verified' });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
