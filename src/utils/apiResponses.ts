export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER: 500,
    SERVICE_UNAVAILABLE: 503
} as const;

export const API_MESSAGES = {
    // Success messages
    SUCCESS: 'Operation completed successfully',
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',

    // Authentication & Authorization
    AUTH_REQUIRED: 'Authentication is required',
    INVALID_CREDENTIALS: 'Invalid credentials',
    TOKEN_EXPIRED: 'Token has expired',
    FORBIDDEN: 'You do not have permission to access this resource',

    // User related
    USER_CREATED: 'User registered successfully',
    USER_UPDATED: 'User updated successfully',
    USER_DELETED: 'User deleted successfully',
    USER_NOT_FOUND: 'User not found',
    USER_EXISTS: 'User already exists',
    INVALID_PASSWORD: 'Invalid password',
    PASSWORD_UPDATED: 'Password updated successfully',

    // Validation
    MISSING_FIELDS: 'Required fields are missing',
    INVALID_INPUT: 'Invalid input provided',
    INVALID_EMAIL: 'Invalid email format',
    WEAK_PASSWORD: 'Password does not meet requirements',

    // Server errors
    SERVER_ERROR: 'Internal server error occurred',
    SERVICE_UNAVAILABLE: 'Service temporarily unavailable',
    DATABASE_ERROR: 'Database operation failed'
} as const;

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    statusCode: number;
}

export const createApiResponse = <T>(
    success: boolean,
    message: string,
    statusCode: number,
    data?: T,
    error?: string
): ApiResponse<T> => {
    return {
        success,
        message,
        statusCode,
        ...(data && { data }),
        ...(error && { error })
    };
};

// Helper functions for common responses
export const successResponse = <T>(
    data: T,
    message: string = API_MESSAGES.SUCCESS,
    statusCode: number = HTTP_STATUS.OK
): ApiResponse<T> => {
    return createApiResponse(true, message, statusCode, data);
};

export const errorResponse = (
    message: string = API_MESSAGES.SERVER_ERROR,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER,
    error?: string
): ApiResponse => {
    return createApiResponse(false, message, statusCode, undefined, error);
};
