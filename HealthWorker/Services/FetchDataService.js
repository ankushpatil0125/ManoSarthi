import DeleteService from "./DatabaseServices/DeleteService";
import InsertService from "./DatabaseServices/InsertService";
import MedicalQuestionarrieService from "./MedicalQuestionarrieService";
import SurveyQuestionsService from "./SurveyQuestionsService";


const FetchDataService = {
    fetchQuestions: async () => {
        try {
            // Fetch questions from the service
            const questionsResponse = await SurveyQuestionsService.getQuestions();
            const medicalQuestionsResponse =
              await MedicalQuestionarrieService.getMedicalQuestionarrie();
        
            if (questionsResponse && medicalQuestionsResponse) {
              const questions = questionsResponse.data;
              const medicalQuestions = medicalQuestionsResponse.data;
        
              console.log("Fetched Questions:", questions);
              console.log("Fetched Medical Questions:", medicalQuestions);
        
              // Delete old questions from the SurveyQuestion table
              await DeleteService.deleteAllSurveyQuestions();
              console.log("SurveyQuestions deleted successfully.");
        
              // Delete old medical questions from the MedicalQuestions table
              await DeleteService.deleteAllMedicalQuestions();
              console.log("MedicalQuestions deleted successfully.");
        
              // Insert fetched questions into the database
              await InsertService.insertSurveyQuestion(questions);
              console.log("SurveyQuestions inserted successfully.");
        
              // Insert fetched medical questions into the database
              await InsertService.insertMedicalQuestions(medicalQuestions);
              console.log("MedicalQuestions inserted successfully.");
            } else {
              // Handle failure to fetch questions
              console.log("Failed to fetch questions");
            }
          } catch (error) {
            console.error("Error during question insertion:", error);
            // Handle the error here, such as showing a message to the user
          }
      },
}

export default FetchDataService;