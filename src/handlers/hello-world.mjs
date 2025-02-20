export const helloWorldHandler = async () => {
  console.log('Hello, AWS SAM!');
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello, AWS SAM!' }),
  };
};
