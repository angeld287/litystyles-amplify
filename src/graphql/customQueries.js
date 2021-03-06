/*********************************
*
*   PRODUCTS CUSTOM QUERIES
*
**********************************/

export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        cost
        categoryId
        subCategoryId
        name
        image
        deleted
        id
        packagingformat
        createdAt
        category {
          items {
            id
            category {
              id
              name
            }
          }
        }
        subcategory {
          items {
            id
            subcategory {
              id
              name
            }
          }
        }
      }
      nextToken
    }
  }
`;

/*********************************
*
*   SERVICES CUSTOM QUERIES
*
**********************************/

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
        categoryId
        subCategoryId
        deleted
        deletedAt
        createdAt
        owner
        category {
          items {
            id
            category {
              id
              name
            }
          }
        }
        subcategory {
          items {
            id
            subcategory {
              id
              name
            }
          }
        }
      }
      nextToken
    }
  }
`;


/*********************************
*
*   CATEGORIES CUSTOM QUERIES
*
**********************************/

export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $filter: ModelCategoryFilterInput
    $filterSub: ModelSubCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        subcategories(filter: $filterSub) {
          items {
            name
            code
            deleted
            categoryName
            id
          }
          nextToken
        }
        typeName
        code
        deleted
        deletedAt
        createdAt
        owner
      }
      nextToken
    }
  }
`;

/*********************************
*
*   SUBCATEGORIES CUSTOM QUERIES
*
**********************************/

export const listSubCategorys = /* GraphQL */ `
  query ListSubCategorys(
    $filter: ModelSubCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        code
        categoryName
        deleted
        deletedAt
        createdAt
        owner
      }
      nextToken
    }
  }
`;


/*********************************
*
*   TYPES CUSTOM QUERIES
*
**********************************/

export const listTypes = /* GraphQL */ `
  query ListTypes(
    $filter: ModelTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        code
        deleted
        deletedAt
        createdAt
        owner
      }
      nextToken
    }
  }
`;


/*********************************
*
*   COMPANY SERVICES CUSTOM QUERY
*
**********************************/
export const getCompanyServices = /* GraphQL */ `
  query getCompanyServices(
    $id: ID!
    $filter: ModelCompanyServiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getCompany(id: $id) {
      services(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          service {
            name
            cost
            id
            categoryId
          }
          cost
        }
        nextToken
      }
    }
  }
`;

/*********************************
*
*   COMPANY PRODUCTS CUSTOM QUERY
*
**********************************/
export const getCompanyProducts = /* GraphQL */ `
  query getCompanyProducts(
    $id: ID!
    $filter: ModelCompanyProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getCompany(id: $id) {
      products(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          product {
            name
            cost
            id
            categoryId
          }
          cost
        }
        nextToken
      }
    }
  }
`;

/*********************************
*
*   OFFICE CUSTOM QUERY
*
**********************************/
export const getCompanyOffices = /* GraphQL */ `
  query getCompanyOffices(
    $id: ID!
    $filter: ModelOfficeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getCompany(id: $id) {
      offices(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          administrator
          categoryId
          companyId
          deleted
          id
          image
          location
          name
        }
        nextToken
      }
    }
  }
`;

export const getOfficeEmployees = /* GraphQL */ `
  query GetOffice(
    $id: ID!
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getOffice(id: $id) {
      employees(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          name
          username
          officeId
          phoneid
          phone_number
          image
          deleted
          services {
            nextToken
          }
        }
        nextToken
      }
    }
  }
`;


/*********************************
*
*   EMPLOYEES CUSTOM QUERY
*
**********************************/
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
        phoneid
        phone_number
        image
        services {
          nextToken
        }
        deleted
      }
      nextToken
    }
  }
`;

/*********************************
*
*   COMPANY CUSTOM QUERY
*
**********************************/

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
        owner
        offices {
          items {
            id
          }
        }
      }
      nextToken
    }
  }
`;

/*********************************
*
*   REQUESTS CUSTOM QUERY
*
**********************************/
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
        customer {
          items {
            customer {
              name
              phoneid
              id
            }
          }
        }
        resposibleName
        customerName
        state
        notified
        paymentType
        deleted
        deletedAt
        date
        createdAt
      }
      nextToken
    }
  }
`;