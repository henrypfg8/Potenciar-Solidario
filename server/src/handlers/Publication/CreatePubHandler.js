const {CreatePublication} = require("../../controllers/Publication/CreatePublication");

const createPublicationHandler = async (req, res) => {
    const {
        title,
        description,
        category,
        startDate,
        endDate,
        modificationDate,
        creationDate,
        status,
        organization,
        url,
        image,
        registrationLink,
        contact,
         likes 
    } = req.body;

    //const userId = req.userId;
    //console.log(`este es el user id ${userId}`); 

    try {
        if (!title || !description || !category || !contact || !organization)
            throw new Error("Faltan campos obligatorios");

        const publication = await CreatePublication({
            
            title,
            description,
            category,
            startDate,
            endDate,
            modificationDate,
            creationDate,
            status,
            organization,
            url,
            image,
            registrationLink,
            contact,
            likes, 
            //userID:userId
        });

        res.status(201).json(publication);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createPublicationHandler };
