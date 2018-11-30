"use strict";

module.exports = [
    // on ajoute nos différentes URL valide ici
    {
        method: 'GET',
        path  : '/vehicules',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            // On ouvre une requête à MySQL
            const pool = request.mysql.pool;
            try {
                // Notre requête
                // La réponse est stocké automatiquement sous la forme d'un JSON dans la variable rows
                const [rows] = await pool.query('select * from vehicule;');

                // On charge la vue 'front-page' avec nos données SQL
                // La variable 'vehicule' aura la valeur de retour de notre serveur de BDD
                return reply.view('front-page', {vehicule: rows});
            } catch (err) {
                // Boom est un plugin permettant la gestion des erreurs de l'application
                throw Boom.internal('Internal Mysql Error', err)
            }
        }
    },
];