const websitePath = './website/';
module.exports = [
    {
        method : 'GET',
        path   : '/css/{file}',
        handler: (request, reply) => {
            return reply.file(websitePath + 'css/' + request.params.file)
        },
        options: {
            auth: false,
        }
    },
    {
        method : 'GET',
        path   : '/js/{file}',
        handler: (request, reply) => {
            return reply.file(websitePath + 'js/' + request.params.file)
        },
        options: {
            auth: false,
        }
    },
    {
        method : 'GET',
        path   : '/images/{file}',
        handler: (request, reply) => {
            return reply.file(websitePath + 'images/' + request.params.file)
        },
        options: {
            auth: false,
        }
    }
];