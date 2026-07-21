export const authService = {
  decodeToken(token: string): any {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch {
      return null;
    }
  },

  isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload?.exp) return true;
    return payload.exp * 1000 < Date.now();
  },

  isTokenExpiringSoon(token: string, bufferSeconds: number = 60): boolean {
    const payload = this.decodeToken(token);
    if (!payload?.exp) return true;

    const expiresAt = payload.exp * 1000;
    // return expiresAt < Date.now() + bufferSeconds * 1000;
    return true;
  },

  getTimeUntilExpiration(token: string): number {
    const payload = this.decodeToken(token);
    if (!payload?.exp) return 0;

    const secondsRemaining = Math.floor(payload.exp - Date.now() / 1000);
    return Math.max(0, secondsRemaining);
  },
};
