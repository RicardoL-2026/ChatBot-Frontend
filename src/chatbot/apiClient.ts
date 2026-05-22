import type { RequestOptions } from './types';

export class ApiError<T = unknown> extends Error {
    status: number;
    data?: T;
  
    constructor(message: string, status: number, data?: T) {
      super(message);
  
      this.name = 'ApiError';
      this.status = status;
      this.data = data;
    }
}
  
async function request<TResponse>(path: string, options: RequestOptions = {} ): Promise<TResponse> {
    const url = `${import.meta.env.VITE_CHATBOT_API_URL}${path}`;

    const isFormData = options.body instanceof FormData;

    const headers: HeadersInit = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers ?? {}),
    };

    let response: Response;

    try {
    response = await fetch(url, {
        ...options,
        headers,
        body: isFormData
        ? (options.body as BodyInit)
        : options.body != null
            ? JSON.stringify(options.body)
            : undefined,
    });
    }
    catch (e: unknown) {
    if (e instanceof Error) {
        throw new ApiError(
        `No se pudo conectar al servidor: ${e.message}`,
        0
        );
    }

    throw new ApiError(
        'Error desconocido de conexión',
        0
    );
    }

    if (response.status === 204) {
    return null as TResponse;
    }

    let body: unknown;

    try {
    body = await response.json();
    }
    catch {
    if (response.ok) {
        return null as TResponse;
    }

    throw new ApiError(
        `Respuesta no válida del servidor (${response.status})`,
        response.status
    );
    }

    if (!response.ok) {
    throw new ApiError(
        (body as { message?: string })?.message ?? 'Error desconocido',
        response.status,
        body
    );
    }

    return body as TResponse;
}
  
export const apiClient = {
    get<TResponse>(path: string) {
        return request<TResponse>(path, {
        method: 'GET',
        });
    },

    post<TResponse>(
        path: string,
        body?: unknown
    ) {
        return request<TResponse>(path, {
        method: 'POST',
        body,
        });
    },

    put<TResponse>(
        path: string,
        body?: unknown
    ) {
        return request<TResponse>(path, {
        method: 'PUT',
        body,
        });
    },

    delete<TResponse>(path: string) {
        return request<TResponse>(path, {
        method: 'DELETE',
        });
    },
};