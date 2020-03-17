class EditAuthInfo {
  constructor(data) {
    this.avatar = data[`avatar_url`];
    this.email = data[`email`];
    this.id = data[`id`];
    this.name = data[`name`];
    this.isPro = data[`is_pro`];
  }

  static parseUser(data) {
    return new EditAuthInfo(data);
  }
}

export default EditAuthInfo;
