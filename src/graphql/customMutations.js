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

export const updateCompanyService = /* GraphQL */ `
  mutation UpdateCompanyService(
    $input: UpdateCompanyServiceInput!
    $condition: ModelCompanyServiceConditionInput
  ) {
    updateCompanyService(input: $input, condition: $condition) {
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

/***************************************
*
*   COMPANY PRODUCTS CUSTOM MUTATIONS
*
****************************************/
export const createCompanyProduct = /* GraphQL */ `
  mutation CreateCompanyProduct(
    $input: CreateCompanyProductInput!
    $condition: ModelCompanyProductConditionInput
  ) {
    createCompanyProduct(input: $input, condition: $condition) {
      id
      product {
        name
        cost
        id
        categoryId
      }
      cost
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
      product {
        name
        cost
        id
        categoryId
      }
      cost
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
      product {
        name
        cost
        id
        categoryId
      }
      cost
    }
  }
`;

/***************************************
*
*   OFFICES CUSTOM MUTATIONS
*
****************************************/
export const createOffice = /* GraphQL */ `
  mutation CreateOffice(
    $input: CreateOfficeInput!
    $condition: ModelOfficeConditionInput
  ) {
    createOffice(input: $input, condition: $condition) {
      administrator
      categoryId
      companyId
      deleted
      id
      image
      location
      name
    }
  }
`;
export const updateOffice = /* GraphQL */ `
  mutation UpdateOffice(
    $input: UpdateOfficeInput!
    $condition: ModelOfficeConditionInput
  ) {
    updateOffice(input: $input, condition: $condition) {
      administrator
      categoryId
      companyId
      deleted
      id
      image
      location
      name
    }
  }
`;

/***************************************
*
*   EMPLOYEE CUSTOM MUTATIONS
*
****************************************/
export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
      id
      name
      username
      officeId
      phoneid
      phone_number
      image
      deleted
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
      username
      officeId
      phoneid
      phone_number
      image
      deleted
    }
  }
`;