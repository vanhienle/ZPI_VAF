import pika


class Module:
    def __init__(self, name, queueName) -> None:
        self.name = name
        self.queueName = queueName
        self.connection, self.channel = self.createChannel(queueName)

    def createChannel(self, queueName):
        connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        channel = connection.channel()
        channel.queue_declare(queue=queueName)
        return connection, channel

    def subscribeChannel(self, channel):
        def callback(ch, method, properties, body):
            pass

        self.channel.basic_consume(queue=self.queueName, on_message_callback=callback, auto_ack=True)
        self.channel.start_consuming()

    def publishData(self, key, data):
        self.channel.basic_publish(exchange='', routing_key=key, body=data)

    def notifyExistence(self):
        pass

    def requestUser(self):
        pass

    def saveHistory(self, tag):
        pass

    def fin(self):
        self.connection.close()
