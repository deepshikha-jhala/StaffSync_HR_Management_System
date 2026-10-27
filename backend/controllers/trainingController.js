const Training = require('../models/Training');

// Create a training program
const createTraining = async (req, res) => {
try {
const { title, description, trainer, date } = req.body;


    if (!title || !description || !trainer || !date) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    const training = await Training.create({
        title,
        description,
        trainer,
        date,
        createdBy: req.user._id
    });

    res.status(201).json({
        message: 'Training program created successfully',
        training
    });
} catch (error) {
    res.status(500).json({ message: error.message });
}

};

// Get all training programs
const getTrainings = async (req, res) => {
try {
const trainings = await Training.find()
.populate('createdBy', 'name email')
.sort({ date: 1 });

    res.status(200).json(trainings);
} catch (error) {
    res.status(500).json({ message: error.message });
}

};

// Delete a training program
const deleteTraining = async (req, res) => {
try {
const training = await Training.findById(req.params.id);

    if (!training) {
        return res.status(404).json({
            message: 'Training program not found'
        });
    }

    await training.deleteOne();

    res.status(200).json({
        message: 'Training program deleted successfully'
    });
} catch (error) {
    res.status(500).json({ message: error.message });
}

};

module.exports = {
createTraining,
getTrainings,
deleteTraining
};
