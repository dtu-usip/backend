import AdminBro from "admin-bro";
import { hash } from "bcrypt";

import AdminBroMongoose from "@admin-bro/mongoose";
import {
  AdminBroUser,
  User,
  Session,
  Token,
  Course,
  Payment,
  Semester,
  Enrollment,
  Student,
  Teacher,
  Grade,
} from "./models";
AdminBro.registerAdapter(AdminBroMongoose);

const options = {
  resources: [
    User.default,
    Session.default,
    Token.default,
    Course.default,
    Payment.default,
    Semester.default,
    Enrollment.default,
    Student.default,
    Teacher.default,
    Grade.default,
    {
      resource: AdminBroUser.default,
      options: {
        properties: {
          encryptedPassword: { isVisible: false },
          password: {
            type: "string",
            list: false,
            edit: true,
            filter: false,
            show: false,
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await hash(request.payload.password, 10),
                  password: undefined,
                };
              }
              return request;
            },
          },
        },
      },
    },
  ],
};

export = options;
