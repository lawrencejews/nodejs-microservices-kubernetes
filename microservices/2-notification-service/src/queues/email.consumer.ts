import { winstonLogger } from "@lawrencejews/marketplace-shared";
import { config } from "@notifications/config";
import { Channel, ConsumeMessage } from "amqplib";
import { createConnection } from '@notifications/queues/connection';
import { Logger } from "winston";

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'emailConsumer', 'debug');

async function consumerAuthEmailMessages(channel: Channel): Promise<void>{
  try {

    if (!channel) {
      channel = await createConnection() as Channel
    }

    const exchangeName = 'lawrencejews-email-notification';
    const routingKey = 'auth-email';
    const queueName = 'auth-email-service';

    await channel.assertExchange(exchangeName, 'direct')
    const marketplaceQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(marketplaceQueue.queue, exchangeName, routingKey);

    channel.consume(marketplaceQueue.queue, async (msg: ConsumeMessage | null) => {
      console.log(JSON.parse(msg!.content.toString()));

      // Send Emails

      // Acknowledge
      channel.ack(msg!);
    })
    
  } catch (error) {
    log.log('error', "Notification EmailConsumer consumeAuthEmailMessages() method error: ", error);
  }
}


async function consumerOrderEmailMessages(channel: Channel): Promise<void> {
  try {

    if (!channel) {
      channel = await createConnection() as Channel
    }

    const exchangeName = 'lawrencejews-orde-notification';
    const routingKey = 'order-email';
    const queueName = 'order-email-queue';

    await channel.assertExchange(exchangeName, 'direct')
    const marketplaceQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(marketplaceQueue.queue, exchangeName, routingKey);

    channel.consume(marketplaceQueue.queue, async (msg: ConsumeMessage | null) => {
      console.log(JSON.parse(msg!.content.toString()));

      // Send Emails

      // Acknowledge
      channel.ack(msg!);
    })

  } catch (error) {
    log.log('error', "Notification EmailConsumer consumeOrderEmailMessages() method error: ", error);
  }
}

export { consumerAuthEmailMessages, consumerOrderEmailMessages };