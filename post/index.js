const dynamoose = require('dynamoose');

// gives us a random unique ID, saves trouble of creating a random num and making sure it's not a duplicate
const uuid = require('uuid');

const schema = new dynamoose.Schema({
  'id': String,
  'name': String,
  'phone': String,
});

const peopleModel = dynamoose.model('people', schema);


exports.handler = async (event) => {

  let list;

  const { name, phone } = JSON.parse(event.pathParameters);
  const id = uuid();

  let record = new peopleModel({ id, name, phone });
  list = await record.save();




  const response = {
    statusCode: 200,
    body: JSON.stringify(list),
  };

  return response;
};
