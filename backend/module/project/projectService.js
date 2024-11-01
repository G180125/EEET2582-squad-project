const ProjectRepository = require('./projectRepository');
const { validateProjectCreationRequest } = require('./projectDto');
const UserService = require('../user/userService');
const { sendProjectCreationEmail } = require('../../utils/sendMail');

class ProjectService {
  // Method to get all projects
  async getAllProjects( page, limit, filters) {
    const { results, totalProjects } = await ProjectRepository.getAll(page, limit, filters);
    const totalPages = Math.ceil(totalProjects / limit);
    const isLast = page >= totalPages; 
  
    return {
      currentPage: page,
      totalPages: totalPages,
      pageSize: limit,
      isLast: isLast,
      data: results,
    };
  }  

   // Method to get all active projects with optional filtering and search
  async getActiveProjects(page, limit, filters) {
    const { results, totalProjects } = await ProjectRepository.getActiveProjects(page, limit, filters);
    const totalPages = Math.ceil(totalProjects / limit);

    const isLast = page >= totalPages;

    return {
      currentPage: page,
      totalPages: totalPages,
      pageSize: limit,
      isLast: isLast,
      data: results,
    };
  }

  // Method to get a project by ID
  async getProjectById(projectId) {
    const project = await ProjectRepository.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  // Method to get projects based on user type (charity or donor)
  async getProjectsByCharity(id, page, limit) {
    const totalProjects = await ProjectRepository.countProjectsByCharity(id);
    const totalPages = Math.ceil(totalProjects / limit); 
  
    const projects = await ProjectRepository.getProjectsByCharity(query, page, limit); 
  
    const isLast = page >= totalPages; 
  
    return {
      currentPage: page,
      totalPages: totalPages,
      pageSize: limit,
      isLast: isLast,
      data: projects 
    };
  }

  // Method to create a new project based on user role
  async createProject(projectData, role, id) {
    const newProjectData = {
      ...projectData,
      status: role === 'admin' ? 'active' : 'pending',
      charity: id,
      raisedAmount: 0,
      createAt: Date.now,
    };

    const { error } = validateProjectCreationRequest(newProjectData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const success = await ProjectRepository.create(newProjectData);
    if(success) {
      const user = await UserService.getUserById(id);
      await sendProjectCreationEmail(user.email, newProjectData.title);
    }
  }

  // Method to update a project by the charity owner
  async updateProject(projectId, data, userId, role) {
    const project = await ProjectRepository.findById(projectId);
    if (!project || project.charity.toString() !== userId || role != 'Admin') {
      throw new Error('Project not found or access denied');
    }
    return await ProjectRepository.update(projectId, data);
  }

  // Method for admin to set a pending project to active
  async activateProject(projectId) {
    const project = await ProjectRepository.findById(projectId);
    if (!project) {
      throw new Error('Project not found or access denied');
    }

    if (project.status != 'pending') {
      throw new Error('You cannot active non-pending project');
    }

    return await ProjectRepository.update(projectId, { status: 'active' });
  }

  // Method for charity owner to halt an active project
  async haltProject(projectId, userId) {
    const project = await ProjectRepository.findById(projectId);
    if (!project || project.charity.toString() !== userId || project.status !== 'active') {
      throw new Error('Project not found or invalid status');
    }
    return await ProjectRepository.update(projectId, { status: 'halt' });
  }

  // Method for admin to delete a project
  async deleteProject(projectId, role, userId) {
    if (role == 'Admin') {
      return await ProjectRepository.update(projectId, { status: 'deleted' });
    }

    const project = await ProjectRepository.findById(projectId);
    if(!project || project.charity.toString() !== userId || project.status !== 'halted'){
      throw new Error('Project not found or invalid status');
    }
    return await ProjectRepository.update(projectId, { status: 'deleted' });
  }
}

module.exports = new ProjectService();
