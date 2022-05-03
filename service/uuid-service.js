const isValidUUID = (uuid) => {
  let isuuid =
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
      uuid
    );
  return isuuid;
};

module.exports = isValidUUID;
