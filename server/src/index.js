import Hapi from "@hapi/hapi";
import routes from "./routes.js";
import hapiAuthJWT from "hapi-auth-jwt2"
import { validate } from "./auth.js";

const init = async () => {
  const server = new Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register(hapiAuthJWT)
 
  server.auth.strategy('jwt', 'jwt', {
    key : process.env.SECRET_KEY,
    validate,
  })

  server.auth.default('jwt');
  server.route(routes);

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();
