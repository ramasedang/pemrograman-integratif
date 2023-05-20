// Contoh kode untuk mengkonsumsi pesan dari topik Kafka menggunakan library kafkajs

// Impor modul yang diperlukan
const { Kafka } = require('kafkajs');

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
});

// Buat instance consumer
const consumer = kafka.consumer({ groupId: 'erqhoqee-grupsudo' });

// Fungsi untuk menjalankan consumer
const runConsumer = async () => {
  // Terhubung ke broker Kafka
  await consumer.connect();

  // Berlangganan ke topik dan mulai mengkonsumsi pesan dari awal
  await consumer.subscribe({ topic: 'erqhoqee-sudo', fromBeginning: true });

  // Mulai mengkonsumsi pesan
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Cetak pesan yang diterima
      console.log({
        topik: topic,
        partisi: partition,
        offset: message.offset,
        kunci: message.key.toString(),
        nilai: message.value.toString(),
      });
    },
  });
};

// Jalankan consumer
runConsumer().catch((error) => {
  console.error('Terjadi kesalahan saat menjalankan consumer:', error);
});
