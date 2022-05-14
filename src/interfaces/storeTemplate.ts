export type AppInterface = {
  login: {
    user: string;
    token: string;
    role: string;
  };
};
export const appTemplate: AppInterface = {
  login: {
    user: "",
    token: "",
    role: "",
  },
};

export interface StoreInterface {
  app: AppInterface;
}
export const storeTemplate: StoreInterface = {
  app: appTemplate,
};
