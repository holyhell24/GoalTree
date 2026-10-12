export type AccessDeniedProps = {
  configured: boolean;
  pending: boolean;
  onSignOut: () => Promise<void>;
};
