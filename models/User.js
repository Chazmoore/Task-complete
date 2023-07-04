const Task = require('../models/Task');

module.exports = {
  create: async (title, description) => {
    try {
      const task = await Task.create({ title, description });
      return task;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },
  update: async (id, completed) => {
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error('Task not found');
      }
      task.completed = completed;
      await task.save();
      return task;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },
};
