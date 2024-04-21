export type ValidationConstraint = {
  property: string;
  children: [];
  constraints: {
    [s: string]: string;
  };
};

export type HttpSuccessResponse<T = null> = {
  readonly message: string;
  readonly status: number;
  readonly success: boolean;
  readonly data: T;
};

export type HttpErrorResponse = {
  readonly message: string;
  readonly status?: number;
  readonly success: boolean;
  // readonly error: ValidationConstraint[] | string;
};
