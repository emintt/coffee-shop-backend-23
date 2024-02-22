import express from "express";
import {
  getDishById,
  getDishWithOffers,
  getDishes,
  getOffers,
  postDish,
  updateDish,
  deleteDish,
  postOffer,
} from "../controllers/dish-controller.mjs";
import upload from "../middlewares/upload.mjs";
import {
  authenticateToken,
  authenticateToken2,
} from "../middlewares/authentication.mjs";

const dishRouter = express.Router();

// routes for '/api/dish'
/**
 * @apiDefine all No authentication needed.
 */

/**
 * @apiDefine admin Admin user level token needed.
 */

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */

/**
 * @apiDefine UnauthorizedError
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": {
 *         "message": "username/password invalid",
 *         "status": 401
 *       }
 *     }
 */

/**
 * @apiDefine Error400
 * @apiError Error400 Error message.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400
 *    {
 *      "error": {
 *        "message": "error message",
 *        "status": 400
 *      }
 *    }
 */
/**
 * @apiDefine NotFoundError
 * @apiError NotFoundError Not found message.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not found
 *    {
 *      "error": {
 *        "message": "Not Found - /api/usersa",
 *        "status": 404
 *      }
 *    }
 */
/**
 * GET endpoint for dishes
 * @name GET/api/dish
 * @returns {object} - object containing list of menu according to categories
 * @example response - HTTP 200 OK
 *
 * @api {get} /dish Get all dishes
 * @apiName GetDishes
 * @apiGroup Dish
 * @apiPermission all
 * @apiDescription Get all dishes
 * @apiSuccess {String} category_name Dish category name.
 * @apiSuccess {Object[]} dishes List of dishes.
 * @apiSuccess {Number} dishes.dish_id Dish id.
 * @apiSuccess {String} dishes.dish_name Dish name.
 * @apiSuccess {String} dishes.description Dish description.
 * @apiSuccess {Number} dishes.dish_price Dish price.
 * @apiSuccess {String} dishes.dish_photo Dish photo.
 * @apiSuccess {Number} dishes.category_id Dish category id.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 * [
    {
        "category_name": "Jäätelöt",
        "dishes": [
            {
                "dish_id": 1,
                "dish_name": "Mango-meloni",
                "dish_price": "3.50",
                "description": "Laktoositon, Gluteeniton",
                "dish_photo": "d70016c421cf929684c5c3c2e14efbf7",
                "category_id": 1
            },
            {
                "dish_id": 2,
                "dish_name": "Vanilja",
                "dish_price": "3.50",
                "description": "Laktoositon, Gluteeniton",
                "dish_photo": "d5b3351da9701bf7183875ccf6ab157b",
                "category_id": 1
            },
            {
                "dish_id": 3,
                "dish_name": "Suklaa",
                "dish_price": "3.50",
                "description": "Laktoositon, Gluteeniton",
                "dish_photo": "fb6973e94f78bb02a294ae826bda2c3d",
                "category_id": 1
            }
        ]
    },
    {
        "category_name": "Leivonnaiset",
        "dishes": [
            {
                "dish_id": 4,
                "dish_name": "Voisilmäpulla",
                "dish_price": "2.90",
                "description": "Tehty omassa leipomossa",
                "dish_photo": "b0da2e948a3a605412c874bf55b07081",
                "category_id": 2
            },
            {
                "dish_id": 5,
                "dish_name": "Korvapuusti",
                "dish_price": "2.90",
                "description": "Tehty omassa leipomossa",
                "dish_photo": "617d8f21a3b55fdaef0c76e0e4d7f33a",
                "category_id": 2
            },
            {
                "dish_id": 6,
                "dish_name": "Dallaspulla",
                "dish_price": "2.90",
                "description": "Laktoositon",
                "dish_photo": "76740e1797c1b618e66fe39066cd0a03",
                "category_id": 2
            }
        ]
    },
    {
        "category_name": "Kakut",
        "dishes": [
            {
                "dish_id": 8,
                "dish_name": "Kinuskikakku",
                "dish_price": "4.00",
                "description": "Laktoositon",
                "dish_photo": "e3d6948eaf321a45cfa61f264efdf9a3",
                "category_id": 3
            },
            {
                "dish_id": 9,
                "dish_name": "Punainen sametti",
                "dish_price": "4.00",
                "description": "Vegaaninen",
                "dish_photo": "c038ded38adcf04863130b976fa13b2b",
                "category_id": 3
            },
            {
                "dish_id": 10,
                "dish_name": "Mansikka täytekakku",
                "dish_price": "4.00",
                "description": "Gluteeniton",
                "dish_photo": "fc59ad5ee62ad782a375e932f7ed1183",
                "category_id": 3
            }
        ]
    },
    {
        "category_name": "Kylmät juomat",
        "dishes": [
            {
                "dish_id": 11,
                "dish_name": "Coca-cola",
                "dish_price": "3.50",
                "description": "Halutessa sokeriton",
                "dish_photo": "8bd62f93f91f8f5fda2d5cdbd738a078",
                "category_id": 4
            },
            {
                "dish_id": 12,
                "dish_name": "Sprite",
                "dish_price": "3.50",
                "description": "Halutessa sokeriton",
                "dish_photo": "dbb0a4dbdf7526414d366ef2f410a1bf",
                "category_id": 4
            },
            {
                "dish_id": 13,
                "dish_name": "Fanta",
                "dish_price": "3.50",
                "description": "Halutessa sokeriton",
                "dish_photo": "52ab0cada95b493a4897fedb1cd51c3e",
                "category_id": 4
            }
        ]
    },
    {
        "category_name": "Kuumat juomat",
        "dishes": [
            {
                "dish_id": 14,
                "dish_name": "Americano",
                "dish_price": "3.50",
                "description": "Piristys päivään",
                "dish_photo": "7fda39be6fac103af0a5eb3ce9cdadfb",
                "category_id": 5
            },
            {
                "dish_id": 15,
                "dish_name": "Latte",
                "dish_price": "3.50",
                "description": "Pyydettäessä erikois maitoon",
                "dish_photo": "cbc141b3cd0dbedac60dfa7d8dfbbdf1",
                "category_id": 5
            },
            {
                "dish_id": 16,
                "dish_name": "Mocha",
                "dish_price": "3.50",
                "description": "Pyydettäessä erikois maitoon",
                "dish_photo": "56f8c57e52f4f55adcc459a5ccd94d76",
                "category_id": 5
            }
        ]
    }
 * ]
 *
 */
/**
 *
 * @api {post} /dish Create a new dish
 * @apiName CreateDish
 * @apiGroup Dish
 * @apiPermission admin
 * @apiDescription Create a new dish
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {string} dis_price The price of the dish.
 * @apiParam {String} description Description of dish item.
 * @apiParam {String} category_id Category id of dish item.
 * @apiParam {File} dish_photo The file of the dish to be uploaded.
 *
 * @apiParamExample {form-data} Request-Example:
 *    {
 *      "dish_price": "pic1.jpg",
 *      "description": "sunset",
 *      "category_id": "sunset",
 *       "dish_photo": "moccha.png"
 *    }
 *
 * @apiSuccess {string} message Success message.
 * @apiSuccess {number} dish_id id of the dish.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 * {
    "message": "New media dish added.",
    "dish_id": 19
    }
 *@apiUse UnauthorizedError
 *@apiUse Error400
 */

dishRouter
  .route("/")
  .get(getDishes)
  .post(authenticateToken, upload.single("dish_photo"), postDish)
  // .put(upload.single("dish_photo"), updateDish);

/**
 * GET endpoint for offers
 * @name GET/api/dish/offers
 * @returns {object} - object containing list of offers
 * @example response - HTTP 200 OK
 *
 * @api {get} /dish/offers Get all offers
 * @apiName GetOffers
 * @apiGroup Dish
 * @apiPermission token
 * @apiDescription Get all offers
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object[]} offer_dishes List of offers.
 * @apiSuccess {Number} dishes.dish_id Dish id.
 * @apiSuccess {String} dishes.dish_name Dish name.
 * @apiSuccess {String} dishes.description Dish description.
 * @apiSuccess {Number} dishes.dish_price Dish price.
 * @apiSuccess {String} dishes.dish_photo Dish photo.
 * @apiSuccess {Number} dishes.offer_price Offer price.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
    "offer_dishes": [
        {
            "dish_id": 2,
            "dish_name": "Vanilja",
            "dish_price": "3.50",
            "offer_price": "1.05",
            "description": "Laktoositon, Gluteeniton",
            "dish_photo": "d5b3351da9701bf7183875ccf6ab157b"
        },
        {
            "dish_id": 1,
            "dish_name": "Mango-meloni",
            "dish_price": "3.50",
            "offer_price": "2.80",
            "description": "Laktoositon, Gluteeniton",
            "dish_photo": "d70016c421cf929684c5c3c2e14efbf7"
        },
        {
            "dish_id": 15,
            "dish_name": "Latte",
            "dish_price": "3.50",
            "offer_price": "3.15",
            "description": "Pyydettäessä erikois maitoon",
            "dish_photo": "cbc141b3cd0dbedac60dfa7d8dfbbdf1"
        }
    ]
}
 *
 */
/**
 * @api {post} /dish/offers Create a new offer
 * @apiName PostOffer
 * @apiGroup Dish
 * @apiPermission admin
 * @apiDescription Create a new offer for a dish
 * @apiHeader {String} Authorization Bearer token.
 * @apiParam {Number} dish_id The id of the dish.
 * @apiParam {Number} reduction Reduction percent of dish item (from 0 to 1).
 * @apiParam {String} start_date The date when the offer starts.
 * @apiParam {String} end_date The date when the offer ends.
 *
 * @apiParamExample {json} Request-Example:
 * {
    "dish_id": 15,
    "reduction": 0.2,
    "start_date": "2023-12-01",
    "end_date": "2023-12-21"
}
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {String} offer_id The offer id of the dish.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 * {
    "message": "offer added",
    "offer_id": 12
   }
 * @apiUse UnauthorizedError
 */
dishRouter
  .route("/offers")
  .get(authenticateToken, getOffers)
  .post(authenticateToken, postOffer);
/**
 * GET endpoint for dishes with offers
 * @name GET/api/dish/logged
 * @returns {object} - object containing list of menu according to categories
 * @example response - HTTP 200 OK
 *
 * @api {get} /dish/logged Get all dishes with offers
 * @apiName GetDishesWithOffers
 * @apiGroup Dish
 * @apiPermission token
 * @apiDescription Get all dishes with offers
 * @apiSuccess {Number} category_name Dish category name.
 * @apiSuccess {Object[]} dishes List of dishes.
 * @apiSuccess {Number} dishes.dish_id Dish id.
 * @apiSuccess {String} dishes.dish_name Dish name.
 * @apiSuccess {String} dishes.description Dish description.
 * @apiSuccess {Number} dishes.dish_price Dish price.
 * @apiSuccess {String} dishes.dish_photo Dish photo.
 * @apiSuccess {Number} dishes.offer_price Dish offer price.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
    {
        "category_name": "Jäätelöt",
        "dishes": [
            {
                "dish_id": 3,
                "dish_name": "Suklaa",
                "offer_price": null,
                "dish_price": "3.50",
                "dish_photo": "fb6973e94f78bb02a294ae826bda2c3d",
                "description": "Laktoositon, Gluteeniton"
            },
            {
                "dish_id": 1,
                "dish_name": "Mango-meloni",
                "offer_price": "2.80",
                "dish_price": "3.50",
                "dish_photo": "d70016c421cf929684c5c3c2e14efbf7",
                "description": "Laktoositon, Gluteeniton"
            },
            {
                "dish_id": 2,
                "dish_name": "Vanilja",
                "offer_price": "1.05",
                "dish_price": "3.50",
                "dish_photo": "d5b3351da9701bf7183875ccf6ab157b",
                "description": "Laktoositon, Gluteeniton"
            }
        ]
    },
    {
        "category_name": "Leivonnaiset",
        "dishes": [
            {
                "dish_id": 4,
                "dish_name": "Voisilmäpulla",
                "offer_price": null,
                "dish_price": "2.90",
                "dish_photo": "b0da2e948a3a605412c874bf55b07081",
                "description": "Tehty omassa leipomossa"
            },
            {
                "dish_id": 5,
                "dish_name": "Korvapuusti",
                "offer_price": null,
                "dish_price": "2.90",
                "dish_photo": "617d8f21a3b55fdaef0c76e0e4d7f33a",
                "description": "Tehty omassa leipomossa"
            },
            {
                "dish_id": 6,
                "dish_name": "Dallaspulla",
                "offer_price": null,
                "dish_price": "2.90",
                "dish_photo": "76740e1797c1b618e66fe39066cd0a03",
                "description": "Laktoositon"
            }
        ]
    },
    {
        "category_name": "Kakut",
        "dishes": [
            {
                "dish_id": 8,
                "dish_name": "Kinuskikakku",
                "offer_price": null,
                "dish_price": "4.00",
                "dish_photo": "e3d6948eaf321a45cfa61f264efdf9a3",
                "description": "Laktoositon"
            },
            {
                "dish_id": 9,
                "dish_name": "Punainen sametti",
                "offer_price": null,
                "dish_price": "4.00",
                "dish_photo": "c038ded38adcf04863130b976fa13b2b",
                "description": "Vegaaninen"
            },
            {
                "dish_id": 10,
                "dish_name": "Mansikka täytekakku",
                "offer_price": null,
                "dish_price": "4.00",
                "dish_photo": "fc59ad5ee62ad782a375e932f7ed1183",
                "description": "Gluteeniton"
            }
        ]
    },
    {
        "category_name": "Kylmät juomat",
        "dishes": [
            {
                "dish_id": 11,
                "dish_name": "Coca-cola",
                "offer_price": null,
                "dish_price": "3.50",
                "dish_photo": "8bd62f93f91f8f5fda2d5cdbd738a078",
                "description": "Halutessa sokeriton"
            },
            {
                "dish_id": 12,
                "dish_name": "Sprite",
                "offer_price": null,
                "dish_price": "3.50",
                "dish_photo": "dbb0a4dbdf7526414d366ef2f410a1bf",
                "description": "Halutessa sokeriton"
            },
            {
                "dish_id": 13,
                "dish_name": "Fanta",
                "offer_price": null,
                "dish_price": "3.50",
                "dish_photo": "52ab0cada95b493a4897fedb1cd51c3e",
                "description": "Halutessa sokeriton"
            }
        ]
    },
    {
        "category_name": "Kuumat juomat",
        "dishes": [
            {
                "dish_id": 15,
                "dish_name": "Latte",
                "offer_price": "3.15",
                "dish_price": "3.50",
                "dish_photo": "cbc141b3cd0dbedac60dfa7d8dfbbdf1",
                "description": "Pyydettäessä erikois maitoon"
            },
            {
                "dish_id": 14,
                "dish_name": "Americano",
                "offer_price": null,
                "dish_price": "3.50",
                "dish_photo": "7fda39be6fac103af0a5eb3ce9cdadfb",
                "description": "Piristys päivään"
            },
            {
                "dish_id": 16,
                "dish_name": "Mocha",
                "offer_price": null,
                "dish_price": "3.50",
                "dish_photo": "56f8c57e52f4f55adcc459a5ccd94d76",
                "description": "Pyydettäessä erikois maitoon"
            }
        ]
    }
]
 */
dishRouter.route("/logged").get(authenticateToken, getDishWithOffers);

/**
 * GET endpoint for dishes by id
 * @name GET/api/dish/:id
 * @param {number} id - dish id
 * @returns {object} - object containing dish info
 * @example response - HTTP 200 OK
 *
 * @api {get} /dish/:id Get dish by id
 * @apiName GetDishById
 * @apiGroup Dish
 * @apiPermission all
 * @apiPermission token
 * @apiDescription Get dish by id
 * @apiParam {Number} id Dish id.
 * @apiSuccess {Number} dish_id Dish id.
 * @apiSuccess {String} dish_name Dish name.
 * @apiSuccess {String} description Dish description.
 * @apiSuccess {Number} dish_price Dish price.
 * @apiSuccess {String} dish_photo Dish photo.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
    "dish_id": 5,
    "dish_name": "Korvapuusti",
    "offer_price": null,
    "dish_price": "2.90",
    "dish_photo": "fed951a512639fd51371003c50238a0f",
    "description": "Tehty omassa leipomossa"
 * }
 *
 * @apiUse Error400
 */

/**
 *
 * @api {put} /dish/:id Modify an existing dish
 * @apiName ModifyDish
 * @apiGroup Dish
 * @apiPermission admin
 * @apiDescription Modify an existing dish
 *
 * @apiHeader {String} Authorization Bearer token.
 * @apiParam {string} dis_price The price of the dish.
 * @apiParam {String} description Description of dish item.
 * @apiParam {String} category_id Category id of dish item.
 * @apiParam {File} dish_photo The file of the dish to be uploaded.
 *
 * @apiParamExample {form-data} Request-Example:
 *    {
 *      "dish_price": "pic1.jpg",
 *      "description": "sunset",
 *      "category_id": "sunset",
 *       "dish_photo": "moccha.png"
 *    }
 *
 * @apiSuccess {string} message Success message.
 * @apiSuccess {number} affectedRows affected rows
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 * {
    "message": "Dish updated.",
    "affectedRows": 1
    }
 *
  *@apiUse Error400
 */

/**
 *
 * @api {delete} /dish/:id Delete a dish
 * @apiName DeleteDish
 * @apiGroup Dish
 * @apiPermission admin
 * @apiDescription Delete a dish
 *
 * @apiHeader {String} Authorization Bearer token.
 * @apiSuccess {string} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 * {
    "message": "dish deleted"
    }
 *
  *@apiUse Error400
 */
dishRouter
  .route("/:id")
  .get(authenticateToken2, getDishById)
  .put(authenticateToken, upload.single("dish_photo"), updateDish)
  .delete(authenticateToken, deleteDish);

export { dishRouter };
