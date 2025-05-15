// // controllers/authController.js
// const bcrypt = require('bcryptjs');
// // const { InternalJob, ScreeningQuestion } = require('../models');
// const InternalJob = require('../models/InternalJob');
// const ScreeningQuestion = require('../models/ScreeningQuestion');
// const jwt = require('jsonwebtoken')
// require('dotenv').config();

// exports.postJobInternal = async(req,res) => {
//     try {
//         const { 
//             id, // User ID (person posting the job)
//             job_title,
//             job_description,
//             location,
//             budget_from,
//             budget_to,
//             expeirence_from,
//             expeirence_to,
//             experience_type,
//             hiring_process,
//             interview_date_from,
//             interview_date_to,
//             job_duration_from,
//             job_duration_to,
//             notice_period,
//             priority_skills,
//             screen_questions 
//           } = req.body;

//            // Create or update the internal job
//     const [internalJob, created] = await InternalJob.upsert(
//         {
//           user_id: id, // Link the internal job to the user
//           job_title,
//           job_description,
//           location,
//           budget_from,
//           budget_to,
//           expeirence_from,
//           expeirence_to,
//           experience_type,
//           hiring_process,
//           interview_date_from,
//           interview_date_to,
//           job_duration_from,
//           job_duration_to,
//           notice_period,
//           priority_skills
//         },
//         { returning: true }
//       );
  
//       // Store the screening questions
//       if (screen_questions && screen_questions.length > 0) {
//         // Map the questions to the required format with job_id linking to the job just created/updated
//         const screeningQuestions = screen_questions.map(q => ({
//           question: q.question,
//           answer: q.answer || '', // If answer is not provided, store empty string
//           answerType: q.answerType,
//           job_id: internalJob.id, // This associates the questions with the job
//           job_type: 'internal' // Indicating this is an internal job
//         }));
  
//         // Create screening questions in the database
//         await ScreeningQuestion.bulkCreate(screeningQuestions);
//       }

//       return res.status(200).json({ message: 'Internal job posted successfully with screening questions'})
//     } catch(error) {
//         console.log("Error in postJobInternal controller "+error.message)
//     }
// }



// exports.postJobInternal = async (req, res) => {
//   try {
//     const {
//       id, // User ID
//       job_title,
//       job_description,
//       location,
//       budget_from,
//       budget_to,
//       experience_from,
//       experience_to,
//       experience_type,
//       hiring_process,
//       interview_date_from,
//       interview_date_to,
//       job_duration_from,
//       job_duration_to,
//       notice_period,
//       priority_skills,
//       screen_questions
//     } = req.body;

//     // Create or update internal job
//     const [internalJob, created] = await InternalJob.upsert({
//       user_id: id,
//       job_title,
//       job_description,
//       location,
//       budget_from,
//       budget_to,
//       experience_from,
//       experience_to,
//       experience_type,
//       hiring_process,
//       interview_date_from,
//       interview_date_to,
//       job_duration_from,
//       job_duration_to,
//       notice_period,
//       priority_skills
//     }, {
//       returning: true
//     });

//     // Handle screening questions
//     if (screen_questions && Array.isArray(screen_questions) && screen_questions.length > 0) {
//       const screeningQuestions = screen_questions.map(q => ({
//         question: q.question,
//         answer: q.answer || '',
//         answerType: q.answerType,
//         job_id: internalJob.id,
//         job_type: 'internal'
//       }));

//       await ScreeningQuestion.bulkCreate(screeningQuestions);
//     }

//     return res.status(200).json({
//       message: 'Internal job posted successfully with screening questions'
//     });
//   } catch (error) {
//     console.error('Error in postJobInternal:', error);
//     return res.status(500).json({ message: 'Something went wrong while posting job' });
//   }
// };



const InternalJob = require('../models/InternalJob');
const ScreeningQuestion = require('../models/ScreeningQuestion');

exports.postJobInternal = async (req, res) => {
  try {
    const {
      id, // User ID
      job_title,
      job_description,
      location,
      budget_from,
      budget_to,
      experience_from,
      experience_to,
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

    // Create a new job entry
    const newJob = await InternalJob.create({
      user_id: id,
      job_title,
      job_description,
      location,
      budget_from: parseFloat(budget_from), // Ensure budget is a float
      budget_to: parseFloat(budget_to), // Ensure budget is a float
      experience_from: parseInt(experience_from), // Ensure experience is an integer
      experience_to: parseInt(experience_to), // Ensure experience is an integer
      experience_type,
      hiring_process, // Store as JSON string
      interview_date_from: new Date(interview_date_from), // Convert to Date
      interview_date_to: new Date(interview_date_to), // Convert to Date
      job_duration_from,
      job_duration_to,
      notice_period,
      priority_skills, 
    });

    // Create associated screening questions
    if (screen_questions && screen_questions.length > 0) {
      const questionsToCreate = screen_questions.map(question => ({
        question: question.question,
        answer: question.answer,
        answerType: question.answerType,
        job_id: newJob.id, // Associate with the newly created job
        job_type: 'internal' // Set job type
      }));

      await ScreeningQuestion.bulkCreate(questionsToCreate);
    }

    // Respond with the created job
    res.status(201).json({
      message: 'Job posted successfully',
      job: newJob
    });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({
      message: 'An error occurred while posting the job',
      error: error.message
    });
  }
};


exports.getPostedJobList = async (req, res) => {
  try {
      const postedJobs = await InternalJob.findAll({
          include: [{
              model: ScreeningQuestion,
              as: 'ScreeningQuestions' // Use the alias defined in the association
          }],
          order: [['createdAt', 'DESC']] // Optional: Order by creation date
      });

      res.status(200).json({
          message: 'Successfully retrieved posted job list',
          jobs: postedJobs
      });
  } catch (error) {
      console.error('Error fetching posted job list:', error);
      res.status(500).json({
          message: 'An error occurred while fetching the posted job list',
          error: error.message
      });
  }
};