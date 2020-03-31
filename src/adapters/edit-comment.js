import moment from "moment";

class EditComment {
  constructor(data) {
    this.comment = data[`comment`];
    this.date = moment(data[`date`]);
    this.id = data[`id`];
    this.rating = data[`rating`];
    this.user = {
      avatar: data.user[`avatar_url`],
      id: data.user[`id`],
      name: data.user[`name`],
      isPro: data.user[`is_pro`],
    };
  }

  static parseComment(data) {
    return new EditComment(data);
  }

  static parseComments(data) {
    return data.map(EditComment.parseComment);
  }
}

export default EditComment;



