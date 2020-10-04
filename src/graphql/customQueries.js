  export const getCompanyProductsAndServices = /* GraphQL */ `
  query getCompanyProductsAndServices($id: ID!) {
    getCompany(id: $id) {
      id
      name
      services {
        items {
          service {
            name
            cost
            id
          }
        }
      }
      products {
        items {
          product {
            name
            cost
            id
          }
        }
      }
    }
  }
`;

export const listCompanys = /* GraphQL */ `
  query ListCompanys {
    listCompanys {
      items {
        id
        name
        offices {
          items {
            administrator
            id
            location
            owner
          }
        }
      }
    }
  }`
;

export const listEmployees = `
  query Employees($id: String!) {
    listEmployees(filter: {officeId: {eq: $id}}) {
      items {
        id
        name
        username
        services {
          items {
            id
            service {
              cost
              name
              id
            }
          }
        }
      }
    }
  }
`;

export const listRequests = /* GraphQL */ `
  query ListRequests(
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        companyId
        resposible {
          nextToken
        }
        service {
          items {
            service {
              name
            }
          }
        }
        product {
          nextToken
        }
        resposibleName
        customerName
        state
        deleted
        deletedAt
        createdAt
      }
      nextToken
    }
  }
`;