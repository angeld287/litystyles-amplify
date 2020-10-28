/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRequest = /* GraphQL */ `
  subscription OnCreateRequest($resposibleName: String) {
    onCreateRequest(resposibleName: $resposibleName) {
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
export const onCreateRequestService = /* GraphQL */ `
  subscription OnCreateRequestService($resposibleName: String) {
    onCreateRequestService(resposibleName: $resposibleName) {
      id
      request {
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
        request {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      resposibleName
      cost
      createdAt
    }
  }
`;
export const onUpdateRequest = /* GraphQL */ `
  subscription OnUpdateRequest($resposibleName: String) {
    onUpdateRequest(resposibleName: $resposibleName) {
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
export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany($owner: String) {
    onCreateCompany(owner: $owner) {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany($owner: String) {
    onUpdateCompany(owner: $owner) {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany($owner: String) {
    onDeleteCompany(owner: $owner) {
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
export const onCreateCompanyService = /* GraphQL */ `
  subscription OnCreateCompanyService {
    onCreateCompanyService {
      id
      comapny {
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
        request {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      cost
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
        request {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      cost
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
        request {
          nextToken
        }
        deleted
        deletedAt
        createdAt
        owner
      }
      cost
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
      product {
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
      cost
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
      product {
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
      cost
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
      product {
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
      cost
      createdAt
    }
  }
`;
export const onCreateOffice = /* GraphQL */ `
  subscription OnCreateOffice($owner: String) {
    onCreateOffice(owner: $owner) {
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
export const onUpdateOffice = /* GraphQL */ `
  subscription OnUpdateOffice($owner: String) {
    onUpdateOffice(owner: $owner) {
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
export const onDeleteOffice = /* GraphQL */ `
  subscription OnDeleteOffice($owner: String) {
    onDeleteOffice(owner: $owner) {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($owner: String) {
    onCreateCategory(owner: $owner) {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($owner: String) {
    onUpdateCategory(owner: $owner) {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($owner: String) {
    onDeleteCategory(owner: $owner) {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($owner: String) {
    onCreateProduct(owner: $owner) {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($owner: String) {
    onUpdateProduct(owner: $owner) {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($owner: String) {
    onDeleteProduct(owner: $owner) {
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
export const onCreateEmployeeService = /* GraphQL */ `
  subscription OnCreateEmployeeService {
    onCreateEmployeeService {
      id
      employee {
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
        request {
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
        request {
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
        request {
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
export const onUpdateEmployee = /* GraphQL */ `
  subscription OnUpdateEmployee($owner: String, $name: String) {
    onUpdateEmployee(owner: $owner, name: $name) {
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
export const onDeleteEmployee = /* GraphQL */ `
  subscription OnDeleteEmployee($owner: String) {
    onDeleteEmployee(owner: $owner) {
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
export const onCreateRequestEmployee = /* GraphQL */ `
  subscription OnCreateRequestEmployee {
    onCreateRequestEmployee {
      id
      employee {
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
      request {
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
      request {
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
      request {
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
      createdAt
    }
  }
`;
export const onCreateRequestProduct = /* GraphQL */ `
  subscription OnCreateRequestProduct {
    onCreateRequestProduct {
      id
      request {
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
      product {
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
      cost
      createdAt
    }
  }
`;
export const onUpdateRequestProduct = /* GraphQL */ `
  subscription OnUpdateRequestProduct {
    onUpdateRequestProduct {
      id
      request {
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
      product {
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
      cost
      createdAt
    }
  }
`;
export const onDeleteRequestProduct = /* GraphQL */ `
  subscription OnDeleteRequestProduct {
    onDeleteRequestProduct {
      id
      request {
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
      product {
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
      cost
      createdAt
    }
  }
`;
