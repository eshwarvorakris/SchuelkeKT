const { sendMail } = require("../lib/helpers");
//Admin emails
function newCourseAddedMail(courseName = "",courseId = "", trainerName = "", courseDuration = "", courseDesc = "") {
  const mailSubject = "New Course Added - Action Required";
  const mailHtml = 
  'Dear Admin,'+
  '<br /><br />I wanted to inform you that a new course has been added to the Schulke Knowledge Transfer.Please review the details below and take necessary action to ensure a smooth learning experience for our trainees.'+
  '<br />Course Details :-'+
  '<br />Course Name: '+courseName+
  //'<br />Course ID : '+courseId+
  '<br />Trainer : '+trainerName+
  '<br />Duration : '+courseDuration+
  '<br >Description : '+courseDesc+
  '<br /><br />If you have any questions or encounter any issues, please reach out the support team for assistance.'+
  '<br /><br />Thank you for your attention and prompt action.'+
  '<br /><br />Best regards,'+
  '<br />'+trainerName;
  const adminMailId = process.env.ADMIN_EMAIL;
  sendMail(adminMailId, mailSubject, mailHtml);
}

function newTraineeAddedByTrainer(traineeName = "",traineeId = "", traineeEmail = "", trainerName = "") {
  const mailSubject = "New Trainee Added - Action Required";
  const mailHtml = 
  'Dear Admin,'+
  '<br /><br />I would like to inform you that a new trainee has been added to the Schulke Knowledge Transfer. Please review the details below and take the necessary action to ensure a smooth onboarding process for the trainee.'+
  '<br />Trainee Details :-'+
  '<br />Name: '+traineeName+
  '<br />Employee ID : '+traineeId+
  '<br />Email : '+traineeEmail+
  '<br /><br />If you have any questions or encounter any issues, please don\'t hesitate to reach out to the support team for assistance.'+
  '<br /><br />Thank you for your attention and prompt action.'+
  '<br /><br />Best regards,'+
  '<br />'+trainerName;
  const adminMailId = process.env.ADMIN_EMAIL;
  sendMail(adminMailId, mailSubject, mailHtml);
}

function courseModified(courseName = "", trainerName = "") {
  const mailSubject = "Course Modification Notification - Pharma Company LMS Platform";
  const mailHtml = 
  'Dear Admin,'+
  '<br /><br />I am writing to inform you about recent modifications made to an existing course on the Schulke Knowledge Transfer.'+
  '<br /><br />Please find the details of the course modification below:'+
  '<br />Course Modification Details: '+
  '<br />Course Name : '+courseName+
  '<br /><br />These modifications have been made for the course and are intended to enhance the learning experience for the trainees.'+
  '<br /><br />The changes may include updates to the course content, assessments, or any other relevant information.'+
  '<br /><br />I appreciate your attention to this matter and your assistance in facilitating effective communication and seamless learning on the LMS platform.'
  '<br /><br />Thank you for your prompt action and support.'+
  '<br /><br />Best regards,'+
  '<br />'+trainerName;
  const adminMailId = process.env.ADMIN_EMAIL;
  sendMail(adminMailId, mailSubject, mailHtml);
}

function traineeCompletesCourseToAdmin(
  courseName = "", courseDuration = "",  completionDate ="",
  traineeName = "", traineeId = "",
  totalModules = "", modulesCompleted = "", overAllScore = ""
  ) {
  const mailSubject = "Course Completion Notification - Trainee Report";
  const mailHtml = 
  'Dear Admin,'+
  '<br /><br />We are pleased to inform you that a trainee from Schulke Knowledge Transfer has successfully completed a course.'+
  '<br /><br />This automated notification is to update you on their course progress and achievement. Please find the details below:'+
  '<br />Trainee Details : '+
  '<br /></br><ul>'+
  '<li>Trainee Name : '+traineeName+'</li>'+
  '<li>Employee ID : '+traineeId+'</li>'+
  '</ul>'+
  '<br /><br />Course Details : '+
  '<br /></br><ul>'+
  '<li>Course Name : '+courseName+'</li>'+
  '<li>Course Duration : '+courseDuration+'</li>'+
  '<li>Completion Date : '+completionDate+'</li>'+
  '</ul>'+
  '<br /><br />Performance Summary : '+
  '<br /></br><ul>'+
  '<li>Total Modules : '+totalModules+'</li>'+
  '<li>Modules Completed : '+modulesCompleted+'</li>'+
  '<li>Overall Score : '+overAllScore+'</li>'+
  '</ul>'+
  '<br /><br />Please ensure that the trainee\'s records are updated accordingly, and their successful course completion is acknowledged within the company\'s training documentation.'+
  '<br />Should you require any further information or have any queries regarding the trainee\'s course completion, please reach out to our support team at ('+process.env.SUPPORT_EMAIL+').'+
  '<br /><br />Best regards,'+
  '<br />Tech team,'+
  '<br />Schulke Knowledge Transfer.';
  const adminMailId = process.env.ADMIN_EMAIL;
  sendMail(adminMailId, mailSubject, mailHtml);
}

function trainerProfileUpdated(trainerName = "", trainerEmail = "") {
  const mailSubject = "Schulke Knowledge Transfer Platform: Trainer Profile Update Confirmation";
  const mailHtml = 
  'Dear Admin,'+
  '<br /><br />We are writing to inform you that a trainer on the Schulke Knowledge Transfer has recently updated their profile information.'+
  '<br /><br />This email serves as a confirmation and notification of the changes made.'
  '<br /><br />Trainer Profile Details:'+
  '<br /><br /><ul>'
  '<li>Name: '+trainerName+'</li>'+
  '<li>Email: '+trainerEmail+'</li>'+
  '</ul>'
  '<br /><br />Please review the updated profile information and ensure its accuracy and compliance with your platform\'s guidelines and requirements.'+
  '<br /><br />If you have any concerns or require further information regarding the trainer\'s profile update, please feel free to reach out to them directly using the provided email address.'+
  '<br /><br />Thank you for your attention to this matter. We appreciate your continuous efforts in managing and maintaining the Schulke Knowledge Transfer.'+
  '<br /><br />Best regards,'+
  '<br />Technical Support Team,'+
  '<br />Schulke Knowledge Transfer.';
  const adminMailId = process.env.ADMIN_EMAIL;
  sendMail(adminMailId, mailSubject, mailHtml);
}
// Admin Emails End

// Trainer Emails Starts here
function traineeCompletesCourseToTrainer(
  courseName = "", courseDesc = "", courseStartDate = "", courseEndDate = "",
  traineeName = "", traineeId = "", traineeEmail = "", trainerEmail = ""
  ) {
  const mailSubject = "Course Completion Notification - Trainee";
  const mailHtml = 
  'Dear Trainer,'+
  '<br /><br />We would like to inform you that an individual trainee has successfully completed the course you uploaded on the Schulke Knowledge Transfer platform.'+
  '<br /><br />Please find the details below : '+
  '<br />Course Details : '+
  '<br /></br><ul>'+
  '<li>Course Name : '+courseName+'</li>'+
  '<li>Description : '+courseDesc+'</li>'+
  '<li>Start Date : '+courseStartDate+'</li>'+
  '<li>End Date : '+courseEndDate+'</li>'+
  '</ul>'+
  '<br /><br />Trainee Details : '+
  '<br /></br><ul>'+
  '<li>Trainee Name : '+traineeName+'</li>'+
  '<li>Employee ID : '+traineeId+'</li>'+
  '<li>Email Address : '+traineeEmail+'</li>'+
  '</ul>'+
  '<br /><br />We are pleased to inform you that the trainee mentioned above has successfully completed your course.'+
  '<br />They have diligently participated in all the required activities and assessments, demonstrating their commitment to acquiring the knowledge and skills imparted through your training materials.'+
  '<br />We appreciate your efforts in designing and delivering a valuable learning experience. Your expertise and dedication have played a significant role in enabling this trainee\'s professional growth and contributing to their skill development within our organization.'+
  '<br />If you have any additional feedback or would like to share any further instructions or resources with the trainee regarding the completed course, we encourage you to reach out to them directly at '+traineeEmail+'.'+
  '<br />They will greatly benefit from your guidance and support.'+
  '<br />Thank you for your valuable contributions to the Schulke Knowledge Transfer.'+
  '<br />Your commitment to training and sharing knowledge is essential in nurturing a culture of continuous learning within our organization.'+
  '<br />If you have any technical inquiries or require further assistance, please do not hesitate to contact our technical support team at ('+process.env.SUPPORT_EMAIL+').'+
  '<br /><br />Best regards,'+
  '<br />Tech team,'+
  '<br />Schulke Knowledge Transfer.';
  sendMail(trainerEmail, mailSubject, mailHtml);
}

function courseModifiedToTrainer(courseName = "", trainerEmail = "") {
  const mailSubject = "Course Update Notification - Recent Changes Made";
  const mailHtml = 
  'Dear Trainer,'+
  '<br /><br />We are writing to inform you that changes have been made to the '+courseName+' training program, which you are responsible for as the trainer.'+
  '<br /><br />This automatic notification serves to inform you about the modifications made to the course content.'+
  '<br />Course Details: '+
  '<ul><li>Course Name : '+courseName+'</li></ul>'+
  '<br /><br />We want to express our appreciation for your continuous efforts in refining the course content and ensuring its relevance and effectiveness for our trainees.'+
  '<br /><br />Your dedication to enhancing their learning experience is commendable.'+
  '<br /><br />if you have any questions or need further assistance, please do not hesitate to reach out to '+process.env.SUPPORT_EMAIL+'.'
  '<br /><br />Thank you for your commitment to our training programs and for keeping the course content up to date. Your contributions play a vital role in the success of our training initiatives.'+
  '<br /><br />Best regards,'+
  '<br />Schulke Knowledge Transfer';
  sendMail(trainerEmail, mailSubject, mailHtml);
}
// Trainer Emails End Here

// Trainee Emails Starts Here
function traineeAddedToTrainee(traineeEmail = "", userName = "", password = "") {
  const mailSubject = "Access Confirmation - Welcome to Schulke Knowledge Transfer!";
  const mailHtml = 
  'Dear Trainee,'+
  '<br /><br />We are delighted to inform you that your access to the Schulke Knowledge Transfer platform has been successfully granted.'+
  '<br /><br />Welcome aboard! We are thrilled to have you as a member of our esteemed learning community.'+
  '<br /><br />With your access to the platform, you now have the opportunity to explore a wide range of training resources, materials, and educational content designed to enhance your knowledge and professional skills.'+
  '<br /><br />Schulke Knowledge Transfer is committed to providing you with a seamless learning experience that will support your growth and success.'+
  '<br /><br />Here are a few key details to help you get started:'+
  '<br />Login Credentials:'+
  '<br /><ul>'+
  '<li>Username : '+userName+'</li>'+
  '<li>Password : '+password+'</li>'+
  '</ul><br /><br />We wish you every success in your learning endeavors.'+
  '<br /><br /><br />Best regards,'+
  '<br />Schulke Knowledge Transfer'
  ;
  sendMail(traineeEmail, mailSubject, mailHtml);
}

function traineeCourseEnrollmentToTrainee(traineeEmail = "", courseName = "", startDate = "", endDate = "") {
  const mailSubject = "Registration Confirmation - "+courseName;
  const mailHtml = 
  'Dear Trainee,'+
  '<br /><br />We are delighted to inform you that your registration for the '+courseName+' training program at Schulke Knowledge Transfer has been successfully confirmed.'+
  '<br /><br />We are excited to have you join us for this enriching learning journey.'+
  '<br />Course Details :'+
  '<br /><ul>'+
  '<li>Course Name : '+courseName+'</li>'+
  '<li>Training Period : '+startDate+' to '+endDate+'</li>'+
  '</ul><br /><br />As a registered participant, you will have the opportunity to acquire valuable knowledge and skills in '+courseName+'.'+
  '<br /><br />The '+courseName+' program has been carefully designed to provide you with a comprehensive understanding of the subject matter and equip you with practical insights that can be applied in your professional endeavors.'+
  '<br /><br />We look forward to welcoming you to the [Course Name] training program and witnessing your growth and success throughout this journey.'+
  '<br /><br />Get ready for an engaging and rewarding learning experience!'+
  '<br /><br /><br />Best regards,'+
  '<br />Schulke Knowledge Transfer'
  ;
  sendMail(traineeEmail, mailSubject, mailHtml);
}

function traineeSubmitAssignmentToTrainee(traineeEmail = "", courseName = "", submissionDate = "") {
  const mailSubject = "Assignment Submission Confirmation - "+courseName;
  const mailHtml = 
  'Dear Trainee,'+
  '<br /><br />Congratulations on submitting your assignment for the '+courseName+' training program at Schulke Knowledge Transfer! We appreciate your dedication and commitment to completing the course requirements.'+
  '<br />Assignment Details: :'+
  '<br /><ul>'+
  '<li>Course Name : '+courseName+'</li>'+
  '<li>Submission Date : '+submissionDate+
  '</ul><br /><br />Our instructors will now review your assignment based on the provided guidelines and criteria.'+
  '<br /><br />Thank you for your dedication to your learning journey in the '+courseName+' training program.'+
  '<br /><br />We look forward to your continued participation and success.'+
  '<br /><br /><br />Best regards,'+
  '<br />Schulke Knowledge Transfer'
  ;
  sendMail(traineeEmail, mailSubject, mailHtml);
}
// Trainee Emails End Here

module.exports = { 
  newCourseAddedMail,
  newTraineeAddedByTrainer,
  courseModified,
  traineeCompletesCourseToAdmin,
  trainerProfileUpdated,
  traineeCompletesCourseToTrainer,
  courseModifiedToTrainer,
  traineeAddedToTrainee,
  traineeCourseEnrollmentToTrainee,
  traineeSubmitAssignmentToTrainee
}