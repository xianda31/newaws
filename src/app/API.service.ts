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
  onCreatePage: OnCreatePageSubscription;
  onUpdatePage: OnUpdatePageSubscription;
  onDeletePage: OnDeletePageSubscription;
  onCreatePicture: OnCreatePictureSubscription;
  onUpdatePicture: OnUpdatePictureSubscription;
  onDeletePicture: OnDeletePictureSubscription;
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

export type CreatePageInput = {
  id?: string | null;
  root_menu: string;
  label: string;
  description: string;
  path: string;
  hidden: boolean;
  viewer: string;
  public?: boolean | null;
};

export type ModelPageConditionInput = {
  root_menu?: ModelStringInput | null;
  label?: ModelStringInput | null;
  description?: ModelStringInput | null;
  path?: ModelStringInput | null;
  hidden?: ModelBooleanInput | null;
  viewer?: ModelStringInput | null;
  public?: ModelBooleanInput | null;
  and?: Array<ModelPageConditionInput | null> | null;
  or?: Array<ModelPageConditionInput | null> | null;
  not?: ModelPageConditionInput | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Page = {
  __typename: "Page";
  id: string;
  root_menu: string;
  label: string;
  description: string;
  path: string;
  hidden: boolean;
  viewer: string;
  public?: boolean | null;
  articles?: ModelArticleConnection | null;
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
  headline: string;
  layout: string;
  body: string;
  date?: string | null;
  directory?: string | null;
  expiry_date?: string | null;
  rank: number;
  pictures?: ModelPictureConnection | null;
  pageId: string;
  createdAt: string;
  updatedAt: string;
};

export type ModelPictureConnection = {
  __typename: "ModelPictureConnection";
  items: Array<Picture | null>;
  nextToken?: string | null;
};

export type Picture = {
  __typename: "Picture";
  id: string;
  filename: string;
  orientation?: string | null;
  rank: number;
  articleId: string;
  caption1?: string | null;
  caption2?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdatePageInput = {
  id: string;
  root_menu?: string | null;
  label?: string | null;
  description?: string | null;
  path?: string | null;
  hidden?: boolean | null;
  viewer?: string | null;
  public?: boolean | null;
};

export type DeletePageInput = {
  id: string;
};

export type CreatePictureInput = {
  id?: string | null;
  filename: string;
  orientation?: string | null;
  rank: number;
  articleId: string;
  caption1?: string | null;
  caption2?: string | null;
};

export type ModelPictureConditionInput = {
  filename?: ModelStringInput | null;
  orientation?: ModelStringInput | null;
  rank?: ModelIntInput | null;
  articleId?: ModelIDInput | null;
  caption1?: ModelStringInput | null;
  caption2?: ModelStringInput | null;
  and?: Array<ModelPictureConditionInput | null> | null;
  or?: Array<ModelPictureConditionInput | null> | null;
  not?: ModelPictureConditionInput | null;
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

export type UpdatePictureInput = {
  id: string;
  filename?: string | null;
  orientation?: string | null;
  rank?: number | null;
  articleId?: string | null;
  caption1?: string | null;
  caption2?: string | null;
};

export type DeletePictureInput = {
  id: string;
};

export type CreateArticleInput = {
  id?: string | null;
  title: string;
  headline: string;
  layout: string;
  body: string;
  date?: string | null;
  directory?: string | null;
  expiry_date?: string | null;
  rank: number;
  pageId: string;
};

export type ModelArticleConditionInput = {
  title?: ModelStringInput | null;
  headline?: ModelStringInput | null;
  layout?: ModelStringInput | null;
  body?: ModelStringInput | null;
  date?: ModelStringInput | null;
  directory?: ModelStringInput | null;
  expiry_date?: ModelStringInput | null;
  rank?: ModelIntInput | null;
  pageId?: ModelIDInput | null;
  and?: Array<ModelArticleConditionInput | null> | null;
  or?: Array<ModelArticleConditionInput | null> | null;
  not?: ModelArticleConditionInput | null;
};

export type UpdateArticleInput = {
  id: string;
  title?: string | null;
  headline?: string | null;
  layout?: string | null;
  body?: string | null;
  date?: string | null;
  directory?: string | null;
  expiry_date?: string | null;
  rank?: number | null;
  pageId?: string | null;
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

export type ModelPageFilterInput = {
  id?: ModelIDInput | null;
  root_menu?: ModelStringInput | null;
  label?: ModelStringInput | null;
  description?: ModelStringInput | null;
  path?: ModelStringInput | null;
  hidden?: ModelBooleanInput | null;
  viewer?: ModelStringInput | null;
  public?: ModelBooleanInput | null;
  and?: Array<ModelPageFilterInput | null> | null;
  or?: Array<ModelPageFilterInput | null> | null;
  not?: ModelPageFilterInput | null;
};

export type ModelPageConnection = {
  __typename: "ModelPageConnection";
  items: Array<Page | null>;
  nextToken?: string | null;
};

export type ModelPictureFilterInput = {
  id?: ModelIDInput | null;
  filename?: ModelStringInput | null;
  orientation?: ModelStringInput | null;
  rank?: ModelIntInput | null;
  articleId?: ModelIDInput | null;
  caption1?: ModelStringInput | null;
  caption2?: ModelStringInput | null;
  and?: Array<ModelPictureFilterInput | null> | null;
  or?: Array<ModelPictureFilterInput | null> | null;
  not?: ModelPictureFilterInput | null;
};

export type ModelArticleFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  headline?: ModelStringInput | null;
  layout?: ModelStringInput | null;
  body?: ModelStringInput | null;
  date?: ModelStringInput | null;
  directory?: ModelStringInput | null;
  expiry_date?: ModelStringInput | null;
  rank?: ModelIntInput | null;
  pageId?: ModelIDInput | null;
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

export type ModelSubscriptionPageFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  root_menu?: ModelSubscriptionStringInput | null;
  label?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  path?: ModelSubscriptionStringInput | null;
  hidden?: ModelSubscriptionBooleanInput | null;
  viewer?: ModelSubscriptionStringInput | null;
  public?: ModelSubscriptionBooleanInput | null;
  and?: Array<ModelSubscriptionPageFilterInput | null> | null;
  or?: Array<ModelSubscriptionPageFilterInput | null> | null;
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
};

export type ModelSubscriptionPictureFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  filename?: ModelSubscriptionStringInput | null;
  orientation?: ModelSubscriptionStringInput | null;
  rank?: ModelSubscriptionIntInput | null;
  articleId?: ModelSubscriptionIDInput | null;
  caption1?: ModelSubscriptionStringInput | null;
  caption2?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionPictureFilterInput | null> | null;
  or?: Array<ModelSubscriptionPictureFilterInput | null> | null;
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

export type ModelSubscriptionArticleFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  title?: ModelSubscriptionStringInput | null;
  headline?: ModelSubscriptionStringInput | null;
  layout?: ModelSubscriptionStringInput | null;
  body?: ModelSubscriptionStringInput | null;
  date?: ModelSubscriptionStringInput | null;
  directory?: ModelSubscriptionStringInput | null;
  expiry_date?: ModelSubscriptionStringInput | null;
  rank?: ModelSubscriptionIntInput | null;
  pageId?: ModelSubscriptionIDInput | null;
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

export type CreatePageMutation = {
  __typename: "Page";
  id: string;
  root_menu: string;
  label: string;
  description: string;
  path: string;
  hidden: boolean;
  viewer: string;
  public?: boolean | null;
  articles?: {
    __typename: "ModelArticleConnection";
    items: Array<{
      __typename: "Article";
      id: string;
      title: string;
      headline: string;
      layout: string;
      body: string;
      date?: string | null;
      directory?: string | null;
      expiry_date?: string | null;
      rank: number;
      pageId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdatePageMutation = {
  __typename: "Page";
  id: string;
  root_menu: string;
  label: string;
  description: string;
  path: string;
  hidden: boolean;
  viewer: string;
  public?: boolean | null;
  articles?: {
    __typename: "ModelArticleConnection";
    items: Array<{
      __typename: "Article";
      id: string;
      title: string;
      headline: string;
      layout: string;
      body: string;
      date?: string | null;
      directory?: string | null;
      expiry_date?: string | null;
      rank: number;
      pageId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeletePageMutation = {
  __typename: "Page";
  id: string;
  root_menu: string;
  label: string;
  description: string;
  path: string;
  hidden: boolean;
  viewer: string;
  public?: boolean | null;
  articles?: {
    __typename: "ModelArticleConnection";
    items: Array<{
      __typename: "Article";
      id: string;
      title: string;
      headline: string;
      layout: string;
      body: string;
      date?: string | null;
      directory?: string | null;
      expiry_date?: string | null;
      rank: number;
      pageId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreatePictureMutation = {
  __typename: "Picture";
  id: string;
  filename: string;
  orientation?: string | null;
  rank: number;
  articleId: string;
  caption1?: string | null;
  caption2?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdatePictureMutation = {
  __typename: "Picture";
  id: string;
  filename: string;
  orientation?: string | null;
  rank: number;
  articleId: string;
  caption1?: string | null;
  caption2?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeletePictureMutation = {
  __typename: "Picture";
  id: string;
  filename: string;
  orientation?: string | null;
  rank: number;
  articleId: string;
  caption1?: string | null;
  caption2?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateArticleMutation = {
  __typename: "Article";
  id: string;
  title: string;
  headline: string;
  layout: string;
  body: string;
  date?: string | null;
  directory?: string | null;
  expiry_date?: string | null;
  rank: number;
  pictures?: {
    __typename: "ModelPictureConnection";
    items: Array<{
      __typename: "Picture";
      id: string;
      filename: string;
      orientation?: string | null;
      rank: number;
      articleId: string;
      caption1?: string | null;
      caption2?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  pageId: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateArticleMutation = {
  __typename: "Article";
  id: string;
  title: string;
  headline: string;
  layout: string;
  body: string;
  date?: string | null;
  directory?: string | null;
  expiry_date?: string | null;
  rank: number;
  pictures?: {
    __typename: "ModelPictureConnection";
    items: Array<{
      __typename: "Picture";
      id: string;
      filename: string;
      orientation?: string | null;
      rank: number;
      articleId: string;
      caption1?: string | null;
      caption2?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  pageId: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteArticleMutation = {
  __typename: "Article";
  id: string;
  title: string;
  headline: string;
  layout: string;
  body: string;
  date?: string | null;
  directory?: string | null;
  expiry_date?: string | null;
  rank: number;
  pictures?: {
    __typename: "ModelPictureConnection";
    items: Array<{
      __typename: "Picture";
      id: string;
      filename: string;
      orientation?: string | null;
      rank: number;
      articleId: string;
      caption1?: string | null;
      caption2?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  pageId: string;
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

export type GetPageQuery = {
  __typename: "Page";
  id: string;
  root_menu: string;
  label: string;
  description: string;
  path: string;
  hidden: boolean;
  viewer: string;
  public?: boolean | null;
  articles?: {
    __typename: "ModelArticleConnection";
    items: Array<{
      __typename: "Article";
      id: string;
      title: string;
      headline: string;
      layout: string;
      body: string;
      date?: string | null;
      directory?: string | null;
      expiry_date?: string | null;
      rank: number;
      pageId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListPagesQuery = {
  __typename: "ModelPageConnection";
  items: Array<{
    __typename: "Page";
    id: string;
    root_menu: string;
    label: string;
    description: string;
    path: string;
    hidden: boolean;
    viewer: string;
    public?: boolean | null;
    articles?: {
      __typename: "ModelArticleConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetPictureQuery = {
  __typename: "Picture";
  id: string;
  filename: string;
  orientation?: string | null;
  rank: number;
  articleId: string;
  caption1?: string | null;
  caption2?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListPicturesQuery = {
  __typename: "ModelPictureConnection";
  items: Array<{
    __typename: "Picture";
    id: string;
    filename: string;
    orientation?: string | null;
    rank: number;
    articleId: string;
    caption1?: string | null;
    caption2?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetArticleQuery = {
  __typename: "Article";
  id: string;
  title: string;
  headline: string;
  layout: string;
  body: string;
  date?: string | null;
  directory?: string | null;
  expiry_date?: string | null;
  rank: number;
  pictures?: {
    __typename: "ModelPictureConnection";
    items: Array<{
      __typename: "Picture";
      id: string;
      filename: string;
      orientation?: string | null;
      rank: number;
      articleId: string;
      caption1?: string | null;
      caption2?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  pageId: string;
  createdAt: string;
  updatedAt: string;
};

export type ListArticlesQuery = {
  __typename: "ModelArticleConnection";
  items: Array<{
    __typename: "Article";
    id: string;
    title: string;
    headline: string;
    layout: string;
    body: string;
    date?: string | null;
    directory?: string | null;
    expiry_date?: string | null;
    rank: number;
    pictures?: {
      __typename: "ModelPictureConnection";
      nextToken?: string | null;
    } | null;
    pageId: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type PicturesByArticleIdQuery = {
  __typename: "ModelPictureConnection";
  items: Array<{
    __typename: "Picture";
    id: string;
    filename: string;
    orientation?: string | null;
    rank: number;
    articleId: string;
    caption1?: string | null;
    caption2?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type ArticlesByPageIdQuery = {
  __typename: "ModelArticleConnection";
  items: Array<{
    __typename: "Article";
    id: string;
    title: string;
    headline: string;
    layout: string;
    body: string;
    date?: string | null;
    directory?: string | null;
    expiry_date?: string | null;
    rank: number;
    pictures?: {
      __typename: "ModelPictureConnection";
      nextToken?: string | null;
    } | null;
    pageId: string;
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

export type OnCreatePageSubscription = {
  __typename: "Page";
  id: string;
  root_menu: string;
  label: string;
  description: string;
  path: string;
  hidden: boolean;
  viewer: string;
  public?: boolean | null;
  articles?: {
    __typename: "ModelArticleConnection";
    items: Array<{
      __typename: "Article";
      id: string;
      title: string;
      headline: string;
      layout: string;
      body: string;
      date?: string | null;
      directory?: string | null;
      expiry_date?: string | null;
      rank: number;
      pageId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdatePageSubscription = {
  __typename: "Page";
  id: string;
  root_menu: string;
  label: string;
  description: string;
  path: string;
  hidden: boolean;
  viewer: string;
  public?: boolean | null;
  articles?: {
    __typename: "ModelArticleConnection";
    items: Array<{
      __typename: "Article";
      id: string;
      title: string;
      headline: string;
      layout: string;
      body: string;
      date?: string | null;
      directory?: string | null;
      expiry_date?: string | null;
      rank: number;
      pageId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeletePageSubscription = {
  __typename: "Page";
  id: string;
  root_menu: string;
  label: string;
  description: string;
  path: string;
  hidden: boolean;
  viewer: string;
  public?: boolean | null;
  articles?: {
    __typename: "ModelArticleConnection";
    items: Array<{
      __typename: "Article";
      id: string;
      title: string;
      headline: string;
      layout: string;
      body: string;
      date?: string | null;
      directory?: string | null;
      expiry_date?: string | null;
      rank: number;
      pageId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreatePictureSubscription = {
  __typename: "Picture";
  id: string;
  filename: string;
  orientation?: string | null;
  rank: number;
  articleId: string;
  caption1?: string | null;
  caption2?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdatePictureSubscription = {
  __typename: "Picture";
  id: string;
  filename: string;
  orientation?: string | null;
  rank: number;
  articleId: string;
  caption1?: string | null;
  caption2?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeletePictureSubscription = {
  __typename: "Picture";
  id: string;
  filename: string;
  orientation?: string | null;
  rank: number;
  articleId: string;
  caption1?: string | null;
  caption2?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateArticleSubscription = {
  __typename: "Article";
  id: string;
  title: string;
  headline: string;
  layout: string;
  body: string;
  date?: string | null;
  directory?: string | null;
  expiry_date?: string | null;
  rank: number;
  pictures?: {
    __typename: "ModelPictureConnection";
    items: Array<{
      __typename: "Picture";
      id: string;
      filename: string;
      orientation?: string | null;
      rank: number;
      articleId: string;
      caption1?: string | null;
      caption2?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  pageId: string;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateArticleSubscription = {
  __typename: "Article";
  id: string;
  title: string;
  headline: string;
  layout: string;
  body: string;
  date?: string | null;
  directory?: string | null;
  expiry_date?: string | null;
  rank: number;
  pictures?: {
    __typename: "ModelPictureConnection";
    items: Array<{
      __typename: "Picture";
      id: string;
      filename: string;
      orientation?: string | null;
      rank: number;
      articleId: string;
      caption1?: string | null;
      caption2?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  pageId: string;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteArticleSubscription = {
  __typename: "Article";
  id: string;
  title: string;
  headline: string;
  layout: string;
  body: string;
  date?: string | null;
  directory?: string | null;
  expiry_date?: string | null;
  rank: number;
  pictures?: {
    __typename: "ModelPictureConnection";
    items: Array<{
      __typename: "Picture";
      id: string;
      filename: string;
      orientation?: string | null;
      rank: number;
      articleId: string;
      caption1?: string | null;
      caption2?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  pageId: string;
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
  async CreatePage(
    input: CreatePageInput,
    condition?: ModelPageConditionInput
  ): Promise<CreatePageMutation> {
    const statement = `mutation CreatePage($input: CreatePageInput!, $condition: ModelPageConditionInput) {
        createPage(input: $input, condition: $condition) {
          __typename
          id
          root_menu
          label
          description
          path
          hidden
          viewer
          public
          articles {
            __typename
            items {
              __typename
              id
              title
              headline
              layout
              body
              date
              directory
              expiry_date
              rank
              pageId
              createdAt
              updatedAt
            }
            nextToken
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
    return <CreatePageMutation>response.data.createPage;
  }
  async UpdatePage(
    input: UpdatePageInput,
    condition?: ModelPageConditionInput
  ): Promise<UpdatePageMutation> {
    const statement = `mutation UpdatePage($input: UpdatePageInput!, $condition: ModelPageConditionInput) {
        updatePage(input: $input, condition: $condition) {
          __typename
          id
          root_menu
          label
          description
          path
          hidden
          viewer
          public
          articles {
            __typename
            items {
              __typename
              id
              title
              headline
              layout
              body
              date
              directory
              expiry_date
              rank
              pageId
              createdAt
              updatedAt
            }
            nextToken
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
    return <UpdatePageMutation>response.data.updatePage;
  }
  async DeletePage(
    input: DeletePageInput,
    condition?: ModelPageConditionInput
  ): Promise<DeletePageMutation> {
    const statement = `mutation DeletePage($input: DeletePageInput!, $condition: ModelPageConditionInput) {
        deletePage(input: $input, condition: $condition) {
          __typename
          id
          root_menu
          label
          description
          path
          hidden
          viewer
          public
          articles {
            __typename
            items {
              __typename
              id
              title
              headline
              layout
              body
              date
              directory
              expiry_date
              rank
              pageId
              createdAt
              updatedAt
            }
            nextToken
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
    return <DeletePageMutation>response.data.deletePage;
  }
  async CreatePicture(
    input: CreatePictureInput,
    condition?: ModelPictureConditionInput
  ): Promise<CreatePictureMutation> {
    const statement = `mutation CreatePicture($input: CreatePictureInput!, $condition: ModelPictureConditionInput) {
        createPicture(input: $input, condition: $condition) {
          __typename
          id
          filename
          orientation
          rank
          articleId
          caption1
          caption2
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
    return <CreatePictureMutation>response.data.createPicture;
  }
  async UpdatePicture(
    input: UpdatePictureInput,
    condition?: ModelPictureConditionInput
  ): Promise<UpdatePictureMutation> {
    const statement = `mutation UpdatePicture($input: UpdatePictureInput!, $condition: ModelPictureConditionInput) {
        updatePicture(input: $input, condition: $condition) {
          __typename
          id
          filename
          orientation
          rank
          articleId
          caption1
          caption2
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
    return <UpdatePictureMutation>response.data.updatePicture;
  }
  async DeletePicture(
    input: DeletePictureInput,
    condition?: ModelPictureConditionInput
  ): Promise<DeletePictureMutation> {
    const statement = `mutation DeletePicture($input: DeletePictureInput!, $condition: ModelPictureConditionInput) {
        deletePicture(input: $input, condition: $condition) {
          __typename
          id
          filename
          orientation
          rank
          articleId
          caption1
          caption2
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
    return <DeletePictureMutation>response.data.deletePicture;
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
          headline
          layout
          body
          date
          directory
          expiry_date
          rank
          pictures {
            __typename
            items {
              __typename
              id
              filename
              orientation
              rank
              articleId
              caption1
              caption2
              createdAt
              updatedAt
            }
            nextToken
          }
          pageId
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
          headline
          layout
          body
          date
          directory
          expiry_date
          rank
          pictures {
            __typename
            items {
              __typename
              id
              filename
              orientation
              rank
              articleId
              caption1
              caption2
              createdAt
              updatedAt
            }
            nextToken
          }
          pageId
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
          headline
          layout
          body
          date
          directory
          expiry_date
          rank
          pictures {
            __typename
            items {
              __typename
              id
              filename
              orientation
              rank
              articleId
              caption1
              caption2
              createdAt
              updatedAt
            }
            nextToken
          }
          pageId
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
  async GetPage(id: string): Promise<GetPageQuery> {
    const statement = `query GetPage($id: ID!) {
        getPage(id: $id) {
          __typename
          id
          root_menu
          label
          description
          path
          hidden
          viewer
          public
          articles {
            __typename
            items {
              __typename
              id
              title
              headline
              layout
              body
              date
              directory
              expiry_date
              rank
              pageId
              createdAt
              updatedAt
            }
            nextToken
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
    return <GetPageQuery>response.data.getPage;
  }
  async ListPages(
    filter?: ModelPageFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListPagesQuery> {
    const statement = `query ListPages($filter: ModelPageFilterInput, $limit: Int, $nextToken: String) {
        listPages(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            root_menu
            label
            description
            path
            hidden
            viewer
            public
            articles {
            __typename
            items {
              __typename
              id
              title
              headline
              layout
              body
              date
              directory
              expiry_date
              rank
              pageId
              createdAt
              updatedAt
            }
            nextToken
          }
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
    return <ListPagesQuery>response.data.listPages;
  }
  async GetPicture(id: string): Promise<GetPictureQuery> {
    const statement = `query GetPicture($id: ID!) {
        getPicture(id: $id) {
          __typename
          id
          filename
          orientation
          rank
          articleId
          caption1
          caption2
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
    return <GetPictureQuery>response.data.getPicture;
  }
  async ListPictures(
    filter?: ModelPictureFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListPicturesQuery> {
    const statement = `query ListPictures($filter: ModelPictureFilterInput, $limit: Int, $nextToken: String) {
        listPictures(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            filename
            orientation
            rank
            articleId
            caption1
            caption2
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
    return <ListPicturesQuery>response.data.listPictures;
  }
  async GetArticle(id: string): Promise<GetArticleQuery> {
    const statement = `query GetArticle($id: ID!) {
        getArticle(id: $id) {
          __typename
          id
          title
          headline
          layout
          body
          date
          directory
          expiry_date
          rank
          pictures {
            __typename
            items {
              __typename
              id
              filename
              orientation
              rank
              articleId
              caption1
              caption2
              createdAt
              updatedAt
            }
            nextToken
          }
          pageId
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
            headline
            layout
            body
            date
            directory
            expiry_date
            rank
            pictures {
              __typename
              nextToken
            }
            pageId
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
  async PicturesByArticleId(
    articleId: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelPictureFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<PicturesByArticleIdQuery> {
    const statement = `query PicturesByArticleId($articleId: ID!, $sortDirection: ModelSortDirection, $filter: ModelPictureFilterInput, $limit: Int, $nextToken: String) {
        picturesByArticleId(
          articleId: $articleId
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            filename
            orientation
            rank
            articleId
            caption1
            caption2
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      articleId
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
    return <PicturesByArticleIdQuery>response.data.picturesByArticleId;
  }
  async ArticlesByPageId(
    pageId: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelArticleFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ArticlesByPageIdQuery> {
    const statement = `query ArticlesByPageId($pageId: ID!, $sortDirection: ModelSortDirection, $filter: ModelArticleFilterInput, $limit: Int, $nextToken: String) {
        articlesByPageId(
          pageId: $pageId
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
            headline
            layout
            body
            date
            directory
            expiry_date
            rank
            pictures {
              __typename
              nextToken
            }
            pageId
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      pageId
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
    return <ArticlesByPageIdQuery>response.data.articlesByPageId;
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

  OnCreatePageListener(
    filter?: ModelSubscriptionPageFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreatePage">>
  > {
    const statement = `subscription OnCreatePage($filter: ModelSubscriptionPageFilterInput) {
        onCreatePage(filter: $filter) {
          __typename
          id
          root_menu
          label
          description
          path
          hidden
          viewer
          public
          articles {
            __typename
            items {
              __typename
              id
              title
              headline
              layout
              body
              date
              directory
              expiry_date
              rank
              pageId
              createdAt
              updatedAt
            }
            nextToken
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
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreatePage">>
    >;
  }

  OnUpdatePageListener(
    filter?: ModelSubscriptionPageFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdatePage">>
  > {
    const statement = `subscription OnUpdatePage($filter: ModelSubscriptionPageFilterInput) {
        onUpdatePage(filter: $filter) {
          __typename
          id
          root_menu
          label
          description
          path
          hidden
          viewer
          public
          articles {
            __typename
            items {
              __typename
              id
              title
              headline
              layout
              body
              date
              directory
              expiry_date
              rank
              pageId
              createdAt
              updatedAt
            }
            nextToken
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
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdatePage">>
    >;
  }

  OnDeletePageListener(
    filter?: ModelSubscriptionPageFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeletePage">>
  > {
    const statement = `subscription OnDeletePage($filter: ModelSubscriptionPageFilterInput) {
        onDeletePage(filter: $filter) {
          __typename
          id
          root_menu
          label
          description
          path
          hidden
          viewer
          public
          articles {
            __typename
            items {
              __typename
              id
              title
              headline
              layout
              body
              date
              directory
              expiry_date
              rank
              pageId
              createdAt
              updatedAt
            }
            nextToken
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
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeletePage">>
    >;
  }

  OnCreatePictureListener(
    filter?: ModelSubscriptionPictureFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreatePicture">>
  > {
    const statement = `subscription OnCreatePicture($filter: ModelSubscriptionPictureFilterInput) {
        onCreatePicture(filter: $filter) {
          __typename
          id
          filename
          orientation
          rank
          articleId
          caption1
          caption2
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
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreatePicture">>
    >;
  }

  OnUpdatePictureListener(
    filter?: ModelSubscriptionPictureFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdatePicture">>
  > {
    const statement = `subscription OnUpdatePicture($filter: ModelSubscriptionPictureFilterInput) {
        onUpdatePicture(filter: $filter) {
          __typename
          id
          filename
          orientation
          rank
          articleId
          caption1
          caption2
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
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdatePicture">>
    >;
  }

  OnDeletePictureListener(
    filter?: ModelSubscriptionPictureFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeletePicture">>
  > {
    const statement = `subscription OnDeletePicture($filter: ModelSubscriptionPictureFilterInput) {
        onDeletePicture(filter: $filter) {
          __typename
          id
          filename
          orientation
          rank
          articleId
          caption1
          caption2
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
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeletePicture">>
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
          headline
          layout
          body
          date
          directory
          expiry_date
          rank
          pictures {
            __typename
            items {
              __typename
              id
              filename
              orientation
              rank
              articleId
              caption1
              caption2
              createdAt
              updatedAt
            }
            nextToken
          }
          pageId
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
          headline
          layout
          body
          date
          directory
          expiry_date
          rank
          pictures {
            __typename
            items {
              __typename
              id
              filename
              orientation
              rank
              articleId
              caption1
              caption2
              createdAt
              updatedAt
            }
            nextToken
          }
          pageId
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
          headline
          layout
          body
          date
          directory
          expiry_date
          rank
          pictures {
            __typename
            items {
              __typename
              id
              filename
              orientation
              rank
              articleId
              caption1
              caption2
              createdAt
              updatedAt
            }
            nextToken
          }
          pageId
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
