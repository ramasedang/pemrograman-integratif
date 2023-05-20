// Contoh kode untuk mengirim pesan ke topik Kafka menggunakan library kafkajs

// Impor modul yang diperlukan
const { Kafka, Partitioners } = require('kafkajs');

// Buat instance Kafka baru
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['dory.srvs.cloudkafka.com:9094'],
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-512',
    username: 'erqhoqee',
    password: 'raeKx_6HLgsKnQsJxOKynoI8B9hjIETj',
  },
  createPartitioner: Partitioners.LegacyPartitioner, // Tambahkan baris ini untuk menggunakan legacy partitioner
});

// Buat instance producer
const producer = kafka.producer();

// Fungsi untuk menjalankan producer
const runProducer = async () => {
  // Terhubung ke broker Kafka
  await producer.connect();

  // Mengirim pesan
  await producer.send({
    topic: 'erqhoqee-sudo',
    messages: [
      { key: 'key1', value: 'hello world' },
      { key: 'key2', value: 'hey hey!' },
    ],
  });

  // Memutus koneksi
  await producer.disconnect();
};

// Jalankan producer
runProducer().catch((error) => {
  console.error('Terjadi kesalahan saat menjalankan producer:', error);
});
