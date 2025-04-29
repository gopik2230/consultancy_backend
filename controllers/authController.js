// controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const CompanyProfile = require('../models/companyProfile')
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.signup = async (req, res) => {
  const { name, email, password, phone, role_id, linkedin_url, website, address } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
     await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role_id,
      linkedin_url,
      website,
      address
    });

    return res.status(201).json({
      message: 'User registered successfully',
    });
  } catch (err) {
    console.error('Error during signup:', err);
    return res.status(500).json({ message: 'Server error', error_description: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email already exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // compare the password 
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({message : 'Incorrect Password'})
      console.log("process.env.JWT_SECRET ",process.env.JWT_SECRET)
    const token = jwt.sign({ id:user.id }, process.env.JWT_SECRET, {expiresIn: '1h'})

    // Prepare user data for response
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role_id: user.role_id,
      initial_user: user.initial_user
    };


    // Check if `initial_user` is false to include `company_profile`
    if (!user.initial_user) {
      // Fetch the associated company profile
      const companyProfile = await CompanyProfile.findOne({ where: { user_id: user.id } });

      // Add company profile data to user response if it exists
      if (companyProfile) {
        userResponse.company_profile = {
          client_name: companyProfile.client_name,
          company_size: companyProfile.company_size,
          about: companyProfile.about,
          company_linkedin_url: companyProfile.company_linkedin_url,
          industry: companyProfile.industry
        };
      }
    }

    console.log('userResponse ',userResponse)
    return res.status(200).json({
      message: 'Login successfully',
       user: userResponse, 
       token: token
    });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Server error', error_description: err });
  }
};


exports.companyProfileInfo = async (req, res) => {
  const { id, client_name, company_size, about, company_linkedin_url, industry } = req.body;

  try {
    console.log('dbuser ',id)
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
console.log("befores ",user)
    const [companyProfile, created] = await CompanyProfile.upsert(
      {
        user_id: id, // Assuming there's a foreign key `user_id` in CompanyProfile that links to User
        client_name,
        company_size,
        about,
        company_linkedin_url,
        industry,
      },
      { returning: true }
    );

    user.initial_user = false;
    await user.save();

    // Send the updated company profile information in the response
    return res.status(200).json({
      message: 'Company profile updated successfully',
      company_profile: {
        initial_user: false,
        client_name: companyProfile.client_name,
        company_size: companyProfile.company_size,
        about: companyProfile.about,
        company_linkedin_url: companyProfile.company_linkedin_url,
        industry: companyProfile.industry,
      }
    });
  } catch (err) {
    console.error('Error during company profile update:', err);
    return res.status(500).json({ message: 'Server error', error_description: err });
  }
};

