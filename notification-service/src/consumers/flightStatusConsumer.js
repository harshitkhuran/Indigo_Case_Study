const { Kafka } = require('kafkajs');
const admin = require('../config/firebaseConfig');

const kafka = new Kafka({
    clientId: 'notification-service',
    brokers: [process.env.KAFKA_BROKER]
});

const consumer = kafka.consumer({ groupId: 'notifications' });

const sendNotification = async (message) => {
    const { token, payload } = message;
    await admin.messaging().sendToDevice(token, payload);
};

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'flight-status-changes', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const value = JSON.parse(message.value.toString());
            await sendNotification(value);
        },
    });
};

run().catch(console.error);
