const rules = {
  visitor: {
    static: ["posts:list", "home-page:visit"]
  },
  writer: {
    static: [
      "posts:list",
      "posts:create",
      "posts:post:edit",
      "users:getSelf",
      "home-page:visit",
      "dashboard-page:visit"
    ],
    // dynamic: {
    //   "posts:edit": ({userId, postOwnerId}) => {
    //     if (!userId || !postOwnerId) return false;
    //     return userId === postOwnerId;
    //   }
    // }
  },
  pm: {
    static: [
      "services:list",
      "services:add",
      "services:edit",
      "services:delete",
      "clients:view",
      "clients:list",
      "clients:add",
      "clients:edit",
      "clients:delete",
      "hardware:add"
    ]
  },
  efs: {
    static: [
      "services:list",
      "clients:view",
    ]
  },
  admin: {
    static: [
      "services:list",
      "services:add",
      "services:edit",
      "services:delete",
      "posts:create",
      "posts:post:edit",
      "users:getSelf",
      "home-page:visit",
      "dashboard-page:visit",
      "posts:list",
      "posts:create",
      "posts:edit",
      "posts:delete",
      "users:get",
      "users:getSelf",
      "home-page:visit",
      "dashboard-page:visit"
    ]
  }
};

export default rules;
