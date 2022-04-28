const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password) {
    //Проверяем существует ли пользователь с таким email
    const candidate = await UserModel.findOne({ where: { email: email } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    //Хешируем пароль
    const hashPassword = await bcrypt.hash(password, 3);

    //Генерируем активационную ссылку
    const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

    //Создаем пользователя в базе
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });

    //Отправляем письмо с активацией на email
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    );

    //Получаем необходимые данные из модели
    const userDto = new UserDto(user); // id, email, isActivated

    //Генерация access и refresh токена
    const tokens = tokenService.generateTokens({ ...userDto });

    //Сохранение refresh токена в базе
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    
    const user = await UserModel.findOne({
      where: { activationLink: activationLink },
    });
    if (!user) {
      throw ApiError.BadRequest("Неккоректная ссылка активации");
    }

    await await UserModel.update(
      { isActivated: true },
      {
        where: {
          activationLink: activationLink,
        },
      }
    );
  }

  async login(email, password) {
    const user = await UserModel.findOne({ where: { email: email } });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findByPk(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.findAll();
    return users;
  }
}

module.exports = new UserService();
