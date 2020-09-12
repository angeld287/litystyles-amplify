/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany($owner: String) {
    onCreateCompany(owner: $owner) {
      id
      name
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
          createdAt
        }
        nextToken
      }
      products {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany($owner: String) {
    onUpdateCompany(owner: $owner) {
      id
      name
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
          createdAt
        }
        nextToken
      }
      products {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany($owner: String) {
    onDeleteCompany(owner: $owner) {
      id
      name
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
          createdAt
        }
        nextToken
      }
      products {
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
export const onCreateCompanyService = /* GraphQL */ `
  subscription OnCreateCompanyService {
    onCreateCompanyService {
      id
      comapny {
        id
        name
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
      service {
        id
        name
        cost
        employees {
          nextToken
        }
        companies {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      createdAt
    }
  }
`;
export const onUpdateCompanyService = /* GraphQL */ `
  subscription OnUpdateCompanyService {
    onUpdateCompanyService {
      id
      comapny {
        id
        name
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
      service {
        id
        name
        cost
        employees {
          nextToken
        }
        companies {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      createdAt
    }
  }
`;
export const onDeleteCompanyService = /* GraphQL */ `
  subscription OnDeleteCompanyService {
    onDeleteCompanyService {
      id
      comapny {
        id
        name
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
      service {
        id
        name
        cost
        employees {
          nextToken
        }
        companies {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      createdAt
    }
  }
`;
export const onCreateCompanyProduct = /* GraphQL */ `
  subscription OnCreateCompanyProduct {
    onCreateCompanyProduct {
      id
      comapny {
        id
        name
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
      product {
        id
        name
        cost
        companies {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      createdAt
    }
  }
`;
export const onUpdateCompanyProduct = /* GraphQL */ `
  subscription OnUpdateCompanyProduct {
    onUpdateCompanyProduct {
      id
      comapny {
        id
        name
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
      product {
        id
        name
        cost
        companies {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      createdAt
    }
  }
`;
export const onDeleteCompanyProduct = /* GraphQL */ `
  subscription OnDeleteCompanyProduct {
    onDeleteCompanyProduct {
      id
      comapny {
        id
        name
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
      product {
        id
        name
        cost
        companies {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      createdAt
    }
  }
`;
export const onCreateOffice = /* GraphQL */ `
  subscription OnCreateOffice($owner: String) {
    onCreateOffice(owner: $owner) {
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
export const onUpdateOffice = /* GraphQL */ `
  subscription OnUpdateOffice($owner: String) {
    onUpdateOffice(owner: $owner) {
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
export const onDeleteOffice = /* GraphQL */ `
  subscription OnDeleteOffice($owner: String) {
    onDeleteOffice(owner: $owner) {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($owner: String) {
    onCreateProduct(owner: $owner) {
      id
      name
      cost
      companies {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($owner: String) {
    onUpdateProduct(owner: $owner) {
      id
      name
      cost
      companies {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($owner: String) {
    onDeleteProduct(owner: $owner) {
      id
      name
      cost
      companies {
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
export const onCreateService = /* GraphQL */ `
  subscription OnCreateService($owner: String) {
    onCreateService(owner: $owner) {
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
export const onUpdateService = /* GraphQL */ `
  subscription OnUpdateService($owner: String) {
    onUpdateService(owner: $owner) {
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
export const onDeleteService = /* GraphQL */ `
  subscription OnDeleteService($owner: String) {
    onDeleteService(owner: $owner) {
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
export const onCreateEmployeeService = /* GraphQL */ `
  subscription OnCreateEmployeeService {
    onCreateEmployeeService {
      id
      employee {
        id
        name
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
      service {
        id
        name
        cost
        employees {
          nextToken
        }
        companies {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      createdAt
    }
  }
`;
export const onUpdateEmployeeService = /* GraphQL */ `
  subscription OnUpdateEmployeeService {
    onUpdateEmployeeService {
      id
      employee {
        id
        name
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
      service {
        id
        name
        cost
        employees {
          nextToken
        }
        companies {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      createdAt
    }
  }
`;
export const onDeleteEmployeeService = /* GraphQL */ `
  subscription OnDeleteEmployeeService {
    onDeleteEmployeeService {
      id
      employee {
        id
        name
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
      service {
        id
        name
        cost
        employees {
          nextToken
        }
        companies {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      createdAt
    }
  }
`;
export const onCreateEmployee = /* GraphQL */ `
  subscription OnCreateEmployee($owner: String) {
    onCreateEmployee(owner: $owner) {
      id
      name
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
export const onUpdateEmployee = /* GraphQL */ `
  subscription OnUpdateEmployee($owner: String) {
    onUpdateEmployee(owner: $owner) {
      id
      name
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
export const onDeleteEmployee = /* GraphQL */ `
  subscription OnDeleteEmployee($owner: String) {
    onDeleteEmployee(owner: $owner) {
      id
      name
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
export const onCreateRequestEmployee = /* GraphQL */ `
  subscription OnCreateRequestEmployee {
    onCreateRequestEmployee {
      id
      employee {
        id
        name
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
      request {
        id
        resposible {
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
      createdAt
    }
  }
`;
export const onUpdateRequestEmployee = /* GraphQL */ `
  subscription OnUpdateRequestEmployee {
    onUpdateRequestEmployee {
      id
      employee {
        id
        name
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
      request {
        id
        resposible {
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
      createdAt
    }
  }
`;
export const onDeleteRequestEmployee = /* GraphQL */ `
  subscription OnDeleteRequestEmployee {
    onDeleteRequestEmployee {
      id
      employee {
        id
        name
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
      request {
        id
        resposible {
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
      createdAt
    }
  }
`;
export const onCreateRequest = /* GraphQL */ `
  subscription OnCreateRequest($owner: String) {
    onCreateRequest(owner: $owner) {
      id
      resposible {
        items {
          id
          createdAt
        }
        nextToken
      }
      customerName
      service {
        id
        name
        cost
        employees {
          nextToken
        }
        companies {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      product {
        id
        name
        cost
        companies {
          nextToken
        }
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
export const onUpdateRequest = /* GraphQL */ `
  subscription OnUpdateRequest($owner: String) {
    onUpdateRequest(owner: $owner) {
      id
      resposible {
        items {
          id
          createdAt
        }
        nextToken
      }
      customerName
      service {
        id
        name
        cost
        employees {
          nextToken
        }
        companies {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      product {
        id
        name
        cost
        companies {
          nextToken
        }
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
export const onDeleteRequest = /* GraphQL */ `
  subscription OnDeleteRequest($owner: String) {
    onDeleteRequest(owner: $owner) {
      id
      resposible {
        items {
          id
          createdAt
        }
        nextToken
      }
      customerName
      service {
        id
        name
        cost
        employees {
          nextToken
        }
        companies {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      product {
        id
        name
        cost
        companies {
          nextToken
        }
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
