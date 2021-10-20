const GRAPHQL_API =
  "https://test-tired-emu-op.cfapps.eu10.hana.ondemand.com/graphql?query=query%7B%0A%09reportingTemplates%20%7B%0A%20%20%20%20_id%2C%20type%2C%20name%2C%20_partitionKey%2C%20colorScheme%2C%20quantityUnit%2C%20reportingContext%2C%0Aroles%2C%20timeTypes%2C%20timeTypeConfigForRoles%7B%0A%20%20timeTypes%2C%20role%0A%7D%0A%20%20%20%20sortOrder%2C%20__typename%0A%20%20%7D%0A%7D";

const GET_TEMPLATES_QUERY = `
  query{
	  reportingTemplates {
    _id, 
    type,
    name,
    _partitionKey,
    colorScheme,
    quantityUnit,
    reportingContext,
    roles,
    timeTypes, 
    timeTypeConfigForRoles {
      timeTypes, 
      role
    }
    sortOrder,
    __typename
  }
}  
`;
