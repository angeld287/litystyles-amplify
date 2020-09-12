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
          }
        }
      }
      products {
        items {
          product {
            name
            cost
          }
        }
      }
    }
  }
`;