/***************************************
*
*   COMPANY SERVICE CUSTOM MUTATIONS
*
****************************************/
export const createCompanyService = /* GraphQL */ `
  mutation CreateCompanyService(
    $input: CreateCompanyServiceInput!
    $condition: ModelCompanyServiceConditionInput
  ) {
    createCompanyService(input: $input, condition: $condition) {
      id
      service {
        name
        cost
        id
        categoryId
      }
      cost
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
      service {
        name
        cost
        id
        categoryId
      }
      cost
    }
  }
`;