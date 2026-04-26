export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
}

export interface LoginError {
  detail: string
}
