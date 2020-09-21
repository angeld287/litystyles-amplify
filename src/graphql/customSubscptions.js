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
          service {
            name
          }
        }
      }
      product {
        items {
          id
          createdAt
        }
        nextToken
      }
      resposibleName
      customerName
      state
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
      resposibleName
      request {
        id
      }
      service {
        id
        name
        cost
        deleted
        deletedAt
        createdAt
        owner
      }
      createdAt
    }
  }
`;