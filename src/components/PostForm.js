import React from "react";
import { connect } from "react-redux";
import { createPost, showAlert } from "../redux/actions";
import { Alert } from "./Alert";

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { title } = this.state;

    const newPost = {
      title,
      id: Date.now().toString(),
    };

    if (!title.trim()) {
      return this.props.showAlert(
        "Заголовок поста не может быть пустым"
      );
    }

    this.props.createPost(newPost);
    this.setState({ title: "" });
  };

  changeTitleHandler = (event) => {
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        {this.props.alert && <Alert text={this.props.alert} />}

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Заголовок поста</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.changeTitleHandler}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Добавить
        </button>
      </form>
    );
  }
}

const dispatchToProps = {
  createPost,
  showAlert,
};

const mapStateToProps = (state) => ({
  alert: state.app.alert,
});

export default connect(mapStateToProps, dispatchToProps)(PostForm);
