const Project = require('./project');

class ProjectRepository {
  async create(data) {
    const project = new Project(data);
    //convert the saving process into a boolean
    return !!(await project.save());
  }

  async findById(id) {
    return await Project.findById(id);
  }

  async update(id, data) {
    return await Project.findByIdAndUpdate(id, data, { new: true });
  }

  async getAll(page, limit, filters) {
    const { status, month, region, country, category, search } = filters;
    const query = {};

    if (status) query.status = status;

    // Filter by created month
    if (month) {
      const startDate = new Date(new Date().getFullYear(), month - 1, 1);
      const endDate = new Date(new Date().getFullYear(), month, 1);
      query.createdAt = { $gte: startDate, $lt: endDate };
    }

    // Filter by region, country, and category
    if (region) query.region = region;
    if (country) query.country = country;
    if (category) query.category = category;

    // Search by title or charity name
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'charity.companyName': { $regex: search, $options: 'i' } } 
      ];
    }

    const offset = (page - 1) * limit;
    return {
      results: await Project.find(query) 
                .skip(offset)  
                .limit(limit),
      totalProjects: await  Project.countDocuments(query)
    }
  }

  async getActiveProjects(page, limit, filters) {
    const { month, region, country, category, search } = filters;
    const query = {};
    query.status = 'active';
    // Filter by created month
    if (month) {
      const startDate = new Date(new Date().getFullYear(), month - 1, 1);
      const endDate = new Date(new Date().getFullYear(), month, 1);
      query.createdAt = { $gte: startDate, $lt: endDate };
    }

    // Filter by region, country, and category
    if (region) query.region = region;
    if (country) query.country = country;
    if (category) query.category = category;

    // Search by title or charity name
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'charity.companyName': { $regex: search, $options: 'i' } } 
      ];
    }

    const offset = (page - 1) * limit;
    return {
      results: await Project.find(query)
              .skip(offset)
              .limit(limit)
              .populate('charity'),
      totalProjects: await Project.countDocuments(query)
    }
  }

  async getProjectsByCharity(charityId, page, limit) {
    const offset = (page - 1) * limit;
    return {
      results: await Project.find({ charity: charityId })
            .skip(offset)
            .limit(limit),
      totalProjects: await Project.countDocuments({ charity: charityId })
  }
  }
}

module.exports = new ProjectRepository();
