"use strict";
module.exports = [

    /*
     ****************************
     ******** VEHICULES *********
     ****************************
     */
    {
        method: 'GET',
        path: '/vehicules',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            // On ouvre une requête à MySQL
            const pool = request.mysql.pool;
            try {
                // Notre requête
                // La réponse est stocké automatiquement sous la forme d'un JSON dans la variable rows
                const [rows] = await pool.query('select * from vehicule LEFT JOIN agence ON VEHICULE_ID_AGENCE = AGENCE_ID LEFT JOIN statut ON VEHICULE_ID_STATUT = STATUT_ID;');
                // On charge la vue 'front-page' avec nos données SQL
                // La variable 'vehicule' aura la valeur de retour de notre serveur de BDD
                return reply.view('liste-vehicule', {
                    vehicules: rows,
                    nb_vehicules: rows.length
                });
            } catch (err) {
                console.log(err);
            }
        }
    },
    {
        method: 'GET',
        path: '/vehicule/{vehicule_id}',
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
        path: '/vehicule/agence/{agence_id}',
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
        path: '/vehicule/add',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            // On ouvre une requête à MySQL
            const pool = request.mysql.pool;
            try {
                var datum = request.payload.date_fabrication;
                let query = `insert into vehicule (\`VEHICULE_DATE_FABRICATION\`, \`VEHICULE_HAUTEUR\`, \`VEHICULE_LARGEUR\`, \`VEHICULE_LONGUEUR\`, \`VEHICULE_POIDS\`, \`VEHICULE_PUISSANCE\`, \`VEHICULE_ID_STATUT\`, \`VEHICULE_MARQUE\`, \`VEHICULE_MODELE\`, \`VEHICULE_ID_AGENCE\`) VALUES ("${datum}", ${request.payload.hauteur}, ${request.payload.largeur}, ${request.payload.longueur}, ${request.payload.poids}, ${request.payload.puissance}, 1, "${request.payload.marque}","${request.payload.modele}",${request.payload.id_agence});`;
                const [rows] = await pool.query(query);
                return reply.redirect('/vehicules');
            } catch (err) {
                console.log(err);
            }
        }
    },

    {
        method: 'GET',
        path: '/vehicule/add',
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
        path: '/vehicule/reserver/{vehicule_id}',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query(`select * from vehicule LEFT JOIN agence ON AGENCE_ID = VEHICULE_ID_AGENCE where VEHICULE_ID = ${request.params.vehicule_id} GROUP BY VEHICULE_ID`);
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
        method: 'GET',
        path: '/vehicule/retour/{vehicule_id}',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query(`select * from vehicule LEFT JOIN agence ON AGENCE_ID = VEHICULE_ID_AGENCE where VEHICULE_ID = ${request.params.vehicule_id} GROUP BY VEHICULE_ID`);
                let data = {
                    vehicules: rows
                };
                return reply.view('signaler-retour', data);
            } catch (err) {
                console.log(err);
            }
        }
    },
    {
        method: 'POST',
        path: '/vehicule/reserver/{vehicule_id}',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            const pool = request.mysql.pool;
            try {
                const [rows2] = await pool.query(`UPDATE vehicule SET VEHICULE_DATE_FIN_PRET = "${request.payload.date_fin_pret}", VEHICULE_DATE_DEBUT_PRET = "${request.payload.date_debut_pret}", VEHICULE_ID_STATUT = 2 WHERE VEHICULE_ID = ${request.params.vehicule_id}`);
                const [rows] = await pool.query('select * from vehicule LEFT JOIN agence ON VEHICULE_ID_AGENCE = AGENCE_ID LEFT JOIN statut ON VEHICULE_ID_STATUT = STATUT_ID;');
                let data = {
                    vehicules: rows,
                    nb_vehicules: rows.length
                };
                return reply.view('liste-vehicule', data);
            } catch (err) {
                console.log(err);
            }
        }
    },
    {
        method: 'POST',
        path: '/vehicule/retour/{vehicule_id}',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            const pool = request.mysql.pool;
            try {
                await pool.query(`UPDATE vehicule SET VEHICULE_ID_STATUT = 1, VEHICULE_DATE_FIN_PRET = "", VEHICULE_DATE_DEBUT_PRET = "" WHERE VEHICULE_ID = ${request.params.vehicule_id}`);
                const [rows] = await pool.query('select * from vehicule LEFT JOIN agence ON VEHICULE_ID_AGENCE = AGENCE_ID LEFT JOIN statut ON VEHICULE_ID_STATUT = STATUT_ID;');
                let data = {
                    vehicules: rows,
                    nb_vehicules: rows.length
                };
                return reply.view('liste-vehicule', data);
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
        path: '/agences',
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
        path: '/agence/{id_agence}',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query(`select * from agence where AGENCE_ID = ${request.params.id_agence};`);
                return reply.view('info-agence', {agences: rows});
            } catch (err) {
                console.log(err);
            }
        }
    },
    {
        method: 'GET',
        path: '/agence/add',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            return reply.view('ajouter-agence');
        }
    },

    {
        method: 'POST',
        path: '/agence/add',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            // On ouvre une requête à MySQL
            const pool = request.mysql.pool;
            try {
                let query = `insert into agence (\`AGENCE_NOM\`, \`AGENCE_NUM_ADRESSE\`, \`AGENCE_NOM_ADRESSE\`, \`AGENCE_MAIL\`, \`AGENCE_TEL\`, \`AGENCE_FAX\`, \`AGENCE_CP\`, \`AGENCE_VILLE\`)  VALUES ("${request.payload.nom}", "${request.payload.num_adresse}", "${request.payload.nom_adresse}", "${request.payload.mail}", "${request.payload.tel}", "${request.payload.fax}", "${request.payload.cp}", "${request.payload.ville}");`;
                console.log(query);
                await pool.query(query);
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
        path: '/statut/add',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            return reply.view('creer-statut');
        }
    },
    {
        method: 'GET',
        path: '/statuts',
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
     ******* UTILISATEUR ********
     ****************************
     */
    {
        method: 'GET',
        path: '/utilisateur/add',
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
        method: 'POST',
        path: '/utilisateur/add',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            const pool = request.mysql.pool;
            try {
                let query = `INSERT INTO utilisateur (\`UTILISATEUR_IDENTIFIANT\`, \`UTILISATEUR_NOM\`, \`UTILISATEUR_PRENOM\`, \`UTILISATEUR_TEL\`, \`UTILISATEUR_FAX\`, \`UTILISATEUR_MOBILE\`, \`UTILISATEUR_ID_AGENCE\`, \`UTILISATEUR_PWD\`) values ("${request.payload.identifiant}", "${request.payload.nom}", "${request.payload.prenom}", "${request.payload.tel}", "${request.payload.fax}", "${request.payload.mobile}", "${request.payload.id_agence}", "${request.payload.num_adresse}");`;
                await pool.query(query);
                const [rows] = await pool.query('select * from utilisateur LEFT JOIN agence ON UTILISATEUR_ID_AGENCE = AGENCE_ID;');
                return reply.view('liste-utilisateurs', {utilisateurs: rows});
            } catch (err) {
                console.log(err);
            }
        }
    },
    {
        method: 'GET',
        path: '/utilisateurs',
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
        path: '/utilisateur/{utilisateur_id}',
        config: {
            auth: 'session'
        },
        async handler(request, reply) {
            // On ouvre une requête à MySQL
            const pool = request.mysql.pool;
            try {
                const [rows] = await pool.query(`select * from utilisateur LEFT JOIN agence ON AGENCE_ID = UTILISATEUR_ID_AGENCE where UTILISATEUR_ID = ${request.params.utilisateur_id};`);
                return reply.view('info-utilisateur', {utilisateur: rows});
            } catch (err) {
                console.log(err);
            }
        }
    },

    {
        method: 'GET',
        path: '/{path*}',
        handler: (request, reply) => {
            return reply.view('404').code(404)
        }
    },

    {
        method: 'GET',
        path: '/logout',
        options: {
            handler: function (request, h) {
                //request.server.app.cache.drop(request.state['sid-example'].sid);
                request.cookieAuth.clear();
                return h.redirect('/');
            },
        }
    },
    {
        method: 'GET',
        path: '/',
        options: {
            handler: function (request, h) {
                return h.view('home');
            }
        }
    },
    {
        method: ['GET'],
        path: '/login',
        options: {
            auth: false,
            handler: async function (request, h) {
                return h.view('login');
            }
        }

    }
];