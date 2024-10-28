const ProjectRepository = require('../repositories/projectRepository');
const { createProjectResponse } = require('../dto/projectDto');

class ProjectService {
  async getProjects(searchTerm, charityId, status, type) {
    const query = {};

    if (searchTerm) {
      query.name = { $regex: searchTerm, $options: 'i' }; 
    }

    if (charityId) {
      query.charity = charityId; 
    }

    if (status) {
      query.status = status;
    }

    if (type) {
      query.type = type; 
    }

    const projects = await ProjectRepository.findAll(query);
    return projects.map(createProjectResponse); 
  }

  async getMyProjects(charityId) {
    try {
      const query = { charity: charityId }; 
      const projects = await ProjectRepository.findAll(query); 
      return projects.map(createProjectResponse); 
    } catch (error) {
      throw new Error(error.message); 
    }
  }

  async createProject(projectData) {
    try {
      
    } catch (error) {
     
    }
  }

  async updateProject(currentId, projectId, updateData) {
    try {
      const project = await ProjectService.getProjectById(projectId);

      // Ensure the project belongs to the charity
      if (!project || project.charity.toString() !== currentId) {
        throw new Error('You do not have permission to modify this project');
      }

      // Proceed with the update
      const updatedProject = await ProjectService.updateProject(projectId, updateData);
      return updatedProject;
    } catch (error) {
      throw new Error (err.message);
    }
  }

  async haltProject(currentId, projectId) {
    try {
      const project = await ProjectService.getProjectById(projectId);

      // Ensure the project belongs to the charity
      if (!project || project.charity.toString() !== currentId) {
        throw new Error('You do not have permission to modify this project');
      }

      // Proceed with halting the project
      const haltedProject = await ProjectService.haltProject(projectId);
      return haltedProject;
    } catch (error) {
      throw new Error (err.message);
    }
  }

  async resumeProject(currentId, projectId) {
    try {
      const project = await ProjectService.getProjectById(projectId);

      // Ensure the project belongs to the charity
      if (!project || project.charity.toString() !== currentId) {
        throw new Error('You do not have permission to modify this project');
      }

      // Proceed with resuming the project
      const resumedProject = await ProjectService.resumeProject(projectId);
      return resumedProject;
    } catch (error) {
      throw new Error (err.message);
    }
  }

  async deleteProject(currentId, projectId) {
    try {
      const project = await ProjectService.getProjectById(projectId);

      // Ensure the project belongs to the charity
      if (!project || project.charity.toString() !== currentId) {
        throw new Error('You do not have permission to modify this project');
      }

      // Proceed with deleting the project
      await ProjectService.deleteProject(projectId);
      return true;
    } catch (error) {
      throw new Error (err.message);
    }
  }

  async getStatistics(currentId) {
    try {
      const stats = await ProjectService.getStatistics(currentId);
      return stats;
    } catch (error) {
      throw new Error (err.message);
    }
  }
}

module.exports = new ProjectService();
