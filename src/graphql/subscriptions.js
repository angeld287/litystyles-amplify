/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany($owner: String) {
    onCreateCompany(owner: $owner) {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany($owner: String) {
    onUpdateCompany(owner: $owner) {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany($owner: String) {
    onDeleteCompany(owner: $owner) {
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
export const onCreateService = /* GraphQL */ `
  subscription OnCreateService($owner: String) {
    onCreateService(owner: $owner) {
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
export const onUpdateService = /* GraphQL */ `
  subscription OnUpdateService($owner: String) {
    onUpdateService(owner: $owner) {
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
export const onDeleteService = /* GraphQL */ `
  subscription OnDeleteService($owner: String) {
    onDeleteService(owner: $owner) {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($owner: String) {
    onCreateProduct(owner: $owner) {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($owner: String) {
    onUpdateProduct(owner: $owner) {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($owner: String) {
    onDeleteProduct(owner: $owner) {
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
export const onCreateEmployee = /* GraphQL */ `
  subscription OnCreateEmployee($owner: String) {
    onCreateEmployee(owner: $owner) {
      id
      name
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
      deleted
      deletedAt
      createdAt
      owner
    }
  }
`;
export const onCreateRequest = /* GraphQL */ `
  subscription OnCreateRequest($owner: String) {
    onCreateRequest(owner: $owner) {
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
export const onUpdateRequest = /* GraphQL */ `
  subscription OnUpdateRequest($owner: String) {
    onUpdateRequest(owner: $owner) {
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
export const onDeleteRequest = /* GraphQL */ `
  subscription OnDeleteRequest($owner: String) {
    onDeleteRequest(owner: $owner) {
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
