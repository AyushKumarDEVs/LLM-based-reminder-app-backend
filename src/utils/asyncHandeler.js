import { apiError } from "../utils/apiError.js";

export const asyncHandeler = (asyncfx) => {
  return async (req, res, next) => {
    try {
      await asyncfx(req, res, next);
    } catch (error) {
      console.log(error);
      res.json(error)
    }
  };
};
