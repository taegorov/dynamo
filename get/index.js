const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema({
  'id': String,
  'name': String,
  'phone': String,
});

// first argument, tells dynamoose what table to connect to
const peopleModel = dynamoose.model('people', schema);

exports.handler = async (event) => {

  let list;

  console.log(event.pathParameters);

  if (event.pathParameters) {
    const id = event.pathParameters.id;
    list = await peopleModel.query('id').eq(id).exec();
  } else {
    list = await peopleModel.scan().exec();
  }


  const response = {
    statusCode: 200,
    body: JSON.stringify(list),
  };
  return response;
};
