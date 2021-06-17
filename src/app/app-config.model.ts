export interface AppConfig {
  name: string;
  production: boolean;
  api: {
    url: string;
  };
  itensPerPage: number;
}
