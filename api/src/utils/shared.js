export function errorFormat(message, status) {
  return { error: { status: status || 500, message } };
}
