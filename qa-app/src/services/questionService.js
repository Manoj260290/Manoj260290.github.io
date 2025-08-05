import apiClient from './api';

export const questionService = {
  // Get all questions
  getAllQuestions: async () => {
    try {
      const response = await apiClient.get('/questions');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch questions: ${error.message}`);
    }
  },

  // Get questions by section ID
  getQuestionsBySection: async (sectionId) => {
    try {
      const response = await apiClient.get(`/questions/section/${sectionId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch questions for section: ${error.message}`);
    }
  },

  // Get question by ID
  getQuestionById: async (id) => {
    try {
      const response = await apiClient.get(`/questions/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch question: ${error.message}`);
    }
  },

  // Create new question-answer pair
  createQuestion: async (questionData) => {
    try {
      const response = await apiClient.post('/questions', questionData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create question: ${error.message}`);
    }
  },

  // Update question-answer pair
  updateQuestion: async (id, questionData) => {
    try {
      const response = await apiClient.put(`/questions/${id}`, questionData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update question: ${error.message}`);
    }
  },

  // Toggle completion status
  toggleCompletion: async (id) => {
    try {
      const response = await apiClient.patch(`/questions/${id}/toggle-completion`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to toggle completion: ${error.message}`);
    }
  },

  // Delete question
  deleteQuestion: async (id) => {
    try {
      await apiClient.delete(`/questions/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete question: ${error.message}`);
    }
  },

  // Get section progress
  getSectionProgress: async (sectionId) => {
    try {
      const response = await apiClient.get(`/questions/section/${sectionId}/progress`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch section progress: ${error.message}`);
    }
  },
};