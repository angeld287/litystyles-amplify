/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
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
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
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
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
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
export const createCompanyService = /* GraphQL */ `
  mutation CreateCompanyService(
    $input: CreateCompanyServiceInput!
    $condition: ModelCompanyServiceConditionInput
  ) {
    createCompanyService(input: $input, condition: $condition) {
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
export const updateCompanyService = /* GraphQL */ `
  mutation UpdateCompanyService(
    $input: UpdateCompanyServiceInput!
    $condition: ModelCompanyServiceConditionInput
  ) {
    updateCompanyService(input: $input, condition: $condition) {
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
export const deleteCompanyService = /* GraphQL */ `
  mutation DeleteCompanyService(
    $input: DeleteCompanyServiceInput!
    $condition: ModelCompanyServiceConditionInput
  ) {
    deleteCompanyService(input: $input, condition: $condition) {
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
export const createCompanyProduct = /* GraphQL */ `
  mutation CreateCompanyProduct(
    $input: CreateCompanyProductInput!
    $condition: ModelCompanyProductConditionInput
  ) {
    createCompanyProduct(input: $input, condition: $condition) {
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
export const updateCompanyProduct = /* GraphQL */ `
  mutation UpdateCompanyProduct(
    $input: UpdateCompanyProductInput!
    $condition: ModelCompanyProductConditionInput
  ) {
    updateCompanyProduct(input: $input, condition: $condition) {
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
export const deleteCompanyProduct = /* GraphQL */ `
  mutation DeleteCompanyProduct(
    $input: DeleteCompanyProductInput!
    $condition: ModelCompanyProductConditionInput
  ) {
    deleteCompanyProduct(input: $input, condition: $condition) {
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
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createService = /* GraphQL */ `
  mutation CreateService(
    $input: CreateServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    createService(input: $input, condition: $condition) {
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
export const updateService = /* GraphQL */ `
  mutation UpdateService(
    $input: UpdateServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    updateService(input: $input, condition: $condition) {
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
export const deleteService = /* GraphQL */ `
  mutation DeleteService(
    $input: DeleteServiceInput!
    $condition: ModelServiceConditionInput
  ) {
    deleteService(input: $input, condition: $condition) {
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
export const createEmployeeService = /* GraphQL */ `
  mutation CreateEmployeeService(
    $input: CreateEmployeeServiceInput!
    $condition: ModelEmployeeServiceConditionInput
  ) {
    createEmployeeService(input: $input, condition: $condition) {
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
export const updateEmployeeService = /* GraphQL */ `
  mutation UpdateEmployeeService(
    $input: UpdateEmployeeServiceInput!
    $condition: ModelEmployeeServiceConditionInput
  ) {
    updateEmployeeService(input: $input, condition: $condition) {
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
export const deleteEmployeeService = /* GraphQL */ `
  mutation DeleteEmployeeService(
    $input: DeleteEmployeeServiceInput!
    $condition: ModelEmployeeServiceConditionInput
  ) {
    deleteEmployeeService(input: $input, condition: $condition) {
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
export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
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
export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee(
    $input: UpdateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    updateEmployee(input: $input, condition: $condition) {
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
export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee(
    $input: DeleteEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    deleteEmployee(input: $input, condition: $condition) {
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
export const createRequestEmployee = /* GraphQL */ `
  mutation CreateRequestEmployee(
    $input: CreateRequestEmployeeInput!
    $condition: ModelRequestEmployeeConditionInput
  ) {
    createRequestEmployee(input: $input, condition: $condition) {
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
export const updateRequestEmployee = /* GraphQL */ `
  mutation UpdateRequestEmployee(
    $input: UpdateRequestEmployeeInput!
    $condition: ModelRequestEmployeeConditionInput
  ) {
    updateRequestEmployee(input: $input, condition: $condition) {
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
export const deleteRequestEmployee = /* GraphQL */ `
  mutation DeleteRequestEmployee(
    $input: DeleteRequestEmployeeInput!
    $condition: ModelRequestEmployeeConditionInput
  ) {
    deleteRequestEmployee(input: $input, condition: $condition) {
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
export const createRequest = /* GraphQL */ `
  mutation CreateRequest(
    $input: CreateRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    createRequest(input: $input, condition: $condition) {
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
export const updateRequest = /* GraphQL */ `
  mutation UpdateRequest(
    $input: UpdateRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    updateRequest(input: $input, condition: $condition) {
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
export const deleteRequest = /* GraphQL */ `
  mutation DeleteRequest(
    $input: DeleteRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    deleteRequest(input: $input, condition: $condition) {
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
