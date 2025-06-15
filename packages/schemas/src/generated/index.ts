import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const BinScalarFieldEnumSchema = z.enum(['id','binId','title','description','content','language','views','expiresAt','createdAt','updatedAt','isPrivate','password','authorId']);

export const UserScalarFieldEnumSchema = z.enum(['clerkUserId','email','username','avatarUrl','createdAt','updatedAt']);

export const CommentScalarFieldEnumSchema = z.enum(['id','content','createdAt','updatedAt','authorId','targetId','targetType']);

export const ReportScalarFieldEnumSchema = z.enum(['id','reason','createdAt','updatedAt','authorId','targetType','targetId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const CommentTargetTypeSchema = z.enum(['bin','profile']);

export type CommentTargetTypeType = `${z.infer<typeof CommentTargetTypeSchema>}`

export const ReportTargetTypeSchema = z.enum(['bin','user','comment']);

export type ReportTargetTypeType = `${z.infer<typeof ReportTargetTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// BIN SCHEMA
/////////////////////////////////////////

export const BinSchema = z.object({
  id: z.string().cuid(),
  binId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  content: z.string(),
  language: z.string(),
  views: z.number().int(),
  expiresAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  isPrivate: z.boolean(),
  password: z.string().nullable(),
  authorId: z.string().nullable(),
})

export type Bin = z.infer<typeof BinSchema>

// BIN RELATION SCHEMA
//------------------------------------------------------

export type BinRelations = {
  author?: UserWithRelations | null;
};

export type BinWithRelations = z.infer<typeof BinSchema> & BinRelations

export const BinWithRelationsSchema: z.ZodType<BinWithRelations> = BinSchema.merge(z.object({
  author: z.lazy(() => UserWithRelationsSchema).nullable(),
}))

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  clerkUserId: z.string(),
  email: z.string(),
  username: z.string(),
  avatarUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  bins: BinWithRelations[];
  comments: CommentWithRelations[];
  reports: ReportWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  bins: z.lazy(() => BinWithRelationsSchema).array(),
  comments: z.lazy(() => CommentWithRelationsSchema).array(),
  reports: z.lazy(() => ReportWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  targetType: CommentTargetTypeSchema,
  id: z.string().cuid(),
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
  authorId: z.string(),
  targetId: z.string(),
})

export type Comment = z.infer<typeof CommentSchema>

// COMMENT RELATION SCHEMA
//------------------------------------------------------

export type CommentRelations = {
  author: UserWithRelations;
};

export type CommentWithRelations = z.infer<typeof CommentSchema> & CommentRelations

export const CommentWithRelationsSchema: z.ZodType<CommentWithRelations> = CommentSchema.merge(z.object({
  author: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// REPORT SCHEMA
/////////////////////////////////////////

export const ReportSchema = z.object({
  targetType: ReportTargetTypeSchema,
  id: z.string().cuid(),
  reason: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  authorId: z.string(),
  targetId: z.string(),
})

export type Report = z.infer<typeof ReportSchema>

// REPORT RELATION SCHEMA
//------------------------------------------------------

export type ReportRelations = {
  author: UserWithRelations;
};

export type ReportWithRelations = z.infer<typeof ReportSchema> & ReportRelations

export const ReportWithRelationsSchema: z.ZodType<ReportWithRelations> = ReportSchema.merge(z.object({
  author: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// BIN
//------------------------------------------------------

export const BinIncludeSchema: z.ZodType<Prisma.BinInclude> = z.object({
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const BinArgsSchema: z.ZodType<Prisma.BinDefaultArgs> = z.object({
  select: z.lazy(() => BinSelectSchema).optional(),
  include: z.lazy(() => BinIncludeSchema).optional(),
}).strict();

export const BinSelectSchema: z.ZodType<Prisma.BinSelect> = z.object({
  id: z.boolean().optional(),
  binId: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  content: z.boolean().optional(),
  language: z.boolean().optional(),
  views: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  isPrivate: z.boolean().optional(),
  password: z.boolean().optional(),
  authorId: z.boolean().optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  bins: z.union([z.boolean(),z.lazy(() => BinFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  reports: z.union([z.boolean(),z.lazy(() => ReportFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  bins: z.boolean().optional(),
  comments: z.boolean().optional(),
  reports: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  clerkUserId: z.boolean().optional(),
  email: z.boolean().optional(),
  username: z.boolean().optional(),
  avatarUrl: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  bins: z.union([z.boolean(),z.lazy(() => BinFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  reports: z.union([z.boolean(),z.lazy(() => ReportFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z.object({
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const CommentArgsSchema: z.ZodType<Prisma.CommentDefaultArgs> = z.object({
  select: z.lazy(() => CommentSelectSchema).optional(),
  include: z.lazy(() => CommentIncludeSchema).optional(),
}).strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  authorId: z.boolean().optional(),
  targetId: z.boolean().optional(),
  targetType: z.boolean().optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// REPORT
//------------------------------------------------------

export const ReportIncludeSchema: z.ZodType<Prisma.ReportInclude> = z.object({
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ReportArgsSchema: z.ZodType<Prisma.ReportDefaultArgs> = z.object({
  select: z.lazy(() => ReportSelectSchema).optional(),
  include: z.lazy(() => ReportIncludeSchema).optional(),
}).strict();

export const ReportSelectSchema: z.ZodType<Prisma.ReportSelect> = z.object({
  id: z.boolean().optional(),
  reason: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  authorId: z.boolean().optional(),
  targetType: z.boolean().optional(),
  targetId: z.boolean().optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const BinWhereInputSchema: z.ZodType<Prisma.BinWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BinWhereInputSchema),z.lazy(() => BinWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BinWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BinWhereInputSchema),z.lazy(() => BinWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  binId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  views: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isPrivate: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  author: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const BinOrderByWithRelationInputSchema: z.ZodType<Prisma.BinOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  binId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  authorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const BinWhereUniqueInputSchema: z.ZodType<Prisma.BinWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    binId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    binId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  binId: z.string().optional(),
  AND: z.union([ z.lazy(() => BinWhereInputSchema),z.lazy(() => BinWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BinWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BinWhereInputSchema),z.lazy(() => BinWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  views: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isPrivate: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  author: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const BinOrderByWithAggregationInputSchema: z.ZodType<Prisma.BinOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  binId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  authorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => BinCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BinAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BinMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BinMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BinSumOrderByAggregateInputSchema).optional()
}).strict();

export const BinScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BinScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BinScalarWhereWithAggregatesInputSchema),z.lazy(() => BinScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BinScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BinScalarWhereWithAggregatesInputSchema),z.lazy(() => BinScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  binId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  views: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  isPrivate: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  clerkUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bins: z.lazy(() => BinListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  reports: z.lazy(() => ReportListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  clerkUserId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  bins: z.lazy(() => BinOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  reports: z.lazy(() => ReportOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    clerkUserId: z.string(),
    email: z.string(),
    username: z.string()
  }),
  z.object({
    clerkUserId: z.string(),
    email: z.string(),
  }),
  z.object({
    clerkUserId: z.string(),
    username: z.string(),
  }),
  z.object({
    clerkUserId: z.string(),
  }),
  z.object({
    email: z.string(),
    username: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    username: z.string(),
  }),
])
.and(z.object({
  clerkUserId: z.string().optional(),
  email: z.string().optional(),
  username: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bins: z.lazy(() => BinListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  reports: z.lazy(() => ReportListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  clerkUserId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  clerkUserId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  avatarUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetType: z.union([ z.lazy(() => EnumCommentTargetTypeFilterSchema),z.lazy(() => CommentTargetTypeSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetType: z.union([ z.lazy(() => EnumCommentTargetTypeFilterSchema),z.lazy(() => CommentTargetTypeSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentMinOrderByAggregateInputSchema).optional()
}).strict();

export const CommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  targetId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  targetType: z.union([ z.lazy(() => EnumCommentTargetTypeWithAggregatesFilterSchema),z.lazy(() => CommentTargetTypeSchema) ]).optional(),
}).strict();

export const ReportWhereInputSchema: z.ZodType<Prisma.ReportWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reason: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetType: z.union([ z.lazy(() => EnumReportTargetTypeFilterSchema),z.lazy(() => ReportTargetTypeSchema) ]).optional(),
  targetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const ReportOrderByWithRelationInputSchema: z.ZodType<Prisma.ReportOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reason: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ReportWhereUniqueInputSchema: z.ZodType<Prisma.ReportWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  reason: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetType: z.union([ z.lazy(() => EnumReportTargetTypeFilterSchema),z.lazy(() => ReportTargetTypeSchema) ]).optional(),
  targetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const ReportOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReportOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reason: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReportCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReportMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReportMinOrderByAggregateInputSchema).optional()
}).strict();

export const ReportScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReportScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reason: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  targetType: z.union([ z.lazy(() => EnumReportTargetTypeWithAggregatesFilterSchema),z.lazy(() => ReportTargetTypeSchema) ]).optional(),
  targetId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const BinCreateInputSchema: z.ZodType<Prisma.BinCreateInput> = z.object({
  id: z.string().cuid().optional(),
  binId: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  content: z.string(),
  language: z.string(),
  views: z.number().int().optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isPrivate: z.boolean().optional(),
  password: z.string().optional().nullable(),
  author: z.lazy(() => UserCreateNestedOneWithoutBinsInputSchema).optional()
}).strict();

export const BinUncheckedCreateInputSchema: z.ZodType<Prisma.BinUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  binId: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  content: z.string(),
  language: z.string(),
  views: z.number().int().optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isPrivate: z.boolean().optional(),
  password: z.string().optional().nullable(),
  authorId: z.string().optional().nullable()
}).strict();

export const BinUpdateInputSchema: z.ZodType<Prisma.BinUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  binId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  author: z.lazy(() => UserUpdateOneWithoutBinsNestedInputSchema).optional()
}).strict();

export const BinUncheckedUpdateInputSchema: z.ZodType<Prisma.BinUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  binId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BinCreateManyInputSchema: z.ZodType<Prisma.BinCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  binId: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  content: z.string(),
  language: z.string(),
  views: z.number().int().optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isPrivate: z.boolean().optional(),
  password: z.string().optional().nullable(),
  authorId: z.string().optional().nullable()
}).strict();

export const BinUpdateManyMutationInputSchema: z.ZodType<Prisma.BinUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  binId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BinUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BinUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  binId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  clerkUserId: z.string(),
  email: z.string(),
  username: z.string(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bins: z.lazy(() => BinCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  reports: z.lazy(() => ReportCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  clerkUserId: z.string(),
  email: z.string(),
  username: z.string(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bins: z.lazy(() => BinUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  reports: z.lazy(() => ReportUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bins: z.lazy(() => BinUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  reports: z.lazy(() => ReportUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bins: z.lazy(() => BinUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  reports: z.lazy(() => ReportUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  clerkUserId: z.string(),
  email: z.string(),
  username: z.string(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  targetId: z.string(),
  targetType: z.lazy(() => CommentTargetTypeSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  authorId: z.string(),
  targetId: z.string(),
  targetType: z.lazy(() => CommentTargetTypeSchema)
}).strict();

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => CommentTargetTypeSchema),z.lazy(() => EnumCommentTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => CommentTargetTypeSchema),z.lazy(() => EnumCommentTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  authorId: z.string(),
  targetId: z.string(),
  targetType: z.lazy(() => CommentTargetTypeSchema)
}).strict();

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => CommentTargetTypeSchema),z.lazy(() => EnumCommentTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => CommentTargetTypeSchema),z.lazy(() => EnumCommentTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportCreateInputSchema: z.ZodType<Prisma.ReportCreateInput> = z.object({
  id: z.string().cuid().optional(),
  reason: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  targetType: z.lazy(() => ReportTargetTypeSchema),
  targetId: z.string(),
  author: z.lazy(() => UserCreateNestedOneWithoutReportsInputSchema)
}).strict();

export const ReportUncheckedCreateInputSchema: z.ZodType<Prisma.ReportUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  reason: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  targetType: z.lazy(() => ReportTargetTypeSchema),
  targetId: z.string()
}).strict();

export const ReportUpdateInputSchema: z.ZodType<Prisma.ReportUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => ReportTargetTypeSchema),z.lazy(() => EnumReportTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutReportsNestedInputSchema).optional()
}).strict();

export const ReportUncheckedUpdateInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => ReportTargetTypeSchema),z.lazy(() => EnumReportTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportCreateManyInputSchema: z.ZodType<Prisma.ReportCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  reason: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  targetType: z.lazy(() => ReportTargetTypeSchema),
  targetId: z.string()
}).strict();

export const ReportUpdateManyMutationInputSchema: z.ZodType<Prisma.ReportUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => ReportTargetTypeSchema),z.lazy(() => EnumReportTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => ReportTargetTypeSchema),z.lazy(() => EnumReportTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const UserNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const BinCountOrderByAggregateInputSchema: z.ZodType<Prisma.BinCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  binId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BinAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BinAvgOrderByAggregateInput> = z.object({
  views: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BinMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BinMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  binId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BinMinOrderByAggregateInputSchema: z.ZodType<Prisma.BinMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  binId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  views: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BinSumOrderByAggregateInputSchema: z.ZodType<Prisma.BinSumOrderByAggregateInput> = z.object({
  views: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const BinListRelationFilterSchema: z.ZodType<Prisma.BinListRelationFilter> = z.object({
  every: z.lazy(() => BinWhereInputSchema).optional(),
  some: z.lazy(() => BinWhereInputSchema).optional(),
  none: z.lazy(() => BinWhereInputSchema).optional()
}).strict();

export const CommentListRelationFilterSchema: z.ZodType<Prisma.CommentListRelationFilter> = z.object({
  every: z.lazy(() => CommentWhereInputSchema).optional(),
  some: z.lazy(() => CommentWhereInputSchema).optional(),
  none: z.lazy(() => CommentWhereInputSchema).optional()
}).strict();

export const ReportListRelationFilterSchema: z.ZodType<Prisma.ReportListRelationFilter> = z.object({
  every: z.lazy(() => ReportWhereInputSchema).optional(),
  some: z.lazy(() => ReportWhereInputSchema).optional(),
  none: z.lazy(() => ReportWhereInputSchema).optional()
}).strict();

export const BinOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BinOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReportOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  clerkUserId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  clerkUserId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  clerkUserId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumCommentTargetTypeFilterSchema: z.ZodType<Prisma.EnumCommentTargetTypeFilter> = z.object({
  equals: z.lazy(() => CommentTargetTypeSchema).optional(),
  in: z.lazy(() => CommentTargetTypeSchema).array().optional(),
  notIn: z.lazy(() => CommentTargetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => CommentTargetTypeSchema),z.lazy(() => NestedEnumCommentTargetTypeFilterSchema) ]).optional(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumCommentTargetTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumCommentTargetTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CommentTargetTypeSchema).optional(),
  in: z.lazy(() => CommentTargetTypeSchema).array().optional(),
  notIn: z.lazy(() => CommentTargetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => CommentTargetTypeSchema),z.lazy(() => NestedEnumCommentTargetTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCommentTargetTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCommentTargetTypeFilterSchema).optional()
}).strict();

export const EnumReportTargetTypeFilterSchema: z.ZodType<Prisma.EnumReportTargetTypeFilter> = z.object({
  equals: z.lazy(() => ReportTargetTypeSchema).optional(),
  in: z.lazy(() => ReportTargetTypeSchema).array().optional(),
  notIn: z.lazy(() => ReportTargetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportTargetTypeSchema),z.lazy(() => NestedEnumReportTargetTypeFilterSchema) ]).optional(),
}).strict();

export const ReportCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReportCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reason: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reason: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reason: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  targetType: z.lazy(() => SortOrderSchema).optional(),
  targetId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumReportTargetTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumReportTargetTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReportTargetTypeSchema).optional(),
  in: z.lazy(() => ReportTargetTypeSchema).array().optional(),
  notIn: z.lazy(() => ReportTargetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportTargetTypeSchema),z.lazy(() => NestedEnumReportTargetTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReportTargetTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReportTargetTypeFilterSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutBinsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBinsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBinsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBinsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBinsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneWithoutBinsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutBinsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBinsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBinsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBinsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBinsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutBinsInputSchema),z.lazy(() => UserUpdateWithoutBinsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBinsInputSchema) ]).optional(),
}).strict();

export const BinCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.BinCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => BinCreateWithoutAuthorInputSchema),z.lazy(() => BinCreateWithoutAuthorInputSchema).array(),z.lazy(() => BinUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => BinUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BinCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => BinCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BinCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BinWhereUniqueInputSchema),z.lazy(() => BinWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReportCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.ReportCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutAuthorInputSchema),z.lazy(() => ReportCreateWithoutAuthorInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => ReportUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => ReportCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BinUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.BinUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => BinCreateWithoutAuthorInputSchema),z.lazy(() => BinCreateWithoutAuthorInputSchema).array(),z.lazy(() => BinUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => BinUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BinCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => BinCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BinCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BinWhereUniqueInputSchema),z.lazy(() => BinWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReportUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.ReportUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutAuthorInputSchema),z.lazy(() => ReportCreateWithoutAuthorInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => ReportUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => ReportCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BinUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.BinUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => BinCreateWithoutAuthorInputSchema),z.lazy(() => BinCreateWithoutAuthorInputSchema).array(),z.lazy(() => BinUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => BinUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BinCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => BinCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BinUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => BinUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BinCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BinWhereUniqueInputSchema),z.lazy(() => BinWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BinWhereUniqueInputSchema),z.lazy(() => BinWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BinWhereUniqueInputSchema),z.lazy(() => BinWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BinWhereUniqueInputSchema),z.lazy(() => BinWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BinUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => BinUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BinUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => BinUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BinScalarWhereInputSchema),z.lazy(() => BinScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReportUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.ReportUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutAuthorInputSchema),z.lazy(() => ReportCreateWithoutAuthorInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => ReportUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => ReportCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => ReportUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => ReportUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => ReportUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BinUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.BinUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => BinCreateWithoutAuthorInputSchema),z.lazy(() => BinCreateWithoutAuthorInputSchema).array(),z.lazy(() => BinUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => BinUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BinCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => BinCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BinUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => BinUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BinCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BinWhereUniqueInputSchema),z.lazy(() => BinWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BinWhereUniqueInputSchema),z.lazy(() => BinWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BinWhereUniqueInputSchema),z.lazy(() => BinWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BinWhereUniqueInputSchema),z.lazy(() => BinWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BinUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => BinUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BinUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => BinUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BinScalarWhereInputSchema),z.lazy(() => BinScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReportUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutAuthorInputSchema),z.lazy(() => ReportCreateWithoutAuthorInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => ReportUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => ReportCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => ReportUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => ReportUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => ReportUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumCommentTargetTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumCommentTargetTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => CommentTargetTypeSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutReportsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReportsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReportsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReportsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumReportTargetTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumReportTargetTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ReportTargetTypeSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutReportsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReportsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReportsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReportsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReportsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReportsInputSchema),z.lazy(() => UserUpdateWithoutReportsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReportsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumCommentTargetTypeFilterSchema: z.ZodType<Prisma.NestedEnumCommentTargetTypeFilter> = z.object({
  equals: z.lazy(() => CommentTargetTypeSchema).optional(),
  in: z.lazy(() => CommentTargetTypeSchema).array().optional(),
  notIn: z.lazy(() => CommentTargetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => CommentTargetTypeSchema),z.lazy(() => NestedEnumCommentTargetTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumCommentTargetTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumCommentTargetTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CommentTargetTypeSchema).optional(),
  in: z.lazy(() => CommentTargetTypeSchema).array().optional(),
  notIn: z.lazy(() => CommentTargetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => CommentTargetTypeSchema),z.lazy(() => NestedEnumCommentTargetTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCommentTargetTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCommentTargetTypeFilterSchema).optional()
}).strict();

export const NestedEnumReportTargetTypeFilterSchema: z.ZodType<Prisma.NestedEnumReportTargetTypeFilter> = z.object({
  equals: z.lazy(() => ReportTargetTypeSchema).optional(),
  in: z.lazy(() => ReportTargetTypeSchema).array().optional(),
  notIn: z.lazy(() => ReportTargetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportTargetTypeSchema),z.lazy(() => NestedEnumReportTargetTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumReportTargetTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumReportTargetTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReportTargetTypeSchema).optional(),
  in: z.lazy(() => ReportTargetTypeSchema).array().optional(),
  notIn: z.lazy(() => ReportTargetTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportTargetTypeSchema),z.lazy(() => NestedEnumReportTargetTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReportTargetTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReportTargetTypeFilterSchema).optional()
}).strict();

export const UserCreateWithoutBinsInputSchema: z.ZodType<Prisma.UserCreateWithoutBinsInput> = z.object({
  clerkUserId: z.string(),
  email: z.string(),
  username: z.string(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  reports: z.lazy(() => ReportCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutBinsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBinsInput> = z.object({
  clerkUserId: z.string(),
  email: z.string(),
  username: z.string(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  reports: z.lazy(() => ReportUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutBinsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBinsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBinsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBinsInputSchema) ]),
}).strict();

export const UserUpsertWithoutBinsInputSchema: z.ZodType<Prisma.UserUpsertWithoutBinsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutBinsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBinsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBinsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBinsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutBinsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBinsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutBinsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBinsInputSchema) ]),
}).strict();

export const UserUpdateWithoutBinsInputSchema: z.ZodType<Prisma.UserUpdateWithoutBinsInput> = z.object({
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  reports: z.lazy(() => ReportUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutBinsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBinsInput> = z.object({
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  reports: z.lazy(() => ReportUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const BinCreateWithoutAuthorInputSchema: z.ZodType<Prisma.BinCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  binId: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  content: z.string(),
  language: z.string(),
  views: z.number().int().optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isPrivate: z.boolean().optional(),
  password: z.string().optional().nullable()
}).strict();

export const BinUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.BinUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  binId: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  content: z.string(),
  language: z.string(),
  views: z.number().int().optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isPrivate: z.boolean().optional(),
  password: z.string().optional().nullable()
}).strict();

export const BinCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.BinCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => BinWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BinCreateWithoutAuthorInputSchema),z.lazy(() => BinUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const BinCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.BinCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BinCreateManyAuthorInputSchema),z.lazy(() => BinCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  targetId: z.string(),
  targetType: z.lazy(() => CommentTargetTypeSchema)
}).strict();

export const CommentUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  targetId: z.string(),
  targetType: z.lazy(() => CommentTargetTypeSchema)
}).strict();

export const CommentCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const CommentCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyAuthorInputSchema),z.lazy(() => CommentCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReportCreateWithoutAuthorInputSchema: z.ZodType<Prisma.ReportCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  reason: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  targetType: z.lazy(() => ReportTargetTypeSchema),
  targetId: z.string()
}).strict();

export const ReportUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.ReportUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  reason: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  targetType: z.lazy(() => ReportTargetTypeSchema),
  targetId: z.string()
}).strict();

export const ReportCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.ReportCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportCreateWithoutAuthorInputSchema),z.lazy(() => ReportUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const ReportCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.ReportCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReportCreateManyAuthorInputSchema),z.lazy(() => ReportCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BinUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.BinUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => BinWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BinUpdateWithoutAuthorInputSchema),z.lazy(() => BinUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => BinCreateWithoutAuthorInputSchema),z.lazy(() => BinUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const BinUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.BinUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => BinWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BinUpdateWithoutAuthorInputSchema),z.lazy(() => BinUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const BinUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.BinUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => BinScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BinUpdateManyMutationInputSchema),z.lazy(() => BinUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const BinScalarWhereInputSchema: z.ZodType<Prisma.BinScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BinScalarWhereInputSchema),z.lazy(() => BinScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BinScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BinScalarWhereInputSchema),z.lazy(() => BinScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  binId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  views: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isPrivate: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetType: z.union([ z.lazy(() => EnumCommentTargetTypeFilterSchema),z.lazy(() => CommentTargetTypeSchema) ]).optional(),
}).strict();

export const ReportUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.ReportUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReportUpdateWithoutAuthorInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => ReportCreateWithoutAuthorInputSchema),z.lazy(() => ReportUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const ReportUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.ReportUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReportUpdateWithoutAuthorInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const ReportUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.ReportUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => ReportScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReportUpdateManyMutationInputSchema),z.lazy(() => ReportUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const ReportScalarWhereInputSchema: z.ZodType<Prisma.ReportScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reason: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  targetType: z.union([ z.lazy(() => EnumReportTargetTypeFilterSchema),z.lazy(() => ReportTargetTypeSchema) ]).optional(),
  targetId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentsInput> = z.object({
  clerkUserId: z.string(),
  email: z.string(),
  username: z.string(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bins: z.lazy(() => BinCreateNestedManyWithoutAuthorInputSchema).optional(),
  reports: z.lazy(() => ReportCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput> = z.object({
  clerkUserId: z.string(),
  email: z.string(),
  username: z.string(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bins: z.lazy(() => BinUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  reports: z.lazy(() => ReportUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentsInput> = z.object({
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bins: z.lazy(() => BinUpdateManyWithoutAuthorNestedInputSchema).optional(),
  reports: z.lazy(() => ReportUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput> = z.object({
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bins: z.lazy(() => BinUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  reports: z.lazy(() => ReportUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutReportsInputSchema: z.ZodType<Prisma.UserCreateWithoutReportsInput> = z.object({
  clerkUserId: z.string(),
  email: z.string(),
  username: z.string(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bins: z.lazy(() => BinCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutReportsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReportsInput> = z.object({
  clerkUserId: z.string(),
  email: z.string(),
  username: z.string(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bins: z.lazy(() => BinUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutReportsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReportsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReportsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportsInputSchema) ]),
}).strict();

export const UserUpsertWithoutReportsInputSchema: z.ZodType<Prisma.UserUpsertWithoutReportsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReportsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReportsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReportsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutReportsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReportsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReportsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReportsInputSchema) ]),
}).strict();

export const UserUpdateWithoutReportsInputSchema: z.ZodType<Prisma.UserUpdateWithoutReportsInput> = z.object({
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bins: z.lazy(() => BinUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutReportsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReportsInput> = z.object({
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bins: z.lazy(() => BinUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const BinCreateManyAuthorInputSchema: z.ZodType<Prisma.BinCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  binId: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  content: z.string(),
  language: z.string(),
  views: z.number().int().optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isPrivate: z.boolean().optional(),
  password: z.string().optional().nullable()
}).strict();

export const CommentCreateManyAuthorInputSchema: z.ZodType<Prisma.CommentCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  targetId: z.string(),
  targetType: z.lazy(() => CommentTargetTypeSchema)
}).strict();

export const ReportCreateManyAuthorInputSchema: z.ZodType<Prisma.ReportCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  reason: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  targetType: z.lazy(() => ReportTargetTypeSchema),
  targetId: z.string()
}).strict();

export const BinUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.BinUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  binId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BinUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.BinUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  binId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BinUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.BinUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  binId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  views: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CommentUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => CommentTargetTypeSchema),z.lazy(() => EnumCommentTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => CommentTargetTypeSchema),z.lazy(() => EnumCommentTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => CommentTargetTypeSchema),z.lazy(() => EnumCommentTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.ReportUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => ReportTargetTypeSchema),z.lazy(() => EnumReportTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => ReportTargetTypeSchema),z.lazy(() => EnumReportTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reason: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  targetType: z.union([ z.lazy(() => ReportTargetTypeSchema),z.lazy(() => EnumReportTargetTypeFieldUpdateOperationsInputSchema) ]).optional(),
  targetId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const BinFindFirstArgsSchema: z.ZodType<Prisma.BinFindFirstArgs> = z.object({
  select: BinSelectSchema.optional(),
  include: BinIncludeSchema.optional(),
  where: BinWhereInputSchema.optional(),
  orderBy: z.union([ BinOrderByWithRelationInputSchema.array(),BinOrderByWithRelationInputSchema ]).optional(),
  cursor: BinWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BinScalarFieldEnumSchema,BinScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BinFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BinFindFirstOrThrowArgs> = z.object({
  select: BinSelectSchema.optional(),
  include: BinIncludeSchema.optional(),
  where: BinWhereInputSchema.optional(),
  orderBy: z.union([ BinOrderByWithRelationInputSchema.array(),BinOrderByWithRelationInputSchema ]).optional(),
  cursor: BinWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BinScalarFieldEnumSchema,BinScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BinFindManyArgsSchema: z.ZodType<Prisma.BinFindManyArgs> = z.object({
  select: BinSelectSchema.optional(),
  include: BinIncludeSchema.optional(),
  where: BinWhereInputSchema.optional(),
  orderBy: z.union([ BinOrderByWithRelationInputSchema.array(),BinOrderByWithRelationInputSchema ]).optional(),
  cursor: BinWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BinScalarFieldEnumSchema,BinScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BinAggregateArgsSchema: z.ZodType<Prisma.BinAggregateArgs> = z.object({
  where: BinWhereInputSchema.optional(),
  orderBy: z.union([ BinOrderByWithRelationInputSchema.array(),BinOrderByWithRelationInputSchema ]).optional(),
  cursor: BinWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BinGroupByArgsSchema: z.ZodType<Prisma.BinGroupByArgs> = z.object({
  where: BinWhereInputSchema.optional(),
  orderBy: z.union([ BinOrderByWithAggregationInputSchema.array(),BinOrderByWithAggregationInputSchema ]).optional(),
  by: BinScalarFieldEnumSchema.array(),
  having: BinScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BinFindUniqueArgsSchema: z.ZodType<Prisma.BinFindUniqueArgs> = z.object({
  select: BinSelectSchema.optional(),
  include: BinIncludeSchema.optional(),
  where: BinWhereUniqueInputSchema,
}).strict() ;

export const BinFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BinFindUniqueOrThrowArgs> = z.object({
  select: BinSelectSchema.optional(),
  include: BinIncludeSchema.optional(),
  where: BinWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const CommentFindFirstArgsSchema: z.ZodType<Prisma.CommentFindFirstArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindManyArgsSchema: z.ZodType<Prisma.CommentFindManyArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentAggregateArgsSchema: z.ZodType<Prisma.CommentAggregateArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentGroupByArgsSchema: z.ZodType<Prisma.CommentGroupByArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithAggregationInputSchema.array(),CommentOrderByWithAggregationInputSchema ]).optional(),
  by: CommentScalarFieldEnumSchema.array(),
  having: CommentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentFindUniqueArgsSchema: z.ZodType<Prisma.CommentFindUniqueArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentFindUniqueOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const ReportFindFirstArgsSchema: z.ZodType<Prisma.ReportFindFirstArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReportFindFirstOrThrowArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportFindManyArgsSchema: z.ZodType<Prisma.ReportFindManyArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportAggregateArgsSchema: z.ZodType<Prisma.ReportAggregateArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReportGroupByArgsSchema: z.ZodType<Prisma.ReportGroupByArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithAggregationInputSchema.array(),ReportOrderByWithAggregationInputSchema ]).optional(),
  by: ReportScalarFieldEnumSchema.array(),
  having: ReportScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReportFindUniqueArgsSchema: z.ZodType<Prisma.ReportFindUniqueArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const ReportFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReportFindUniqueOrThrowArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const BinCreateArgsSchema: z.ZodType<Prisma.BinCreateArgs> = z.object({
  select: BinSelectSchema.optional(),
  include: BinIncludeSchema.optional(),
  data: z.union([ BinCreateInputSchema,BinUncheckedCreateInputSchema ]),
}).strict() ;

export const BinUpsertArgsSchema: z.ZodType<Prisma.BinUpsertArgs> = z.object({
  select: BinSelectSchema.optional(),
  include: BinIncludeSchema.optional(),
  where: BinWhereUniqueInputSchema,
  create: z.union([ BinCreateInputSchema,BinUncheckedCreateInputSchema ]),
  update: z.union([ BinUpdateInputSchema,BinUncheckedUpdateInputSchema ]),
}).strict() ;

export const BinCreateManyArgsSchema: z.ZodType<Prisma.BinCreateManyArgs> = z.object({
  data: z.union([ BinCreateManyInputSchema,BinCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BinCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BinCreateManyAndReturnArgs> = z.object({
  data: z.union([ BinCreateManyInputSchema,BinCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BinDeleteArgsSchema: z.ZodType<Prisma.BinDeleteArgs> = z.object({
  select: BinSelectSchema.optional(),
  include: BinIncludeSchema.optional(),
  where: BinWhereUniqueInputSchema,
}).strict() ;

export const BinUpdateArgsSchema: z.ZodType<Prisma.BinUpdateArgs> = z.object({
  select: BinSelectSchema.optional(),
  include: BinIncludeSchema.optional(),
  data: z.union([ BinUpdateInputSchema,BinUncheckedUpdateInputSchema ]),
  where: BinWhereUniqueInputSchema,
}).strict() ;

export const BinUpdateManyArgsSchema: z.ZodType<Prisma.BinUpdateManyArgs> = z.object({
  data: z.union([ BinUpdateManyMutationInputSchema,BinUncheckedUpdateManyInputSchema ]),
  where: BinWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BinUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.BinUpdateManyAndReturnArgs> = z.object({
  data: z.union([ BinUpdateManyMutationInputSchema,BinUncheckedUpdateManyInputSchema ]),
  where: BinWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BinDeleteManyArgsSchema: z.ZodType<Prisma.BinDeleteManyArgs> = z.object({
  where: BinWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommentCreateArgsSchema: z.ZodType<Prisma.CommentCreateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
}).strict() ;

export const CommentUpsertArgsSchema: z.ZodType<Prisma.CommentUpsertArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
  create: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
  update: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
}).strict() ;

export const CommentCreateManyArgsSchema: z.ZodType<Prisma.CommentCreateManyArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentCreateManyAndReturnArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentDeleteArgsSchema: z.ZodType<Prisma.CommentDeleteArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateArgsSchema: z.ZodType<Prisma.CommentUpdateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateManyArgsSchema: z.ZodType<Prisma.CommentUpdateManyArgs> = z.object({
  data: z.union([ CommentUpdateManyMutationInputSchema,CommentUncheckedUpdateManyInputSchema ]),
  where: CommentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CommentUpdateManyMutationInputSchema,CommentUncheckedUpdateManyInputSchema ]),
  where: CommentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommentDeleteManyArgsSchema: z.ZodType<Prisma.CommentDeleteManyArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReportCreateArgsSchema: z.ZodType<Prisma.ReportCreateArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  data: z.union([ ReportCreateInputSchema,ReportUncheckedCreateInputSchema ]),
}).strict() ;

export const ReportUpsertArgsSchema: z.ZodType<Prisma.ReportUpsertArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
  create: z.union([ ReportCreateInputSchema,ReportUncheckedCreateInputSchema ]),
  update: z.union([ ReportUpdateInputSchema,ReportUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReportCreateManyArgsSchema: z.ZodType<Prisma.ReportCreateManyArgs> = z.object({
  data: z.union([ ReportCreateManyInputSchema,ReportCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReportCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ReportCreateManyAndReturnArgs> = z.object({
  data: z.union([ ReportCreateManyInputSchema,ReportCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReportDeleteArgsSchema: z.ZodType<Prisma.ReportDeleteArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const ReportUpdateArgsSchema: z.ZodType<Prisma.ReportUpdateArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  data: z.union([ ReportUpdateInputSchema,ReportUncheckedUpdateInputSchema ]),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const ReportUpdateManyArgsSchema: z.ZodType<Prisma.ReportUpdateManyArgs> = z.object({
  data: z.union([ ReportUpdateManyMutationInputSchema,ReportUncheckedUpdateManyInputSchema ]),
  where: ReportWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReportUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ReportUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ReportUpdateManyMutationInputSchema,ReportUncheckedUpdateManyInputSchema ]),
  where: ReportWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ReportDeleteManyArgsSchema: z.ZodType<Prisma.ReportDeleteManyArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;