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