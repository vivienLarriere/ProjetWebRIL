"use strict";
const Boom = require('boom');

module.exports = [

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
                return reply.view('liste-vehicule', {
                    vehicules   : rows,
                    nb_vehicules: rows.length
                });
            } catch (err) {
                console.log(err);
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
                const [rows, fields] = await pool.query(`select * from vehicule LEFT JOIN statut ON STATUT_ID = VEHICULE_ID_STATUT LEFT JOIN agence ON AGENCE_ID = VEHICULE_ID_AGENCE where VEHICULE_ID = ${request.params.vehicule_id} GROUP BY VEHICULE_ID;`);
                // On charge la vue 'front-page' avec nos données SQL
                // La variable 'vehicule' aura la valeur de retour de notre serveur de BDD
                return reply.view('statut-vehicule', {
                    vehicule: rows,
                });
            } catch (err) {
                console.log(err);
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
                console.log(err);
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
            }
        }
    },
    {
        method: 'GET',
        path  : '/vehicule/reserver',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query(`select * from vehicules`);
                let data = {
                    vehicules: rows
                };
                return reply.view('reserver-vehicule', data);
            } catch (err) {
                console.log(err);
            }
        }
    },
    {
        method: 'POST',
        path  : '/vehicule/update',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query(`UPDATE`);
                let data = {
                    vehicules: rows
                };
                return reply.view('liste-vehicule', data);
            } catch (err) {
                console.log(err);
            }
        }
    },
    {
        method: 'GET',
        path  : '/vehicule/retour',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query(`select * from vehicules`);
                let data = {
                    vehicules: rows
                };
                return reply.view('signaler-retour', data);
            } catch (err) {
                console.log(err);
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
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query('select * from agence;');
                return reply.view('liste-agence', {agences: rows});
            } catch (err) {
                console.log(err);
            }
        }
    },
    {
        method: 'GET',
        path  : '/agence/{id_agence}',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query(`select * from agence where AGENCE_ID = ${request.params.id_agence};`);
                return reply.view('statut-agence', {agences: rows});
            } catch (err) {
                console.log(err);
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
                const [rows] = await pool.query(`insert into agence (\`AGENCE_NOM\`, \`AGENCE_NUM_ADRESSE\`, \`AGENCE_NOM_ADRESSE\`, \`AGENCE_MAIL\`, \`AGENCE_TEL\`, \`AGENCE_FAX\`, \`AGENCE_CP\`, \`AGENCE_VILLE\`)  VALUES ("${request.payload.nom}", "${request.payload.num_adresse}", "${request.payload.nom_adresse}", , "${request.payload.mail}"), "${request.payload.tel}", "${request.payload.fax}", "${request.payload.cp}", "${request.payload.ville}";`);
                //  INSERT INTO `agence` (`AGENCE_ID`, `AGENCE_NOM`, `AGENCE_NUM_ADRESSE`, `AGENCE_NOM_ADRESSE`, `AGENCE_MAIL`, `AGENCE_TEL`, `AGENCE_FAX`, `AGENCE_ID_FICHIER`, `AGENCE_CP`, `AGENCE_VILLE`) VALUES (2, 'Trotro6', '56', 'Labas', 'toto@toto.fr', '0304056001', '0807090645', NULL, '55440', 'Lamarche');
                return reply.redirect('/agences');
            } catch (err) {
                console.log(err);
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
    {
        method: 'GET',
        path  : '/statut/add',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            return reply.view('creer-statut');
        }
    },
    {
        method: 'GET',
        path  : '/statuts',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query('select * from statut;');
                return reply.view('liste-statuts', {statuts: rows});
            } catch (err) {
                console.log(err);
            }
        }
    },


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
    {
        method: 'GET',
        path  : '/utilisateur/add',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query('select * from agence;');
                return reply.view('ajouter-utilisateur', {agences: rows});
            } catch (err) {
                console.log(err);
            }
        }
    },
    {
        method: 'GET',
        path  : '/utilisateurs',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            // On ouvre une requête à MySQL
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query('select * from utilisateur LEFT JOIN agence ON UTILISATEUR_ID_AGENCE = AGENCE_ID;');
                return reply.view('liste-utilisateurs', {
                    utilisateurs: rows,
                });
            } catch (err) {
                console.log(err);
            }
        }
    },
    {
        method: 'GET',
        path  : '/utilisateur/{utilisateur_id}',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            // On ouvre une requête à MySQL
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query(`select * from utilisateur where UTILISATEUR_ID = ${request.params.utilisateur_id};`);
                return reply.view('info-utilisateur', {utilisateur: rows});
            } catch (err) {
                console.log(err);
            }
        }
    },
    {
        method: 'POST',
        path  : '/utilisateur/add',
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
            }
        }
    },

    {
        method : 'GET',
        path   : '/{path*}',
        handler: (request, reply) => {
            return reply.view('404').code(404)
        }
    },

    {
        method : 'GET',
        path   : '/logout',
        options: {
            handler: function (request, h) {
                //request.server.app.cache.drop(request.state['sid-example'].sid);
                request.cookieAuth.clear();
                return h.redirect('/');
            },
        }
    },
    {
        method : 'GET',
        path   : '/',
        options: {
            handler: function (request, h) {
                return h.view('home');
            }
        }
    },
    {
        method : ['GET'],
        path   : '/login',
        options: {
            auth   : false,
            handler: async function (request, h) {
                return h.view('login');
            }
        }

    }
];