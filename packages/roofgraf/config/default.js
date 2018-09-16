module.exports = {
  roofgrafUrl: "http://localhost:5000",
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  },
  roofgraf: {
    dbConfig: {
      client: "mysql",
      connection: {
        host: "localhost",
        port: "3308",
        database: "roofgraf_api_db",
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
