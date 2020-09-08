/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
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
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
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
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
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
export const createOffice = /* GraphQL */ `
  mutation CreateOffice(
    $input: CreateOfficeInput!
    $condition: ModelOfficeConditionInput
  ) {
    createOffice(input: $input, condition: $condition) {
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
export const updateOffice = /* GraphQL */ `
  mutation UpdateOffice(
    $input: UpdateOfficeInput!
    $condition: ModelOfficeConditionInput
  ) {
    updateOffice(input: $input, condition: $condition) {
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
export const deleteOffice = /* GraphQL */ `
  mutation DeleteOffice(
    $input: DeleteOfficeInput!
    $condition: ModelOfficeConditionInput
  ) {
    deleteOffice(input: $input, condition: $condition) {
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
export const createService = /* GraphQL */ `
  mutation CreateService(
    $input: CreateServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    createService(input: $input, condition: $condition) {
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
export const updateService = /* GraphQL */ `
  mutation UpdateService(
    $input: UpdateServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    updateService(input: $input, condition: $condition) {
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
export const deleteService = /* GraphQL */ `
  mutation DeleteService(
    $input: DeleteServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    deleteService(input: $input, condition: $condition) {
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
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
      id
      name
      deleted
      deletedAt
      createdAt
      owner
    }
  }
`;
export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee(
    $input: UpdateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    updateEmployee(input: $input, condition: $condition) {
      id
      name
      deleted
      deletedAt
      createdAt
      owner
    }
  }
`;
export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee(
    $input: DeleteEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    deleteEmployee(input: $input, condition: $condition) {
      id
      name
      deleted
      deletedAt
      createdAt
      owner
    }
  }
`;
export const createRequest = /* GraphQL */ `
  mutation CreateRequest(
    $input: CreateRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    createRequest(input: $input, condition: $condition) {
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
export const updateRequest = /* GraphQL */ `
  mutation UpdateRequest(
    $input: UpdateRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    updateRequest(input: $input, condition: $condition) {
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
export const deleteRequest = /* GraphQL */ `
  mutation DeleteRequest(
    $input: DeleteRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    deleteRequest(input: $input, condition: $condition) {
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
