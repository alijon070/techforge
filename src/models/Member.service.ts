import { MemberStatus, MemberType } from "../libs/enums/member.enum";
import { shapeIntoMongooseObjectId } from "../libs/types/config";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../libs/types/member";
import MemberModel from "../schema/Member.model";
import * as bcrypt from "bcryptjs";

class MemberService {
  private readonly memberModel;
  constructor() {
    this.memberModel = MemberModel;
  }

  /** SPA **/

  public async getStore(): Promise<Member> {
    try {
      const result = await this.memberModel
        .findOne({
          memberType: MemberType.STORE,
        })
        .lean()
        .exec();

      if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

      return result;
    } catch (err) {
      console.error("Error, model: signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  public async signup(input: MemberInput): Promise<Member> {
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result.toJSON();
    } catch (err) {
      console.error("Error, model: signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberPassword: 1, memberNick: 1 }
      )
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    const result = await this.memberModel.findById(member._id).lean().exec();
    if (!result)
      throw new Errors(HttpCode.NOT_FOUND, Message.SOMETHING_WENT_WRONG);

    return result;
  }

  public async getMemberDetail(member: Member): Promise<Member> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const result = await this.memberModel
      .findOne({
        _id: memberId,
        memberStatus: MemberStatus.ACTIVE,
      })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateMember(
    member: Member,
    input: MemberUpdateInput
  ): Promise<Member> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const result = await this.memberModel
      .findOneAndUpdate(
        {
          _id: memberId,
        },
        input,
        { returnDocument: "after" }
      )
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }

  /** SSR **/

  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({
        memberType: MemberType.STORE,
        memberEmail: input.memberEmail,
      })
      .exec();
    if (!exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberPassword: 1, memberNick: 1 }
      )
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    const result = await this.memberModel.findById(member._id).exec();
    if (!result)
      throw new Errors(HttpCode.NOT_FOUND, Message.SOMETHING_WENT_WRONG);

    return result;
  }

  public async getUsers(): Promise<Member[]> {
    try {
      const result = await this.memberModel
        .find({ memberType: MemberType.USER })
        .exec();
      if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
      return result;
    } catch (err) {
      console.error("Error, model: getUsers", err);
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    }
  }

  public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
    try {
      const memberId = shapeIntoMongooseObjectId(input._id);
      const result = await this.memberModel
        .findOneAndUpdate({ _id: memberId }, input, { new: true })
        .exec();
      if (!result)
        throw new Errors(HttpCode.NOT_MODIFIED, Message.NO_DATA_FOUND);
      return result;
    } catch (err) {
      console.error("Error, model: updateChosenUser", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.UPDATE_FAILED);
    }
  }
}

export default MemberService;
