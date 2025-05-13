// controllers/authController.js
const bcrypt = require('bcryptjs');
const { InternalJob, ScreeningQuestion } = require('../models');
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.postJobInternal = async(req,res) => {
    try {
        const { 
            id, // User ID (person posting the job)
            job_title,
            job_description,
            location,
            budget_from,
            budget_to,
            expeirence_from,
            expeirence_to,
            experience_type,
            hiring_process,
            interview_date_from,
            interview_date_to,
            job_duration_from,
            job_duration_to,
            notice_period,
            priority_skills,
            screen_questions 
          } = req.body;

           // Create or update the internal job
    const [internalJob, created] = await InternalJob.upsert(
        {
          user_id: id, // Link the internal job to the user
          job_title,
          job_description,
          location,
          budget_from,
          budget_to,
          expeirence_from,
          expeirence_to,
          experience_type,
          hiring_process,
          interview_date_from,
          interview_date_to,
          job_duration_from,
          job_duration_to,
          notice_period,
          priority_skills
        },
        { returning: true }
      );
  
      // Store the screening questions
      if (screen_questions && screen_questions.length > 0) {
        // Map the questions to the required format with job_id linking to the job just created/updated
        const screeningQuestions = screen_questions.map(q => ({
          question: q.question,
          answer: q.answer || '', // If answer is not provided, store empty string
          answerType: q.answerType,
          job_id: internalJob.id, // This associates the questions with the job
          job_type: 'internal' // Indicating this is an internal job
        }));
  
        // Create screening questions in the database
        await ScreeningQuestion.bulkCreate(screeningQuestions);
      }

      return res.status(200).json({ message: 'Internal job posted successfully with screening questions'})
    } catch(error) {
        console.log("Error in postJobInternal controller "+error.message)
    }
}