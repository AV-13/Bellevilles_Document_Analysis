const Group = require('../models/Groups');

exports.getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch(error) {
        console.log("groupsController.getAllGroups : ", error);
    }
}

exports.createGroup = async (req, res) => {
    try {
        const { groupName } = req.body;

        const newGroup = new Group({
            groupName: groupName,
        });

        const savedGroup = await newGroup.save();

        res.status(201).json({
            message: 'Group created successfully',
            group: savedGroup
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Error creating group",
            error: error.message
        });
    }
};
