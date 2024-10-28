const Project = require('../models/project');

class ProjectRepository {
  async findAll(query) {
    return await Project.find(query)
      .populate('creator', 'name email')
      .populate('charity', 'name');
  }

  async createProject(projectData) {
    const project = await ProjectRepository.createProject(projectData);
    await emailService.sendConfirmationEmail(projectData.charity, project);
    return project;
  }

  async updateProject(id, updateData) {
    return await ProjectRepository.updateProject(id, updateData);
  }

  async getProjectDetails(id) {
    return await ProjectRepository.getProjectById(id);
  }

  async deleteProject(id) {
    return await ProjectRepository.deleteProject(id);
  }

  async haltProject(id) {
    return await ProjectRepository.updateProject(id, { status: 'halted' });
  }

  async resumeProject(id) {
    return await ProjectRepository.updateProject(id, { status: 'open' });
  }

  async getStatistics(charityId) {
    const projects = await ProjectRepository.getCharityProjects(charityId);
    const totalProjects = projects.length;
    const totalDonations = projects.reduce((acc, project) => acc + project.raisedAmount, 0);
    return { totalProjects, totalDonations };
  }
}

module.exports = new ProjectRepository();
