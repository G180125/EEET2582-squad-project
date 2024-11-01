const ProjectRepository = require('./projectRepository');
const { validateProjectCreationRequest } = require('./projectDto');

class ProjectService {
  // Method to get all projects
  async getAllProjects( page, limit) {
    const totalProjects = await ProjectRepository.count();
    const totalPages = Math.ceil(totalProjects / limit);
    const projects = await ProjectRepository.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const isLast = page >= totalPages; 
  
    return {
      currentPage: page,
      totalPages: totalPages,
      pageSize: limit,
      isLast: isLast,
      data: projects,
    };
  }  

   // Method to get all active projects with optional filtering and search
  async getActiveProjects(filters, page, limit) {
    const totalActiveProjects = await ProjectRepository.countActiveProjects(); 
    const totalPages = Math.ceil(totalActiveProjects / limit);
    const projects = await ProjectRepository.getActiveProjects(page, limit, filters);

    const isLast = page >= totalPages;

    return {
      currentPage: page,
      totalPages: totalPages,
      pageSize: limit,
      isLast: isLast,
      data: projects,
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
  async getMyProjects(id, role, page, limit) {
    if (role === 'Charity') {
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
    // } else if (role === 'Donor') {
    //   return await ProjectRepository.getProjectsByDonor(id);
    }
    throw new Error('Invalid user role');
  }

  // Method to create a new project based on user role
  async createProject(projectData, role, id) {
    const newProjectData = {
      ...projectData,
      status: role === 'admin' ? 'active' : 'pending',
      charity: id,
    };

    const { error } = validateProjectCreationRequest(newProjectData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    return await ProjectRepository.create(newProjectData);
  }

  // Method to update a project by the charity owner
  async updateProject(projectId, data, userId) {
    const project = await ProjectRepository.findById(projectId);
    if (!project || project.charity.toString() !== userId) {
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

  // Method for charity owner to close a project
  async closeProject(projectId, userId) {
    const project = await ProjectRepository.findById(projectId);
    if (!project || project.charity.toString() !== userId) {
      throw new Error('Project not found or access denied');
    }
    return await ProjectRepository.update(projectId, { status: 'closed' });
  }

  // Method for admin to delete a project
  async deleteProject(projectId) {
    return await ProjectRepository.update(projectId, { status: 'deleted' });
  }
}

module.exports = new ProjectService();
