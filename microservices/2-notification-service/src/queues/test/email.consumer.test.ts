import * as connection from '@notifications/queues/connection';
// import amqp from 'amqplib';
import { consumerAuthEmailMessages, consumerOrderEmailMessages } from '@notifications/queues/email.consumer';


jest.mock('@notifications/queues/connection');
jest.mock('amqplib');
jest.mock('@lawrencejews/marketplace-shared')

describe(('Email Consumer'), () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks()
  });

  describe('consumeAuthEmailMessages Method', () => {
    it('should be called', async() => {
      const channel = {
        assertExchange: jest.fn(),
        publish: jest.fn(),
        assertQueue: jest.fn(),
        bindQueue: jest.fn(),
        consume: jest.fn()
      };
      jest.spyOn(channel, 'assertExchange');
      jest.spyOn(channel, 'assertQueue').mockReturnValue({ queue: 'auth-email-service', messageCount: 0, consumeCount: 0 });
      jest.spyOn(connection, 'createConnection').mockReturnValue(channel as never);

      const connectionChannel = await connection.createConnection()
      await consumerAuthEmailMessages(connectionChannel!)
      expect(connectionChannel!.assertExchange).toHaveBeenCalledWith('lawrencejews-email-notification','direct')
      expect(connectionChannel!.assertQueue).toHaveBeenCalledTimes(1);
      expect(connectionChannel!.consume).toHaveBeenCalledTimes(1);
      expect(connectionChannel!.bindQueue).toHaveBeenCalledWith('auth-email-service', 'lawrencejews-email-notification', 'auth-email')
    })
  })


  describe('consumerOrderEmailMessages Method', () => {
    it('should be called', async () => {
      const channel = {
        assertExchange: jest.fn(),
        publish: jest.fn(),
        assertQueue: jest.fn(),
        bindQueue: jest.fn(),
        consume: jest.fn()
      };
      jest.spyOn(channel, 'assertExchange');
      jest.spyOn(channel, 'assertQueue').mockReturnValue({ queue: 'order-email-queue', messageCount: 0, consumeCount: 0 });
      jest.spyOn(connection, 'createConnection').mockReturnValue(channel as never);

      const connectionChannel = await connection.createConnection()
      await consumerOrderEmailMessages(connectionChannel!)
      expect(connectionChannel!.assertExchange).toHaveBeenCalledWith('lawrencejews-order-notification', 'direct');
      expect(connectionChannel!.assertQueue).toHaveBeenCalledTimes(1);
      expect(connectionChannel!.consume).toHaveBeenCalledTimes(1);
      expect(connectionChannel!.bindQueue).toHaveBeenCalledWith('order-email-queue', 'lawrencejews-order-notification', 'order-email');
    })
  })
})
