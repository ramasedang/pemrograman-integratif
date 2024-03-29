import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import mysql from "mysql";

const PROTO_PATH = "./data.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const userData = grpcObject.data.UserData;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "grpc",
});

connection.connect();

function createUser(call, callback) {
  const user = call.request;

  connection.query("INSERT INTO users SET ?", user, (err, result) => {
    if (err) throw err;

    user.id = result.insertId;
    callback(null, "User created successfully");
  });
}

function readUser(call, callback) {
  const id = call.request.id;

  connection.query("SELECT * FROM users WHERE id = ?", id, (err, results) => {
    if (err) throw err;

    const user = results[0];
    callback(null, user);
  });
}

function updateUser(call, callback) {
  const user = call.request;

  connection.query(
    "UPDATE users SET name = ?, address = ?, age = ?, gender = ? WHERE id = ?",
    [user.name, user.address, user.age, user.gender, user.id],
    (err, result) => {
      if (err) throw err;

      callback(null, user);
    }
  );
}

function deleteUser(call, callback) {
  const id = call.request.id;

  connection.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
    if (err) throw err;

    callback(null, "User deleted successfully");
  });
}

function main() {
  const server = new grpc.Server();
  server.addService(userData.service, {
    CreateUser: createUser,
    ReadUser: readUser,
    UpdateUser: updateUser,
    DeleteUser: deleteUser,
  });




  server.bindAsync(
    "localhost:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log("Server started on port 50051");
    }
  );
}

main();
