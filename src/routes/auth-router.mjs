import express from "express";
import { body } from "express-validator";
import { postLogin, postLoginAdmin } from "../controllers/auth-controller.mjs";
import { postAdmin, postUser } from "../controllers/user-controller.mjs";

// routes for /api/auth

const authRouter = express.Router();
/**
 * @api {post} /auth/login Login for user
 * @apiName PostLogin
 * @apiGroup Authentication
 * @apiPermission all
 *
 * @apiDescription Sign in and get an authentication token for the user.
 *
 * @apiParam {String} membernumber Member number of the user.
 * @apiParam {String} password Password of the user.
 *
 * @apiParamExample {json} Request-Example:
 *    {
    "membernumber": "1007",
    "password": "1234"
  }
 * @apiSuccess {String} token Token for the user authentication.
 * @apiSuccess {Object} user User info.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
    "message": "logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDA3LCJ1c2VyX2xldmVsX2lkIjozLCJpYXQiOjE3MDI1NjI1MDcsImV4cCI6MTcwMjY0ODkwN30.qZ57y5Lqqs3Geh_xx1CiXUhW7_OJYTh_h2MJ29dOVQw",
    "user": {
        "user_id": 1007,
        "user_level_id": 3
    }
  }
 *
 * @apiUse UnauthorizedError
 */


authRouter
  .route("/login")
  .post(
    body("membernumber").trim().isLength({ min: 4 }),
    body("password").trim().isLength({ min: 4, max: 4 }),
    postLogin
  )



authRouter
  .route("/login-admin")
  .post(
    body("email").trim().isEmail(),
    body("password").trim().isLength({ min: 4, max: 8 }),
    postLoginAdmin);

/**
 * POST endpoint for register
 * @name POST/api/auth/register
 * @param {string} email - email of the user
 * @param {string} password - password of the user
 * @returns {object} - object containing user info and token
 * @example response - HTTP 200 OK
 */

 /**
 * @api {post} /auth/register Register for user
 * @apiName PostUser
 * @apiGroup Authentication
 * @apiPermission all
 *
 * @apiDescription Create user.
 *
 * @apiParam {String} email Email of the user.
 * @apiParam {String} password Password of the user ().
 *
 * @apiParamExample {json} Request-Example:
 *    {
    "email": "sofia@gmail.com",
    "password": "1234"
  }
 * @apiSuccess {String} message Success message.
 * @apiSuccess {String} user_id User id (member number) of the user.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
    "message": "user added",
    "user_id": 1015
 * }
 * @apiUse UnauthorizedError
 */
authRouter
  .route("/register")
  .post(
    body("email").trim().isEmail(),
    body("password").trim().isLength({ min: 4, max: 4 }),
    postUser
  );

/**
 * @api {post} /auth/register-admin Register for admin
 * @apiName PostAdmin
 * @apiGroup Authentication
 * @apiPermission all
 *
 * @apiDescription Create admin.
 *
 * @apiParam {String} email Email of the admin.
 * @apiParam {String} password Password of the admin ().
 *
 * @apiParamExample {json} Request-Example:
 *    {
    "email": "sofia@gmail.com",
    "password": "1234"
  }
 * @apiSuccess {String} message Success message.
 * @apiSuccess {String} user_id User id (member number) of the user.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 * {
    "message": "admin added",
    "user_id": 1015
 * }
 * @apiUse UnauthorizedError
 */
authRouter
  .route("/register-admin")
  .post(
    body("email").trim().isEmail(),
    body("password").trim().isLength({ min: 4, max: 8 }),
    postAdmin
  );

export { authRouter };
