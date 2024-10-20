from diagrams import Diagram, Cluster, Edge
from diagrams.aws.network import APIGateway
from diagrams.aws.compute import Lambda
from diagrams.aws.database import Dynamodb
from diagrams.aws.management import Cloudwatch
from diagrams.aws.security import IAM
from diagrams.aws.general import Client

# Create the diagram with a simplified structure
with Diagram("Simplified Movie API Architecture", show=False, direction="LR"):

    # Define the client (user) making requests
    client = Client("User")

    # AWS Cloud block to contain the services
    with Cluster("AWS Cloud"):

        # API Gateway component
        api_gateway = APIGateway("API Gateway")

        # Lambda Functions grouped in a single cluster
        with Cluster("Lambda Functions"):
            lambda_get = Lambda("Get Movies")
            lambda_post = Lambda("Create Movie")

        # DynamoDB for storing movie data
        dynamo_db = Dynamodb("Movies Table")

        # IAM and CloudWatch services
        iam = IAM("IAM Permissions")
        cloudwatch = Cloudwatch("CloudWatch Logs")

    # Client requests routed through API Gateway
    client >> Edge(color="blue", label="/GET") >> api_gateway >> lambda_get >> dynamo_db
    client >> Edge(color="green", label="/POST") >> api_gateway >> lambda_post >> dynamo_db

    # Single connections to IAM and CloudWatch for both Lambda functions
    iam >> lambda_get
    iam >> lambda_post
    lambda_get >> cloudwatch
    lambda_post >> cloudwatch
