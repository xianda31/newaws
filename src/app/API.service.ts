/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreateMember: OnCreateMemberSubscription;
  onUpdateMember: OnUpdateMemberSubscription;
  onDeleteMember: OnDeleteMemberSubscription;
  onCreateCategory: OnCreateCategorySubscription;
  onUpdateCategory: OnUpdateCategorySubscription;
  onDeleteCategory: OnDeleteCategorySubscription;
  onCreateArticle: OnCreateArticleSubscription;
  onUpdateArticle: OnUpdateArticleSubscription;
  onDeleteArticle: OnDeleteArticleSubscription;
};

export type CreateMemberInput = {
  id?: string | null;
  firstname: string;
  lastname: string;
  license: string;
  email: string;
  rights: string;
};

export type ModelMemberConditionInput = {
  firstname?: ModelStringInput | null;
  lastname?: ModelStringInput | null;
  license?: ModelStringInput | null;
  email?: ModelStringInput | null;
  rights?: ModelStringInput | null;
  and?: Array<ModelMemberConditionInput | null> | null;
  or?: Array<ModelMemberConditionInput | null> | null;
  not?: ModelMemberConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type Member = {
  __typename: "Member";
  id: string;
  firstname: string;
  lastname: string;
  license: string;
  email: string;
  rights: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateMemberInput = {
  id: string;
  firstname?: string | null;
  lastname?: string | null;
  license?: string | null;
  email?: string | null;
  rights?: string | null;
};

export type DeleteMemberInput = {
  id: string;
};

export type CreateCategoryInput = {
  id?: string | null;
  label: string;
  title: string;
  description: string;
  rank: number;
  fixed?: boolean | null;
};

export type ModelCategoryConditionInput = {
  label?: ModelStringInput | null;
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  rank?: ModelIntInput | null;
  fixed?: ModelBooleanInput | null;
  and?: Array<ModelCategoryConditionInput | null> | null;
  or?: Array<ModelCategoryConditionInput | null> | null;
  not?: ModelCategoryConditionInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Category = {
  __typename: "Category";
  id: string;
  label: string;
  title: string;
  description: string;
  articles?: ModelArticleConnection | null;
  rank: number;
  fixed?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelArticleConnection = {
  __typename: "ModelArticleConnection";
  items: Array<Article | null>;
  nextToken?: string | null;
};

export type Article = {
  __typename: "Article";
  id: string;
  title: string;
  banner: string;
  summary: string;
  permalink: string;
  categoryId: string;
  assigned: boolean;
  featured: boolean;
  public: boolean;
  category?: Category | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCategoryInput = {
  id: string;
  label?: string | null;
  title?: string | null;
  description?: string | null;
  rank?: number | null;
  fixed?: boolean | null;
};

export type DeleteCategoryInput = {
  id: string;
};

export type CreateArticleInput = {
  id?: string | null;
  title: string;
  banner: string;
  summary: string;
  permalink: string;
  categoryId: string;
  assigned: boolean;
  featured: boolean;
  public: boolean;
};

export type ModelArticleConditionInput = {
  title?: ModelStringInput | null;
  banner?: ModelStringInput | null;
  summary?: ModelStringInput | null;
  permalink?: ModelStringInput | null;
  categoryId?: ModelIDInput | null;
  assigned?: ModelBooleanInput | null;
  featured?: ModelBooleanInput | null;
  public?: ModelBooleanInput | null;
  and?: Array<ModelArticleConditionInput | null> | null;
  or?: Array<ModelArticleConditionInput | null> | null;
  not?: ModelArticleConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type UpdateArticleInput = {
  id: string;
  title?: string | null;
  banner?: string | null;
  summary?: string | null;
  permalink?: string | null;
  categoryId?: string | null;
  assigned?: boolean | null;
  featured?: boolean | null;
  public?: boolean | null;
};

export type DeleteArticleInput = {
  id: string;
};

export type ModelMemberFilterInput = {
  id?: ModelIDInput | null;
  firstname?: ModelStringInput | null;
  lastname?: ModelStringInput | null;
  license?: ModelStringInput | null;
  email?: ModelStringInput | null;
  rights?: ModelStringInput | null;
  and?: Array<ModelMemberFilterInput | null> | null;
  or?: Array<ModelMemberFilterInput | null> | null;
  not?: ModelMemberFilterInput | null;
};

export type ModelMemberConnection = {
  __typename: "ModelMemberConnection";
  items: Array<Member | null>;
  nextToken?: string | null;
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null;
  label?: ModelStringInput | null;
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  rank?: ModelIntInput | null;
  fixed?: ModelBooleanInput | null;
  and?: Array<ModelCategoryFilterInput | null> | null;
  or?: Array<ModelCategoryFilterInput | null> | null;
  not?: ModelCategoryFilterInput | null;
};

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection";
  items: Array<Category | null>;
  nextToken?: string | null;
};

export type ModelArticleFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  banner?: ModelStringInput | null;
  summary?: ModelStringInput | null;
  permalink?: ModelStringInput | null;
  categoryId?: ModelIDInput | null;
  assigned?: ModelBooleanInput | null;
  featured?: ModelBooleanInput | null;
  public?: ModelBooleanInput | null;
  and?: Array<ModelArticleFilterInput | null> | null;
  or?: Array<ModelArticleFilterInput | null> | null;
  not?: ModelArticleFilterInput | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type ModelSubscriptionMemberFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  firstname?: ModelSubscriptionStringInput | null;
  lastname?: ModelSubscriptionStringInput | null;
  license?: ModelSubscriptionStringInput | null;
  email?: ModelSubscriptionStringInput | null;
  rights?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionMemberFilterInput | null> | null;
  or?: Array<ModelSubscriptionMemberFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionCategoryFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  label?: ModelSubscriptionStringInput | null;
  title?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  rank?: ModelSubscriptionIntInput | null;
  fixed?: ModelSubscriptionBooleanInput | null;
  and?: Array<ModelSubscriptionCategoryFilterInput | null> | null;
  or?: Array<ModelSubscriptionCategoryFilterInput | null> | null;
};

export type ModelSubscriptionIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  in?: Array<number | null> | null;
  notIn?: Array<number | null> | null;
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
};

export type ModelSubscriptionArticleFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  title?: ModelSubscriptionStringInput | null;
  banner?: ModelSubscriptionStringInput | null;
  summary?: ModelSubscriptionStringInput | null;
  permalink?: ModelSubscriptionStringInput | null;
  categoryId?: ModelSubscriptionIDInput | null;
  assigned?: ModelSubscriptionBooleanInput | null;
  featured?: ModelSubscriptionBooleanInput | null;
  public?: ModelSubscriptionBooleanInput | null;
  and?: Array<ModelSubscriptionArticleFilterInput | null> | null;
  or?: Array<ModelSubscriptionArticleFilterInput | null> | null;
};

export type CreateMemberMutation = {
  __typename: "Member";
  id: string;
  firstname: string;
  lastname: string;
  license: string;
  email: string;
  rights: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateMemberMutation = {
  __typename: "Member";
  id: string;
  firstname: string;
  lastname: string;
  license: string;
  email: string;
  rights: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteMemberMutation = {
  __typename: "Member";
  id: string;
  firstname: string;
  lastname: string;
  license: string;
  email: string;
  rights: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCategoryMutation = {
  __typename: "Category";
  id: string;
  label: string;
  title: string;
  description: string;
  articles?: {
    __typename: "ModelArticleConnection";
    nextToken?: string | null;
  } | null;
  rank: number;
  fixed?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCategoryMutation = {
  __typename: "Category";
  id: string;
  label: string;
  title: string;
  description: string;
  articles?: {
    __typename: "ModelArticleConnection";
    nextToken?: string | null;
  } | null;
  rank: number;
  fixed?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteCategoryMutation = {
  __typename: "Category";
  id: string;
  label: string;
  title: string;
  description: string;
  articles?: {
    __typename: "ModelArticleConnection";
    nextToken?: string | null;
  } | null;
  rank: number;
  fixed?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateArticleMutation = {
  __typename: "Article";
  id: string;
  title: string;
  banner: string;
  summary: string;
  permalink: string;
  categoryId: string;
  assigned: boolean;
  featured: boolean;
  public: boolean;
  category?: {
    __typename: "Category";
    id: string;
    label: string;
    title: string;
    description: string;
    rank: number;
    fixed?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateArticleMutation = {
  __typename: "Article";
  id: string;
  title: string;
  banner: string;
  summary: string;
  permalink: string;
  categoryId: string;
  assigned: boolean;
  featured: boolean;
  public: boolean;
  category?: {
    __typename: "Category";
    id: string;
    label: string;
    title: string;
    description: string;
    rank: number;
    fixed?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteArticleMutation = {
  __typename: "Article";
  id: string;
  title: string;
  banner: string;
  summary: string;
  permalink: string;
  categoryId: string;
  assigned: boolean;
  featured: boolean;
  public: boolean;
  category?: {
    __typename: "Category";
    id: string;
    label: string;
    title: string;
    description: string;
    rank: number;
    fixed?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type GetMemberQuery = {
  __typename: "Member";
  id: string;
  firstname: string;
  lastname: string;
  license: string;
  email: string;
  rights: string;
  createdAt: string;
  updatedAt: string;
};

export type ListMembersQuery = {
  __typename: "ModelMemberConnection";
  items: Array<{
    __typename: "Member";
    id: string;
    firstname: string;
    lastname: string;
    license: string;
    email: string;
    rights: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetCategoryQuery = {
  __typename: "Category";
  id: string;
  label: string;
  title: string;
  description: string;
  articles?: {
    __typename: "ModelArticleConnection";
    nextToken?: string | null;
  } | null;
  rank: number;
  fixed?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type ListCategoriesQuery = {
  __typename: "ModelCategoryConnection";
  items: Array<{
    __typename: "Category";
    id: string;
    label: string;
    title: string;
    description: string;
    rank: number;
    fixed?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetArticleQuery = {
  __typename: "Article";
  id: string;
  title: string;
  banner: string;
  summary: string;
  permalink: string;
  categoryId: string;
  assigned: boolean;
  featured: boolean;
  public: boolean;
  category?: {
    __typename: "Category";
    id: string;
    label: string;
    title: string;
    description: string;
    rank: number;
    fixed?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListArticlesQuery = {
  __typename: "ModelArticleConnection";
  items: Array<{
    __typename: "Article";
    id: string;
    title: string;
    banner: string;
    summary: string;
    permalink: string;
    categoryId: string;
    assigned: boolean;
    featured: boolean;
    public: boolean;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type ArticlesByCategoryIdQuery = {
  __typename: "ModelArticleConnection";
  items: Array<{
    __typename: "Article";
    id: string;
    title: string;
    banner: string;
    summary: string;
    permalink: string;
    categoryId: string;
    assigned: boolean;
    featured: boolean;
    public: boolean;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type OnCreateMemberSubscription = {
  __typename: "Member";
  id: string;
  firstname: string;
  lastname: string;
  license: string;
  email: string;
  rights: string;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateMemberSubscription = {
  __typename: "Member";
  id: string;
  firstname: string;
  lastname: string;
  license: string;
  email: string;
  rights: string;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteMemberSubscription = {
  __typename: "Member";
  id: string;
  firstname: string;
  lastname: string;
  license: string;
  email: string;
  rights: string;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateCategorySubscription = {
  __typename: "Category";
  id: string;
  label: string;
  title: string;
  description: string;
  articles?: {
    __typename: "ModelArticleConnection";
    nextToken?: string | null;
  } | null;
  rank: number;
  fixed?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateCategorySubscription = {
  __typename: "Category";
  id: string;
  label: string;
  title: string;
  description: string;
  articles?: {
    __typename: "ModelArticleConnection";
    nextToken?: string | null;
  } | null;
  rank: number;
  fixed?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteCategorySubscription = {
  __typename: "Category";
  id: string;
  label: string;
  title: string;
  description: string;
  articles?: {
    __typename: "ModelArticleConnection";
    nextToken?: string | null;
  } | null;
  rank: number;
  fixed?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateArticleSubscription = {
  __typename: "Article";
  id: string;
  title: string;
  banner: string;
  summary: string;
  permalink: string;
  categoryId: string;
  assigned: boolean;
  featured: boolean;
  public: boolean;
  category?: {
    __typename: "Category";
    id: string;
    label: string;
    title: string;
    description: string;
    rank: number;
    fixed?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateArticleSubscription = {
  __typename: "Article";
  id: string;
  title: string;
  banner: string;
  summary: string;
  permalink: string;
  categoryId: string;
  assigned: boolean;
  featured: boolean;
  public: boolean;
  category?: {
    __typename: "Category";
    id: string;
    label: string;
    title: string;
    description: string;
    rank: number;
    fixed?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteArticleSubscription = {
  __typename: "Article";
  id: string;
  title: string;
  banner: string;
  summary: string;
  permalink: string;
  categoryId: string;
  assigned: boolean;
  featured: boolean;
  public: boolean;
  category?: {
    __typename: "Category";
    id: string;
    label: string;
    title: string;
    description: string;
    rank: number;
    fixed?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateMember(
    input: CreateMemberInput,
    condition?: ModelMemberConditionInput
  ): Promise<CreateMemberMutation> {
    const statement = `mutation CreateMember($input: CreateMemberInput!, $condition: ModelMemberConditionInput) {
        createMember(input: $input, condition: $condition) {
          __typename
          id
          firstname
          lastname
          license
          email
          rights
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateMemberMutation>response.data.createMember;
  }
  async UpdateMember(
    input: UpdateMemberInput,
    condition?: ModelMemberConditionInput
  ): Promise<UpdateMemberMutation> {
    const statement = `mutation UpdateMember($input: UpdateMemberInput!, $condition: ModelMemberConditionInput) {
        updateMember(input: $input, condition: $condition) {
          __typename
          id
          firstname
          lastname
          license
          email
          rights
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateMemberMutation>response.data.updateMember;
  }
  async DeleteMember(
    input: DeleteMemberInput,
    condition?: ModelMemberConditionInput
  ): Promise<DeleteMemberMutation> {
    const statement = `mutation DeleteMember($input: DeleteMemberInput!, $condition: ModelMemberConditionInput) {
        deleteMember(input: $input, condition: $condition) {
          __typename
          id
          firstname
          lastname
          license
          email
          rights
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteMemberMutation>response.data.deleteMember;
  }
  async CreateCategory(
    input: CreateCategoryInput,
    condition?: ModelCategoryConditionInput
  ): Promise<CreateCategoryMutation> {
    const statement = `mutation CreateCategory($input: CreateCategoryInput!, $condition: ModelCategoryConditionInput) {
        createCategory(input: $input, condition: $condition) {
          __typename
          id
          label
          title
          description
          articles {
            __typename
            nextToken
          }
          rank
          fixed
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateCategoryMutation>response.data.createCategory;
  }
  async UpdateCategory(
    input: UpdateCategoryInput,
    condition?: ModelCategoryConditionInput
  ): Promise<UpdateCategoryMutation> {
    const statement = `mutation UpdateCategory($input: UpdateCategoryInput!, $condition: ModelCategoryConditionInput) {
        updateCategory(input: $input, condition: $condition) {
          __typename
          id
          label
          title
          description
          articles {
            __typename
            nextToken
          }
          rank
          fixed
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCategoryMutation>response.data.updateCategory;
  }
  async DeleteCategory(
    input: DeleteCategoryInput,
    condition?: ModelCategoryConditionInput
  ): Promise<DeleteCategoryMutation> {
    const statement = `mutation DeleteCategory($input: DeleteCategoryInput!, $condition: ModelCategoryConditionInput) {
        deleteCategory(input: $input, condition: $condition) {
          __typename
          id
          label
          title
          description
          articles {
            __typename
            nextToken
          }
          rank
          fixed
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteCategoryMutation>response.data.deleteCategory;
  }
  async CreateArticle(
    input: CreateArticleInput,
    condition?: ModelArticleConditionInput
  ): Promise<CreateArticleMutation> {
    const statement = `mutation CreateArticle($input: CreateArticleInput!, $condition: ModelArticleConditionInput) {
        createArticle(input: $input, condition: $condition) {
          __typename
          id
          title
          banner
          summary
          permalink
          categoryId
          assigned
          featured
          public
          category {
            __typename
            id
            label
            title
            description
            rank
            fixed
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateArticleMutation>response.data.createArticle;
  }
  async UpdateArticle(
    input: UpdateArticleInput,
    condition?: ModelArticleConditionInput
  ): Promise<UpdateArticleMutation> {
    const statement = `mutation UpdateArticle($input: UpdateArticleInput!, $condition: ModelArticleConditionInput) {
        updateArticle(input: $input, condition: $condition) {
          __typename
          id
          title
          banner
          summary
          permalink
          categoryId
          assigned
          featured
          public
          category {
            __typename
            id
            label
            title
            description
            rank
            fixed
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateArticleMutation>response.data.updateArticle;
  }
  async DeleteArticle(
    input: DeleteArticleInput,
    condition?: ModelArticleConditionInput
  ): Promise<DeleteArticleMutation> {
    const statement = `mutation DeleteArticle($input: DeleteArticleInput!, $condition: ModelArticleConditionInput) {
        deleteArticle(input: $input, condition: $condition) {
          __typename
          id
          title
          banner
          summary
          permalink
          categoryId
          assigned
          featured
          public
          category {
            __typename
            id
            label
            title
            description
            rank
            fixed
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteArticleMutation>response.data.deleteArticle;
  }
  async GetMember(id: string): Promise<GetMemberQuery> {
    const statement = `query GetMember($id: ID!) {
        getMember(id: $id) {
          __typename
          id
          firstname
          lastname
          license
          email
          rights
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetMemberQuery>response.data.getMember;
  }
  async ListMembers(
    filter?: ModelMemberFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListMembersQuery> {
    const statement = `query ListMembers($filter: ModelMemberFilterInput, $limit: Int, $nextToken: String) {
        listMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            firstname
            lastname
            license
            email
            rights
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListMembersQuery>response.data.listMembers;
  }
  async GetCategory(id: string): Promise<GetCategoryQuery> {
    const statement = `query GetCategory($id: ID!) {
        getCategory(id: $id) {
          __typename
          id
          label
          title
          description
          articles {
            __typename
            nextToken
          }
          rank
          fixed
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCategoryQuery>response.data.getCategory;
  }
  async ListCategories(
    filter?: ModelCategoryFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCategoriesQuery> {
    const statement = `query ListCategories($filter: ModelCategoryFilterInput, $limit: Int, $nextToken: String) {
        listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            label
            title
            description
            rank
            fixed
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListCategoriesQuery>response.data.listCategories;
  }
  async GetArticle(id: string): Promise<GetArticleQuery> {
    const statement = `query GetArticle($id: ID!) {
        getArticle(id: $id) {
          __typename
          id
          title
          banner
          summary
          permalink
          categoryId
          assigned
          featured
          public
          category {
            __typename
            id
            label
            title
            description
            rank
            fixed
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetArticleQuery>response.data.getArticle;
  }
  async ListArticles(
    filter?: ModelArticleFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListArticlesQuery> {
    const statement = `query ListArticles($filter: ModelArticleFilterInput, $limit: Int, $nextToken: String) {
        listArticles(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            title
            banner
            summary
            permalink
            categoryId
            assigned
            featured
            public
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListArticlesQuery>response.data.listArticles;
  }
  async ArticlesByCategoryId(
    categoryId: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelArticleFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ArticlesByCategoryIdQuery> {
    const statement = `query ArticlesByCategoryId($categoryId: ID!, $sortDirection: ModelSortDirection, $filter: ModelArticleFilterInput, $limit: Int, $nextToken: String) {
        articlesByCategoryId(
          categoryId: $categoryId
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            title
            banner
            summary
            permalink
            categoryId
            assigned
            featured
            public
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      categoryId
    };
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ArticlesByCategoryIdQuery>response.data.articlesByCategoryId;
  }
  OnCreateMemberListener(
    filter?: ModelSubscriptionMemberFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateMember">>
  > {
    const statement = `subscription OnCreateMember($filter: ModelSubscriptionMemberFilterInput) {
        onCreateMember(filter: $filter) {
          __typename
          id
          firstname
          lastname
          license
          email
          rights
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateMember">>
    >;
  }

  OnUpdateMemberListener(
    filter?: ModelSubscriptionMemberFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateMember">>
  > {
    const statement = `subscription OnUpdateMember($filter: ModelSubscriptionMemberFilterInput) {
        onUpdateMember(filter: $filter) {
          __typename
          id
          firstname
          lastname
          license
          email
          rights
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateMember">>
    >;
  }

  OnDeleteMemberListener(
    filter?: ModelSubscriptionMemberFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteMember">>
  > {
    const statement = `subscription OnDeleteMember($filter: ModelSubscriptionMemberFilterInput) {
        onDeleteMember(filter: $filter) {
          __typename
          id
          firstname
          lastname
          license
          email
          rights
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteMember">>
    >;
  }

  OnCreateCategoryListener(
    filter?: ModelSubscriptionCategoryFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateCategory">>
  > {
    const statement = `subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
        onCreateCategory(filter: $filter) {
          __typename
          id
          label
          title
          description
          articles {
            __typename
            nextToken
          }
          rank
          fixed
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateCategory">>
    >;
  }

  OnUpdateCategoryListener(
    filter?: ModelSubscriptionCategoryFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateCategory">>
  > {
    const statement = `subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
        onUpdateCategory(filter: $filter) {
          __typename
          id
          label
          title
          description
          articles {
            __typename
            nextToken
          }
          rank
          fixed
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateCategory">>
    >;
  }

  OnDeleteCategoryListener(
    filter?: ModelSubscriptionCategoryFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteCategory">>
  > {
    const statement = `subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
        onDeleteCategory(filter: $filter) {
          __typename
          id
          label
          title
          description
          articles {
            __typename
            nextToken
          }
          rank
          fixed
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteCategory">>
    >;
  }

  OnCreateArticleListener(
    filter?: ModelSubscriptionArticleFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateArticle">>
  > {
    const statement = `subscription OnCreateArticle($filter: ModelSubscriptionArticleFilterInput) {
        onCreateArticle(filter: $filter) {
          __typename
          id
          title
          banner
          summary
          permalink
          categoryId
          assigned
          featured
          public
          category {
            __typename
            id
            label
            title
            description
            rank
            fixed
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateArticle">>
    >;
  }

  OnUpdateArticleListener(
    filter?: ModelSubscriptionArticleFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateArticle">>
  > {
    const statement = `subscription OnUpdateArticle($filter: ModelSubscriptionArticleFilterInput) {
        onUpdateArticle(filter: $filter) {
          __typename
          id
          title
          banner
          summary
          permalink
          categoryId
          assigned
          featured
          public
          category {
            __typename
            id
            label
            title
            description
            rank
            fixed
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateArticle">>
    >;
  }

  OnDeleteArticleListener(
    filter?: ModelSubscriptionArticleFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteArticle">>
  > {
    const statement = `subscription OnDeleteArticle($filter: ModelSubscriptionArticleFilterInput) {
        onDeleteArticle(filter: $filter) {
          __typename
          id
          title
          banner
          summary
          permalink
          categoryId
          assigned
          featured
          public
          category {
            __typename
            id
            label
            title
            description
            rank
            fixed
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteArticle">>
    >;
  }
}
