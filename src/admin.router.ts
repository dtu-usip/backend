import AdminBroExpress from "@admin-bro/express";
import AdminBroUser from "./models/adminbrouser";
import bcrypt from "bcrypt";

const cookiePass = process.env.ADMIN_SECRET || "secret";

const buildAdminRouter = (admin) => {
  // const router = AdminBroExpress.buildRouter(admin);
  const router = AdminBroExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email, password) => {
        const user = await AdminBroUser.findOne({ email });
        if (user) {
          const pass = await bcrypt.compare(password, user.encryptedPassword);
          // const pass = password === user.encryptedPassword;
          if (pass) {
            return user;
          }
        }
        return false;
      },
      cookieName: "USIP",
      cookiePassword: cookiePass,
    },
    null,
    {
      resave: true,
      saveUninitialized: true,
    }
  );
  return router;
};

export = buildAdminRouter;
