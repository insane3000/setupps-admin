export type AppInterface = {
  login: {
    token: string;
    id: "";
  };
};
export const appTemplate: AppInterface = {
  login: {
    token: "",
    id: "",
  },
};

export interface StoreInterface {
  app: AppInterface;
}
export const storeTemplate: StoreInterface = {
  app: appTemplate,
};
