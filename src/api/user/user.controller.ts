import { Request, Response, NextFunction } from 'express';
import UserModel from './user.model';
import * as isEmail from 'validator/lib/isEmail';
import * as jwt from 'jwt-simple';
import * as bcrypt from 'bcrypt';
import model from './user.model';


export default class UserController {

    /**
     * Get all
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    public static async getAll(req: Request, res: Response, next: NextFunction) {

        try {

            // 
            // Get data
            let result = await UserModel.find().exec();
            const status = res.statusCode;

            // 
            // Response
            res.send({
                message: 'it works! We got all users',
                result: result,
                status: status
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not get Users',
                err: err
            });
        }
    }

    /**
     * getUser
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */

    public static async getUser(req: Request, res: Response, next: NextFunction) {

        try {

            // 
            // Get data
            const username: String = req.params.username;
            let result = await UserModel.findOne({ username }).exec();
            const status = res.statusCode;

            // 
            // Response
            res.send({
                message: 'Successfull got a user',
                result: result,
                status: status
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not get Examples',
                err: err
            });
        }
    }


    /** 
   * Create an objet with user data to encode in the jwt token.  
   * @param {IUser} user The user
   */


  private static userDataToPassInToken(user): Object{
    return {
      _id: user._id,
      email: user.email
    };
}
    /**
     * Create
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
      /** Create an user. */
  public static create(req: Request, res: Response, next: NextFunction): void { 

    // The attributes.
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    let name = req.body.name;

    console.log(email);

    // The errors object
    let errors: Array<Object> = [];

    // Check email
    if(!email){ 
      errors.push({
        title: "Attribute is missing",
        detail: "No email specified"
      });
    }else{
      // If email has not email format
      if(!isEmail(email)){
        errors.push({
          title: "Invalide attribute",
          detail: "Email must have an email format"
        });
      }
      // If email doesn't have characters length requirments
      if(email.length < 5){
        errors.push({
          title: "Invalid attribute",
          detail: "Email must contain at least five characters"
        });
      }
    }
   
    // Check password
    if(!password){
      errors.push({
        title: "Attribute is missing",
        detail: "No password specified"
      });
    }else{
      if(password.length < 6){
        errors.push({
          title: "Invalid attribute",
          detail: "Password must contain at least 6 characters"
        });
      }
    }

    // If a least one error
    if(errors.length > 0){
      res.status(403).send({
        errors: errors
      });
    }else{
      UserModel.create({ email, password, username, name })
      .then(user => {
        res.status(201).send({
          data: {
            type: "user",
            user,
            id: user._id,
            token: "JWT " + jwt.encode(UserController.userDataToPassInToken(user), process.env.SECRET, "HS256", ""),
            message: "Account successfully created"

          }
        });
      })
      .catch(err => {
        res.status(400).send({
          errors: [{
            title: "Can't create the user",
            detail: err.message
          }]
        });
      }); 
    }
    
}

    public static async update(req: Request, res: Response, next: NextFunction) {
        const username:String = req.params;
        
        try {

            // 
            // Get data
            const username: String = req.params.username;
            let result = await UserModel.findOneAndUpdate({ username }, {
                ...req.body,
                updatedAt: new Date()
            }).exec();
            const status = res.statusCode;

            // 
            // Response
            res.send({
                message: 'Sucessfully updated a user',
                result: result,
                status: status
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not create the user',
                err: err
            });
        }
    }

    public static async authenticate(req: Request, res: Response, next: NextFunction) {
    
        // The attributes.
        let email = req.body.email;
        let password = req.body.password;
    
        // The errors object
        let errors: Array<Object> = [];
    
        // Check email
        if (!email) { 
          errors.push({
            title: "Attribute is missing",
            detail: "No email specified"
          });
        } else {

          // If email has not email format
          if (!isEmail(email)) {
            errors.push({
              title: "Invalide attribute",
              detail: "Email must have an email format"
            });
          }

          // If email doesn't have characters length requirments
          if(email.length < 5){
            errors.push({
              title: "Invalid attribute",
              detail: "Email must contain at least five characters"
            });
          }

        }
       
        // Check password
        if (!password) {
          errors.push({
            title: "Attribute is missing",
            detail: "No password specified"
          });
        } else {
          if (password.length < 6) {
            errors.push({
              title: "Invalid attribute",
              detail: "Password must contain at least 6 characters"
            });
          }
        }
    
        // If a least one error
        if (errors.length > 0) {
          res.status(403).send({
            errors: errors
          });
        } else {

            UserModel.findOne({ email }).then(user => {
            if (user) {
              user.comparePassword(password, (err, isMatch) => {
    
                if (err) {
                  errors.push({
                    title: "Can't login user",
                    detail: "Error comparing the password"
                  });
                }
    
                if (!isMatch) {
                  errors.push({
                    title: "Can't login user",
                    detail: "The password doesn't match"
                  });
                }
    
                if (errors.length > 0) {
                  res.status(400).send({
                    errors: errors
                  });
                } else {
                  res.status(201).send({
                    data: {
                      type: "users",
                      id: user._id,
                      user,
                      token: "JWT " + jwt.encode(UserController.userDataToPassInToken(user), process.env.SECRET, "HS256", "")
                    }
                  })
                }
                
                    });
            } else {
              res.status(400).send({
                errors: [{
                  title: "Invalid attribute",
                  detail: "The email does not exist"
                }]
              })
            }          
        });

        }
    }
}