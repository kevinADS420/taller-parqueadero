import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from "express";

let validatorParams = [
    check('nameUser').isLength({ min: 1, max: 255}),
    check('marca').isLength({min: 1, max: 60 }),
    check('placa').isLength({ min: 1, max: 6}),
  ];
     
  
  function validator(req: Request, res: Response, next: NextFunction) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
      }
      next();
  }
  
  


  export default {
    validatorParams,
    validator
};