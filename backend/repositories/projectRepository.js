const Project = require('../models/project');

class ProjectRepository {
  async create(data) {
    const project = new Project(data);
    return await project.save();
  }
  
  async count() {
    return await Project.countDocuments();
  }

  async findById(id) {
    return await Project.findById(id);
  }

  async update(id, data) {
    return await Project.findByIdAndUpdate(id, data, { new: true });
  }

  async getAll(page, limit) {
    const offset = (page - 1) * limit;
    return await Project.find() 
      .skip(offset)  
      .limit(limit);
  }

  async countActiveProjects() {
    return await Project.countDocuments({ status: 'active' });
  }

  async getActiveProjects(page, limit, filters = {}) {
    const { status, search } = filters;
    const query = { status: 'active' }; 

    if (status) {
      query.status = status; 
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' }; 
    }

    const offset = (page - 1) * limit;
    return await Project.find(query)
      .skip(offset)
      .limit(limit)
      .populate('charity');
  }

  async countProjectsByCharity(charityId) {
    return await Project.countDocuments({ charity: charityId });
  }

  async getProjectsByCharity(charityId, page, limit) {
    const offset = (page - 1) * limit;
    return await Project.find({ charity: charityId })
      .skip(offset)
      .limit(limit);
  }
}

module.exports = new ProjectRepository();
