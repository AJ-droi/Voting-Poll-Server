// src/utils/pagination.ts
export interface PaginationParams {
    page?: number;
    limit?: number;
  }
  
  export interface PaginatedResult<T> {
    data: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }
  
  export async function paginate<T>(
    prismaModel: any, // The Prisma model to query
    query: PaginationParams & { where?: any; include?: any } // Optional filters, includes, etc.
  ): Promise<PaginatedResult<T>> {
    const { page = 1, limit = 10, where, include } = query;
  
    const skip = (page - 1) * limit;
  
    const [data, totalItems] = await Promise.all([
      prismaModel.findMany({
        where,
        include,
        skip,
        take: limit,
      }),
      prismaModel.count({ where }),
    ]);
  
    return {
      data,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  }
  