
const InternalJob = require('../models/InternalJob');
const ExternalJob = require('../models/ExternalJob');
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

exports.postJobExternal = async (req, res) => {
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
        job_type: 'external' // Set job type
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


exports.getPostedInternalJobList = async (req, res) => {
  try {
    // Get pagination parameters from query string
    const page = parseInt(req?.query?.page) || 1; // Default to page 1
    const limit = parseInt(req?.query?.limit) || 10; // Default 10 items per page
    const offset = (page - 1) * limit;

    const { count, rows: postedJobs } = await InternalJob.findAndCountAll({
      include: [{
        model: ScreeningQuestion,
        as: 'ScreeningQuestions'
      }],
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: offset
    });

    const totalPages = Math.ceil(count / limit);
    const hasMore = page < totalPages;

    res.status(200).json({
      message: 'Successfully retrieved posted job list',
      jobs: postedJobs,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: count,
        hasMore: hasMore
      }
    });
  } catch (error) {
    console.error('Error fetching posted job list:', error);
    res.status(500).json({
      message: 'An error occurred while fetching the posted job list',
      error: error.message
    });
  }
};

exports.getPostedExternalJobList = async (req, res) => {
  try {
    // Get pagination parameters from query string
    const page = parseInt(req?.query?.page) || 1; // Default to page 1
    const limit = parseInt(req?.query?.limit) || 10; // Default 10 items per page
    const offset = (page - 1) * limit;

    const { count, rows: postedJobs } = await ExternalJob.findAndCountAll({
      include: [{
        model: ScreeningQuestion,
        as: 'ScreeningQuestions'
      }],
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: offset
    });

    const totalPages = Math.ceil(count / limit);
    const hasMore = page < totalPages;

    res.status(200).json({
      message: 'Successfully retrieved posted job list',
      jobs: postedJobs,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: count,
        hasMore: hasMore
      }
    });
  } catch (error) {
    console.error('Error fetching posted job list:', error);
    res.status(500).json({
      message: 'An error occurred while fetching the posted job list',
      error: error.message
    });
  }
};

exports.getJobById = async (req,res) => {
  try {

  } catch(error) {
    
  }
}