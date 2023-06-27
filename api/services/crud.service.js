async function performCrudOperation(model, operation, data) {
  switch (operation) {
    case 'create':
      return model.create(data);
    case 'update':
      return model.findByIdAndUpdate(data.id, data.updates, { new: true });
    case 'delete':
      return model.findByIdAndDelete(data.id);
    case 'getById':
      return model.findById(data.id);
    case 'getAll':
      return model.find();
    case 'get':
      return model.find(data);
    default:
      throw new Error('Invalid operation');
  }
}

module.exports = {
  performCrudOperation,
};
