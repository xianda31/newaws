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
  onCreateArticle: OnCreateArticleSubscription;
  onUpdateArticle: OnUpdateArticleSubscription;
  onDeleteArticle: OnDeleteArticleSubscription;
  onCreateImage: OnCreateImageSubscription;
  onUpdateImage: OnUpdateImageSubscription;
  onDeleteImage: OnDeleteImageSubscription;
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
};

export type ModelPageConditionInput = {
  root_menu?: ModelStringInput | null;
  label?: ModelStringInput | null;
  description?: ModelStringInput | null;
  path?: ModelStringInput | null;
  hidden?: ModelBooleanInput | null;
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
  permalink: string;
  banner_url: string;
  head_html: string;
  body_html_url: string;
  duedate: string;
  public: boolean;
  pageId: string;
  images?: ModelImageConnection | null;
  page?: Page | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelImageConnection = {
  __typename: "ModelImageConnection";
  items: Array<Image | null>;
  nextToken?: string | null;
};

export type Image = {
  __typename: "Image";
  id: string;
  name: string;
  description: string;
  url: string;
  articleId: string;
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
};

export type DeletePageInput = {
  id: string;
};

export type CreateArticleInput = {
  id?: string | null;
  title: string;
  permalink: string;
  banner_url: string;
  head_html: string;
  body_html_url: string;
  duedate: string;
  public: boolean;
  pageId: string;
};

export type ModelArticleConditionInput = {
  title?: ModelStringInput | null;
  permalink?: ModelStringInput | null;
  banner_url?: ModelStringInput | null;
  head_html?: ModelStringInput | null;
  body_html_url?: ModelStringInput | null;
  duedate?: ModelStringInput | null;
  public?: ModelBooleanInput | null;
  pageId?: ModelIDInput | null;
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
  permalink?: string | null;
  banner_url?: string | null;
  head_html?: string | null;
  body_html_url?: string | null;
  duedate?: string | null;
  public?: boolean | null;
  pageId?: string | null;
};

export type DeleteArticleInput = {
  id: string;
};

export type CreateImageInput = {
  id?: string | null;
  name: string;
  description: string;
  url: string;
  articleId: string;
};

export type ModelImageConditionInput = {
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  url?: ModelStringInput | null;
  articleId?: ModelIDInput | null;
  and?: Array<ModelImageConditionInput | null> | null;
  or?: Array<ModelImageConditionInput | null> | null;
  not?: ModelImageConditionInput | null;
};

export type UpdateImageInput = {
  id: string;
  name?: string | null;
  description?: string | null;
  url?: string | null;
  articleId?: string | null;
};

export type DeleteImageInput = {
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
  and?: Array<ModelPageFilterInput | null> | null;
  or?: Array<ModelPageFilterInput | null> | null;
  not?: ModelPageFilterInput | null;
};

export type ModelPageConnection = {
  __typename: "ModelPageConnection";
  items: Array<Page | null>;
  nextToken?: string | null;
};

export type ModelArticleFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  permalink?: ModelStringInput | null;
  banner_url?: ModelStringInput | null;
  head_html?: ModelStringInput | null;
  body_html_url?: ModelStringInput | null;
  duedate?: ModelStringInput | null;
  public?: ModelBooleanInput | null;
  pageId?: ModelIDInput | null;
  and?: Array<ModelArticleFilterInput | null> | null;
  or?: Array<ModelArticleFilterInput | null> | null;
  not?: ModelArticleFilterInput | null;
};

export type ModelImageFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  url?: ModelStringInput | null;
  articleId?: ModelIDInput | null;
  and?: Array<ModelImageFilterInput | null> | null;
  or?: Array<ModelImageFilterInput | null> | null;
  not?: ModelImageFilterInput | null;
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
  and?: Array<ModelSubscriptionPageFilterInput | null> | null;
  or?: Array<ModelSubscriptionPageFilterInput | null> | null;
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
};

export type ModelSubscriptionArticleFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  title?: ModelSubscriptionStringInput | null;
  permalink?: ModelSubscriptionStringInput | null;
  banner_url?: ModelSubscriptionStringInput | null;
  head_html?: ModelSubscriptionStringInput | null;
  body_html_url?: ModelSubscriptionStringInput | null;
  duedate?: ModelSubscriptionStringInput | null;
  public?: ModelSubscriptionBooleanInput | null;
  pageId?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionArticleFilterInput | null> | null;
  or?: Array<ModelSubscriptionArticleFilterInput | null> | null;
};

export type ModelSubscriptionImageFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  url?: ModelSubscriptionStringInput | null;
  articleId?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionImageFilterInput | null> | null;
  or?: Array<ModelSubscriptionImageFilterInput | null> | null;
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
  articles?: {
    __typename: "ModelArticleConnection";
    items: Array<{
      __typename: "Article";
      id: string;
      title: string;
      permalink: string;
      banner_url: string;
      head_html: string;
      body_html_url: string;
      duedate: string;
      public: boolean;
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
  articles?: {
    __typename: "ModelArticleConnection";
    items: Array<{
      __typename: "Article";
      id: string;
      title: string;
      permalink: string;
      banner_url: string;
      head_html: string;
      body_html_url: string;
      duedate: string;
      public: boolean;
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
  articles?: {
    __typename: "ModelArticleConnection";
    items: Array<{
      __typename: "Article";
      id: string;
      title: string;
      permalink: string;
      banner_url: string;
      head_html: string;
      body_html_url: string;
      duedate: string;
      public: boolean;
      pageId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateArticleMutation = {
  __typename: "Article";
  id: string;
  title: string;
  permalink: string;
  banner_url: string;
  head_html: string;
  body_html_url: string;
  duedate: string;
  public: boolean;
  pageId: string;
  images?: {
    __typename: "ModelImageConnection";
    items: Array<{
      __typename: "Image";
      id: string;
      name: string;
      description: string;
      url: string;
      articleId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  page?: {
    __typename: "Page";
    id: string;
    root_menu: string;
    label: string;
    description: string;
    path: string;
    hidden: boolean;
    articles?: {
      __typename: "ModelArticleConnection";
      nextToken?: string | null;
    } | null;
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
  permalink: string;
  banner_url: string;
  head_html: string;
  body_html_url: string;
  duedate: string;
  public: boolean;
  pageId: string;
  images?: {
    __typename: "ModelImageConnection";
    items: Array<{
      __typename: "Image";
      id: string;
      name: string;
      description: string;
      url: string;
      articleId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  page?: {
    __typename: "Page";
    id: string;
    root_menu: string;
    label: string;
    description: string;
    path: string;
    hidden: boolean;
    articles?: {
      __typename: "ModelArticleConnection";
      nextToken?: string | null;
    } | null;
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
  permalink: string;
  banner_url: string;
  head_html: string;
  body_html_url: string;
  duedate: string;
  public: boolean;
  pageId: string;
  images?: {
    __typename: "ModelImageConnection";
    items: Array<{
      __typename: "Image";
      id: string;
      name: string;
      description: string;
      url: string;
      articleId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  page?: {
    __typename: "Page";
    id: string;
    root_menu: string;
    label: string;
    description: string;
    path: string;
    hidden: boolean;
    articles?: {
      __typename: "ModelArticleConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateImageMutation = {
  __typename: "Image";
  id: string;
  name: string;
  description: string;
  url: string;
  articleId: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateImageMutation = {
  __typename: "Image";
  id: string;
  name: string;
  description: string;
  url: string;
  articleId: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteImageMutation = {
  __typename: "Image";
  id: string;
  name: string;
  description: string;
  url: string;
  articleId: string;
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
  articles?: {
    __typename: "ModelArticleConnection";
    items: Array<{
      __typename: "Article";
      id: string;
      title: string;
      permalink: string;
      banner_url: string;
      head_html: string;
      body_html_url: string;
      duedate: string;
      public: boolean;
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
    articles?: {
      __typename: "ModelArticleConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetArticleQuery = {
  __typename: "Article";
  id: string;
  title: string;
  permalink: string;
  banner_url: string;
  head_html: string;
  body_html_url: string;
  duedate: string;
  public: boolean;
  pageId: string;
  images?: {
    __typename: "ModelImageConnection";
    items: Array<{
      __typename: "Image";
      id: string;
      name: string;
      description: string;
      url: string;
      articleId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  page?: {
    __typename: "Page";
    id: string;
    root_menu: string;
    label: string;
    description: string;
    path: string;
    hidden: boolean;
    articles?: {
      __typename: "ModelArticleConnection";
      nextToken?: string | null;
    } | null;
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
    permalink: string;
    banner_url: string;
    head_html: string;
    body_html_url: string;
    duedate: string;
    public: boolean;
    pageId: string;
    images?: {
      __typename: "ModelImageConnection";
      nextToken?: string | null;
    } | null;
    page?: {
      __typename: "Page";
      id: string;
      root_menu: string;
      label: string;
      description: string;
      path: string;
      hidden: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetImageQuery = {
  __typename: "Image";
  id: string;
  name: string;
  description: string;
  url: string;
  articleId: string;
  createdAt: string;
  updatedAt: string;
};

export type ListImagesQuery = {
  __typename: "ModelImageConnection";
  items: Array<{
    __typename: "Image";
    id: string;
    name: string;
    description: string;
    url: string;
    articleId: string;
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
    permalink: string;
    banner_url: string;
    head_html: string;
    body_html_url: string;
    duedate: string;
    public: boolean;
    pageId: string;
    images?: {
      __typename: "ModelImageConnection";
      nextToken?: string | null;
    } | null;
    page?: {
      __typename: "Page";
      id: string;
      root_menu: string;
      label: string;
      description: string;
      path: string;
      hidden: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type ImagesByArticleIdQuery = {
  __typename: "ModelImageConnection";
  items: Array<{
    __typename: "Image";
    id: string;
    name: string;
    description: string;
    url: string;
    articleId: string;
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
  articles?: {
    __typename: "ModelArticleConnection";
    items: Array<{
      __typename: "Article";
      id: string;
      title: string;
      permalink: string;
      banner_url: string;
      head_html: string;
      body_html_url: string;
      duedate: string;
      public: boolean;
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
  articles?: {
    __typename: "ModelArticleConnection";
    items: Array<{
      __typename: "Article";
      id: string;
      title: string;
      permalink: string;
      banner_url: string;
      head_html: string;
      body_html_url: string;
      duedate: string;
      public: boolean;
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
  articles?: {
    __typename: "ModelArticleConnection";
    items: Array<{
      __typename: "Article";
      id: string;
      title: string;
      permalink: string;
      banner_url: string;
      head_html: string;
      body_html_url: string;
      duedate: string;
      public: boolean;
      pageId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateArticleSubscription = {
  __typename: "Article";
  id: string;
  title: string;
  permalink: string;
  banner_url: string;
  head_html: string;
  body_html_url: string;
  duedate: string;
  public: boolean;
  pageId: string;
  images?: {
    __typename: "ModelImageConnection";
    items: Array<{
      __typename: "Image";
      id: string;
      name: string;
      description: string;
      url: string;
      articleId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  page?: {
    __typename: "Page";
    id: string;
    root_menu: string;
    label: string;
    description: string;
    path: string;
    hidden: boolean;
    articles?: {
      __typename: "ModelArticleConnection";
      nextToken?: string | null;
    } | null;
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
  permalink: string;
  banner_url: string;
  head_html: string;
  body_html_url: string;
  duedate: string;
  public: boolean;
  pageId: string;
  images?: {
    __typename: "ModelImageConnection";
    items: Array<{
      __typename: "Image";
      id: string;
      name: string;
      description: string;
      url: string;
      articleId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  page?: {
    __typename: "Page";
    id: string;
    root_menu: string;
    label: string;
    description: string;
    path: string;
    hidden: boolean;
    articles?: {
      __typename: "ModelArticleConnection";
      nextToken?: string | null;
    } | null;
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
  permalink: string;
  banner_url: string;
  head_html: string;
  body_html_url: string;
  duedate: string;
  public: boolean;
  pageId: string;
  images?: {
    __typename: "ModelImageConnection";
    items: Array<{
      __typename: "Image";
      id: string;
      name: string;
      description: string;
      url: string;
      articleId: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  page?: {
    __typename: "Page";
    id: string;
    root_menu: string;
    label: string;
    description: string;
    path: string;
    hidden: boolean;
    articles?: {
      __typename: "ModelArticleConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateImageSubscription = {
  __typename: "Image";
  id: string;
  name: string;
  description: string;
  url: string;
  articleId: string;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateImageSubscription = {
  __typename: "Image";
  id: string;
  name: string;
  description: string;
  url: string;
  articleId: string;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteImageSubscription = {
  __typename: "Image";
  id: string;
  name: string;
  description: string;
  url: string;
  articleId: string;
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
          articles {
            __typename
            items {
              __typename
              id
              title
              permalink
              banner_url
              head_html
              body_html_url
              duedate
              public
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
          articles {
            __typename
            items {
              __typename
              id
              title
              permalink
              banner_url
              head_html
              body_html_url
              duedate
              public
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
          articles {
            __typename
            items {
              __typename
              id
              title
              permalink
              banner_url
              head_html
              body_html_url
              duedate
              public
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
  async CreateArticle(
    input: CreateArticleInput,
    condition?: ModelArticleConditionInput
  ): Promise<CreateArticleMutation> {
    const statement = `mutation CreateArticle($input: CreateArticleInput!, $condition: ModelArticleConditionInput) {
        createArticle(input: $input, condition: $condition) {
          __typename
          id
          title
          permalink
          banner_url
          head_html
          body_html_url
          duedate
          public
          pageId
          images {
            __typename
            items {
              __typename
              id
              name
              description
              url
              articleId
              createdAt
              updatedAt
            }
            nextToken
          }
          page {
            __typename
            id
            root_menu
            label
            description
            path
            hidden
            articles {
              __typename
              nextToken
            }
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
          permalink
          banner_url
          head_html
          body_html_url
          duedate
          public
          pageId
          images {
            __typename
            items {
              __typename
              id
              name
              description
              url
              articleId
              createdAt
              updatedAt
            }
            nextToken
          }
          page {
            __typename
            id
            root_menu
            label
            description
            path
            hidden
            articles {
              __typename
              nextToken
            }
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
          permalink
          banner_url
          head_html
          body_html_url
          duedate
          public
          pageId
          images {
            __typename
            items {
              __typename
              id
              name
              description
              url
              articleId
              createdAt
              updatedAt
            }
            nextToken
          }
          page {
            __typename
            id
            root_menu
            label
            description
            path
            hidden
            articles {
              __typename
              nextToken
            }
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
  async CreateImage(
    input: CreateImageInput,
    condition?: ModelImageConditionInput
  ): Promise<CreateImageMutation> {
    const statement = `mutation CreateImage($input: CreateImageInput!, $condition: ModelImageConditionInput) {
        createImage(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          url
          articleId
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
    return <CreateImageMutation>response.data.createImage;
  }
  async UpdateImage(
    input: UpdateImageInput,
    condition?: ModelImageConditionInput
  ): Promise<UpdateImageMutation> {
    const statement = `mutation UpdateImage($input: UpdateImageInput!, $condition: ModelImageConditionInput) {
        updateImage(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          url
          articleId
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
    return <UpdateImageMutation>response.data.updateImage;
  }
  async DeleteImage(
    input: DeleteImageInput,
    condition?: ModelImageConditionInput
  ): Promise<DeleteImageMutation> {
    const statement = `mutation DeleteImage($input: DeleteImageInput!, $condition: ModelImageConditionInput) {
        deleteImage(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          url
          articleId
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
    return <DeleteImageMutation>response.data.deleteImage;
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
          articles {
            __typename
            items {
              __typename
              id
              title
              permalink
              banner_url
              head_html
              body_html_url
              duedate
              public
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
            articles {
              __typename
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
  async GetArticle(id: string): Promise<GetArticleQuery> {
    const statement = `query GetArticle($id: ID!) {
        getArticle(id: $id) {
          __typename
          id
          title
          permalink
          banner_url
          head_html
          body_html_url
          duedate
          public
          pageId
          images {
            __typename
            items {
              __typename
              id
              name
              description
              url
              articleId
              createdAt
              updatedAt
            }
            nextToken
          }
          page {
            __typename
            id
            root_menu
            label
            description
            path
            hidden
            articles {
              __typename
              nextToken
            }
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
            permalink
            banner_url
            head_html
            body_html_url
            duedate
            public
            pageId
            images {
              __typename
              nextToken
            }
            page {
              __typename
              id
              root_menu
              label
              description
              path
              hidden
              createdAt
              updatedAt
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
    return <ListArticlesQuery>response.data.listArticles;
  }
  async GetImage(id: string): Promise<GetImageQuery> {
    const statement = `query GetImage($id: ID!) {
        getImage(id: $id) {
          __typename
          id
          name
          description
          url
          articleId
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
    return <GetImageQuery>response.data.getImage;
  }
  async ListImages(
    filter?: ModelImageFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListImagesQuery> {
    const statement = `query ListImages($filter: ModelImageFilterInput, $limit: Int, $nextToken: String) {
        listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            description
            url
            articleId
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
    return <ListImagesQuery>response.data.listImages;
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
            permalink
            banner_url
            head_html
            body_html_url
            duedate
            public
            pageId
            images {
              __typename
              nextToken
            }
            page {
              __typename
              id
              root_menu
              label
              description
              path
              hidden
              createdAt
              updatedAt
            }
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
  async ImagesByArticleId(
    articleId: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelImageFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ImagesByArticleIdQuery> {
    const statement = `query ImagesByArticleId($articleId: ID!, $sortDirection: ModelSortDirection, $filter: ModelImageFilterInput, $limit: Int, $nextToken: String) {
        imagesByArticleId(
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
            name
            description
            url
            articleId
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
    return <ImagesByArticleIdQuery>response.data.imagesByArticleId;
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
          articles {
            __typename
            items {
              __typename
              id
              title
              permalink
              banner_url
              head_html
              body_html_url
              duedate
              public
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
          articles {
            __typename
            items {
              __typename
              id
              title
              permalink
              banner_url
              head_html
              body_html_url
              duedate
              public
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
          articles {
            __typename
            items {
              __typename
              id
              title
              permalink
              banner_url
              head_html
              body_html_url
              duedate
              public
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
          permalink
          banner_url
          head_html
          body_html_url
          duedate
          public
          pageId
          images {
            __typename
            items {
              __typename
              id
              name
              description
              url
              articleId
              createdAt
              updatedAt
            }
            nextToken
          }
          page {
            __typename
            id
            root_menu
            label
            description
            path
            hidden
            articles {
              __typename
              nextToken
            }
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
          permalink
          banner_url
          head_html
          body_html_url
          duedate
          public
          pageId
          images {
            __typename
            items {
              __typename
              id
              name
              description
              url
              articleId
              createdAt
              updatedAt
            }
            nextToken
          }
          page {
            __typename
            id
            root_menu
            label
            description
            path
            hidden
            articles {
              __typename
              nextToken
            }
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
          permalink
          banner_url
          head_html
          body_html_url
          duedate
          public
          pageId
          images {
            __typename
            items {
              __typename
              id
              name
              description
              url
              articleId
              createdAt
              updatedAt
            }
            nextToken
          }
          page {
            __typename
            id
            root_menu
            label
            description
            path
            hidden
            articles {
              __typename
              nextToken
            }
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

  OnCreateImageListener(
    filter?: ModelSubscriptionImageFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateImage">>
  > {
    const statement = `subscription OnCreateImage($filter: ModelSubscriptionImageFilterInput) {
        onCreateImage(filter: $filter) {
          __typename
          id
          name
          description
          url
          articleId
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
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateImage">>
    >;
  }

  OnUpdateImageListener(
    filter?: ModelSubscriptionImageFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateImage">>
  > {
    const statement = `subscription OnUpdateImage($filter: ModelSubscriptionImageFilterInput) {
        onUpdateImage(filter: $filter) {
          __typename
          id
          name
          description
          url
          articleId
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
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateImage">>
    >;
  }

  OnDeleteImageListener(
    filter?: ModelSubscriptionImageFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteImage">>
  > {
    const statement = `subscription OnDeleteImage($filter: ModelSubscriptionImageFilterInput) {
        onDeleteImage(filter: $filter) {
          __typename
          id
          name
          description
          url
          articleId
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
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteImage">>
    >;
  }
}
