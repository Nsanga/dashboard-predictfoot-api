async function performCrudOperation(model, operation, data) {
  try {
    switch (operation) {
      case 'create':
        return await model.create(data);
      case 'update':
        if (!data.filter || !data.updates) {
          throw new Error('Missing filter or updates data for the update operation.');
        }
        return await model.findOneAndUpdate(data.filter, data.updates, { new: true });
      case 'delete':
        if (!data.id) {
          throw new Error('Missing ID for the delete operation.');
        }
        return await model.findByIdAndDelete(data.id);
      case 'getById':
        if (!data.id) {
          throw new Error('Missing ID for the getById operation.');
        }
        return await model.findById(data.id);
      case 'getAll':
        return await model.find();
      case 'get':
        if (!data || Object.keys(data).length === 0) {
          throw new Error('Missing filter data for the get operation.');
        }
        return await model.find(data);
      default:
        throw new Error('Invalid operation');
    }
  } catch (error) {
    throw new Error(`Error performing ${operation} operation: ${error.message}`);
  }
}

module.exports = {
  performCrudOperation,
};
