const { Address } = require('../models');

class AddressRepository {
  //전체 게시글 조회
  findUserAddress = async (user_id) => {
    return await Address.findAll({
      attributes: ['address_id', 'address'],
      where: { user_id },
      order: [['updatedAt', 'DESC']],
    });
  };

  //마지막으로 사용한 주소
  findUserAddressOne = async (user_id) => {
    return await Address.findOne({
      attributes: ['address_id', 'address'],
      where: { isCurrent: 1, user_id },
    });
  };

  createAddress = async (user_id, address) => {
    return await Address.create({
      user_id,
      address,
    });
  };

  updateIsCurrentNull = async (user_id, t) => {
    return await Address.update(
      { isCurrent: 0 },
      { where: { user_id }, transaction: t }
    );
  };

  updateIsCurrentTrue = async (address_id, t) => {
    return await Address.update(
      { isCurrent: 1 },
      { where: { address_id }, transaction: t }
    );
  };

  updateAddress = async (address, address_id) => {
    return await Address.update({ address }, { where: { address_id } });
  };

  deleteAddress = async (address_id) => {
    return await Address.destroy({ where: { address_id } });
  };
}

module.exports = AddressRepository;
