const Todo = require('../models/todo');


const addTodo = async (req, res) => {
  const { name } = req.body;

  try {
    const newTodo = await Todo.create({
      name,
      userId: req.user.id,
    });

    return res.json(newTodo);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};


const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    return res.json(todos);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

// Edit a Todo
const editTodo = async (req, res) => {
  const { name } = req.body;

  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    if (todo.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    todo.name = name;

    todo = await Todo.findByIdAndUpdate(req.params.id, todo, { new: true });

    return res.json(todo);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

const removeTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    
    if (todo.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Todo.findByIdAndDelete(req.params.id);

    return res.json({ msg: 'Todo removed' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

module.exports={
 addTodo,
 getTodos,
 editTodo,
 removeTodo
}
