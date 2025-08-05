import apiClient from './api';

export const sectionService = {
  // Get all sections
  getAllSections: async () => {
    try {
      const response = await apiClient.get('/sections');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch sections: ${error.message}`);
    }
  },

  // Get section by ID
  getSectionById: async (id) => {
    try {
      const response = await apiClient.get(`/sections/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch section: ${error.message}`);
    }
  },

  // Create new section
  createSection: async (sectionData) => {
    try {
      const response = await apiClient.post('/sections', sectionData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create section: ${error.message}`);
    }
  },

  // Update section
  updateSection: async (id, sectionData) => {
    try {
      const response = await apiClient.put(`/sections/${id}`, sectionData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update section: ${error.message}`);
    }
  },

  // Delete section
  deleteSection: async (id) => {
    try {
      await apiClient.delete(`/sections/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete section: ${error.message}`);
    }
  },
};