"use strict";
//Charge le framework Hapi et les plugins
const Hapi = require('hapi');
const Vision = require('vision');
const Handlebars = require('handlebars');
const Inert = require('inert');
const Boom = require('boom');

// Notre chemin vers notre gestionnaire d'URL
const routesPath = './routes/';
const sid = 1;

const launchServer = async function () {
          // définition des caractéristique de notre serveur Node.
          // Ici sur le port 3000 et sur l'adresse 'localhost'
          const server = Hapi.Server({port: 3000, host: 'localhost'});
          await server.register(require('hapi-auth-cookie'));
          // Enregistre le module vision permettant l'interprétation des vues HTML
          await server.register(require('vision'));
          await server.register(require('inert'));
          // définition de notre serveur sql
          // mysql://[user]:[password]@[serveur]/[base]
          const clientOpts = {
              settings: 'mysql://root:root@localhost/webprojectril',
              decorate: true
          };

          // Enregistre notre module faisant le lien entre hapi et MySQL
          await server.register({
              plugin : require('hapi-mysql2'),
              options: clientOpts
          });
          const cache = server.cache({segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000});
          server.app.cache = cache;
          server.auth.strategy('session', 'cookie', {
              password    : '42fa79HGWQplXz76qtDtUO6MHf6QWXo5',
              cookie      : 'socopec-ws',
              redirectTo  : '/login',
              keepAlive   : true,
              ttl         : 1000 * 60 * 60 * 8,
              isSecure    : false,
              validateFunc: async (request, session) => {
                  const cached = await cache.get(session.sid);
                  const out = {
                      valid: !!cached
                  };
                  if (out.valid) {
                      out.credentials = cached.account;
                  }
                  return out;
              }
          });
          server.auth.default('session');

          // Configuration de nos vues
          server.views({

              // Ici on signale l'utilisation de handlebars
              // Handlebars permet de gérer les vues sous la forme de templates
              // On pourra utiliser des boucles ou encore des variables dans nos vues HTML
              engines: {
                  html: Handlebars
              },

              // Les chemins vers nos templates
              path      : 'website/contents',
              layoutPath: 'website',

              // Template principal
              layout      : 'index',
              partialsPath: 'website/partials',
              helpersPath : 'website/helpers'

          });
          // Enregistre l'endroit où les URL de nos pages seront gérées
          server.route(require(routesPath + 'pagesRoutes'));
          server.route(require(routesPath + 'staticRoutes'));

          server.route([
              {
                  method : ['POST'],
                  path   : '/login',
                  options: {
                      handler: async function (request, h) {
                          if (request.auth.isAuthenticated) {
                              return h.redirect('/');
                          }
                          const pool = request.mysql.pool;
                          try {
                              let account = null;
                              let uuid = 0;
                              const [rows, fields] = await pool.query(`select * from utilisateur where UTILISATEUR_IDENTIFIANT = "${request.payload.name}" AND UTILISATEUR_PWD = "${request.payload.password}";`);
                              if (rows.length === 0) {
                                  let msg = 'Identifiant ou mot de passe incorrect';
                                  return h.redirect('/login', {msg: msg});
                              }
                              const sid = String(++uuid);
                              await request.server.app.cache.set(sid, {account}, 0);
                              request.cookieAuth.set({sid});
                              return h.redirect('/');
                          } catch (err) {
                              // Boom est un plugin permettant la gestion des erreurs de l'application
                              console.log(err);
                              throw Boom.internal('Internal Mysql Error', err)
                          }
                      },
                      auth   : false,
                      plugins: {
                          'hapi-auth-cookie':
                              {
                                  redirectTo: false
                              }
                      }
                  }
              },

          ]);

          // Lance notre serveur et attend que celui-ci ai terminé pour passer à la suite
          await server.start();
          console.log(`Server started at ${server.info.uri}`)
      }
;

// Fait appel à notre constante pour lancer le serveur
// défini juste au dessus et catch les erreurs possibles
launchServer().catch(err => {
    if (err) throw err;
    console.log('server listening at: ', server.info.uri)
});