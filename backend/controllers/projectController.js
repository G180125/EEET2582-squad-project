const ProjectService = require('../services/projectService');

class ProjectController {
  async getProjects(req, res) {
    try {
      const { searchTerm, charityId, status, type } = req.query;
      const projects = await ProjectService.getProjects(searchTerm, charityId, status, type);
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMyProjects(req, res) {
    try {
      const currentId = req.id;
      const projects = await ProjectService.getMyProjects(currentId);
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createProject(req, res) {
    try {
      const projectData = req.body;
      const newProject = await ProjectService.createProject(projectData);
      res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProject(req, res) {
    try {
      const currentId = req.id;
      const projectId = req.params.projectId;

      const updatedProject = await ProjectService.updateProject(currentId, projectId);
      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }

  async haltProject(req, res) {
    try {
      const currentId = req.id; 
      const { projectId, updateData } = req.params;
  

      const haltedProject = await ProjectService.haltProject(currentId, projectId, updateData);
      res.status(200).json(haltedProject);
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }

  async resumeProject(req, res) {
    try {
      const currentId = req.id;
      const projectId = req.params.projectId;

      const resumedProject = await ProjectService.resumeProject(currentId, projectId);
      res.status(200).json(resumedProject);
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }

  async deleteProject(req, res) {
    try {
      const currentId = req.id; 
      const projectId = req.params.projectId;

      await ProjectService.deleteProject(currentId, projectId);
      res.status(204).send();
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }

  async getStatistics(req, res) {
    try {
      const currentId = req.id;
      const stats = await ProjectService.getStatistics(currentId);
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProjectController();
