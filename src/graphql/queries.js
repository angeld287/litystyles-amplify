/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      assistant
      offices {
        items {
          id
          name
          administrator
          categoryId
          image
          location
          deleted
          deletedAt
          createdAt
          companyId
          owner
        }
        nextToken
      }
      services {
        items {
          id
          cost
          createdAt
        }
        nextToken
      }
      products {
        items {
          id
          cost
          createdAt
        }
        nextToken
      }
      deleted
      owner
      deletedAt
      createdAt
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
        name
        assistant
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
        owner
        deletedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getOffice = /* GraphQL */ `
  query GetOffice($id: ID!) {
    getOffice(id: $id) {
      id
      name
      administrator
      employees {
        items {
          id
          name
          username
          officeId
          deleted
          deletedAt
          createdAt
          owner
        }
        nextToken
      }
      categoryId
      image
      location
      deleted
      deletedAt
      createdAt
      companyId
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
        name
        administrator
        employees {
          nextToken
        }
        categoryId
        image
        location
        deleted
        deletedAt
        createdAt
        companyId
        owner
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      offices {
        items {
          id
          name
          administrator
          categoryId
          image
          location
          deleted
          deletedAt
          createdAt
          companyId
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
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        offices {
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
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      cost
      companies {
        items {
          id
          cost
          createdAt
        }
        nextToken
      }
      request {
        items {
          id
          cost
          createdAt
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
        companies {
          nextToken
        }
        request {
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
export const getService = /* GraphQL */ `
  query GetService($id: ID!) {
    getService(id: $id) {
      id
      name
      cost
      employees {
        items {
          id
          createdAt
        }
        nextToken
      }
      companies {
        items {
          id
          cost
          createdAt
        }
        nextToken
      }
      request {
        items {
          id
          resposibleName
          cost
          createdAt
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
        employees {
          nextToken
        }
        companies {
          nextToken
        }
        request {
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
export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
      id
      name
      username
      officeId
      services {
        items {
          id
          createdAt
        }
        nextToken
      }
      request {
        items {
          id
          createdAt
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
        username
        officeId
        services {
          nextToken
        }
        request {
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
export const getRequest = /* GraphQL */ `
  query GetRequest($id: ID!) {
    getRequest(id: $id) {
      id
      companyId
      resposible {
        items {
          id
          createdAt
        }
        nextToken
      }
      service {
        items {
          id
          resposibleName
          cost
          createdAt
        }
        nextToken
      }
      product {
        items {
          id
          cost
          createdAt
        }
        nextToken
      }
      resposibleName
      customerName
      state
      paymentType
      deleted
      deletedAt
      createdAt
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
          nextToken
        }
        product {
          nextToken
        }
        resposibleName
        customerName
        state
        paymentType
        deleted
        deletedAt
        createdAt
      }
      nextToken
    }
  }
`;
