const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  options
) => {
  return new Promise(async (resolve, reject) => {
    const { createNode } = actions;
    delete options.plugins;

    const client = new DynamoDBClient({
      credentials: {
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
      },
      region: options.region,
    });

    const processData = (item) => {
      const nodeId = createNodeId(`dynamodb-${item.id}`);
      const nodeContentDigest = createContentDigest(item);

      const nodeData = Object.assign({}, item, {
        id: nodeId,
        parent: null,
        children: [],
        internal: {
          mediaType: `text/html`,
          contentDigest: nodeContentDigest,
          type: options.typeName,
          content: JSON.stringify(item),
        },
      });
      return nodeData;
    };

    let params = options.params;
    const onScan = async (data) => {
      data.Items.forEach((item) => {
        const nodeData = processData(unmarshall(item));
        createNode(nodeData);
      });

      if (typeof data.LastEvaluatedKey != "undefined") {
        params.ExclusiveStartKey = data.LastEvaluatedKey;
        const command = new ScanCommand(params);
        await client.send(command).then((data) => onScan(data));
      } else {
        resolve();
      }
    };
    const command = new ScanCommand(params);
    await client.send(command).then((data) => {
      onScan(data);
    });
  });
};
