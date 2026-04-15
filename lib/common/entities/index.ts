export type EntityCreated = {
  id: string;
};

export type EntityList<T> = {
  items: T[];
  count?: number;
};

export type Query<T> =
  | {
      $filter: T;
    }
  | {
      $or: Query<T>[];
    }
  | {
      $and: Query<T>[];
    }
  | {
      $not: Query<T>;
    }
  | {};
