const grpc = require('@grpc/grpc-js');


const client = new MyServiceClient(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  
    client.myMethod({name: 'John'}, (err, response) => {
        console.log(response);
    })