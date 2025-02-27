# tampopo

This AWS Lambda function fetches weather forecasts from the OpenWeatherMap API, calculates the total snowfall, formats a message, and sends it to a specified LINE user using the LINE Messaging API.

This project contains source code and supporting files for a serverless application that you can deploy with the SAM CLI. It includes the following files and folders:

- `weather-notifier` - Code for the application's Lambda function written in TypeScript.
- `weather-notifier/tests` - Unit tests for the application code.
- `template.yaml` - A template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda functions and a CloudWatch Events rule. These resources are defined in the `template.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

## Prerequisites

To use the SAM CLI, you need the following tools:

- SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- Node.js - [Install Node.js 22](https://nodejs.org/en/), including the NPM package management tool.
- Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

## Environment Variables

The following environment variables must be specified for the application to function correctly:

- `WEATHER_LAT`: Latitude for the weather forecast location.
- `WEATHER_LON`: Longitude for the weather forecast location.
- `WEATHER_API_KEY`: Your OpenWeatherMap API key.
- `LINE_ACCESS_TOKEN`: Your LINE Messaging API access token.
- `LINE_TO`: The ID to send the message to.

You can specify these variables in two ways:

1. **AWS Management Console**: Navigate to the Lambda function configuration and set the environment variables under the "Configuration" tab.

2. **template.yaml**: Update the `template.yaml` file to include your environment variable values:

```yaml
Resources:
  WeatherNotifierFunction:
    Type: AWS::Serverless::Function
    Properties:
      # ...existing code...
      Environment:
        Variables:
          WEATHER_LAT: your_weather_lat
          WEATHER_LON: your_weather_lon
          WEATHER_API_KEY: your_api_key
          LINE_ACCESS_TOKEN: your_line_access_token
          LINE_TO: your_line_to
      # ...existing code...
```

## Deploy the application

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

- **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
- **AWS Region**: The AWS region you want to deploy your app to.
- **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
- **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
- **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

You can find your Lambda function ARN in the output values displayed after deployment.

## Use the SAM CLI to build and test locally

Build your application with the `sam build` command.

```bash
tampopo$ sam build
```

The SAM CLI installs dependencies defined in `weather-notifier/package.json`, compiles TypeScript with esbuild, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
tampopo$ sam local invoke WeatherNotifierFunction
```

## Add a resource to your application

The application template uses AWS Serverless Application Model (AWS SAM) to define application resources. AWS SAM is an extension of AWS CloudFormation with a simpler syntax for configuring common serverless application resources such as functions, triggers, and APIs. For resources not included in [the SAM specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md), you can use standard [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) resource types.

## Fetch, tail, and filter Lambda function logs

To simplify troubleshooting, SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs generated by your deployed Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

`NOTE`: This command works for all AWS Lambda functions; not just the ones you deploy using SAM.

```bash
tampopo$ sam logs -n WeatherNotifierFunction --stack-name tampopo --tail
```

You can find more information and examples about filtering Lambda function logs in the [SAM CLI Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).

## Unit tests

Tests are defined in the `weather-notifier/tests` folder in this project. Use NPM to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
tampopo$ cd weather-notifier
weather-notifier$ npm install
weather-notifier$ npm run test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
sam delete --stack-name tampopo
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready-to-use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)
