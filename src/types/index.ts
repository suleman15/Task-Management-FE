export type ResType<T = null> = {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
};
