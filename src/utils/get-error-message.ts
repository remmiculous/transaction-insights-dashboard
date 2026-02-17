type ErrorWithMessage = {
  message: string;
};

type AxiosLikeError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function isAxiosLikeError(error: unknown): error is AxiosLikeError {
  return typeof error === "object" && error !== null && "response" in error;
}

export function getErrorMessage(error: unknown): string {
  if (!error) return "Something went wrong";

  // Native Error (fetch / throw new Error)
  if (error instanceof Error) return error.message;

  // Axios-style error
  if (isAxiosLikeError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string") return message;
  }

  // Custom thrown object { message: "" }
  if (isErrorWithMessage(error)) return error.message;

  return "Unexpected server error";
}
