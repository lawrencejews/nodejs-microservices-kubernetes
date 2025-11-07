import { AuthModel } from '@auth/models/auth.schema';
import { publicDirectMessage } from '@auth/queues/auth.producer';
import { authChannel } from '@auth/server';
import { firstLetterUppercase, IAuthBuyerMessageDetails, IAuthDocument } from '@lawrencejews/marketplace-shared';
import { lowerCase, omit } from 'lodash';
import { Model, Op } from 'sequelize';

export async function createAuthUser(data: IAuthDocument): Promise<IAuthDocument> {
  
  const result: Model = await AuthModel.create(data);
  const messageDetails: IAuthBuyerMessageDetails = {

    username: result.dataValues.username!,
    email: result.dataValues.email!,
    profilePicture: result.dataValues.profilePicture!,
    country: result.dataValues.country!,
    createdAt: result.dataValues.createdAt!,
    type: 'auth'

  };

  await publicDirectMessage(

    authChannel,
    'marketplace-buyer-update',
    'user-buyer',
    JSON.stringify(messageDetails),
    'Buyer details sent to buyer service'

  );

  const userData: IAuthDocument = omit(result.dataValues, ['password']) as IAuthDocument;
  return userData;

}


export async function getAuthUserById(authId: number): Promise<IAuthDocument | undefined>{
  
  const user: Model = await AuthModel.findOne({

    where: { id: authId },
    attributes: {
      exclude: ['password']
    }

  }) as Model;
  return user.dataValues;

}

export async function getUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument | undefined> {

  const user: Model = await AuthModel.findOne({

    where: { 
      [Op.or]: [{username: firstLetterUppercase(username)}, {email: lowerCase(email)}]
    },
    

  }) as Model;
  return user.dataValues;

}

export async function getUserByUsername(username: string): Promise<IAuthDocument | undefined> {

  const user: Model = await AuthModel.findOne({

    where: {
       username: firstLetterUppercase(username) 
    },


  }) as Model;
  return user.dataValues;

}

export async function getUserByEmail(email: string): Promise<IAuthDocument | undefined> {

  const user: Model = await AuthModel.findOne({

    where: {
      email: lowerCase(email)
    },


  }) as Model;
  return user.dataValues;


}

export async function getUserByVerificationToken(token: string): Promise<IAuthDocument | undefined> {

  const user: Model = await AuthModel.findOne({

    where: { emailVerificationToken: token },
    attributes:{
    exclude: ['password']
  },
    
  }) as Model;
  return user.dataValues;

}

export async function getUserByPasswordToken(token: string): Promise<IAuthDocument | undefined> {

  const user: Model = await AuthModel.findOne({

    where: { 
      [Op.and] : [{passwordResetToken: token}, {passwordResetExpires: {[Op.gt]: new Date()}}]
     },

  }) as Model;
  return user.dataValues;

}