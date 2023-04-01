import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';


const PROTO_PATH = './data.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const userData = grpcObject.data.UserData;

const client = new userData('localhost:50051', grpc.credentials.createInsecure());

function createUser(name, address, age, gender) {
    const user = {
        name: name,
        address: address,
        age: age,
        gender: gender
    };

    client.CreateUser(user, (err, response) => {
        console.log(response);
        if (err) {
            console.error(err);
            return;
        }

        console.log(`User created`);
    });
}


function readUser(id) {
    client.ReadUser({ id: id }, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(response);
    });
}

function updateUser(id, name, address, age, gender) {
    const user = {
        id: id,
        name: name,
        address: address,
        age: age,
        gender: gender
    };

    client.UpdateUser(user, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(`Updated user with id ${response.id}`);
    });
}

function deleteUser(id) {
    client.DeleteUser({ id: id }, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(`Deleted user with id ${id}`);
    });
}

// Contoh penggunaan fungsi-fungsi CRUD
createUser('John Doe', 'Jl. Sudirman No. 123', 25, 'male');
// readUser(1);
// updateUser(1, 'Jane Doe', 'Jl. Gatot Subroto No. 456', 27, 'female');
// deleteUser(1);
