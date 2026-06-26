export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 3,
  delayMs = 1000
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      // Retry on 5xx errors or network errors
      if (response.ok || response.status < 500) {
        return response;
      }

      if (attempt === maxRetries) {
        return response;
      }

      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        throw lastError;
      }
    }

    // Exponential backoff
    const backoffDelay = delayMs * Math.pow(2, attempt - 1);
    await new Promise(resolve => setTimeout(resolve, backoffDelay));
  }

  throw lastError || new Error('Max retries exceeded');
}
