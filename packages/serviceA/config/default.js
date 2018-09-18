module.exports = {
  serviceAUrl: "http://localhost:5000",
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  },
  serviceA: {
    dbConfig: {
      client: "mysql",
      connection: {
        host: "service-a-database",
        port: "3306",
        database: "service_a_api_db",
        user: "root",
        password: "temp4455"
      },
      pool: {
        min: 2,
        max: 10
      }
    },
    jwt: {
      key: "eYMy3BiddU/{dD4",
      exp: "10h",
      alg: "HS256",
    },
    saltRounds: 8,
  },
};
