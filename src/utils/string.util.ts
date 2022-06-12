export class StringUtil {
  static sanitize(s: string): string {
    // return encodeURIComponent(s)
    return s.replace(/[^a-zA-Z0-9]/g, "_");
  }
}
