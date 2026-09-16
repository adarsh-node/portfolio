const Project = require("../models/Project");

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Fetch projects error:", error);

    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
};

// Get one project
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Fetch project error:", error);

    res.status(500).json({
      message: "Failed to fetch project",
    });
  }
};

// Create project
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      technologies,
      githubUrl,
      liveUrl,
      featured,
      order,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      image: image || "",
      technologies: Array.isArray(technologies) ? technologies : [],
      githubUrl: githubUrl || "",
      liveUrl: liveUrl || "",
      featured: Boolean(featured),
      order: Number(order) || 0,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);

    res.status(400).json({
      message: "Failed to create project",
    });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      technologies,
      githubUrl,
      liveUrl,
      featured,
      order,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        description: description.trim(),
        image: image || "",
        technologies: Array.isArray(technologies) ? technologies : [],
        githubUrl: githubUrl || "",
        liveUrl: liveUrl || "",
        featured: Boolean(featured),
        order: Number(order) || 0,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Update project error:", error);

    res.status(400).json({
      message: "Failed to update project",
    });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    res.status(500).json({
      message: "Failed to delete project",
    });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};