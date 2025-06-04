export interface ApiResponse<T> {
  data: T | null
  status: number | null,
  error: string | null
  loading: boolean,
  request: (input: RequestInfo, init?: RequestInit) => Promise<void>
}
