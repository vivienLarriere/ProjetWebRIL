"use strict";

module.exports = [

    {
        method : ['GET'],
        path   : '/login',
        options: {
            auth   : false,
            handler: async function (request, h) {
                return h.view('login');
            }
        }

    },
    /*
     ****************************
     ******** VEHICULES *********
     ****************************
     */
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
                let data = {
                    vehicules   : rows,
                    nb_vehicules: rows.length
                };
                return reply.view('liste-vehicule', data);
            } catch (err) {
                // Boom est un plugin permettant la gestion des erreurs de l'application
                throw Boom.internal('Internal Mysql Error', err)
            }
        }
    },
    {
        method: 'GET',
        path  : '/vehicule/{vehicule_id}',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            // On ouvre une requête à MySQL
            const pool = request.mysql.pool;
            try {
                // Notre requête
                // La réponse est stocké automatiquement sous la forme d'un JSON dans la variable rows
                const [rows] = await pool.query(`select * from vehicule where VEHICULE_ID = ${request.params.vehicule_id};`);

                // On charge la vue 'front-page' avec nos données SQL
                // La variable 'vehicule' aura la valeur de retour de notre serveur de BDD
                return reply.view('info-vehicule', {vehicule: rows});
            } catch (err) {
                // Boom est un plugin permettant la gestion des erreurs de l'application
                throw Boom.internal('Internal Mysql Error', err)
            }
        }
    },
    {
        method: 'GET',
        path  : '/vehicule/agence/{agence_id}',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            // On ouvre une requête à MySQL
            const pool = request.mysql.pool;
            try {
                // Notre requête
                // La réponse est stocké automatiquement sous la forme d'un JSON dans la variable rows
                const [rows] = await pool.query(`select * from vehicule where VEHICULE_ID_AGENCE = ${request.params.agence_id};`);

                // On charge la vue 'front-page' avec nos données SQL
                // La variable 'vehicule' aura la valeur de retour de notre serveur de BDD
                return reply.view('info-vehicule', {vehicule: rows});
            } catch (err) {
                // Boom est un plugin permettant la gestion des erreurs de l'application
                throw Boom.internal('Internal Mysql Error', err)
            }
        }
    },
    {
        method: 'POST',
        path  : '/vehicule/add',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            // On ouvre une requête à MySQL
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query(`insert into utilisateur (UTILISATEUR_IDENTIFIANT, UTILISATEUR_NOM, UTILISATEUR_PRENOM, UTILISATEUR_TEL, UTILISATEUR_FAX, UTILISATEUR_MOBILE, UTILISATEUR_PWD) VALUES ("${request.payload.identifiant}", "${request.payload.nom}", "${request.payload.prenom}", , "${request.payload.tel}"), "${request.payload.fax}", "${request.payload.mobile}", "${request.payload.pwd}";`);
                return reply.redirect('/vehicules');
            } catch (err) {
                console.log(err);
                throw Boom.internal('Internal Mysql Error', err)
            }
        }
    },
    {
        method: 'GET',
        path  : '/vehicule/add',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query(`select * from agence`);
                let data = {
                    agences: rows
                };
                return reply.view('ajouter-vehicule', data);
            } catch (err) {
                console.log(err);
                throw Boom.internal('Internal Mysql Error', err)
            }
        }
    },
    /*
     ****************************
     ********* AGENCE ***********
     ****************************
     */
    {
        method: 'GET',
        path  : '/agences',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            // On ouvre une requête à MySQL
            const pool = request.mysql.pool;
            try {
                // Notre requête
                // La réponse est stocké automatiquement sous la forme d'un JSON dans la variable rows
                const [rows] = await pool.query('select * from agence;');

                // On charge la vue 'front-page' avec nos données SQL
                // La variable 'vehicule' aura la valeur de retour de notre serveur de BDD
                return reply.view('front-page', {vehicule: rows});
            } catch (err) {
                // Boom est un plugin permettant la gestion des erreurs de l'application
                throw Boom.internal('Internal Mysql Error', err)
            }
        }
    },
    {
        method: 'GET',
        path  : '/agence/add',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            return reply.view('ajouter-agence');
        }
    },

    {
        method: 'POST',
        path  : '/agence/add',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            // On ouvre une requête à MySQL
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query(`insert into utilisateur (UTILISATEUR_IDENTIFIANT, UTILISATEUR_NOM, UTILISATEUR_PRENOM, UTILISATEUR_TEL, UTILISATEUR_FAX, UTILISATEUR_MOBILE, UTILISATEUR_PWD) VALUES ("${request.payload.identifiant}", "${request.payload.nom}", "${request.payload.prenom}", , "${request.payload.tel}"), "${request.payload.fax}", "${request.payload.mobile}", "${request.payload.pwd}";`);
                return reply.redirect('/vehicules');
            } catch (err) {
                console.log(err);
                throw Boom.internal('Internal Mysql Error', err)
            }
        }
    },


    /*
     ****************************
     ********* FICHIER **********
     ****************************
     */



    /*
     ****************************
     ******** HISTORIQUE ********
     ****************************
     */



    /*
     ****************************
     ********* STATUT ***********
     ****************************
     */



    /*
     ****************************
     ********** TICKET **********
     ****************************
     */


    /*
     ****************************
     ******** TYPE HISTO ********
     ****************************
     */


    /*
     ****************************
     ******* UTILISATEUR ********
     ****************************
     */


    /*
     ****************************
     ******** VEHICULES *********
     ****************************
     */
    {
        method : 'GET',
        path   : '/{path*}',
        handler: (request, reply) => {
            return reply.view('404').code(404)
        }
    }
];