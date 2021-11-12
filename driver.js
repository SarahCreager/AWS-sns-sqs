'use strict';

////////////////////consume to Package Queue ////////////////////

const { Consumer } = require('sqs-consumer');

const queueUrl = 'https://sqs.us-west-1.amazonaws.com/211934723377/Packages.fifo';

const consumer = Consumer.create({
  queueUrl: queueUrl,
  handlePayload: (payload) => {
    console.log(payload);
  }
});

consumer.start();

////////////////////publish to Delivered Topic ///////////////

const AWS = require('aws-sdk');
// configuire
AWS.config.update({ region: 'us-west-1'});

const sns = new AWS.SNS();

const topic = 'arn:aws:sns:us-west-1:211934723377:Delivered';

const payload = {
  store: '1-206-flowers',
  orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
  customer: 'Jamal Braun',
  TopicArn: topic, // required for telling where to send a notification
};

sns.publish(payload).promise() 
  .then(data => {
    console.log(data);
  })
  .catch(e => {
    console.log(e);
  });