

module.exports = {

    deleteOne: async (res, action, id) => { 
        const data = await action;
        switch (data.rowCount) {
            case 0:
                res.status(404).send({ 
                    status: status.notfound,
                    message: `Row with '${id}' not founded`
                });
                break;
            case 1:
                res.send({ 
                    status: status.success,
                    message: 'Deleted row', data: data.rows[0].id
                });
                break;
            default:
                res.status(500).send({ 
                    status: status.error,
                    message: 'An unexpected error occurred'
                });
                break;
        }
    },

    updateOne: async (res, action, id) => {
        const data = await action;
        switch (data.rowCount) {
            case 0:
                res.status(404).send({ 
                    status: status.notfound,
                    message: `Row with '${id}' not founded`
                });
                break;
            case 1:
                res.send({
                    message: 'The data has been changed',
                    status: status.success,
                    data: data.rows[0]
                });
                break;
            default:
                res.status(500).send({ 
                    status: status.error,
                    message: 'An unexpected error occurred'
                });
                break;
        }
    },

    insertOne: async (res, action) => {
        const data = await action;
        const { id } = data.rows[0];
        switch (data.rowCount) {
            case 0:
            res.status(404).send({ 
                    status: status.error,
                    message: 'The item hasn\'t been inserted'
                });
                break;
            case 1:
                res.send({ 
                    status: status.success,
                    message: `Inseted row with '${id}'`
                });
                break;
            default:
                res.status(500).send( { 
                    status: status.error,
                    message: 'An unexpected error occurred'
                });
                break;
        }
    },
    
    selectOne: async (res, action, id) => {
        const data = await action;
        switch (data.rowCount) {
            case 0:
                res.status(404).send({ 
                    status: status.notfound,
                    message: `Row with '${id}' not founded`
                });
                break;
            case 1:
                res.send({
                    status: status.success, 
                    message: `Selected row with '${id}'`,
                    //data: data.rows[0]
                    data: data.rows
                });
                break;
            default:
                res.status(500).send({ 
                    status: status.error,
                    message: 'An unexpected error occurred'
                });
                break;
        }
    },
    
    selectMany: async (res, action, id) => {
        const data = await action;
        switch (data.rowCount) {
            case 0:
                res.status(404).send({
                    status: status.error, 
                    message: `Rows with '${id}' not founded`
                });
                break;
            default:
                res.send({ 
                    status: status.success,
                    message: `Selected rows where '${id}'`,
                    data: data.rows
                });
                break;
        }
    }
}

const status = {
    success: 'Success',
    notfound: 'Not founded',
    error: 'Error'
}