/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      offices {
        items {
          id
          location
          deleted
          deletedAt
          createdAt
          owner
        }
        nextToken
      }
      services {
        items {
          id
          name
          cost
          deleted
          deletedAt
          createdAt
          owner
        }
        nextToken
      }
      products {
        items {
          id
          name
          cost
          deleted
          deletedAt
          createdAt
          owner
        }
        nextToken
      }
      deleted
      deletedAt
      createdAt
      owner
    }
  }
`;
export const listCompanys = /* GraphQL */ `
  query ListCompanys(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        offices {
          nextToken
        }
        services {
          nextToken
        }
        products {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      nextToken
    }
  }
`;
export const getOffice = /* GraphQL */ `
  query GetOffice($id: ID!) {
    getOffice(id: $id) {
      id
      employees {
        items {
          id
          name
          deleted
          deletedAt
          createdAt
          owner
        }
        nextToken
      }
      location
      deleted
      deletedAt
      createdAt
      owner
    }
  }
`;
export const listOffices = /* GraphQL */ `
  query ListOffices(
    $filter: ModelOfficeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOffices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        employees {
          nextToken
        }
        location
        deleted
        deletedAt
        createdAt
        owner
      }
      nextToken
    }
  }
`;
export const getService = /* GraphQL */ `
  query GetService($id: ID!) {
    getService(id: $id) {
      id
      name
      cost
      deleted
      deletedAt
      createdAt
      owner
    }
  }
`;
export const listServices = /* GraphQL */ `
  query ListServices(
    $filter: ModelServiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        cost
        deleted
        deletedAt
        createdAt
        owner
      }
      nextToken
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      cost
      deleted
      deletedAt
      createdAt
      owner
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        cost
        deleted
        deletedAt
        createdAt
        owner
      }
      nextToken
    }
  }
`;
export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
      id
      name
      deleted
      deletedAt
      createdAt
      owner
    }
  }
`;
export const listEmployees = /* GraphQL */ `
  query ListEmployees(
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        deleted
        deletedAt
        createdAt
        owner
      }
      nextToken
    }
  }
`;
export const getRequest = /* GraphQL */ `
  query GetRequest($id: ID!) {
    getRequest(id: $id) {
      id
      remposible {
        items {
          id
          name
          deleted
          deletedAt
          createdAt
          owner
        }
        nextToken
      }
      customerName
      service {
        id
        name
        cost
        deleted
        deletedAt
        createdAt
        owner
      }
      product {
        id
        name
        cost
        deleted
        deletedAt
        createdAt
        owner
      }
      state
      deleted
      deletedAt
      createdAt
      owner
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
        remposible {
          nextToken
        }
        customerName
        service {
          id
          name
          cost
          deleted
          deletedAt
          createdAt
          owner
        }
        product {
          id
          name
          cost
          deleted
          deletedAt
          createdAt
          owner
        }
        state
        deleted
        deletedAt
        createdAt
        owner
      }
      nextToken
    }
  }
`;
